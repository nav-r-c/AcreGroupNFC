import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, get } from "firebase/database";

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
const nodeName = "cards";

function customEncrypt(inputString : string , key : string) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
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
    const cardParam = query.cardID?.toString() as string;
    console.log(cardParam)
    const cardID = customDecrypt(cardParam, KEY).toString();

    const nodeRef = ref(database, nodeName);

    try {
        const snapshot = await get(nodeRef);
        const nodeData = snapshot.val();

        if (nodeData) { // not empty
            let foundUser = false;

            for (const nodeId of Object.keys(nodeData)) {
                const node = nodeData[nodeId];
                // console.log(nodeId)
                // console.log(cardID)
                // console.log(nodeId.length)
                // console.log(cardID.length)


                if (nodeId === cardID) {
                    // console.log(node.tagID);

                    if (node && node.tagId !== "none") {
                        foundUser = true;
                        sendRedirect(event, `/profile/${customEncrypt(node.tagId, KEY)}`);
                        break;

                    } else{
                        foundUser = true;
                        sendRedirect(event, "/verification");
                        break;
                    }

                }
            }

            if (!foundUser) {
                return "Error: User Does not exist";
            }
        } else {
            return "Error: Node Does not Exist";
        }
    } catch (error) {
        return "Error: Something went wrong";
    }
});

