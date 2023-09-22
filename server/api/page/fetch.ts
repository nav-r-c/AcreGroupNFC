import { initializeApp } from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";
import customDecrypt from "~/composables/customDecrypt";
import customEncrypt from "~/composables/customEncrypt";

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
const nodeName = "NFCCardDetails";
  

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const cardParam = query.cardID?.toString() as string;
    // console.log(cardParam)
    const cardID = customDecrypt(cardParam, KEY).toString();
    // console.log(cardID)
    // console.log(database)

    const nodeRef = ref(database, nodeName);

    try {
        const snapshot = await get(nodeRef);
        const nodeData = snapshot.val();

        console.log(nodeData)

        if (nodeData) { // not empty
            let foundUser = false;

            for (const nodeId of Object.keys(nodeData)) {
                const node = nodeData[nodeId];
                // console.log(nodeId)
                // console.log(cardID)
                // console.log(nodeId.length)
                // console.log(cardID.length)


                if (nodeId === cardID) {
                    // console.log(node.tagId);
                    if (node && node.tagId !== "none") {
                        sendRedirect(event, `/profile/${customEncrypt(node.tagId, KEY)}_${customEncrypt(cardID, KEY)}`);
                        break;

                    } else{
                        sendRedirect(event, `/verification/${customEncrypt(cardID, KEY)}`);
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
        return `Error: Something went wrong: ${error}`;
    }
});

