'use client'

import Progress from "./progress";

export default function Card(props) {
	return (
		<div className = {`${props.w == "sm" ? "w-16" : "w-64"} shrink-0`}>
			<div className={`rounded-lg border border-white flex flex-col`}>
			
						<p className = "text-center text-xl">{props.name}</p>	
			
				<img className = "rounded-b-lg" src = "/img/placehold.png"/>

			</div>
			<Progress />
		</div>
	);
}
