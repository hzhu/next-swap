import { sprinkles } from "../styles/sprinkles.css";

export const container = sprinkles({
  display: "flex",
  paddingX: "large",

  // Conditional sprinkles:
  flexDirection: {
    mobile: "column",
    desktop: "row",
  },
});
