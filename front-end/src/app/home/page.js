'use client'

import Footer from "../components/footer";
import Card from "../components/card";
import Profile from "../components/profile";

export default function Home() {
	return (
		<section>
			<div className = "h-full">
				<Profile username="test" level={3} />
				<div className="flex justify-center w-full h-full">
					<div className="w-[80%] overflow-x-hidden">
						<div className="flex w-full justify-center items-center gap-x-8 gap-y-4 mt-10 flex-wrap mb-32">
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
