'use client'

import Progress from "./progress";

export default function Card(props) {
	return (
		<div className = "h-[80%]">
			<div className="rounded-lg border border-white w-48 flex flex-col">
				<div className="flex pl-4 pr-4 pt-2 pb-2">
					<div>
						<p>{props.name}</p>
					</div>
					<div className="ml-auto mr-[5%]">
						{props.xp}
					</div>
				</div>
				<img className = "rounded-b-lg w-full" src = "/img/placehold.png"/>

			</div>
			<Progress />
		</div>
	);
}
