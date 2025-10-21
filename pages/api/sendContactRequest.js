// pages/api/sendContactRequest.js
import { db } from '@/lib/firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import fs from 'fs';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { data, page } = req.body;

  if (!data?.userName) return res.status(400).json({ message: 'İsim girilmedi' });
  if (!data?.email) return res.status(400).json({ message: 'E-Posta girilmedi' });

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
      type: 'iletisim',
    });

    // 2) Nodemailer (Gmail App Password önerilir)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      logger: true,
    });

    // 3) Handlebars şablon motoru (kök dizinden)
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

    // Teşhis logları (gerekirse bırak)
    console.log('templatesDir:', templatesDir);
    console.log('welcome.hbs exists?', fs.existsSync(path.join(templatesDir, 'welcome.hbs')));

    // 4) SMTP verify (başarısız olsa bile gönderim denenir)
    try {
      await transporter.verify();
      console.log('SMTP verify: OK');
    } catch (verErr) {
      console.error('SMTP verify failed:', verErr);
    }

    // 5) Kullanıcıya e-posta (şablon varsa, yoksa plaintext)
    const hasWelcome = fs.existsSync(path.join(templatesDir, 'welcome.hbs'));
    const mailOptions = hasWelcome
      ? {
          from: EMAIL_USER,
          to: data.email,
          subject: 'İletişim Bilgilerinizi Aldık',
          template: 'welcome',
          context: { userName: data.userName },
          replyTo: data.email,
        }
      : {
          from: EMAIL_USER,
          to: data.email,
          subject: 'İletişim Bilgilerinizi Aldık',
          text: `Merhaba ${data.userName},\n\nİletişim talebinizi aldık. En kısa sürede size dönüş yapacağız.\n\nPars Analitik`,
          replyTo: data.email,
        };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Contact mail accepted:', info.accepted, 'response:', info.response);
    } catch (mailErr) {
      console.error('Contact mail failed:', mailErr);
      // burada istersen ikinci bir düz-metni deneyebilirsin, fakat yukarıda zaten fallback sağlıyoruz.
    }

    // 6) Bildirim
    const notificationsRef = collection(db, 'Notifications');
    await addDoc(notificationsRef, {
      email: data.email,
      userName: data.userName,
      message: 'İletişim formu oluşturuldu',
      createdAt: new Date(),
      page,
    });

    return res.status(200).json({ message: 'Contact request created and email attempted' });
  } catch (error) {
    console.error('Error in API handler:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error?.toString?.() || String(error) });
  }
};

export default handler;
