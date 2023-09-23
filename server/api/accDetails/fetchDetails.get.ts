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
    const query = getQuery(event);

    try {
        const snapshot = await get(nodeRef);
        const nodeData = snapshot.val();

        // console.log((query.accName as string).split('+').join(' ').trim())

        if (nodeData) {
            
            let foundAcc = false;

            for (const nodeId of Object.keys(nodeData)) {
                if (nodeId === (query.accName as string).split('+').join(' ')) {
                    foundAcc = true
                    return {'message': 'Accommodation Found', 'data': nodeData[nodeId]}
                }
            }

            if (!foundAcc) {
                return {'message':"Accommodation Not Found"}
            }

        }
    }
    
    catch(error) {
        return {"message" : "An Error Occured", "data" : error}
    }

})