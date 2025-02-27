'use client'



import axios from "axios";
import {
	ReactSketchCanvas
} from "react-sketch-canvas";

import { useRef, useState } from "react";
import { BlockPicker } from "react-color";
import { writeContract } from '@wagmi/core'
import { useAppKitAccount } from "@reown/appkit/react";
import { config } from "@/appkit/config";




export default function Welcome() {
	const [username, setUsername] = useState("");
	const canvasRef = useRef(null);
	const [strokeColor, setStrokeColor] = useState("#000000");
	const [eraseMode, setEraseMode] = useState(false);
	const [strokeWidth, setStrokeWidth] = useState(10);
	const [eraserWidth, setEraserWidth] = useState(10);
	const [colorPickerOpen, setColorPickerOpen] = useState(false);
	const { address, isConnected, caipAddress, status, embeddedWalletInfo } = useAppKitAccount()






	const handleStrokeColorChange = (color) => {
		setStrokeColor(color.hex);
		setColorPickerOpen(!colorPickerOpen)
	};

	const handleOpenColorPicker = (event) => {
		event.preventDefault();
		setColorPickerOpen(!colorPickerOpen);
	}


	const handleEraserClick = () => {
		setEraseMode(true);
		canvasRef.current?.eraseMode(true);
	};

	const handlePenClick = () => {
		setEraseMode(false);
		canvasRef.current?.eraseMode(false);
	};

	const handleStrokeWidthChange = (event) => {
		setStrokeWidth(+event.target.value);
	};

	const handleEraserWidthChange = (event) => {
		setEraserWidth(+event.target.value);
	};

	const handleUndoClick = () => {
		canvasRef.current?.undo();
	};

	const handleRedoClick = () => {
		canvasRef.current?.redo();
	};

	const handleClearClick = () => {
		canvasRef.current?.clearCanvas();
	};

	const handleResetClick = () => {
		canvasRef.current?.resetCanvas();
	};



	


	const uploadProfile = async () => {
		const profileBase64 = await canvasRef.current.exportImage("png");
		const res = await axios.post("/api/generate-user-profile", {
			username,
			profile: profileBase64
		}, {
			headers: { "content-type": "application/json" }
		});



		const data = await res.data;
		const abi = (await axios.get("/abi/generateUserProfile.json")).data.abi;
	
		if (res.status === 200) {
			const contractAddress = "0x49Bf0F1D90BC94f2C133b91D90695d489335338A";
	
		const write = await writeContract(config, {
			address: contractAddress,
			abi,
			functionName: 'mintNFT',
			args: [address, data.url],
		});


		console.log(write);

		



		}
		
		

	}

	const styles = {
		border: "0.0625rem solid #9c9c9c",
		borderRadius: "0.25rem",
		width: "30rem",
		height: "30rem"

	};


	return (
		<section>
			<div className="flex justify-center items-center h-full w-full">
				<div className="flex flex-col gap-4 text-center">
					<h1>WELCOME</h1>
					<div className="flex justify-between">
						<input className="z-[2]" type="color" value={strokeColor} onClick={handleOpenColorPicker} readOnly />
						<div className="absolute">


							<div className={`${colorPickerOpen ? "relative top-10 right-16" : "hidden"}`}>


								<BlockPicker
									color={strokeColor}
									onChangeComplete={handleStrokeColorChange}


								/>
							</div>
						</div>
						<button
							type="button"

							onClick={handleUndoClick}
						>
							Undo
						</button>
						<button
							type="button"

							onClick={handleRedoClick}
						>
							Redo
						</button>
						<button
							type="button"

							onClick={handleClearClick}
						>
							Clear
						</button>
						<button
							type="button"

							onClick={handleResetClick}
						>
							Reset
						</button>
					</div>
					<button
						type="button"

						disabled={!eraseMode}
						onClick={handlePenClick}
					>
						Pen
					</button>
					<input
						disabled={eraseMode}
						type="range"
						className="form-range"
						min="1"
						max="20"
						step="1"
						id="strokeWidth"
						value={strokeWidth}
						onChange={handleStrokeWidthChange}
					/>
					<button
						type="button"
						className="btn btn-sm btn-outline-primary"
						disabled={eraseMode}
						onClick={handleEraserClick}
					>
						Eraser
					</button>
					<input
						disabled={!eraseMode}
						type="range"
						className="form-range"
						min="1"
						max="20"
						step="1"
						id="eraserWidth"
						value={eraserWidth}
						onChange={handleEraserWidthChange}
					/>
					<div>
						<ReactSketchCanvas
							style={styles}
							strokeWidth={strokeWidth}
							eraserWidth={eraserWidth}
							ref={canvasRef}
							strokeColor={strokeColor}
						/>
						<p className="italic">Draw your profile picture!</p>
					</div>
					<input value={username} onChange={(event) => setUsername(event.target.value)} className="p-1" placeholder="Enter a username!" />
					<button onClick={uploadProfile} type="submit">Create Profile</button>
				</div>
			</div>
		</section>
	)

}
