// write your javascript code here.
// feel free to change the preset attributes as you see fit

const massportCarrierAllianceCsv = './data/MASSPORT_SSL_Alliance_By_Quarter.csv';

const seaIntelligenceCarrierScheduleReliabilityCsv = './data/20210129_-_Sea-Intelligence_GLP_Press_Release_Charts_-_January_2021_global_scheduled_reliability2.csv';

d3.csv(massportCarrierAllianceCsv, d3.autoType())
  .then(barChart);

function barChart(data){

  console.log('csv-data_massport_carriers: ', data)

  //https://observablehq.com/@d3/stacked-bar-chart
  // convert the data to series of carriers
  let series = d3.stack()
    // ignore column[0] as value is "quarter", column[1:n] values are alliance names
    .keys(data.columns.slice(1))
    (data)
    // .map(d => (d.forEach(v => v.key = d.key), d))

  console.log('series_massport_carriers: ', series)

  // https://observablehq.com/@d3/d3-scaleordinal
  let color = d3.scaleOrdinal(d3.schemeCategory10)

  let x = d3.scaleBand()
    .domain(data.map(d => d.quarter))
    .range([0, width])
    .padding([0.3])

  svg1.append("g")
    .attr("transform", `translate(${margin.left},${height + margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    // format x ticks
    // https://stackoverflow.com/questions/20947488/d3-grouped-bar-chart-how-to-rotate-the-text-of-x-axis-ticks
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    // .attr("transform", "rotate(-65)")
    .style("text-anchor", "end");

  // https://www.d3-graph-gallery.com/graph/custom_axis.html
  // X axis label
  svg1.append("text")
    .attr('class', 'axis-label')
    .attr("transform", `translate(${width/2},${height + margin.top + margin.bottom - 5})`)
    .text("Quarter");

  let y = d3.scaleLinear()
    .domain([0, 
      // Math.ceil(
        
        d3.max(series, d => d3.max(d, d => d[1])) 
      //   / 5) * 5
      ])
    .range([height , 0])

  svg1.append("g")
    .attr("transform", `translate(${margin.left},${margin.bottom})`)
    .call(d3.axisLeft(y));

  // Y axis label
  svg1.append("text")
    .attr('class', 'axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -(margin.top + (height - margin.top - margin.bottom)))
    .attr("y", margin.left/2)
    .text("Number of Individual Carriers");
  

        // ----------------
  // Create a tooltip
  //https://www.d3-graph-gallery.com/graph/barplot_stacked_basicWide.html
  //https://www.d3-graph-gallery.com/graph/barplot_stacked_hover.html
  // ----------------
  const tooltip = d3.select("#viz1")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")

  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function(d) {
    // console.log(tooltip.text(d))
    
    return tooltip.style("visibility", "visible");

    let subgroupName = d3.select(this.parentNode).datum().key;
    let subgroupValue = d.data[subgroupName];
    tooltip
        .html("subgroup: " + subgroupName + "<br>" + "Value: " + subgroupValue)
        .style("opacity", 1)
  }
  // const mousemove = function(d) {
  //   tooltip
  //     .style("left", (d3.pointer(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
  //     .style("top", (d3.pointer(this)[1]) + "px")
  // }
  // const mouseleave = function(d) {
  //   tooltip
  //     .style("opacity", 0)
  // }

  // Bars
  // https://observablehq.com/@d3/stacked-bar-chart
  svg1.append("g")
    .selectAll("g")
    .data(series)
    .join("g")
      .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("x", d => x(d.data.quarter) + margin.left)
      .attr("y", d => y(d[1]) + margin.bottom)
      .attr("height", d => y(d[0]) - y(d[1]) ) 
      .attr("width", x.bandwidth())
    // .on("mouseover", d => { 
    //     console.log(d.target);
    //     // console.log(d.target.__data__); 
    //     let count = d.target.__data__[1] - d.target.__data__[0]
    //     console.log(count)
    //     mouseover(count)})
    .on("mouseover", d => { 
      console.log(d.target);
      // console.log(d.target.__data__); 
      let count = d.target.__data__[1] - d.target.__data__[0]
      console.log(count)
      // mouseover(count)
      mouseover(d);
    })
    // .on("mousemove", mousemove(d))
    // .on("mouseleave", mouseleave)

  

  // https://observablehq.com/@d3/grouped-bar-chart
  // legend
  let legend = svg => {
    const g = svg
        .attr("transform", `translate(${width},${margin.bottom})`)
        .attr("text-anchor", "end")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
      .selectAll("g")
      .data(color.domain().slice().reverse())
      // .data(color.domain().sort((a, b) => b.length - a.length))
      .join("g")
        .attr("transform", (d, i) => `translate(${margin.top},${i * 10})`);

    g.append("rect")
        .attr("x", -9)
        .attr("width", 9)
        .attr("height", 10)
        .attr("fill", color);

    g.append("text")
        .attr("x", -10)
        .attr("y", 8)
        // .attr("dy", "0.35em")
        .text(d => d);
  }

  svg1.append("g")
    .call(legend);

  // Chart title
  // https://observablehq.com/@uwdata/introduction-to-d3
  svg1
    .append("text")
      .attr("transform", `translate(${(width + margin.left + margin.right)/2},20)`)
      .attr("text-anchor", "middle")
      .style("font-weight", 600)
      .html("MassPort Container Carriers by Alliance FY2014 - Present")
}


let parseDate = d3.timeParse('%m/%d/%Y');

d3.csv(seaIntelligenceCarrierScheduleReliabilityCsv, function(d) {
  return {
    date: parseDate(d.Month),
    reliability: +d.Reliability
  };
}).then(lineChart);


function lineChart(data){
  console.log(data);

  let maxDate  = d3.max(data, function(d){return d.date; });
  let minDate  = d3.min(data, function(d){return d.date; });
  let maxReliability = d3.max(data, function(d){return d.reliability;});
  
  console.log(maxDate, minDate, maxReliability);

  let xScale = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([0, width - margin.left - margin.right]);

  let yScale = d3.scaleLinear()
      .domain([0, maxReliability])
      .range([height - margin.bottom - margin.top, 0]);

  let xAxis = d3.axisBottom(xScale);
  svg2.append('g')
      .attr('class', 'x axis')
      .attr("transform", `translate(${margin.right + margin.left},${height - margin.bottom})`)      
      .call(xAxis);

  svg2.append("g")
    .selectAll("text")  
    .style("text-anchor", "end")
    .attr("transform", "rotate(-65)");

  // https://www.d3-graph-gallery.com/graph/custom_axis.html
  // X axis label
  svg2.append("text")
    .attr('class', 'axis-label')
    .attr("x", margin.left + (width - margin.left - margin.right) / 2)
    .attr("y", height + 50)
    .text("Month");

  let yAxis = d3.axisLeft(yScale);
  svg2.append('g')
      .attr('class', 'y axis')
      .attr("transform", `translate(${margin.right + margin.left},${margin.top})`)      
      .call(yAxis);

    // Y axis label
    svg2.append("text")
      .attr('class', 'axis-label')
      .attr('transform', 'rotate(-90)')
      .attr('x', -(margin.top + (height - margin.top - margin.bottom)))
      .attr('y', 20) // Relative to the y axis.
      .text("2020 Global Carrier Schedule Reliability");
      
  let line = d3.line()
      .x(function(d){return xScale(d.date);})    
      .y(function(d){return yScale(d.reliability);})

  svg2.append('path')
      .attr('d', line(data))
      .attr("transform", `translate(${margin.right + margin.left},${margin.top})`)      
      .attr("fill", "none")
      .attr("stroke", "steelblue")
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
