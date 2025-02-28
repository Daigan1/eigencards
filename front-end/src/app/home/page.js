'use client'

import Footer from "../components/footer";
import Card from "../components/card";
import Profile from "../components/profile";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { readContract } from '@wagmi/core';
import { config } from "@/appkit/config";
import { useAppKitAccount } from "@reown/appkit/react";

function getRandomInt(max) {
	return Math.floor(Math.random() * (max + 1));
}


export default function Home() {
	const router = useRouter();
	const { address, isConnected, caipAddress, status, embeddedWalletInfo } = useAppKitAccount();

	const [NFT, setNFT] = useState("/img/placehold.png");
	const [username, setUsername] = useState("");
	const [cards, setCards] = useState([]);

	useEffect(() => {


		const fetchData = async () => {



			let res = (await axios.get("/abi/generateUserProfile.json"));
			let abi = res.data.abi;
			try {


				if (res.status === 200) {
					const contractAddress = process.env.NEXT_PUBLIC_GENERATE_USER_PROFILE_CONTRACT_ADDRESS;

					try {


						const read = await readContract(config, {
							address: contractAddress,
							abi,
							functionName: 'getNFT',
							args: [address],
						});

						const jsonDataUrl = read.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
						const jsonData = (await axios.get(jsonDataUrl)).data;
						const imageUrl = jsonData.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
						console.log(jsonData)
						setNFT(imageUrl);
						setUsername(jsonData.name);
					}
					catch (err) {
						console.log(err)

					}
				}


			}
			catch (err) {
				console.log(err);
			}


			// res = (await axios.get("/abi/openCardPack.json"));
			// abi = res.data.abi;


			// if (res.status === 200) {
			// 	const contractAddress = process.env.NEXT_PUBLIC_OPEN_CARD_PACK_CONTRACT_ADDRESS;

			// 	try {

			// 		let read = await readContract(config, {
			// 			address: contractAddress,
			// 			abi,
			// 			functionName: 'getAllNFTS',
			// 			args: [address],
			// 		});

			// 		read = JSON.parse(read);
			// 		let cardTemp = [];

			// 		read.forEach(async entry => {
			// 			const jsonDataUrl = entry.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
			// 			const jsonData = (await axios.get(jsonDataUrl)).data;
			// 			jsonData.image = jsonData.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
			// 			cardTemp.push(jsonData);
			// 		});

			// 		const finalTempCards = [];

			// 		for (let i = 0; i < 5; i++) {
			// 			const card = cardTemp[randomRandomInt(cardTemp.length)];
			// 			finalTempCards.push(card);
			// 		}

			// 		setCards(...finalTempCards);



			// 	}


				// catch (err) {
					// let cardsDemo = [];
					// 	console.log(err);
					// 	for (let i=0; i<5; i++) {
					// 		cardsDemo.push({
					// 			name: "Card",
					// 			src: "https://preview.redd.it/wizard-cat-pixel-art-v0-fdd9mpjpyjud1.png?auto=webp&s=9c7d94513bb50d90133c385d5baed159ef958f80",
					// 			power: Math.round(Math.random() * 30),
					// 			description: "This is a demo, test, description"
					// 		})
					// 	}
					// 	console.log(cardsDemo);
					// setCards(cardsDemo);
					// console.log(err)

				// }




			// }
		}
		fetchData();

	});
	return (
		<section>
			<div className="h-full">
				<Profile src={NFT} username={username} level={3} />
				<div className="flex justify-center w-full h-full">
					<div className="w-[80%] overflow-x-hidden scrollbar-hide">
						<div className="flex w-full justify-center items-center gap-x-8 gap-y-4 flex-wrap h-[100%] mt-16 mb-16">
							{/* {cards.map((card, index) => {
								<Card w="sm" key={index} name={card.name} src={card.src} power={card.power} description={card.description} xp={5} />
							})} */}
							{(Array(5).fill(0).map(() => <Card w={2} key={Math.random()} name="Test" src="https://nftcalendar.io/storage/uploads/events/2024/2/q4fpUFVhIZShGTkxbLcvGLm9fx4cbhWoWj9I1Brl.webp" power={Math.floor(Math.random() * 30)} description="This is a test desc" xp={5} />))}


						</div>
					</div>
				</div>
				<footer>
					<Footer />
				</footer>
			</div>
		</section>
	)

}
