'use client'

import Header from "../components/header";
import Card from "../components/card";
import Profile from "../components/profile";

export default function Home() {
	return (
		<div>
			<Header />
				<Profile username="test" level={3} />
				<div className="flex w-full h-[70vh] justify-center items-center gap-16">
					<Card name="test" xp={5} />
					<Card name="test" xp={5} />
					<Card name="test" xp={5} />
					<Card name="test" xp={5} />
			</div>
		</div>
	);
}
