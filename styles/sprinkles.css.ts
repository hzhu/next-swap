import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import tailwindColors from "tailwindcss/colors";
import defaultConfig from "tailwindcss/defaultConfig";
import { colors } from "./colors";

// Compute Tailwind for Sprinkles to consume.
const { spacing, fontSize } = defaultConfig.theme;
const computed = {
  colors: colors(tailwindColors),
  space: spacing as Record<string, string>,
  fontSize: Object.keys(fontSize).reduce((acc, key) => ({ ...acc, [key]: fontSize[key][0]}), {}),
  lineHeight: Object.keys(fontSize).reduce((acc, key) => ({ ...acc, [key]: fontSize[key][1].lineHeight}), {})
}

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
    padding: computed.space,
    paddingTop: computed.space,
    paddingBottom: computed.space,
    paddingLeft: computed.space,
    paddingRight: computed.space,
    margin: computed.space,
    marginTop: computed.space,
    marginBottom: computed.space,
    marginLeft: computed.space,
    marginRight: computed.space,
    fontSize: computed.fontSize,
    lineHeight: computed.lineHeight,
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
  },
});

// const colorProperties = defineProperties({
//   conditions: {
//     lightMode: {},
//     darkMode: { "@media": "(prefers-color-scheme: dark)" },
//   },
//   defaultCondition: "lightMode",
//   properties: {
//     color: colors,
//     background: colors,
//     // etc.
//   },
// });

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
    color: computed.colors,
    background: computed.colors,
    // borderColor: colors,
  },
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  systemProperties
);

// It's a good idea to export the Sprinkles type too
export type Sprinkles = Parameters<typeof sprinkles>[0];