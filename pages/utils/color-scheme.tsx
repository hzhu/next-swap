import { useState, useEffect, useContext, createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

type ColorScheme = "light" | "dark";

interface ColorSchemeContext {
  colorScheme: ColorScheme;
  setColorScheme: Dispatch<SetStateAction<ColorScheme>>;
}

export const ColorSchemeContext = createContext<ColorSchemeContext>(null);

/**
 * A hook that retrieves the color scheme context
 *
 * @returns The color scheme and a function to update the color scheme
 */
export const useColorSchemeContext = () => {
  const context = useContext(ColorSchemeContext);

  if (context === undefined) {
    throw new Error(
      "This component must be rendered within a <ColorSchemeContext.Provider> component"
    );
  }

  return context;
};

/**
 * A hook that manages an application's color scheme.
 *
 * @param initialValue - The initial color scheme value
 * @returns A state and state setter function for color scheme
 */
export const useColorScheme = (
  initialValue: ColorScheme
): [ColorScheme, Dispatch<SetStateAction<ColorScheme>>] => {
  const [colorScheme, setColorScheme] = useState(initialValue);

  useEffect(() => {
    if (initialValue === null) {
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? setColorScheme("dark")
        : setColorScheme("light");
    }
  }, [initialValue]);

  return [colorScheme, setColorScheme];
};

export const initialize = (colorSchemeCookie) => `
  if ("${colorSchemeCookie}" === "null") {
    const postColorScheme = colorScheme => {
      fetch('/api/color-scheme', { method: 'POST', body: JSON.stringify({ colorScheme }) });
      document.documentElement.classList.add(colorScheme);
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      postColorScheme('dark');
    } else {
      postColorScheme('light');
    }
  } else {
    document.documentElement.classList.add("${colorSchemeCookie}");
  }
`;
