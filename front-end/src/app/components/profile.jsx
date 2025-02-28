'use client'


export default function Profile(props) {
	return (
		<div className="flex h-[30%] justify-center items-center">
		
			<div className = "flex flex-col justify-center items-center">
					{/* <p>Level {props.level}</p> */}
					<img className="w-[50%] h-[75%]" src={props.src} />
					<p>Welcome Back: {props.username}</p>
					</div>
			
			</div>
	
	);
}
