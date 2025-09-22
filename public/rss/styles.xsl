<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"
                xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <style>
          @font-face {
  font-family: "Cormorant";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("/Cormorant-Bold.woff2") format("woff2");
}

@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url("/Inter-Light.woff2") format("woff2");
}

@font-face {
  font-family: "Inter";
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: url("/Inter-LightItalic.woff2") format("woff2");
}

html {
  --background-color: #fffaf0;
  --content-color: #4b2c20;
  --subcontent-color: #d8bba0;
  --link-color: #ff6347;
  --emphasis-color: #d2691e;
}

html.dark {
  --background-color: #2f2f2f;
  --content-color: #ffe4b5;
  --subcontent-color: #bfaf9d;
  --link-color: #ff4500;
  --emphasis-color: #ffa07a;

  .astro-code,
  .astro-code span {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
  }
}

html {
  background-color: var(--background-color);
  color: var(--content-color);

  a,
  button {
    color: var(--link-color);
  }

  h1,
  h2,
  h3,
  h4 {
    color: var(--emphasis-color);
    font-family:
      Cormorant, Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  }

  scroll-behavior: smooth;
  line-height: 1.7;
  font-size: 1.2rem;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    "Open Sans",
    "Helvetica Neue",
    sans-serif;
}

blockquote {
  letter-spacing: 1.5px;
  border-left: 4px solid var(--emphasis-color);
  padding-left: 1em;
  margin: 2em;
}

button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}
a:hover,
button:hover {
  opacity: 0.7;
}
button:disabled {
  color: var(--subcontent-color);
  cursor: not-allowed;
  opacity: 1;
}

body {
  margin: 0 auto;
            max-width: 728px;
}

* {
  box-sizing: border-box;
}

main {
  margin: 0 auto;
  width: 100%;
  max-width: 80ch;
  padding: 2.5em 1em 2em 1em;
}

h1 {
  font-size: 2.5em;
}

h2 {
  font-size: 2em;
}

h3 {
  font-size: 1.5em;
}

@media screen and (max-width: 768px) {
  html {
    font-size: 1rem;
  }
  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.5em;
  }

  h3 {
    font-size: 1.2em;
  }
}

pre {
  padding: 1em;
  border-radius: 1em;
  font-size: 0.8em;
}

section.list {
  align-items: center;
  justify-content: space-between;

  ul.list {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-evenly;
  }

  @media screen and (max-width: 768px) {
    ul.list {
      padding: 1em;
    }
  }
}

img {
  max-width: 100%;
  height: auto;
}

.hidden {
  display: none;
}
        </style>
        <title><xsl:value-of select="/rss/channel/title"/> Web Feed</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
      </head>
      <body >
        <nav >
          <p >
            <strong>This is a web feed,</strong> also known as an RSS feed. <strong>Subscribe</strong> by copying the URL from the address bar into your newsreader.
          </p>
          <p style="background-color: white; padding: 1em;">
            Visit <a href="https://aboutfeeds.com">About Feeds</a> to get started with newsreaders and subscribing. It’s free.
          </p>
        </nav>
        <div >
          <header >
            <h1 >
              <!-- https://commons.wikimedia.org/wiki/File:Feed-icon.svg -->
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="vertical-align: text-bottom; width: 1.2em; height: 1.2em;" class="pr-1" id="RSSicon" viewBox="0 0 256 256">
                <defs>
                  <linearGradient x1="0.085" y1="0.085" x2="0.915" y2="0.915" id="RSSg">
                    <stop  offset="0.0" stop-color="#E3702D"/><stop  offset="0.1071" stop-color="#EA7D31"/>
                    <stop  offset="0.3503" stop-color="#F69537"/><stop  offset="0.5" stop-color="#FB9E3A"/>
                    <stop  offset="0.7016" stop-color="#EA7C31"/><stop  offset="0.8866" stop-color="#DE642B"/>
                    <stop  offset="1.0" stop-color="#D95B29"/>
                  </linearGradient>
                </defs>
                <rect width="256" height="256" rx="55" ry="55" x="0"  y="0"  fill="#CC5D15"/>
                <rect width="246" height="246" rx="50" ry="50" x="5"  y="5"  fill="#F49C52"/>
                <rect width="236" height="236" rx="47" ry="47" x="10" y="10" fill="url(#RSSg)"/>
                <circle cx="68" cy="189" r="24" fill="#FFF"/>
                <path d="M160 213h-34a82 82 0 0 0 -82 -82v-34a116 116 0 0 1 116 116z" fill="#FFF"/>
                <path d="M184 213A140 140 0 0 0 44 73 V 38a175 175 0 0 1 175 175z" fill="#FFF"/>

              </svg>
              Web Feed Preview
            </h1>
            <h2><xsl:value-of select="/rss/channel/title"/></h2>
            <p><xsl:value-of select="/rss/channel/description"/></p>
            <a >
              <xsl:attribute name="href">
                <xsl:value-of select="/rss/channel/link"/>
              </xsl:attribute>
              Visit Website &#x2192;
            </a>
          </header>
          <h2>Recent Items</h2>
          <xsl:for-each select="/rss/channel/item">
            <div >
              <h3 >
                <a target="_blank">
                  <xsl:attribute name="href">
                    <xsl:value-of select="link"/>
                  </xsl:attribute>
                  <xsl:value-of select="title"/>
                </a>
              </h3>
              <small >
                Published: <xsl:value-of select="pubDate" />
              </small>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
