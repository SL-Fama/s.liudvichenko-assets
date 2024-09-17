document.addEventListener("DOMContentLoaded", function() {
    const nameInput = document.querySelector('[wa-data="name-input"]');
    const firstLetterDisplay = document.querySelector('[wa-data="firs-letter"]');

    // Update first letter or default to "0"
    function updateFirstLetter() {
        const inputValue = nameInput.value.trim();
        if (inputValue.length > 0) {
            firstLetterDisplay.textContent = inputValue[0].toUpperCase();
        } else {
            firstLetterDisplay.textContent = "0";
        }
    }

    // Initialize with default value
    updateFirstLetter();

    // Listen for changes in the input
    nameInput.addEventListener("input", updateFirstLetter);

    // Set "checked" attribute for the element with id "fake-LMM-llama3"
    document.getElementById("fake-LMM-llama3").setAttribute("checked", "");
});
