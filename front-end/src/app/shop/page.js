'use client'

import Footer from "../components/footer";
import Card from "../components/card";
import Profile from "../components/profile";

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
				<div className="flex justify-center items-center">

					<div className="w-[80%] overflow-x-hidden">
						<div className="flex w-full justify-center items-center gap-x-8 gap-y-4 mt-10 flex-wrap mb-32">
							{(Array(3).fill(0).map(() => <Card w={2} key={Math.random()} name="test" xp={-1} />))}
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
