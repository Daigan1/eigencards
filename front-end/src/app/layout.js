

import { Geist, Geist_Mono, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/header";




import { headers, cookies } from "next/headers"; // added
import ContextProvider from '../appkit/provider'
import Unauthorized from "./unauthenticated/page";






const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const pixelSans = Pixelify_Sans({
  variable: "--font-pixel-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};




export default async function RootLayout({ children }) {

  const cookiesRaw = (await headers()).get('cookie');

  // const cookieStore = await cookies();
  // const store = cookieStore.get('wagmi.store');
  // const isConnected = (JSON.parse(store.value).state.current !== null);
  // console.log(JSON.parse(store.value).state)



  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pixelSans.variable} antialiased`}
      >


        <Header />
        {/* <ContextProvider cookies={cookiesRaw}>{isConnected ? children : <Unauthorized />}</ContextProvider> */}
        <ContextProvider cookies={cookiesRaw}>{ children }</ContextProvider>

      </body>
    </html>
  );
}
