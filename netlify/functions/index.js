// functions/myFunction.js
const express = require('express');
const admin = require('firebase-admin');

const app = express();

// Initialize Firebase Admin SDK
// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
const serviceAccount = express.require('../../notes-keeper-267ed-firebase-adminsdk-vjd4y-dafe4581b5.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// app.use(express.static(path.join(__dirname, '../public')));


// Express route
app.get('/', async (req, res) => {
  try {
    // Example: Query Firestore collection
    const firestore = admin.firestore();
    const snapshot = await firestore.collection('cells').get();

    const data = snapshot.docs.map((doc) => doc.data());

    res.status(200).json({ data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Express route to save data
app.post('/save', async (req, res) => {
  try {
    const { newData } = req.body;

    if (!newData) {
      return res.status(400).json({ error: 'Missing required data' });
    }

    // Example: Add data to Firestore
    const firestore = admin.firestore();
    await firestore.collection('cells').add({
      data: newData,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Netlify function handler
exports.handler = async (event, context) => {
  const handler = app;
  return handler(event, context);
};
