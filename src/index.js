import * as styles from './styles/index.scss';
import * as d3 from 'd3';

document.addEventListener("DOMContentLoaded", () => {
  const svg = d3
    .select("svg")
    .append("svg")
    .attr("width", 800)
    .attr("height", 800);

  const render = data => {
    svg.selectAll("rect");
  };

  d3.csv("./src/data.csv").then(data => {
    console.log(data);
    data.forEach(d => {
      d.population = +d.population * 1000;
    });
  });
})