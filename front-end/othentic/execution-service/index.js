import fs from "node:fs/promises";


function getRandomInt(max) {
	return Math.floor(Math.random() * (max + 1));
}

const { ethers } = require("ethers");

// Replace with your RPC URL
const provider = new ethers.providers.JsonRpcProvider("https://rpc-amoy.polygon.technology/");

// Replace with your contract address and ABI
const contractAddress = "0xYourContractAddress";
const contractABI = [
  // Add the event you want to listen to
  "event YourEventName(address indexed sender, uint256 value)"
];

// Create contract instance
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// Listen for the event
contract.on("generateCommon", (sender, value) => {
  	run("common");
});

contract.on("generateEpic", (sender, value) => {
	run("epic");
});


contract.on("generateLegendary", (sender, value) => {
	run("legendary");
});




const run = async (type) => {
	const data = await fs.readFile(`../${type}.json`);
	data = JSON.parse(data);
	cardsChosen = [];

	const amountToGen = 5;


	for (let i = 0; i < amountToGen; i++) {
		let randomNumber = getRandomInt(data.length);
		cardsChosen.push(data[randomNumber]);
	}

	sendTask(cardsChosen);
}



async function sendTask(data, taskDefinitionId) {

	var wallet = new ethers.Wallet("0c1e2113211ebe9afce2658db7287ef59b2b1acccb5e3d137c0b94544ccd32d1");
	var performerAddress = wallet.address;

	data = ethers.hexlify(ethers.toUtf8Bytes(data));
	const message = ethers.AbiCoder.defaultAbiCoder().encode(["string", "bytes", "address", "uint16"], [data, performerAddress]);
	const messageHash = ethers.keccak256(message);
	const sig = wallet.signingKey.sign(messageHash).serialized;


	const jsonRpcBody = {
		jsonrpc: "2.0",
		method: "sendTask",
		params: [
			"",
			data,
			performerAddress,
			Math.random(),
			sig,
		]
	};
	try {
		const provider = new ethers.JsonRpcProvider(rpcBaseAddress);
		const response = await provider.send(jsonRpcBody.method, jsonRpcBody.params);
		console.log("API response:", response);
	} catch (error) {
		console.error("Error making API request:", error);
	}
}



run();