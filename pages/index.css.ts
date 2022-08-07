import { sprinkles } from "../styles/sprinkles.css";

export const container = sprinkles({
  display: "flex",
  px: "0",
  m: "0",
  text: "2xl",
  // Conditional sprinkles:
  flexDirection: {
    mobile: "column",
    desktop: "row",
  },
});
