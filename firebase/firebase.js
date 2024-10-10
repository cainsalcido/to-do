const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId : '<PROJECT_ID>',
    clientEmail: '<CLIENT_EMAIL>',
    privateKey: '<PRIVATE_KEY>',
  }),
  databaseURL: '<DATABASE_URL>',
});

const db = admin.database();

module.exports = db;