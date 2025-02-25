'use client'

import Footer from "../components/footer";
import Card from "../components/card";
import Profile from "../components/profile";

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
						<p className = "inline">Filter by: </p>
						<select>
							 <option>Rarity</option>
						</select>
					</div>
				</div>

				<div className="flex w-full h-[70%] justify-center items-center gap-8 mt-10">
					<Card w={10} name="test" xp={5} />
					<Card w={10} name="test" xp={5} />
					<Card w={10} name="test" xp={5} />
					<Card w={10} name="test" xp={5} />
				</div>
				<footer>
					<Footer />
				</footer>
			</div>
		</section>
	)

}
