import { OpenAI } from "@langchain/openai";
import { OpenAI as openAIEmbeddings } from "openai";
import { streamText } from "ai";
import { DataAPIClient } from "@datastax/astra-db-ts";
import { openai } from "@ai-sdk/openai";

const { OPENAI_API_KEY, ASTRA_DB_NAMESPACE, ASTRA_DB_COLLECTION, ASTRA_DB_API_ENDPOINT, ASTRA_DB_APPLICATION_TOKEN } = process.env;

const openai_api = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

const openEmbedding = new openAIEmbeddings();

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);

const db = client.db(ASTRA_DB_API_ENDPOINT, {
    namespace: ASTRA_DB_NAMESPACE,
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const latestMessage = messages[messages?.length - 1]?.content;

        let docContext = "";

        const embedding = await openEmbedding.embeddings.create({
            model: "text-embedding-3-small",
            input: latestMessage,
            encoding_format: "float",
        });

        try {
            const collection = db.collection(ASTRA_DB_COLLECTION);
            const cursor = collection.find(null, {
                sort: {
                    $vector: embedding.data[0].embedding,
                },
                limit: 10,
            });

            const documents = await cursor.toArray();
            const docsMap = documents?.map((doc) => doc.text);

            docContext = JSON.stringify(docsMap);

            console.log(docContext);
        } catch (error) {
            console.error(error);
            docContext = "";
        }

        const template = {
            role: "system",
            content: `
                You are a customer support specialist for ebay. Use the below context to augment what you know about ebay frequently asked questions. The context will provide you with the most recent articles from the faq of ebay and documentation. If the context doesn't include the info you need, answer based on your existing knowledge and don't mention the source of your info or what the context does or doesn't include. Format responses using markdown where applicable and don't return images.

                -----------------------
                START CONTEXT
                ${docContext}
                END CONTEXT
                -----------------------
                QUESTION: ${latestMessage}
                -----------------------
            `,
        };

        const result = await streamText({
            model: openai("gpt-4o-mini"),
            messages: [template, ...messages],
        });

        return result.toDataStreamResponse();
    } catch (e) {
        throw e;
    }
}
