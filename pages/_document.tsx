import BgCanvas from "@/components/BgCanvas";
import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="./icon.ico" />
          <meta name="description" content="Kuu's website" />
          <meta property="og:site_name" content="Kuu's website" />
          <meta property="og:description" content="Kuu's website" />
          <meta property="og:title" content="Kuu's website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Kuu's website" />
          <meta name="twitter:description" content="Kuu's website" />
          <script type="text/javascript" src="https://raw.githubusercontent.com/patriciogonzalezvivo/glslCanvas/9ed588a7a2d079db1bcc3d8badb8e7de64b75249/dist/GlslCanvas.js"></script>
        </Head>
        <title>Kuu's website | Homepage</title>
        <body className="bg-white bg-center bg-cover antialiased bg-fixed">
          <BgCanvas />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
