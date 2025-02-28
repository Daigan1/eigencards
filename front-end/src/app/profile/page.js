'use client'
import { useEffect } from "react";
import Footer from "../components/footer";


import { useRef, useState } from "react";

import { readContract, writeContract } from '@wagmi/core';
import { useAppKitAccount } from "@reown/appkit/react";
import { config } from "@/appkit/config";
import axios from "axios";
import { useRouter } from "next/navigation";




export default function Welcome() {


	const { address, isConnected, caipAddress, status, embeddedWalletInfo } = useAppKitAccount();
	const [NFT, setNFT] = useState("/img/placehold.png");
	const [username, setUsername] = useState("");

	const router = useRouter();



	async function handleProfileDelete(event) {
		try {

			const res = (await axios.get("/abi/generateUserProfile.json"));
			const abi = res.data.abi;

			if (res.status === 200) {
				const contractAddress = process.env.NEXT_PUBLIC_GENERATE_USER_PROFILE_CONTRACT_ADDRESS;

				try {

					const write = await writeContract(config, {
						address: contractAddress,
						abi,
						functionName: 'deleteOwnNFT',
						args: [],
					});

					console.log(write);
					router.replace("/welcome");
				}
				catch (err) {
					console.log(err)

				}
			}
		}
		catch {

		}
	}

	useEffect(() => {


		const fetchData = async () => {



			const res = (await axios.get("/abi/generateUserProfile.json"));
			const abi = res.data.abi;
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
						router.replace("/welcome");
					}
				}
			}
			catch {

			}




		}

		fetchData();

	});




	return (
		<section>
			<div className="flex justify-center  h-full w-full">
				<div className="flex flex-col gap-16 text-center">
					<h1>PROFILE</h1>
					<div className="flex flex-col gap-8">
						<div>


							<img src={NFT} className="w-96 h-96" />
							<p className="italic">Welcome Back <span className="text-xl font-bold">{username}</span></p>
						</div>
						<button className="text-2xl" onClick={handleProfileDelete} type="submit">Delete Profile</button>
					</div>


				</div>
			</div>
			<footer>
				<Footer />
			</footer>
		</section>
	)

}
