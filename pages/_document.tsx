import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
          <link rel="icon" href="./icon.ico" />
          <meta name="description" content="Kuu's website" />
          <meta property="og:site_name" content="Kuu's website" />
          <meta property="og:description" content="Kuu's website" />
          <meta property="og:title" content="Kuu's website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Kuu's website" />
          <meta name="twitter:description" content="Kuu's website" />
        </Head>
        <title>Kuurow | Homepage</title>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
