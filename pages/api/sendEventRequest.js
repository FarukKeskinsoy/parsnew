// pages/api/sendEmail.js
import { db } from '@/lib/firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests allowed' });
    }

    const { data,page,docId } = req.body;

    if (!data?.userName) {
        return res.status(400).json({ message: 'İsim girilmedi' });
    }
    if (!data?.email) {
        return res.status(400).json({ message: 'E-Posta girilmedi' });
    }

    try {
        const refDoc = collection(db, "Requests");
        await addDoc(refDoc, { ...data, from: page, createdAt: new Date(),type:page,relatedId:docId
        });

       
        const notificationsRef = collection(db, "Notifications");
        await addDoc(notificationsRef, {
            email: data.email,
            userName: data.userName,
            message: `${page} formu oluşturuldu`,
            createdAt: new Date(),
            page:page,
            relatedId:docId

        });

        res.status(200).json({ message: 'Service request created and email sent' });
    } catch (error) {
        console.error('Error in API handler:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.toString() });
    }
};


export default handler;
