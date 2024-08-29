import { db } from "@/lib/firebase/firebase";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    // Fetch the corresponding document from Firestore
    const doc = await db.collection('blogs').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    const blogData = doc.data();

    // Construct the destination URL using the Firestore ID
    const newId = blogData.firestoreId; // Assuming your Firestore document has this field
    const newUrl = `/blog/${id}-${newId}`;

    // Redirect to the new URL
    res.writeHead(301, { Location: newUrl });
    res.end();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
