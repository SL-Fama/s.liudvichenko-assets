    // Initial data for the chart (X, Y coordinates)
    let dataPoints = [
        { x: 10, y: 150 },
        { x: 50, y: 120 },
        { x: 90, y: 140 },
        { x: 130, y: 110 },
        { x: 170, y: 160 }
    ];

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
    function addDataPoint(newPoint) {
        // Add new point and remove the first one to keep the chart moving
        dataPoints.push(newPoint);
        dataPoints.shift();
        updateChart();
    }

    // Simulate data changes
    setInterval(() => {
        const randomY = Math.floor(Math.random() * 100) + 100; // Random Y between 100-200
        const newPoint = { x: 170, y: randomY };
        addDataPoint(newPoint);
    }, 1000);
