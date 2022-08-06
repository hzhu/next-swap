import Script from "next/script";
import { Html, Head, Main, NextScript } from "next/document";
import { sprinkles } from "../styles/sprinkles.css";
import { initialize } from "../lib/color-scheme";
import "../styles/global.css";

const className = sprinkles({
  color: {
    darkMode: "blue-100",
    lightMode: "blue-900",
  },
  background: {
    darkMode: "slate-800",
    lightMode: "slate-100",
  },
});

export default function Document(DocumentContext) {
  const { __NEXT_DATA__ } = DocumentContext;
  const { props } = __NEXT_DATA__;
  const { pageProps } = props;
  const { colorSchemeCookie } = pageProps;

  return (
    <Html className={className}>
      <Head>
        <Script id="color-scheme-initialization" strategy="beforeInteractive">
          {initialize(colorSchemeCookie)}
        </Script>
      </Head>
      <body className={className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
