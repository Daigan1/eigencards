'use client'

import Footer from "../components/footer";
import Card from "../components/card";
import Profile from "../components/profile";
import { parseEther } from 'viem'

import { readContract, writeContract } from '@wagmi/core';
import { useAppKitAccount } from "@reown/appkit/react";
import { config } from "@/appkit/config";



async function openCommon(event) {
	const res = (await axios.get("/abi/openCardPack.json"));
	const abi = res.data.abi;
	if (res.status === 200) {


		const contractAddress = process.env.NEXT_PUBLIC_OPEN_CARD_PACK_CONTRACT_ADDRESS;
		const write = await writeContract(config, {
			address: contractAddress,
			abi,
			functionName: 'mintCommon',
			args: [],
			value: parseEther('0.01'),
		});
		console.log(write);
	}
}


async function openEpic(event) {
	const res = (await axios.get("/abi/openCardPack.json"));
	const abi = res.data.abi;
	if (res.status === 200) {


		const contractAddress = process.env.NEXT_PUBLIC_OPEN_CARD_PACK_CONTRACT_ADDRESS;
		const write = await writeContract(config, {
			address: contractAddress,
			abi,
			functionName: 'mintEpic',
			args: [],
			value: parseEther('0.02'),
		});
		console.log(write);
	}
}

async function openLegendary(event) {
	const res = (await axios.get("/abi/openCardPack.json"));
	const abi = res.data.abi;
	if (res.status === 200) {


		const contractAddress = process.env.NEXT_PUBLIC_OPEN_CARD_PACK_CONTRACT_ADDRESS;
		const write = await writeContract(config, {
			address: contractAddress,
			abi,
			functionName: 'mintLegendary',
			args: [],
			value: parseEther('0.03'),
		});
		console.log(write);
	}
}

export default function Home() {
	return (
		<section>
			<div className="h-full">
				<div className="flex justify-center items-center flex-col gap-y-2">
					<div className="text-center">
						<h1>Shop</h1>
						<p>Buy a pack today!</p>
					</div>
					<div>
					</div>
				</div>
				<div className="flex justify-center h-full">

					<div className="w-[80%] overflow-x-hidden scrollbar-hide h-full">
						<div className="flex w-full justify-center items-center gap-x-8 gap-y-4 mt-10 flex-wrap mb-32 h-[80%]">
							<Card w="sm" onClick={openCommon} key={1} name="COMMON PACK" src="https://www.adobe.com/creativecloud/design/discover/media_1759aeca814e97fb08f737e0252a8650384680a07.png?width=750&format=png&optimize=medium" power="0.1 POLY" description="A common card pack. Open it and see what you get!!" xp={5} />
							<Card w="sm" key={2} onClick={openEpic} name="EPIC PACK" src="https://img.freepik.com/free-vector/pixel-art-mystical-background_52683-87349.jpg" power="0.2 POLY" description="A epic card pack. Open it and see what you get!!" xp={5} />
							<Card w="sm" key={3} onclick={openLegendary} name="LEGENDARY PACK" src="https://as1.ftcdn.net/v2/jpg/01/79/97/06/1000_F_179970625_W9rXJkr5Ia7lidDeNOTQlJ4gkisVn7G9.jpg" power="0.3 POLY" description="A legendary card pack. Open it and see what you get!!" xp={5} />
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
