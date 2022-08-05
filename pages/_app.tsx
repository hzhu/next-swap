import Script from "next/script";
import {
  initialize,
  useColorScheme,
  ColorSchemeContext,
} from "../lib/color-scheme";
import "../styles/global.css";

function App({ Component, pageProps }) {
  const { colorSchemeCookie } = pageProps;
  const [colorScheme, setColorScheme] = useColorScheme(colorSchemeCookie);

  return (
    <>
      <Script id="color-scheme-initialization">
        {initialize(colorSchemeCookie)}
      </Script>
      <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>
        <Component {...pageProps} />
      </ColorSchemeContext.Provider>
    </>
  );
}

export default App;
