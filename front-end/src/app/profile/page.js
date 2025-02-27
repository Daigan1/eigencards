'use client'
import { useEffect } from "react";
import Footer from "../components/footer";


import { useRef, useState } from "react";

import { readContract } from '@wagmi/core';
import { useAppKitAccount } from "@reown/appkit/react";
import { config } from "@/appkit/config";
import axios from "axios";




export default function Welcome() {

	const { address, isConnected, caipAddress, status, embeddedWalletInfo } = useAppKitAccount();
	const [NFT, setNFT] = useState("/img/placehold.png");
	const [username, setUsername] = useState("");

	useEffect(() => {

		const fetchData = async () => {



			const res = (await axios.get("/abi/generateUserProfile.json"));
			const abi = res.data.abi;

			if (res.status === 200) {
				const contractAddress = "0x49Bf0F1D90BC94f2C133b91D90695d489335338A";

				const read = await readContract(config, {
					address: contractAddress,
					abi,
					functionName: 'getProfileNFT',
					args: [address],
				});

			const jsonDataUrl = read.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
			const jsonData = (await axios.get(jsonDataUrl)).data;
			const imageUrl = jsonData.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
			console.log(jsonData)
			setNFT(imageUrl);
			setUsername(jsonData.name);
			}

	

		}

		fetchData();

	});


	return (
		<section>
			<div className="flex justify-center  h-full w-full">
				<div className="flex flex-col gap-16 text-center">
					<h1>PROFILE</h1>
					<div>
						<img src={NFT} className="w-96 h-96"/>
						<p className="italic">Welcome Back <span className = "text-xl font-bold">{username}</span></p>
					</div>

					<div className="flex flex-col gap-2">
						<input className="p-1" placeholder="Enter a new username!" />
						<button type="submit">Update Profile</button>
					</div>
				</div>
			</div>
			<footer>
				<Footer />
			</footer>
		</section>
	)

}
