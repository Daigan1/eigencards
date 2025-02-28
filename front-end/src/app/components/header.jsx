'use client'


import { useAccountEffect } from 'wagmi'
import { config } from '@/appkit/config'
import { useRouter } from 'next/navigation'
import { useRef, useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation';



export default function Header() {



	const pathname = usePathname();
	const hasConnectedBefore = useRef(false);

	const router = useRouter();




	useAccountEffect({
		config,
		onConnect(data) {
			if (!hasConnectedBefore.current) {
				hasConnectedBefore.current = true;
				router.replace("/home");
			}
		},
		onDisconnect(data) {
			router.replace("/");
			hasConnectedBefore.current = false;
		},
	});



	return (
		<div className="block h-[10vh]">
			<div className="flex h-full items-center">
				<div className="ml-auto mr-[5%]" ><appkit-button /></div>
			</div>

		</div>
	);
}
