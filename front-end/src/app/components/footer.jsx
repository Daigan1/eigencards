'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faGamepad, faShop, faUser, faGrip } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Footer(props) {
	return (
		<div className="flex justify-center items-center gap-24 h-full text-2xl">
				<Link href = "/home"><FontAwesomeIcon icon={faHouse} /></Link>
				<Link href= "/collection"><FontAwesomeIcon icon={faGrip} /></Link>
				<Link href = "/play"><FontAwesomeIcon icon={faGamepad} /></Link>
				<Link href = "/shop"><FontAwesomeIcon icon={faShop} /></Link>
				<Link href = "/profile"><FontAwesomeIcon icon={faUser}/></Link>
			</div>
	
	);
}
