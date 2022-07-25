import { createTheme } from "@vanilla-extract/css";
import { colors } from "./colors";

/**
 * Themes include values that are specific to a app's brand or design.
 * Typically, spacing scales are *not* part of a theme. Scaled units like
 * Tailwind's default spacing scale are expressive and can be used in
 * any system. Of course, you can create your own space scale. A scale
 * could be incorporated into a theme, but it's just generally not the thing
 * that varies across systems like typography, colors, etc.
 *
 * See: https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
 *
 * However, Tailwind has space scale in their default theme:
 * https://github.com/tailwindlabs/tailwindcss/blob/b8cda161dd0993083dcef1e2a03988c70be0ce93/src/public/default-theme.js
 * https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js#L6
 *
 * tldr; can shove spacing and stuff into a theme. but I prefer to create a "tailwind" via sprinkles.
 * I'll use themes in the event that I'm building a white label app. Or a design system that needs to adapt. E.g.
 * like Garden theme can be updated so that Lyft can use it.
 * 
 * P.S. a theme can consume tokens created with defineProperty...
 */
export const [themeA, vars] = createTheme({
  color: {
    brand: colors["green-800"],
  },
  font: {
    body: "arial",
  },
});

export const themeB = createTheme(vars, {
  color: {
    brand: "pink",
  },
  font: {
    body: "comic sans ms",
  },
});
