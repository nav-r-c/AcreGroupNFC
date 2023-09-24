import axios from "axios";
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, set } from "firebase/database";
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

const nodeName = "NFCCardDetails"

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const cardID = customDecrypt(query.cardID?.toString() as string, KEY).toString() as string;
	const phoneNumber = query.phoneNumber?.toString() as string;
	const verifCode = query.verifCode?.toString() as string;

    // console.log('Card', cardID)

	const currentDomain = event.req.headers.host
    const nodeRef = ref(database, nodeName)

	const resp = await axios.get(`http://${currentDomain}/api/userDetails/verify?phoneNumber=${phoneNumber}&verifCode=${verifCode}&cardID=${cardID}`)

    if (resp.data.message === "User Verified") {
        try {
            const snapshot = await get(nodeRef)
            const nodeData = snapshot.val()

            if (nodeData) {
                const foundNodeKey = Object.keys(nodeData).find((nodeId) => {return nodeId === cardID})

                if (foundNodeKey) {
                    const cardRef = ref(database, `${nodeName}/${foundNodeKey}`)

                    // console.log(cardRef)

                    await set(cardRef, {
                        tagId : verifCode
                    })

                    return {"message" : "User Verified and Tag Set", "data" : {"tagId": customEncrypt(resp.data.data.NFCID, KEY)}}
                }
                else {
                    return {"message" : "Card Not Found"}
                }
            }

        }
        catch (error) {
            console.log(`Error: ${error} `)
        }
    }
    else if (resp.data.message === "User Not Verified"){
        console.log(resp.data.data)
        console.log(phoneNumber)
        console.log(verifCode)
        console.log(cardID)
        return {"message" : "User Not Verified"}
    }
    else {
      return resp.data
    }

    
})