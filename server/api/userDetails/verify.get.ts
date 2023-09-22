import axios from "axios";
import customEncrypt from "~/composables/customEncrypt";


const KEY = process.env.ENCRYPT_KEY?.toString() as string;

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const phoneNumber = query.phoneNumber?.toString() as string;
    const verifCode = query.verifCode?.toString() as string;

	// console.log(tagId)
	const currentDomain = event.req.headers.host
	
	const resp = await axios.get(`http://${currentDomain}/api/userDetails/fetch?tagId=${customEncrypt(verifCode, KEY)}`)

	if (resp.data.message == "User Found") {
		if ((resp.data.data['Phone'] === phoneNumber) && (resp.data.data['NFCID'] == verifCode)) {
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