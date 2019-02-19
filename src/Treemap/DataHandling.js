import * as d3 from "d3";

const cast = d => {
  Object.keys(d).forEach(function(key) {
    if (!isNaN(+d[key])) d[key] = +d[key];
  });

  return d;
};

const preformat = d => d;

export const loadAllData = (callback = () => {}) => {
  const q = d3.queue();

  q.defer(d3.json, "./flare2.json");

  q.await((error, data) => {
    callback(data.map(preformat));
  });
};

// TODO: replace below with a `casual` function for better faking function

// export const loadAllData = (callback = () => {}) => {
//   var rnd = n => ~~(Math.random() * n);
//   var fakeData = d3.range(1995, 1999 + rnd(10)).map((d, i) => {
//     return { 年: d, 値: rnd(1000) + 1 };
//   });
//   callback(fakeData.map(preformat));
// };
