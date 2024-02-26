export const iframeCode = (down: string) => {
  return `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>title</title>
                </head>
                <body>
                    <a href="${down}" download>Download1</a>
                </body>
            </html>
            `;
};