import tailwindColors from "tailwindcss/colors";

delete tailwindColors.lightBlue;
delete tailwindColors.warmGray;
delete tailwindColors.trueGray;
delete tailwindColors.coolGray;
delete tailwindColors.blueGray;

export const colors = Object.keys(tailwindColors).reduce((acc, curr) => {
  const key = curr;
  const value = tailwindColors[key];

  if (typeof value === "object") {
    const flattenedTailwindColors = {};
    Object.keys(value).forEach((unit) => {
      flattenedTailwindColors[`${key}-${unit}`] = value[unit];
    });
    return { ...acc, ...flattenedTailwindColors };
  } else {
    return { ...acc, [key]: value };
  }
}, {});
