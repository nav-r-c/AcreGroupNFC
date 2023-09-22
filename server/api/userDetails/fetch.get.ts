import { initializeApp } from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";
import customDecrypt from "~/composables/customDecrypt";

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
const nodeName = "UserData";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const tagId = customDecrypt(query.tagId?.toString() as string, KEY).toString() as string;
    
    const nodeRef = ref(database, nodeName);

    try {
        const snapshot = await get(nodeRef);
        const nodeData = snapshot.val();

        if (nodeData) {
            let foundUser = false;

            for (const nodeId of Object.keys(nodeData)) {
                const node = nodeData[nodeId];

                // console.log(node.nfcID)
                // console.log(tagId)

                if (node && node.NFCID === tagId) {
                    foundUser = true;
                    return {"message" : 'User Found', "data" : node};
                }
            }
            if (!foundUser) {
                return { "message" : "User Not found"}
            }
        }
    }
    catch (error) {
        return `Error: Something went wrong: ${error}`
    }

})