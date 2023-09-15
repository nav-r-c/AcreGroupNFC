import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DB_URL,
    projectId: process.env.PROJ_ID,
    storageBucket: process.env.ST_BUCKET,
    messagingSenderId: process.env.MSG_SEND_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const KEY = process.env.ENCRYPT_KEY?.toString() as string;

function customEncrypt(inputString : string, key : string) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
    let encryptedString = '';
    for (let i = 0; i < 12; i++) {
      const charIndex = i < inputString.length ? inputString.charCodeAt(i) % characters.length : 0;
      const keyChar = key.charCodeAt(i % key.length) % characters.length;
      const encryptedChar = (charIndex + keyChar) % characters.length;
      encryptedString += characters.charAt(encryptedChar);
    }
    return encryptedString;
  }
  
  function customDecrypt(encryptedString : string, key : string) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
    let decryptedString = '';
    for (let i = 0; i < 12; i++) {
      const charIndex = characters.indexOf(encryptedString.charAt(i));
      const keyChar = key.charCodeAt(i % key.length) % characters.length;
      const decryptedChar = (charIndex - keyChar + characters.length) % characters.length;
      decryptedString += String.fromCharCode(decryptedChar);
    }
    return decryptedString;
  }

export default defineEventHandler((event) => {
    const query = getQuery(event)
    const nfcParam = query.nfcID?.toString() as string;
    const nfcID = customDecrypt(nfcParam, KEY);
    return nfcID;
})