// write your javascript code here.
// feel free to change the preset attributes as you see fit

const massportCarrierAllianceCsv = 'data/MASSPORT_SSL_Alliance_By_Quarter.csv';

// d3.csv(massportCarrierAllianceCsv, function(d) {

//   return {
//     Carrier: d.Carrier,
//     Alliance: d.Alliance,
//     Quarter: d.Year + '-' + d.Quarter
//   };
// }).then(barChart);

d3.csv(massportCarrierAllianceCsv, d3.autoType())
  .then(barChart);

function barChart(data){

  console.log(data);

  //https://observablehq.com/@d3/stacked-bar-chart
  let series = d3.stack()
    .keys(data.columns.slice(1))
    (data)
    .map(d => (d.forEach(v => v.key = d.key), d))

  console.log(series)

  // https://observablehq.com/@d3/d3-scaleordinal
  let color = d3.scaleOrdinal(d3.schemeCategory10)

  // let xScale = d3.scaleTime()
  //     .domain([minDate, maxDate])
  //     .range([0, width]);

  // let yScale = d3.scaleLinear()
  //     .domain([0, maxCarriers])
  //     .range([height, 0]);


  let x = d3.scaleBand()
    .domain(data.map(d => d.quarter))
    .range([margin.left, width - margin.right])
    .padding(0.3)

  // let xAxis = d3.axisBottom(xScale);
  let xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    // .call(g => g.selectAll(".domain").remove())

  svg1.append('g')
      .attr('class', 'x axis')
      // .attr('transform', 'translate(0, ' + (height - margin.bottom - margin.top) + ')')
      .call(xAxis);

  // https://stackoverflow.com/questions/20947488/d3-grouped-bar-chart-how-to-rotate-the-text-of-x-axis-ticks
  // X axis ticks
  svg1.append("g")
    .call(xAxis)
    .selectAll("text")  
    .style("text-anchor", "end")
    // .attr("dx", "-.8em")
    // .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

  // https://www.d3-graph-gallery.com/graph/custom_axis.html
  // X axis label
  svg1.append("text")
    .attr('class', 'axis-label')
    .attr("x", margin.left + (width - margin.left - margin.right) / 2)
    .attr("y", height + 50)
    .text("Quarter");

  let y = d3.scaleLinear()
  .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
  .rangeRound([height - margin.bottom, margin.top])

  // let yAxis = d3.axisLeft(yScale);
  let yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    // .call(d3.axisLeft(y).ticks(null, "s"))
    .call(d3.axisLeft(y).tickSizeOuter(0))
    // .call(g => g.selectAll(".domain").remove())

  svg1.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(0, 0)')
      .call(yAxis);

  // Y axis ticks
  svg1.append("g")
    .call(yAxis);

  // Y axis label
  svg1.append("text")
    .attr('class', 'axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -(margin.top + (height - margin.top - margin.bottom)))
    .attr('y', 20) // Relative to the y axis.
    .text("Number of Individual Carriers");

  //Draw bars
  // let bar = svg1
  //   .selectAll('rect')
  //   .data(data)
  //   .enter()
  //   .append('rect')
  //     .attr('x', function(d) {
  //       return xScale(d.Quarter);
  //     })
  //     .attr('y', function(d) {
  //       return yScale(d.Carrier);
  //     })
  //     // .attr('width', xScale.bandwidth())
  //     .attr('fill', 'steelblue')
  //     .attr('height', function(d) {
  //       return height - margin.bottom - yScale(d.Carrier);
  //     });
  
  // https://observablehq.com/@d3/stacked-bar-chart
  svg1.append("g")
  .selectAll("g")
  .data(series)
  .join("g")
    .attr("fill", d => color(d.key))
  .selectAll("rect")
  .data(d => d)
  .join("rect")
    .attr("x", (d, i) => x(d.data.quarter))
    .attr("y", d => y(d[1]))
    .attr("height", d => y(d[0]) - y(d[1]))
    .attr("width", x.bandwidth())
    
  // svg1.append('path')
  //     .attr('d', bar(data))
  //     .attr('class', 'dataLine');
  // svg1.append(bar)

  // https://observablehq.com/@d3/grouped-bar-chart
  // legend
  let legend = svg => {
    const g = svg
        .attr("transform", `translate(${width},0)`)
        .attr("text-anchor", "end")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
      .selectAll("g")
      .data(color.domain().slice().reverse())
      .join("g")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);

    g.append("rect")
        .attr("x", -19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", color);

    g.append("text")
        .attr("x", -24)
        .attr("y", 9.5)
        .attr("dy", "0.35em")
        .text(d => d);
  }

  svg1.append("g")
    .call(legend);
}

let margin = {
    top: 60,
    left: 50,
    right: 30,
    bottom: 35
  },
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// first visualization
let svg1 = d3.select('#vis1')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', '#ccc') // change the background color to light gray
  .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

// second visualization
let svg2 = d3.select('#vis2')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', '#ccc') // change the background color to light gray
  .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))
