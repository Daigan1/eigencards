

import { PinataSDK } from "pinata-web3";
import fs from "node:fs/promises";


const pinata = new PinataSDK({
  pinataJwt: `${process.env.NEXT_PUBLIC_PINATA_JWT}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_PINTA_GATEWAY_URL}`
})


import { NextResponse } from "next/server";
import axios from "axios";


export async function POST(request) {
  try {
    const data = await request.json();

	const uploadImage = await pinata.upload.base64(data.profile.replace("data:image/png;base64,", "")).addMetadata({
    name: "file.png",
    mime_type: "image/png"
  })



	const uploadJSON = await pinata.upload.json({
			description: "A user profile NFT", 
			image: `ipfs://${uploadImage.IpfsHash}`, 
			name: data.username
	});

    return NextResponse.json({url: `ipfs://${uploadJSON.IpfsHash}`}, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}