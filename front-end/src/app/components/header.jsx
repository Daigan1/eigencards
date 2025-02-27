'use client'


import { useAccountEffect } from 'wagmi'
import { config } from '@/appkit/config'
import { useRouter } from 'next/navigation'




export default function Header() {
	
	const router = useRouter()


	useAccountEffect({
		config,
		onConnect(data) {
	
		},
		onDisconnect() {
		  router.replace("/")
		},
	  })


	return (
		<div className="block h-[10vh]">
			<div className = "flex h-full items-center">
			<div className="ml-auto mr-[5%]" ><appkit-button/></div>
			</div>
		
		</div>
	);
}
