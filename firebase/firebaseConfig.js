import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: '<API_KEY>',
  authDomain: '<AUTH_DOMAIN>',
  projectId: '<PROJECT_ID>',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

export { db };