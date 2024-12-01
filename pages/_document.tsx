import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Kuu's website" />
          <meta property="og:site_name" content="Kuu's website" />
          <meta property="og:description" content="Kuu's website" />
          <meta property="og:title" content="Kuu's website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Kuu's website" />
          <meta name="twitter:description" content="Kuu's website" />
        </Head>
        <body className="bg-custom bg-no-repeat bg-cover min-h-screen bg-center antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
