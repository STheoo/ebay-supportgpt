"use client";
import Image from "next/image";
import ebayGptLogo from "./assets/logo.png";
import { useChat } from "@ai-sdk/react";
import { Message } from 'ai';
import PromptSuggestionRow from "./components/PromptSuggestionRow";
import LoadingBubble from "./components/LoadingBubble";
import Bubble from "./components/Bubble";

const Home = () => {

    const { append, isLoading, messages, input, handleInputChange, handleSubmit } = useChat();

    const noMessages = !messages || messages.length === 0;

    const onPromptClick = (promptText: string) => {
        const msg: Message = {
            id: crypto.randomUUID(),
            content: promptText,
            role: "user",
        };
        append(msg);
    };

    return (
        <main className="main">
            {/* Logo */}
            <Image src={ebayGptLogo} width="200" height="200" alt="eBayGPT Logo" className="" />

            <section className={noMessages ? "" : "populated"}>
                {noMessages ? (
                    <>
                        <p className="starter-text">
                            The Ultimate place to get support for ebay! <br />
                            Ask ebayGPT anything about issues you come across using the ebay platform.
                            We hope you enjoy !
                        </p>
                        <br />
                        <PromptSuggestionRow onPromptClick={onPromptClick} />
                    </>
                ) : (
                    <>
                        {messages.map((message, index) => <Bubble key={`message-${index}`} message={message} />)}
                        {isLoading && <LoadingBubble />}
                    </>
                )}
            </section>
            <form onSubmit={handleSubmit}>
                <input type="text" name="" id="" className="question-box" onChange={handleInputChange} value={input} placeholder="Ask me something..." />
                <input type="submit" value="Send" />
            </form>
        </main>
    )
};

export default Home;
