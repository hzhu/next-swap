export const colors = (tailwindColors) => Object.keys(tailwindColors).reduce((acc, curr) => {
  const deprecatedColors = [
    "lightBlue",
    "warmGray",
    "trueGray",
    "coolGray",
    "blueGray",
  ];

  if (deprecatedColors.includes(curr)) {
    return acc;
  }

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
