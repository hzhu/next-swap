import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import tailwindColors from "tailwindcss/colors";
import defaultConfig from "tailwindcss/defaultConfig";
import { getColors } from "./colors";
import defaultConfigStub from "tailwindcss/stubs/defaultConfig.stub";

// Compute Tailwind for Sprinkles to consume.
let { spacing, fontSize } = defaultConfig.theme;
spacing = spacing as Record<string, string>
fontSize = Object.keys(fontSize).reduce((acc, key) => ({ ...acc, [key]: fontSize[key][0]}), {});
const colors = getColors(tailwindColors);
const lineHeight = Object.keys(fontSize).reduce((acc, key) => ({ ...acc, [key]: fontSize[key][1].lineHeight}), {})
const maxWidth = defaultConfigStub.theme.maxWidth({
  theme: () => {},
  breakpoints: () => {}
})

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 768px)" },
    desktop: { "@media": "screen and (min-width: 1024px)" },
  },
  defaultCondition: "mobile",
  properties: {
    height: {
      "h-100": "100px",
    },
    maxWidth: maxWidth,
    display: ["none", "flex", "block", "inline"],
    flexDirection: ["row", "column"],
    justifyContent: [
      "stretch",
      "flex-start",
      "center",
      "flex-end",
      "space-around",
      "space-between",
    ],
    alignItems: ["stretch", "flex-start", "center", "flex-end"],
    padding: spacing,
    paddingTop: spacing,
    paddingBottom: spacing,
    paddingLeft: spacing,
    paddingRight: spacing,
    margin: spacing,
    marginTop: spacing,
    marginBottom: spacing,
    marginLeft: spacing,
    marginRight: spacing,
    fontSize: fontSize as Record<string, string>,
    lineHeight: lineHeight,
    // etc.
  },
  shorthands: {
    p: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
    m: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
    placeItems: ["justifyContent", "alignItems"],
    text: ["fontSize", "lineHeight"],
    "max-w": ["maxWidth"]
  },
});

const systemProperties = defineProperties({
  conditions: {
    none: {},
    lightMode: {
      selector: `.light &`,
    },
    darkMode: {
      selector: `.dark &`,
    },
  },
  defaultCondition: "none",
  properties: {
    color: colors,
    background: colors,
    borderColor: colors,
  },
  shorthands: {
    bg: ["background"],
  }
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  systemProperties
);

// It's a good idea to export the Sprinkles type too
export type Sprinkles = Parameters<typeof sprinkles>[0];