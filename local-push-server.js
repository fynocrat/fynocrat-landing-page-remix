// local-push-server.js
const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const fs = require('fs');

const serviceAccount = require('./serviceAccountKey.json'); // put the downloaded JSON here

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(bodyParser.json());

let savedToken = null; // for quick local testing only; in prod, store in DB

app.post('/api/push/register', (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'token required' });
  savedToken = token;
  console.log('Saved token:', token);
  return res.json({ ok: true });
});

app.post('/api/push/sendTest', async (req, res) => {
  const { title = 'Test title', body = 'Test body', url = '/' } = req.body;
  if (!savedToken) return res.status(400).json({ error: 'No token registered yet' });
  const message = {
    token: savedToken,
    notification: { title, body },
    webpush: {
      fcmOptions: { link: url },
    },
    data: { url }
  };
  try {
    const resp = await admin.messaging().send(message);
    console.log('Push sent:', resp);
    res.json({ ok: true, resp });
  } catch (err) {
    console.error('Error sending push:', err);
    res.status(500).json({ error: err.message || err });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Push server listening on ${PORT}`));
