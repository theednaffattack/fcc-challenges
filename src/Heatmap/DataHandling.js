import * as d3 from "d3";
import heatmap_data from "../data/heatmap_data.json";

const cast = d => {
  Object.keys(d).forEach(function(key) {
    if (!isNaN(+d[key])) d[key] = +d[key];
  });

  return d;
};

const preformat = d => {
  return { baseTemp: heatmap_data["baseTemperature"], ...d };
};

/*
export const loadAllData = (callback = () => {} ) => {
    const q = d3.queue()
    
    q.defer(d3.tsv, './data.tsv', cast)
     
     q.await((error, data)  =>{
        callback(data.map(preformat));
    })   
}
*/

//デモ用ランダムデータ生成ffunction

export const loadAllData = (callback = () => {}) => {
  // To fake up some quick data
  // var rnd = n => ~~(Math.random() * n);
  // var fakeData = d3.range(1995, 1999 + rnd(10)).map((d, i) => {
  //   return { 年: d, 値: rnd(1000) + 1 };
  // });
  callback(heatmap_data.monthlyVariance.map(preformat));
};
