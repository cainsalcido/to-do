import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: '<API_KEY>',
  authDomain: '<AUTH_DOMAIN>',
  projectId: '<PROJECT_ID>',
};

firebase.initializeApp(firebaseConfig);