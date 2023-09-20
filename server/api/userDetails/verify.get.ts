import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import axios from "axios";

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

function customEncrypt(inputString : string , key : string) {
    const characters = process.env.CHARS?.toString() as string;
    let encryptedString = '';
    for (let i = 0; i < inputString.length; i++) {
      const char = inputString.charAt(i);
      const charIndex = characters.indexOf(char);
      if (charIndex !== -1) { // Check if the character is in characters
        const keyChar = key.charCodeAt(i % key.length) % characters.length;
        const encryptedChar = (charIndex + keyChar) % characters.length;
        encryptedString += characters.charAt(encryptedChar);
      } else {
        // Handle characters not in characters string, you can skip or handle them as needed
        encryptedString += char;
      }
    }
    return encryptedString;
  }
function customDecrypt(encryptedString : string, key : string) {
    const characters = process.env.CHARS?.toString() as string;
    let decryptedString = '';
    for (let i = 0; i < encryptedString.length; i++) {
      const char = encryptedString.charAt(i);
      const charIndex = characters.indexOf(char);
      if (charIndex !== -1) { // Check if the character is in characters
        const keyChar = key.charCodeAt(i % key.length) % characters.length;
        const decryptedChar = (charIndex - keyChar + characters.length) % characters.length;
        decryptedString += characters.charAt(decryptedChar);
      } else {
        // Handle characters not in characters string, you can skip or handle them as needed
        decryptedString += char;
      }
    }
    return decryptedString;
}

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const cardID = query.cardID?.toString() as string;
    const phoneNumber = query.phoneNumber?.toString() as string;
    const verifCode = query.verifCode?.toString() as string;

	// console.log(tagId)
	const currentDomain = event.req.headers.host
	
	const resp = await axios.get(`http://${currentDomain}/api/userDetails/fetch?tagId=${customEncrypt(verifCode, KEY)}`)

	if (resp.data.message == "User Found") {
		if ((resp.data.data['phoneNumber'] === phoneNumber) && (resp.data.data['nfcID'] == verifCode)) {
			return {"message" : "User Verified", "data" : resp.data.data}
		}
		else {
			return {"message" : "User Not Verified", "data" : resp.data.data}
		}
	}
	else {
		return {"message" : "User Not Found"}
	}

})