import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Before first paint: hide the intro splash if seen this session, and
              flag Chromium/Blink (which composites large gradient layers poorly)
              so the CSS can freeze the background animation there — Firefox keeps it. */}
          <script
            dangerouslySetInnerHTML={{
              __html:
                "try{if(sessionStorage.getItem('kuurow:seen-intro'))document.documentElement.classList.add('intro-seen')}catch(e){}" +
                "try{if(navigator.userAgentData||(/Chrome|Chromium|CriOS/.test(navigator.userAgent)&&!/Firefox|FxiOS/.test(navigator.userAgent)))document.documentElement.classList.add('is-chromium')}catch(e){}",
            }}
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=JetBrains+Mono:wght@400;500&family=Archivo+Expanded:wght@400;600;700&display=swap" rel="stylesheet" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
