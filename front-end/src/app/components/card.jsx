'use client'

import Progress from "./progress";
import Card3 from 'react-animated-3d-card'
import { Pixelify_Sans } from "next/font/google";
const pixelSans = Pixelify_Sans({
  variable: "--font-pixel-sans",
  subsets: ["latin"],
})

export default function Card(props) {
	return (
		<div className={`${props.w == "sm" ? "w-[15%]" : "w-[15%]"} h-full shrink-0 ${props.rotate ? "rotate-180" : ""}`}>
			<Card3>
				<div className={`rounded-lg h-full border-0 bg-gradient-to-r from-blue-300 via-purple-500 to-sky-300 flex flex-col flex-grow`}>
					
					{/* Title Section */}
					<p className={`text-center text-xl pt-2 pb-2 ${pixelSans.className}`}>{props.name.toUpperCase()} - {props.power}</p>
					
					{/* Image Section */}
					<div className="flex w-full justify-center flex-grow">
						<img className="border-black rounded-xl border-2 w-[80%]" src={props.src} />
					</div>

					{/* Description Section */}
					<div className="border-black rounded-xl border-2 m-4 flex-grow">
						<p className={`text-sm p-[5%] ${pixelSans.className}`}>
							{props.description}
						</p>
					</div>
					
				</div>
			</Card3>
		</div>
	);
}
