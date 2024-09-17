    const chartWidth = 400; // Total width of the chart in SVG coordinates
    const chartHeight = 300; // Height of the chart in SVG coordinates
    let dataPoints = []; // Will hold Y values for the chart (e.g., confirmed cases)

    function generatePath(data) {
        const step = chartWidth / (data.length - 1); // Dynamic step size for X axis

        return data.map((point, index) => {
            const x = index * step;
            return index === 0 ? `M${x},${point.y}` : `L${x},${point.y}`;
        }).join(" ");
    }

    function updateChart() {
        const line = document.getElementById("line");
        if (line) {
            line.setAttribute("d", generatePath(dataPoints));
        } else {
            console.error("Line element not found");
        }
    }

    function addDataPoint(newY) {
        if (dataPoints.length >= 10) {
            dataPoints.shift(); // Keep a maximum of 10 data points
        }
        dataPoints.push({ y: chartHeight - newY }); // Add new point and invert Y value
        updateChart();
    }

    async function fetchCovidData() {
        try {
            const response = await fetch('https://api.covid19api.com/summary');
            const data = await response.json();
            
            console.log(data); // Log the entire response

            // Check if data.Global exists
            if (data.Global && data.Global.NewConfirmed) {
                const newConfirmedCases = data.Global.NewConfirmed;
                console.log('NewConfirmed:', newConfirmedCases); // Log the value
                
                const scaledY = (newConfirmedCases / 100000) * chartHeight; // Adjust divisor as needed
                addDataPoint(scaledY);
            } else {
                console.error("Unexpected data format:", data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Poll the API for new data at regular intervals
    setInterval(fetchCovidData, 3000); // Fetch data every 3 seconds

    // Initialize the chart with an empty update
    updateChart();
