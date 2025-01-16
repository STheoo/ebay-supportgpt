"use client";
import Image from "next/image";
import ebayGptLogo from './assets/logo.png';
import { useChat } from "@ai-sdk/react";
import { Message } from 'ai';

const Home = () =>{

    return (
        <main>
            <Image
                src={ebayGptLogo}
                width="200"
                height="200"
                alt="eBayGPT Logo"
                className=""
            />
        </main>
    )

}

export default Home;