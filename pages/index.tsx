import Head from "next/head";
import { container } from "./index.css";
import { useThemeContext } from "./_app";

/**
 * _app.ts needs to receive the http cookie, but it doesn't support GSSP.
 * In the upcoming major version, Next.js will support reading server props
 * thanks to the new Layout RFC. It'll work much more similar to Remix. 
 * In the mean time we must call GSSP and pass the http cookie on every page! 
 * See: https://github.com/vercel/next.js/discussions/10874
 */
export async function getServerSideProps({ req }) {
  const theme = req.cookies.theme || null;
  return {
    props: { themeCookie: theme },
  };
}

export default function Home() {
  const { theme, setTheme } = useThemeContext();

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
          checked={theme === "dark"}
          onChange={() => toggleTheme(theme, setTheme)}
        />
      </div>
    </div>
  );
}

function toggleTheme(theme, setTheme) {
  const updatedTheme = theme === "dark" ? "light" : "dark";
  setTheme(updatedTheme);
  fetch("/api/theme", {
    method: "POST",
    body: JSON.stringify({ theme: updatedTheme }),
  });
  document.documentElement.classList.remove(theme);
  theme === "dark"
    ? document.documentElement.classList.add("light")
    : document.documentElement.classList.add("dark");
}
