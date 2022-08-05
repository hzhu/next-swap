import { createContext, useContext, useEffect, useState } from "react";
import Script from "next/script";
import "../styles/global.css";

export const ThemeContext = createContext(null);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('This component must be rendered within a <ThemeContext.Provider> component');
  }

  return context;
}

const useTheme = (themeCookie: "light" | "dark") => {
  const [theme, setTheme] = useState<string>(() => {
    return themeCookie;
  });

  useEffect(() => {
    if (themeCookie === null) {
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? setTheme("dark")
        : setTheme("light");
    }
  }, [themeCookie]);

  return [theme, setTheme];
};

const initialize = (themeCookie) => `
  if ("${themeCookie}" === "null") {
    const postTheme = theme => {
      fetch('/api/theme', { method: 'POST', body: JSON.stringify({ theme }) });
      document.documentElement.classList.add(theme);
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      postTheme('dark');
    } else {
      postTheme('light');
    }
  } else {
    document.documentElement.classList.add("${themeCookie}");
  }
`;

function App({ Component, pageProps }) {
  const { themeCookie } = pageProps;
  const [theme, setTheme] = useTheme(themeCookie);

  return (
    <>
      <Script id="theme-initialization">{initialize(themeCookie)}</Script>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Component {...pageProps} />
      </ThemeContext.Provider>
    </>
  );
}

export default App;
