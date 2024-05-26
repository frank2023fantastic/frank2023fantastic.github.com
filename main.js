let data = []; // Initialize an empty data array

// Function to update the visualization
function updateVisualization() {
  // Remove the previous SVG element, if it exists
  d3.select('#chart svg').remove();

  // Create SVG container
  const svg = d3.select('#chart')
    .append('svg')
    .attr('width', 1600)
    .attr('height', 800);

  // Create scales
  const x = d3.scaleBand()
    .range([0, 1200])
    .padding(0.1);
  const y = d3.scaleLinear()
    .range([500, 0]);

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
    .attr('height', d => 500 - y(d.sales));

  // Add labels to bars
  svg.selectAll('.label')
    .data(data)
    .enter().append('text')
    .attr('class', 'label')
    .attr('x', d => x(d.product) + x.bandwidth() / 2)
    .attr('y', d => y(d.sales) - 10)
    .text(d => d.sales);

  // Add product names under bars
  svg.selectAll('.product-name')
    .data(data)
    .enter().append('text')
    .attr('class', 'product-name')
    .attr('x', d => x(d.product) + x.bandwidth() / 2)
    .attr('y', 525)
    .text(d => d.product);

  // Create x-axis
  svg.append('g')
    .attr('transform', 'translate(0, 500)')
    .call(d3.axisBottom(x));

  // Create y-axis
  svg.append('g')
    .call(d3.axisLeft(y));
}

// Add event listener for form submission
const form = document.getElementById('data-form');
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form from submitting and reloading the page

  // Get form values
  const product = document.getElementById('product').value;
  const sales = parseInt(document.getElementById('sales').value);

  // Add new data to the array
  data.push({ product, sales });

  // Clear form inputs
  document.getElementById('product').value = '';
  document.getElementById('sales').value = '';

  // Update the visualization
  updateVisualization();
});

// Initial visualization with empty data
updateVisualization();