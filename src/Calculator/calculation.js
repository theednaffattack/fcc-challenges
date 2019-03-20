// constants
// const PRESS_NUM = "PRESS_NUM";
export const ENTER = "ENTER";
// const OPERATION = "OPERATION";
// const CLEAR = "CLEAR";
// const SWAP = "SWAP";
// const TOGGLE_NEGATIVE = "TOGGLE_NEGATIVE";

// const numVals = {
//   "1": 1,
//   "2": 2,
//   "3": 3,
//   "4": 4,
//   "5": 5,
//   "6": 6,
//   "7": 7,
//   "8": 8,
//   "9": 9,
//   "0": 0
// };

export const operators = ["+", "-", "/", "*", "x"];

// export const initialState = { stack: ["0", "0", "0"], inputState: "replace" };
export const initialState = { window: "0", inputState: "replace" };
// button press states: inputState = append | replace | push

// local functions
// const doOperation = (x, y, op) => {
//   const a = parseFloat(x);
//   const b = parseFloat(y);
//   if (op === "power") {
//     return b ** a;
//   }
//   if (op === "+") {
//     return b + a;
//   }
//   if (op === "-") {
//     return b - a;
//   }
//   if (op === "x") {
//     return b * a;
//   }
//   if (op === "/") {
//     return b / a;
//   }
//   return 0;
// };

export const switchNegative = num => {
  const coerceMe = -Number(num);
  return coerceMe;
};
