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




export default function Home() {
	const router = useRouter();
		const { address, isConnected, caipAddress, status, embeddedWalletInfo } = useAppKitAccount();

		const [NFT, setNFT] = useState("/img/placehold.png");
		const [username, setUsername] = useState("");

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
			<div className="h-full">
				<Profile src={NFT} username={username} level={3} />
				<div className="flex justify-center w-full h-full">
					<div className="w-[80%] overflow-x-hidden">
						<div className="flex w-full justify-center items-center gap-x-8 gap-y-4 flex-wrap h-[80%]">
							{(Array(5).fill(0).map(() => <Card w={2} key={Math.random()} name="test" xp={5} />))}


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
