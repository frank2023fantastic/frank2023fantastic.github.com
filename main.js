// Load data from data.json
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Create SVG container
    const svg = d3.select('#chart')
      .append('svg')
      .attr('width', 800)
      .attr('height', 400);

    // Create scales
    const x = d3.scaleBand()
      .range([0, 800])
      .padding(0.1);
    const y = d3.scaleLinear()
      .range([400, 0]);

    // Set domains for scales
    x.domain(data.map(d => d.product));
    y.domain([0, d3.max(data, d => d.sales)]);

    // Create bars
    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.product))
      .attr('width', x.bandwidth())
      .attr('y', d => y(d.sales))
      .attr('height', d => 400 - y(d.sales));

    // Create x-axis
    svg.append('g')
      .attr('transform', 'translate(0, 400)')
      .call(d3.axisBottom(x));

    // Create y-axis
    svg.append('g')
      .call(d3.axisLeft(y));
  })
  .catch(error => {
    console.error('Error loading data:', error);
  });