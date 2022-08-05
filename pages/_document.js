import { Html, Head, Main, NextScript } from "next/document";
import { sprinkles } from "../styles/sprinkles.css";
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

export default function Document() {
  return (
    <Html className={className}>
      <Head />
      <body className={className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
