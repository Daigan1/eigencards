'use client'

import Footer from "../components/footer";
import Card from "../components/card";


export default function Collection() {
	return (
		<section>
			<div className="h-full">
				<div className="flex justify-center items-center flex-col gap-y-2">
					<div className="text-center">
						<h1>Your Collection</h1>
						<p>32 cards in collection</p>
					</div>
					<div>
						<p className="inline">Filter by: </p>
						<select>
							<option>Rarity</option>
						</select>
					</div>
				</div>

				<div className="flex justify-center items-center w-full h-full">
					<div className="w-[80%] h-[80%] overflow-scroll overflow-x-hidden mb-16 scrollbar-hide">
						<div className="flex w-full justify-center items-center gap-x-8 gap-y-4 mt-10 flex-wrap mb-10">
							{(Array(100).fill(0).map(() => <Card w="sm" key={Math.random()} name="test" xp={5} />))}
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
