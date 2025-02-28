

import { PinataSDK } from "pinata-web3";
import fs from "node:fs/promises";



const pinata = new PinataSDK({
	pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhYjM4MjQ4MC02NjdlLTRjMWMtYTY1Mi1kZWI1ZTQ5ZTc0ZTAiLCJlbWFpbCI6ImRhaWdhbmJlcmdlckBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMWIxMzZlNTYyODEzYmQ2ZGJjZTIiLCJzY29wZWRLZXlTZWNyZXQiOiI3MWQ4M2Y2Y2JkN2JjNjQ0ZjdmODgxZDhiNDI5ZGRjOGYzZThiNmFhYzFkZWUyMDM4NDM2NTlhOTRhMDMyOTY1IiwiZXhwIjoxNzcyMTUxMzUwfQ.aDEI3ThNRZs_0Y9-aeD_aBPCxxr2Q1uuNvn-4JETVMU",
	pinataGateway: "bronze-hollow-vulture-413.mypinata.cloud"
})


const common = [];
const epic = [];
const legendary = [];

async function run() {

	let cards = await fs.readFile("./cards.json");
	cards = JSON.parse(cards);

	cards.common.forEach(async card => {
		setTimeout(async () => {


			const cardSRC = card.src;

			const uploadImage = await pinata.upload.url(cardSRC);

			card.src = `ipfs://${uploadImage.IpfsHash}`

			const upload2 = await pinata.upload.json(card);
			common.push(`ipfs://${upload2.IpfsHash}`);

		}, 5000);
	});

	// cards.epic.forEach(async card => {
	// 	setTimeout(async () => {


	// 		const cardSRC = card.src;

	// 		const uploadImage = await pinata.upload.url(cardSRC);

	// 		card.src = `ipfs://${uploadImage.IpfsHash}`

	// 		const upload2 = await pinata.upload.json(card);
	// 		epic.push(`ipfs://${upload2.IpfsHash}`);
	// 	}, 5000);
	// });

	// cards.legendary.forEach(async card => {
	// 	setTimeout(async () => {


	// 		const cardSRC = card.src;

	// 		const uploadImage = await pinata.upload.url(cardSRC);

	// 		card.src = `ipfs://${uploadImage.IpfsHash}`

	// 		const upload2 = await pinata.upload.json(card);
	// 		legendary.push(`ipfs://${upload2.IpfsHash}`);
	// 	}, 10000);
	// });



	await fs.writeFile("common.json", common);
	// await fs.writeFile("epic.json", epic);
	// await fs.writeFile("legendary.json", legendary);








}

run();