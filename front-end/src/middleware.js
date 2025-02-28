import { NextResponse } from 'next/server';

export function middleware(request) {

//   const store = request.cookies.get('wagmi.store');

//   // Ensure the cookie exists before parsing
//   if (!store || !store.value) {
//     return NextResponse.rewrite(new URL('/unauthenticated', request.url));
//   }

//   let isConnected = false;

//   try {
//     const parsedStore = JSON.parse(store.value);
//     isConnected = parsedStore?.state?.current !== null;
// 	console.log(isConnected)
//   } catch (error) {
//     console.error("Error parsing wagmi.store:", error);
//     return NextResponse.rewrite(new URL('/unauthenticated', request.url));
//   }

//   if (!isConnected && !request.nextUrl.pathname.startsWith('/unauthenticated')) {
//     return NextResponse.rewrite(new URL('/unauthenticated', request.url));
//   }
}