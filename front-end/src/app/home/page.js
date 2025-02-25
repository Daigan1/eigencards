'use client'

import Footer from "../components/footer";
import Card from "../components/card";
import Profile from "../components/profile";

export default function Home() {
	return (
		<section>
			<div className="h-full">
				<Profile username="test" level={3} />
				<div className="flex w-full h-[70%] justify-center items-center gap-16">
					<Card name="test" xp={5} />
					<Card name="test" xp={5} />
					<Card name="test" xp={5} />
					<Card name="test" xp={5} />
				</div>
				<footer>
					<Footer />
				</footer>
			</div>
		</section>
	)

}
