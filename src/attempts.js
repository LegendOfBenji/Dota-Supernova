// ATTEMPT #1
//
// document.addEventListener("DOMContentLoaded", () => {
//   // variables
//   const format = d3.format(",d");
//   let width = 800;
//   let height = 800;
//   let radius = Math.min(width, height) / 2;
//   let color = d3.scaleOrdinal(d3.schemeSpectral[5]);

//   let g = d3.select("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .append("g")
//     .attr("transform", `translate(${width / 2},${width / 2})`);

//   //.size indicates the circle, partition helps organize our data into the sunburst model
//   let partition = d3.partition()
//   .size([2 * Math.PI, radius]);

//   d3.json("./src/data.json").then((nodeData) => {
//     console.log(nodeData);
//   // if our data is already in a hierarchical pattern and has a root node then we can pass our data to d3.partition
//   // sum adds a value attribute to each node, the value here is the combined sum of d.size
//   let root = d3.hierarchy(nodeData)
//     .sum(d => d.size);
//     //partition root combines our data structure with our actual data
//     //d.x1 is the radian location for the end of the arc. If x0 and x1 are the same, our arc will be invisible.
//     //If x0 = 0 and x1 = 2, our arc will encompass a bit less than 1/3 of our circle.
//   partition(root)
//   let arc = d3.arc()
//     .startAngle(d => d.x0)
//     .endAngle(d => d.x1)
//     .innerRadius(d => d.y0)
//     .outerRadius(d => d.y1);

//   g.selectAll("g")
//     .data(root.descendants())
//     .enter()
//     .append("g").attr("class", "node").append("path")
//     .attr("display", d => (d.depth ? null : "none"))
//     .attr("d", arc)
//     .style("stroke", "fff")
//     .style("fill", function(d) {
//       return color((d.children ? d : d.parent).data.name);
//     });

//   g.selectAll('node')
//     .append('text')
//     .attr('transform', d => "translate(" + arc.centroid(d) + ")rotate(" + computeTextRotation(d) + ")")
//     .attr('dx', '-20')
//     .attr('dy', '.5em')
//     .text(d => d.parent ? d.data.name :  "" )
//   });
// });

// const computeTextRotation = d => {
//   let angle = (d.x0 + d.x1) / Math.PI * 90;

//     // Avoid upside-down labels
//     return (angle < 120 || angle > 270) ? angle : angle + 180;  // labels as rims
//     //return (angle < 180) ? angle - 90 : angle + 90;  // labels as spokes
// }

// ATTEMPT #2
//
// document.addEventListener("DOMContentLoaded", () => {
// const format = d3.format(",d");
// const width = 800;
// const height = 800;
// const radius = width / 6;

// const arc = d3.arc()
//   .startAngle(d => d.x0)
//   .endAngle(d => d.x1)
//   .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
//   .padRadius(radius * 1.5)
//   .innerRadius(d => d.y0 * radius)
//   .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1));

// const partition = data => {
//   const root = d3
//     .hierarchy(data)
//     .sum(d => d.value)
//     .sort((a, b) => b.value - a.value);
//   return d3.partition().value([2 * Math.PI, root.height + 1])(root);
// };

// d3.json("./src/data.json").then(data => {
//   console.log(data);
//   const root = partition(data);
//   const color = d3.scaleOrdinal()
//     .range(d3.quantize(d3.interpolateRainbow, data.children.length + 1));

//   root.each(d => (d.current = d));

//   const svg = d3.select("svg")
//     .style("width", width)
//     .style("height", height);

//   const g = svg.append("g")
//     .attr("transform", `translate(${width / 2},${width / 2})`);

//   const path = g.append("g")
//     .selectAll("path")
//     .data(root.descendants().slice(1))
//     .join("path")
//     .attr("fill", d => {
//       while (d.depth > 1) d = d.parent;
//       return color(d.data.name);
//     })
//     .attr("fill-opacity", d =>
//       arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0
//     )
//     .attr("d", d => arc(d.current));

//   path.filter(d => d.children)
//     .style("cursor", "pointer")
//     .on("click", clicked);

//   path.append("title").text(
//     d => `${d
//         .ancestors()
//         .map(d => d.data.name)
//         .reverse()
//         .join("/")}\n${format(d.value)}`
//   );

//   const label = g.append("g")
//     .attr("pointer-events", "none")
//     .attr("text-anchor", "mid")
//     .style("user-select", "none")
//     .selectAll("text")
//     .data(root.descendants().slice(1))
//     .join("text")
//     .attr("dy", "0.35em")
//     .attr("fill-opacity", d => +labelVisible(d.current))
//     .attr("transform", d => labelTransform(d.current))
//     .text(d => d.data.name);

//   const parent = g.append("circle")
//     .datum(root)
//     .attr("r", radius)
//     .attr("fill", "none")
//     .attr("pointer-events", "all")
//     .on("click", clicked);

//   function clicked(p) {
//     parent.datum(p.parent || root);

//     root.each(
//       d =>
//         (d.target = {
//           x0:
//             Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) *
//             2 *
//             Math.PI,
//           x1:
//             Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) *
//             2 *
//             Math.PI,
//           y0: Math.max(0, d.y0 - p.depth),
//           y1: Math.max(0, d.y1 - p.depth)
//         })
//     );

//     const t = g.transition().duration(750);

//     // Transition the data on all arcs, even the ones that aren’t visible,
//     // so that if this transition is interrupted, entering arcs will start
//     // the next transition from the desired position.
//     path
//       .transition(t)
//       .tween("data", d => {
//         const i = d3.interpolate(d.current, d.target);
//         return t => (d.current = i(t));
//       })
//       .filter(function(d) {
//         return +this.getAttribute("fill-opacity") || arcVisible(d.target);
//       })
//       .attr("fill-opacity", d =>
//         arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0
//       )
//       .attrTween("d", d => () => arc(d.current));

//     label
//       .filter(function(d) {
//         return +this.getAttribute("fill-opacity") || labelVisible(d.target);
//       })
//       .transition(t)
//       .attr("fill-opacity", d => +labelVisible(d.target))
//       .attrTween("transform", d => () => labelTransform(d.current));
//   }

//   function arcVisible(d) {
//     return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
//   }

//   function labelVisible(d) {
//     return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
//   }

//   function labelTransform(d) {
//     const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
//     const y = ((d.y0 + d.y1) / 2) * radius;
//     return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
//   }
// });

// })
