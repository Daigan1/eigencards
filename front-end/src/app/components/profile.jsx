'use client'


export default function Profile(props) {
	return (
		<div className="flex h-[30%] justify-center items-center mt-[-2.5%]">
		
			<div className = "flex flex-col justify-center items-center gap-y-4">
					<p>Level {props.level}</p>
					<img className="w-[15%] h-[35%]" src="/img/placehold.png" />
					<p>Welcome Back: {props.username}</p>
					</div>
			
			</div>
	
	);
}
