'use client'

import Progress from "./progress";

export default function Card(props) {
	return (
		<div className = "h-[80%]">
			<div className="rounded-lg border border-white w-48 h-[80%]">
				<div className="flex p-4">
					<div>
						<p>{props.name}</p>
					</div>
					<div className="ml-auto mr-[5%]">
						{props.xp}
					</div>
				</div>

			</div>
			<Progress />
		</div>
	);
}
