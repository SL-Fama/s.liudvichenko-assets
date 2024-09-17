    const chartWidth = 400; 
    const chartHeight = 300; 
    let dataPoints = []; 

    function generatePath(data) {
        const step = chartWidth / (data.length - 1); 

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
            dataPoints.shift(); 
        }
        dataPoints.push({ y: chartHeight - newY }); 
        updateChart();
    }

    async function fetchData() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            console.log('API Response:', data);

            const numberOfPosts = data.length; 
            const scaledY = (numberOfPosts / 100) * chartHeight; 
            addDataPoint(scaledY);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    setInterval(fetchData, 3000); 

    updateChart();
