import React, { useContext, useEffect } from "react";
import data from "../../data.json";
import * as d3 from "d3";
import classes from "./BarGraph.module.scss";
import { Button } from "@mui/material";
import bg from "../../assest/bg.png";
import { LoginContext } from "../../context/LoginContext";

const d = data.map((x) => {
  return x.value + (Math.random() * 10).toFixed(1);
});

const BarGraph = () => {
  const { setGraph } = useContext(LoginContext);

  useEffect(() => {
    const width = 600;
    const height = 500;
    const svg = d3
      .select("svg")
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible")
      .style("margin-top", "75px")
      .style("margin-left", "90px");

    const xScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([0, width])
      .padding(0.5);

    const yScale = d3.scaleLinear().domain([0, 10]).range([height, 0]);

    const xAxis = d3.axisBottom(xScale).tickFormat((i) => data[i].year);

    const yAxis = d3.axisLeft(yScale).tickFormat((d) => (d > 0 ? d + "k" : d));

    svg
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0, ${height})`)
      .attr("font-size", "1rem")
      .append("text")
      .attr("y", 50)
      .attr("x", width / 2)
      .attr("text-anchor", "end")
      .attr("fill", "black")
      .text("Year")
      .attr("font-size", "1.5rem");

    svg
      .append("g")
      .call(yAxis)
      .attr("font-size", "1rem")
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-2.8em")
      .attr("dx", -height / 2)
      .attr("text-anchor", "end")
      .attr("fill", "black")
      .text(`Stock Price ($) `)
      .attr("font-size", "1.5rem");

    // setting the svg data

    const barColor = (d) => {
      if (d > 6) {
        return "#24a91d";
      } else if (d > 3 && d < 7) {
        return "#ece53b";
      } else if (d < 4) {
        return "#ff4d4d";
      }
    };

    svg
      .append("g")
      .selectAll("rect")
      .data(d)
      .join("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d))
      .attr("title", (d) => d)
      .attr("class", "rect")
      .attr("height", (d) => yScale(0) - yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("fill", (d) => barColor(d));
  }, []);

  const logoutHandler = () => {
    setGraph(false);
    localStorage.removeItem("graph");
  };

  return (
    <div className={classes.graph}>
      <h2>
        Bar Chart of XYZ Product's per Year{" "}
        <Button variant="contained" onClick={logoutHandler}>
          Logout
        </Button>
      </h2>

      <img src={bg} alt="Bar Graph" className={classes.imgBg} />
      <div className={classes.barGraph}>
        <svg></svg>
      </div>
    </div>
  );
};

export default BarGraph;
