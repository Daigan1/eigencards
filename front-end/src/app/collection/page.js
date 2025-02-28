'use client'

import Footer from "../components/footer";
import Card from "../components/card";
import { readContract, writeContract } from '@wagmi/core';
import { useAppKitAccount } from "@reown/appkit/react";
import { config } from "@/appkit/config";
import { useState, useEffect } from "react";
import axios from "axios";




export default function Collection() {
	const { address, isConnected, caipAddress, status, embeddedWalletInfo } = useAppKitAccount();
	const [cards, setCards] = useState([]);


	useEffect(() => {


		const fetchData = async () => {
			const res = (await axios.get("/abi/openCardPack.json"));
			const abi = res.data.abi;
			try {

				if (res.status === 200) {
					const contractAddress = process.env.NEXT_PUBLIC_OPEN_CARD_PACK_CONTRACT_ADDRESS;

					try {

						let read = await readContract(config, {
							address: contractAddress,
							abi,
							functionName: 'getAllNFTS',
							args: [address],
						});

						read = JSON.parse(read);
						let cardTemp = [];

						read.forEach(async entry => {
							const jsonDataUrl = entry.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
							const jsonData = (await axios.get(jsonDataUrl)).data;
							jsonData.image = jsonData.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
							cardTemp.push(jsonData);
						});

						setCards(...cardTemp);
				

		
					}
						
					
					catch (err) {
						
						
					}
				}
			}
			catch {

			}


		}

		// fetchData();

	});



	return (
		<section>
			<div className="h-full">
				<div className="flex justify-center items-center flex-col gap-y-2">
					<div className="text-center">
						<h1>Your Collection</h1>
						<p>32 cards in collection</p>
					</div>
					<div>
						<p className="inline">Filter by: </p>
						<select>
							<option>Rarity</option>
						</select>
					</div>
				</div>

				<div className="flex justify-center items-center w-full h-full">
					<div className="w-[80%] h-[80%] overflow-scroll overflow-x-hidden mb-16 scrollbar-hide">
						<div className="flex w-full justify-center items-center gap-x-8 gap-y-4 mt-10 flex-wrap mb-10">
							{/* {cards.map((card, index) => {
								<Card w="sm" key={index} name={card.name} src={card.src} power={card.power} description={card.description} xp={5} />
							})} */}
							{(Array(100).fill(0).map(() => <Card w={2} key={Math.random()} name="Test" src="https://nftcalendar.io/storage/uploads/events/2024/2/q4fpUFVhIZShGTkxbLcvGLm9fx4cbhWoWj9I1Brl.webp" power={Math.floor(Math.random() * 30)} description="This is a test desc"  xp={5} />))}
					
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
