// pages/api/sendProductRequest.js
import { db } from '@/lib/firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import fs from 'fs';

const handler = async (req, res) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Only POST requests allowed' });

  const { data, page, productId } = req.body;

  if (!data?.userName) return res.status(400).json({ message: 'İsim girilmedi' });
  if (!data?.email) return res.status(400).json({ message: 'E-Posta girilmedi' });

  const MARKETING_EMAIL = process.env.MARKETING_EMAIL || 'marketing@parsanalitik.com';
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;

  if (!EMAIL_USER || !EMAIL_PASS) {
    return res.status(500).json({ message: 'E-posta yapılandırması eksik (EMAIL_USER/EMAIL_PASS).' });
  }

  try {
    // 1) Firestore kaydı
    const refDoc = collection(db, 'Requests');
    await addDoc(refDoc, {
      ...data,
      from: page,
      createdAt: new Date(),
      type: 'product',
      relatedId: productId,
    });

    // 2) Transporter (Gmail App Password önerilir)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      logger: true,
    });

    // 3) Handlebars şablon motoru (kökten)
    const templatesDir = path.join(process.cwd(), 'emailTemplates');
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

    // Teşhis
    console.log('templatesDir:', templatesDir);
    console.log('welcome.hbs exists?', fs.existsSync(path.join(templatesDir, 'welcome.hbs')));

    // SMTP bağlantısını test et
    try {
      await transporter.verify();
      console.log('SMTP verify: OK');
    } catch (verErr) {
      console.error('SMTP verify failed:', verErr);
      // devam edelim; bazı ortamlarda verify hata verse de gönderim mümkün olabiliyor
    }

    // 4) Kullanıcıya mail
    try {
      const mailOptions = {
        from: EMAIL_USER,
        to: data.email,
        subject: 'Cihaz Talebinizi Aldık',
        template: 'welcome', // emailTemplates/welcome.hbs olmalı
        context: { userName: data.userName },
        replyTo: data.email,
      };

      // welcome.hbs yoksa plaintext fallback
      if (!fs.existsSync(path.join(templatesDir, 'welcome.hbs'))) {
        delete mailOptions.template;
        delete mailOptions.context;
        mailOptions.text = `Merhaba ${data.userName},\n\nCihaz talebinizi aldık. En kısa sürede size dönüş yapacağız.\n\nPars Analitik`;
      }

      const info1 = await transporter.sendMail(mailOptions);
      console.log('Customer mail accepted:', info1.accepted, 'response:', info1.response);
    } catch (custErr) {
      console.error('Customer mail failed:', custErr);
      // müşteriye mail gitmese bile sürece devam edelim
    }

    // 5) Pazarlamaya mail
    try {
      const mailOptionsToMarketing = {
        from: EMAIL_USER,
        to: MARKETING_EMAIL,
        subject: 'Cihaz talebi oluşturuldu',
        template: 'welcome', // aynı welcome şablonunu kullanıyoruz
        context: {
          userName: data.userName,
          message: `${data.email}, ${data.userName} tarafından "Cihaz" talebi oluşturuldu.`,
        },
      };

      if (!fs.existsSync(path.join(templatesDir, 'welcome.hbs'))) {
        delete mailOptionsToMarketing.template;
        delete mailOptionsToMarketing.context;
        mailOptionsToMarketing.text =
          `Yeni talep:\n` +
          `Ad Soyad: ${data.userName}\n` +
          `E-Posta: ${data.email}\n` +
          `Telefon: ${data.phone || '-'}\n` +
          `Firma: ${data.firmName || '-'}\n` +
          `Sayfa: ${page}\n` +
          `Ürün ID: ${productId || '-'}\n`;
      }

      const info2 = await transporter.sendMail(mailOptionsToMarketing);
      console.log('Marketing mail accepted:', info2.accepted, 'response:', info2.response);
    } catch (mktErr) {
      console.error('Marketing mail failed, falling back to plaintext send:', mktErr);
      // ikinci bir düz-metni deneyelim (hiç template alanı olmadan)
      try {
        const fallbackInfo = await transporter.sendMail({
          from: EMAIL_USER,
          to: MARKETING_EMAIL,
          subject: 'Cihaz talebi oluşturuldu (fallback)',
          text:
            `Yeni talep:\n` +
            `Ad Soyad: ${data.userName}\n` +
            `E-Posta: ${data.email}\n` +
            `Telefon: ${data.phone || '-'}\n` +
            `Firma: ${data.firmName || '-'}\n` +
            `Sayfa: ${page}\n` +
            `Ürün ID: ${productId || '-'}\n`,
        });
        console.log('Marketing fallback accepted:', fallbackInfo.accepted, 'response:', fallbackInfo.response);
      } catch (fallbackErr) {
        console.error('Marketing plaintext fallback failed:', fallbackErr);
      }
    }

    // 6) Bildirim
    const notificationsRef = collection(db, 'Notifications');
    await addDoc(notificationsRef, {
      email: data.email,
      userName: data.userName,
      message: 'Cihaz talebi oluşturuldu',
      createdAt: new Date(),
      page,
      relatedId: productId,
    });

    return res.status(200).json({ message: 'Service request created and email attempted' });
  } catch (error) {
    console.error('Error in API handler:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error?.toString?.() || String(error) });
  }
};

export default handler;
