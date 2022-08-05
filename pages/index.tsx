import Head from "next/head";
import { container } from "./index.css";
import { useColorSchemeContext } from "./utils/color-scheme";

/**
 * _app.ts needs to receive the http cookie, but it doesn't support getServerSideProps (GSSP).
 * In the upcoming major version, Next.js will support reading server props thanks to the
 * new Layout RFC. It'll work much more similar to Remix. In the mean time we must call 
 * GSSP and pass the http cookie on every page.

* See: https://github.com/vercel/next.js/discussions/10874
 */
export async function getServerSideProps({ req }) {
  const colorScheme = req.cookies["color-scheme"] || null;
  return {
    props: { colorSchemeCookie: colorScheme },
  };
}

export default function Home() {
  const { colorScheme, setColorScheme } = useColorSchemeContext();

  return (
    <div>
      <Head>
        <title>Next Swap</title>
        <meta name="description" content="Swap tokens at the best prices." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={container}>
        <h1>Hello world!</h1>
      </div>
      <div>
        <label htmlFor="dark-toggle">Toggle Dark Mode</label>
        <input
          type="checkbox"
          id="dark-toggle"
          checked={colorScheme === "dark"}
          onChange={() => toggleColorScheme(colorScheme, setColorScheme)}
        />
      </div>
    </div>
  );
}

function toggleColorScheme(colorScheme, setColorScheme) {
  const nextColorScheme = colorScheme === "dark" ? "light" : "dark";
  setColorScheme(nextColorScheme);
  fetch("/api/color-scheme", {
    method: "POST",
    body: JSON.stringify({ colorScheme: nextColorScheme }),
  });
  document.documentElement.classList.remove(colorScheme);
  colorScheme === "dark"
    ? document.documentElement.classList.add("light")
    : document.documentElement.classList.add("dark");
}
