    const chartWidth = 400; // Total width of the chart in SVG coordinates
    const chartHeight = 300; // Height of the chart in SVG coordinates
    let dataPoints = []; // Will hold Y values for the chart (e.g., confirmed cases)

    // Function to calculate X positions and generate path string
    function generatePath(data) {
        const step = chartWidth / (data.length - 1); // Dynamic step size for X axis

        return data.map((point, index) => {
            const x = index * step;
            return index === 0 ? `M${x},${point.y}` : `L${x},${point.y}`;
        }).join(" ");
    }

    // Update the chart line
    function updateChart() {
        const line = document.getElementById("line");
        line.setAttribute("d", generatePath(dataPoints));
    }

    // Function to add new data points
    function addDataPoint(newY) {
        if (dataPoints.length >= 10) {
            // Keep a maximum of 10 data points (or adjust this limit as needed)
            dataPoints.shift();
        }
        dataPoints.push({ y: chartHeight - newY }); // Add new point and invert Y value (SVG Y axis goes downwards)
        updateChart();
    }

    // Function to fetch COVID-19 data from the API
    async function fetchCovidData() {
        try {
            const response = await fetch('https://api.covid19api.com/summary');
            const data = await response.json();

            // Use global data (for a specific country, change this part)
            const newConfirmedCases = data.Global.NewConfirmed;

            // Convert data to a scale that fits within the chart height
            const scaledY = (newConfirmedCases / 100000) * chartHeight; // Adjust the divisor based on expected range

            // Add the new data point to the chart
            addDataPoint(scaledY);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Poll the API for new data at regular intervals
    setInterval(fetchCovidData, 3000); // Fetch data every 3 seconds

    // Initialize the chart with an empty update
    updateChart();
