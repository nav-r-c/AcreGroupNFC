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
const nodeName = "users";

function customEncrypt(inputString : string, key : string) {
    const characters = process.env.CHARS?.toString() as string;
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
    const characters = process.env.CHARS?.toString() as string;
    let decryptedString = '';
    for (let i = 0; i < 12; i++) {
        const charIndex = characters.indexOf(encryptedString.charAt(i));
        const keyChar = key.charCodeAt(i % key.length) % characters.length;
        const decryptedChar = (charIndex - keyChar + characters.length) % characters.length;
        decryptedString += String.fromCharCode(decryptedChar);
    }
    return decryptedString;
}

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const nfcParam = query.nfcID?.toString() as string;
    const nfcID = customDecrypt(nfcParam, KEY).toString().trim().slice(0, 6);

    const nodeRef = ref(database, nodeName);

    try {
        const snapshot = await get(nodeRef);
        const nodeData = snapshot.val();

        if (nodeData) { // not empty
            let foundUser = false;

            for (const nodeId of Object.keys(nodeData)) {
                const node = nodeData[nodeId];
                console.log(node.nfcID)
                console.log(nfcID)

                if (node.nfcID === nfcID) {
                    console.log(node.verified);

                    if (node.verified === true) {
                        sendRedirect(event, `/profile/${customEncrypt(nodeId, KEY)}`);
                        break;

                    } else if (node.verified === false) {
                        sendRedirect(event, "/verification");
                        break;
                    }

                    foundUser = true;
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

