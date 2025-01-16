import "./global.css";

export const metadata = {
    title: "EBAY SUPPORT GPT",
    description: "Your on demand ebay support specialist!"
};

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>EBAY SUPPORT GPT</title>
            </head>
            <body>
                {children}
            </body>
        </html>
    )
};

export default RootLayout;