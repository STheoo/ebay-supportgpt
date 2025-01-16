import { DataAPIClient } from "@datastax/astra-db-ts";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import { OpenAI } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
//import { OpenAIEmbeddings } from "@langchain/openai";
import { OpenAI as openAIEmbeddings } from "openai";

import "dotenv/config";

console.log("Run seed successful!");
