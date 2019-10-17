import * as d3 from "d3";

        const heroButton = d3
          .select("body")
          .append("button")
          .style("padding", "10px")
          .style("class", "heroes")
          .on("click", () => updateData("heroes"));

        const matchButton = d3
          .select("body")
          .append("button")
          .style("padding", "10px")
          .style("class", "matches")
          .on("click", () => updateData("matches"));

      function updateData(klass) {
        if (klass === "matches") {
          d3.json("./src/data.json").then(data => {
            console.log(data);
            data = d3.hierarchy(data);
            data.sum(d => d.value);

            svg.selectAll("g.slice").remove();

            const slice = svg
              .selectAll("g.slice")
              .data(partition(data).descendants());

            slice.exit().remove();

            const newSlice = slice
              .enter()
              .append("g")
              .attr("class", "slice")
              .on("click", d => {
                d3.event.stopPropagation();
                focusOn(d);
              }); // Reset zoom on canvas click

            let tooltip = d3
              .select("body")
              .append("div")
              .style("position", "absolute")
              .style("z-index", "10")
              .style("visibility", "hidden")
              .style("background", "#e6e6e6fc")
              .style("opacity", 0.8)
              .style("padding", "5px")
              .style("border-radius", "5px");

            let showTooltip = d => {
              tooltip.transition().duration(200);
              tooltip.text("value: " + d.data.value);
              if (d.data.value !== undefined) {
                return tooltip.style("visibility", "visible");
              }
            };

            let moveTooltip = d => {
              return tooltip
                .style("top", d3.event.pageY + 10 + "px")
                .style("left", d3.event.pageX - 80 + "px");
            };

            let hideTooltip = d => {
              return tooltip.style("visibility", "hidden");
            };

            newSlice
              .on("mouseover", showTooltip)
              .on("mousemove", moveTooltip)
              .on("mouseleave", hideTooltip);

            newSlice
              .append("path")
              .attr("class", "main-arc")
              .style("fill", d => color((d.children ? d : d.parent).data.name))
              .attr("d", arc);

            newSlice
              .append("path")
              .attr("class", "hidden-arc")
              .attr("id", (_, i) => `hiddenArc${i}`)
              .attr("d", midArc);

            //append the text, if it doesn't fit then don't display
            const text = newSlice
              .append("text")
              .attr("display", d => (textFits(d) ? d.data : "none"));

            // Add white contour
            text
              .append("textPath")
              .attr("startOffset", "40%")
              .attr("xlink:href", (_, i) => `#hiddenArc${i}`)
              .text(d => d.data.name)
              .style("fill", "none")
              .style("stroke", "white")
              .style("stroke-width", 4)
              .style("stroke-linejoin", "round");

            text
              .append("textPath")
              .attr("startOffset", "40%")
              .attr("xlink:href", (_, i) => `#hiddenArc${i}`)
              .text(d => d.data.name);
          });

          const focusOn = (d = { x0: 0, x1: 1, y0: 0, y1: 1 }) => {
            const transition = svg
              .transition()
              .duration(750)
              .tween("scale", () => {
                const xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                  yd = d3.interpolate(y.domain(), [d.y0, 1]);
                return t => {
                  x.domain(xd(t));
                  y.domain(yd(t));
                };
              });

            transition
              .selectAll("path.main-arc")
              .attrTween("d", d => () => arc(d));

            transition
              .selectAll("path.hidden-arc")
              .attrTween("d", d => () => midArc(d));

            //allows all the text that fits to show after each transition
            transition
              .selectAll("text")
              .attrTween("display", d => () => (textFits(d) ? null : "none"));

            moveToFront();

            function moveToFront() {
              svg.selectAll(".slice");
            }
          };
        } else if (klass === "heroes") {
          d3.json("./src/heroes.json").then(data => {
            console.log(data);
            data = d3.hierarchy(data);
            data.sum(d => d.value);

            svg.selectAll("g.slice").remove();

            const slice = svg
              .selectAll("g.slice")
              .data(partition(data).descendants());

            slice.exit().remove();

            const newSlice = slice
              .enter()
              .append("g")
              .attr("class", "slice")
              .on("click", d => {
                d3.event.stopPropagation();
                focusOn(d);
              }); // Reset zoom on canvas click

            let tooltip = d3
              .select("body")
              .append("div")
              .style("position", "absolute")
              .style("z-index", "10")
              .style("visibility", "hidden")
              .style("background", "#e6e6e6fc")
              .style("opacity", 0.8)
              .style("padding", "5px")
              .style("border-radius", "5px");

            let showTooltip = d => {
              tooltip.transition().duration(200);
              tooltip.text("value: " + d.data.value);
              if (d.data.value !== undefined) {
                return tooltip.style("visibility", "visible");
              }
            };

            let moveTooltip = d => {
              return tooltip
                .style("top", d3.event.pageY + 10 + "px")
                .style("left", d3.event.pageX - 80 + "px");
            };

            let hideTooltip = d => {
              return tooltip.style("visibility", "hidden");
            };

            newSlice
              .on("mouseover", showTooltip)
              .on("mousemove", moveTooltip)
              .on("mouseleave", hideTooltip);

            newSlice
              .append("path")
              .attr("class", "main-arc")
              .style("fill", d => color((d.children ? d : d.parent).data.name))
              .attr("d", arc);

            newSlice
              .append("path")
              .attr("class", "hidden-arc")
              .attr("id", (_, i) => `hiddenArc${i}`)
              .attr("d", midArc);

            //append the text, if it doesn't fit then don't display
            const text = newSlice
              .append("text")
              .attr("display", d => (textFits(d) ? d.data : "none"));

            // Add white contour
            text
              .append("textPath")
              .attr("startOffset", "40%")
              .attr("xlink:href", (_, i) => `#hiddenArc${i}`)
              .text(d => d.data.name)
              .style("fill", "none")
              .style("stroke", "white")
              .style("stroke-width", 4)
              .style("stroke-linejoin", "round");

            text
              .append("textPath")
              .attr("startOffset", "40%")
              .attr("xlink:href", (_, i) => `#hiddenArc${i}`)
              .text(d => d.data.name);
          });

          const focusOn = (d = { x0: 0, x1: 1, y0: 0, y1: 1 }) => {
            const transition = svg
              .transition()
              .duration(750)
              .tween("scale", () => {
                const xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                  yd = d3.interpolate(y.domain(), [d.y0, 1]);
                return t => {
                  x.domain(xd(t));
                  y.domain(yd(t));
                };
              });

            transition
              .selectAll("path.main-arc")
              .attrTween("d", d => () => arc(d));

            transition
              .selectAll("path.hidden-arc")
              .attrTween("d", d => () => midArc(d));

            //allows all the text that fits to show after each transition
            transition
              .selectAll("text")
              .attrTween("display", d => () => (textFits(d) ? null : "none"));

            moveToFront();

            function moveToFront() {
              svg.selectAll(".slice");
            }
          };
        }
      }