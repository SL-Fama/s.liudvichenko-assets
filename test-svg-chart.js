    // Initial data for the chart (X, Y coordinates)
    let dataPoints = [
        { x: 10, y: 150 },
        { x: 50, y: 120 },
        { x: 90, y: 140 },
        { x: 130, y: 110 },
        { x: 170, y: 160 }
    ];

    const chartWidth = 170; // Width of the chart in SVG coordinates
    const step = 40; // Step size for the X axis (distance between points)

    // Function to generate path string from data points
    function generatePath(data) {
        return data.map((point, index) => {
            return index === 0 ? `M${point.x},${point.y}` : `L${point.x},${point.y}`;
        }).join(" ");
    }

    // Update the chart line
    function updateChart() {
        const line = document.getElementById("line");
        line.setAttribute("d", generatePath(dataPoints));
    }

    // Function to simulate adding new data points and update the chart
    function addDataPoint(newY) {
        // Shift all points to the left
        dataPoints.forEach(point => {
            point.x -= step;
        });

        // Add new point at the end, but keep it within the chart bounds
        dataPoints.push({ x: chartWidth, y: newY });

        // Remove the first point to keep the chart moving
        dataPoints.shift();
        updateChart();
    }

    // Simulate data changes
    setInterval(() => {
        const randomY = Math.floor(Math.random() * 100) + 100; // Random Y between 100-200
        addDataPoint(randomY);
    }, 1000);
