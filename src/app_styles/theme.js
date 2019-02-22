import { theme } from "rebass";

import palxColors from "./palxColors.json";

const grays = palxColors.gray.map((color, index) =>
  Object.assign({}, { ["gray" + index]: color })
);

const blues = palxColors.blue.map((color, index) =>
  Object.assign({}, { ["blue" + index]: color })
);

const indigos = palxColors.indigo.map((color, index) =>
  Object.assign({}, { ["indigo" + index]: color })
);

console.log("indigos");
console.log(indigos);
// const violets = palxColors.violet.map((color, index) =>
//   Object.assign({}, { ["violet" + index]: color })
// );

// const fuchsias = palxColors.fuchsia.map((color, index) =>
//   Object.assign({}, { ["fuchsia" + index]: color })
// );

// const pinks = palxColors.pink.map((color, index) =>
//   Object.assign({}, { ["pink" + index]: color })
// );

// const reds = palxColors.red.map((color, index) =>
//   Object.assign({}, { ["red" + index]: color })
// );

// const oranges = palxColors.orange.map((color, index) =>
//   Object.assign({}, { ["orange" + index]: color })
// );

// const yellows = palxColors.yellow.map((color, index) =>
//   Object.assign({}, { ["yellow" + index]: color })
// );

// const limes = palxColors.lime.map((color, index) =>
//   Object.assign({}, { ["lime" + index]: color })
// );

// const greens = palxColors.green.map((color, index) =>
//   Object.assign({}, { ["green" + index]: color })
// );

// const teals = palxColors.teal.map((color, index) =>
//   Object.assign({}, { ["teal" + index]: color })
// );

// const cyans = palxColors.cyan.map((color, index) =>
//   Object.assign({}, { ["cyan" + index]: color })
// );
// let colorKeys = [
//   // ...base,
//   ...black,
//   ...gray,
//   ...blue,
//   ...indigo,
//   ...violet,
//   ...fuschia,
//   ...pink,
//   ...red,
//   ...orange,
//   ...yellow,
//   ...lime,
//   ...green,
//   ...teal,
//   ...cyan
// ];

export const colors = {
  text: "#000e1a",
  black: palxColors.black,
  white: "#fff",
  blue: "#007ce0",
  navy: "#004175",
  gray: "#eee",
  darken: "rgba(0, 0, 0, 0.25)",
  fuchsia: "#ee00de",
  indigo: "#1000ee",
  violet: "#8700ee",
  pink: "#ee0067",
  red: "#ee1000",
  popPink: "#FF1C68",
  popGreen: "#14D790",
  popBlue: "#198FE3",
  popGray: "#E2E1E0"
};

export const fontSizes = [12, 14, 16, 24, 32, 48, 64, 96];

export default {
  ...theme,
  colors,
  fontSizes
};
