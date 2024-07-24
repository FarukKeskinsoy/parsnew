import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../firebase";

export const createServiceRequest=async (data,page)=>{

    console.log("db function tetiklendi")
    if(!data?.userName){
        throw new Error("İsim girilmedi");
    }
    if(!data?.email){
        throw new Error("E-Posta girilmedi")
    }
    const refDoc=collection(db,"ServiceRequests")
    await addDoc(refDoc,{...data,from:page,createdAt:new Date()})
    
}

// Your client-side code
export const createServiceRequestApi = async (data, page) => {
    try {
        const response = await fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data, page })
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.error(error);
    }
};
export const createProductRequestApi = async (data, page,productId) => {
    try {
        const response = await fetch('/api/sendProductRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data, page,productId })
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.error(error);
    }
};
export const createInfoRequestApi = async (data, page) => {
    try {
        const response = await fetch('/api/sendContactRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data, page })
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.error(error);
    }
};
export const createEventRequestApi = async (data,page,docId) => {
    try {
        const response = await fetch('/api/sendEventRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data,page,docId })
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.error(error);
    }
};

export const createMultiRequestApi = async (data, route,title) => {
    try {
        const response = await fetch('/api/sendMultiRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data, route, title })
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.error(error);
    }
};