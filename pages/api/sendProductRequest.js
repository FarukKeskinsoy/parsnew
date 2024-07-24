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

    const { data, page, productId } = req.body;

    if (!data?.userName) {
        return res.status(400).json({ message: 'İsim girilmedi' });
    }
    if (!data?.email) {
        return res.status(400).json({ message: 'E-Posta girilmedi' });
    }

    try {
        const refDoc = collection(db, "Requests");
        await addDoc(refDoc, { ...data, from: page, createdAt: new Date(),type:"product", relatedId:productId
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const handlebarOptions = {
            viewEngine: {
                extName: '.hbs',
                partialsDir: path.resolve('./emailTemplates/'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./emailTemplates/'),
            extName: '.hbs',
        };

        transporter.use('compile', hbs(handlebarOptions));

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: data.email,
            subject: 'Cihaz Talebinizi Aldık',
            template: 'welcome', // Name of the template file without extension
            context: {
                userName: data.userName // Pass variables to the template
            }
        };

        await transporter.sendMail(mailOptions);
        const notificationsRef = collection(db, "Notifications");
        await addDoc(notificationsRef, {
            email: data.email,
            userName: data.userName,
            message: 'Cihaz talebi oluşturuldu',
            createdAt: new Date(),
            page:page,
            relatedId:productId

        });

        res.status(200).json({ message: 'Service request created and email sent' });
    } catch (error) {
        console.error('Error in API handler:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.toString() });
    }
};


export default handler;
