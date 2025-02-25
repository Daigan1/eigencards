'use client'

import Footer from "../components/footer";
import Card from "../components/card";
import Profile from "../components/profile";

export default function Welcome() {
	return (
		<section>
			<div className = "flex justify-center items-center h-full w-full">
				<div className="flex flex-col gap-4 text-center">
				<h1>WELCOME</h1>
					<div>
					<canvas id="profileDraw" className = "bg-white w-96 h-96"></canvas>
					<p className = "italic">Draw your profile picture!</p>
					</div>
				
			
					<input className = "p-1" placeholder="Enter a username!" />
					<button type="submit">Create Profile</button>
				</div>
			</div>
		</section>
	)

}
