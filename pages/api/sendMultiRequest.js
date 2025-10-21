// pages/api/sendEmail.js
import { db } from '@/lib/firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { data, route, title } = req.body;

  if (!data?.userName) return res.status(400).json({ message: 'İsim girilmedi' });
  if (!data?.email) return res.status(400).json({ message: 'E-Posta girilmedi' });

  const MARKETING_EMAIL = process.env.MARKETING_EMAIL || 'marketing@parsanalitik.com';

  try {
    // 1) Firestore kaydı
    const refDoc = collection(db, 'Requests');
    await addDoc(refDoc, {
      ...data,
      from: route,
      createdAt: new Date(),
      type: title,
    });

    // 2) Nodemailer transporter (Gmail için önerilen yapı)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // 465 için true
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password olmalı
      },
      // debug/diagnostics
      logger: true,
    });

    // 3) Şablon motoru
    const templatesDir = path.resolve('./emailTemplates/');
    transporter.use(
      'compile',
      hbs({
        viewEngine: {
          extName: '.hbs',
          partialsDir: templatesDir,
          defaultLayout: false,
        },
        viewPath: templatesDir,
        extName: '.hbs',
      })
    );

    // 4) Transporter bağlantısını doğrula (log için)
    await transporter.verify().catch((e) => {
      console.error('SMTP verify failed:', e);
    });

    // 5) Müşteriye giden e-posta
    const mailToCustomer = {
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: `${title} Talebinizi Aldık`,
      template: 'welcome', // emailTemplates/welcome.hbs
      context: {
        userName: data.userName,
      },
      replyTo: data.email, // cevap size gelsin istiyorsanız değiştirin
    };

    const info1 = await transporter.sendMail(mailToCustomer);
    console.log('Customer mail accepted:', info1.accepted, 'response:', info1.response);

    // 6) Pazarlamaya giden e-posta (şablon + fallback)
    try {
      const mailToMarketing = {
        from: process.env.EMAIL_USER,
        to: MARKETING_EMAIL,
        subject: `${title} talebi oluşturuldu`,
        template: 'notifyMarketting', 
        context: {
          userName: data.userName,
          email: data.email,
          phone: data.phone,
          firmName: data.firmName,
          message: data?.message || 'Belirtilmedi',
          title,
          kvkk: data.kvkk ? 'Kabul edildi' : 'Kabul edilmedi',
          route,
        },
      };

      const info2 = await transporter.sendMail(mailToMarketing);
      console.log('Marketing mail accepted:', info2.accepted, 'response:', info2.response);
    } catch (tplErr) {
      console.error('Marketing template send failed, falling back to plaintext:', tplErr);

      // Fallback: düz metin e-posta
      const fallbackInfo = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: MARKETING_EMAIL,
        subject: `${title} talebi oluşturuldu (fallback)`,
        text:
          `Yeni talep bilgileri:\n` +
          `Ad Soyad: ${data.userName}\n` +
          `E-Posta: ${data.email}\n` +
          `Telefon: ${data.phone || '-'}\n` +
          `Firma: ${data.firmName || '-'}\n` +
          `KVKK: ${data.kvkk ? 'Kabul edildi' : 'Kabul edilmedi'}\n` +
          `Sayfa: ${route}\n` +
          `Mesaj: ${data?.message || 'Belirtilmedi'}\n`,
      });
      console.log('Marketing fallback mail accepted:', fallbackInfo.accepted, 'response:', fallbackInfo.response);
    }

    // 7) Bildirim kaydı
    const notificationsRef = collection(db, 'Notifications');
    await addDoc(notificationsRef, {
      email: data.email,
      userName: data.userName,
      message: `${title} talebi oluşturuldu`,
      createdAt: new Date(),
      page: route,
    });

    return res.status(200).json({ message: 'Service request created and email(s) sent' });
  } catch (error) {
    console.error('Error in API handler:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error?.toString?.() || String(error) });
  }
};

export default handler;
