'use client'

import Footer from "../components/footer";
import Card from "../components/card";
import Profile from "../components/profile";



export default function Home() {
	return (
		<section>
			<div className="h-full">
				<div className="flex w-full h-full">
					<div className="w-full overflow-x-hidden flex h-full w-full justify-center items-center scrollbar-hide">
						<div className="flex flex-col h-full w-full justify-between items-center">
							<div className = "flex flex-col gap-4 items-center h-[30%] w-[70%]">
								<h1>total power: 90</h1>
								<div className="flex w-full justify-center gap-x-8 gap-y-4 flex-wrap h-[30%]">
									{(Array(5).fill(0).map(() => <Card w="sm" key={Math.random()} name="test" rotate={true} xp={-1} />))}
								</div>
							</div>
							<div className = "flex flex-col gap-4 items-center h-[30%] w-[70%]">
								<div className="flex w-full justify-center gap-x-8 gap-y-4 flex-wrap">
									{(Array(5).fill(0).map(() => <Card w="sm" key={Math.random()} name="test" xp={-1} />))}
								</div>
								<h1>total power: 67</h1>
							</div>
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
