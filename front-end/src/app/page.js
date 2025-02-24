'use client'

import Header from "./components/header";
import Link from "next/link";

export default function Home() {
  return (
    <div>
    <Header/>
    <div className="h-[85vh]">
      <div className="h-[90%]">
        <div className="flex flex-row justify-center items-center gap-12 h-full pl-4">
          <div className="flex flex-col text-center gap-2">
            <h1 className="text-4xl">Welcome to EigenCards</h1>
            <p>Collect, Play, and Earn real-money rewards!</p>
            <Link href = "/home"><button>Go to App</button></Link>
          </div>
          <img src="/img/placehold.png" alt="main-image" className="w-1/4 h-1/2" />
        </div>
      </div>
    </div>
    </div>
  );
}
