import { initializeApp } from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";

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
const nodeName = "AccommodationsData";

export default defineEventHandler(async (event) => {
    const nodeRef = ref(database, nodeName);

    try {
        const snapshot = await get(nodeRef);
        const nodeData = snapshot.val();

        let accs = [];

        if (nodeData) {
            for (const nodeId of Object.keys(nodeData)) {
                accs.push(nodeData[nodeId]);
            }

            return {"message" : "Accomodations Returned", "data" : accs}
        }
    }
    catch(error) {
        return {"message" : "An Error Occured", "data" : error}
    }

})