    // Basic script test
    console.log('Script is running'); // Verify if the script runs

    // Test API call independently
    async function testFetch() {
        try {
            const response = await fetch('https://api.covid19api.com/summary');
            const data = await response.json();
            console.log('API Response:', data); // Log the response
            document.getElementById('status').textContent = 'API call successful'; // Update the status
        } catch (error) {
            console.error('Error fetching data:', error); // Log errors
            document.getElementById('status').textContent = 'API call failed'; // Update the status
        }
    }

    // Run the test fetch
    testFetch();
