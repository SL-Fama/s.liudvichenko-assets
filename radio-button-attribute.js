document.addEventListener("DOMContentLoaded", function() {
    // Handle name input and display first letter or "0"
    const nameInput = document.querySelector('[wa-data="name-input"]');
    const firstLetterDisplay = document.querySelector('[wa-data="firs-letter"]');

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

    // Handle radio buttons to update LLM logo and name
    const radioButtons = document.querySelectorAll('input[name="fake-LMM-form"]');
    const llmLogos = document.querySelectorAll('img[wa-data="LLM-logo"]');
    const llmName = document.querySelector('[wa-data="LLM-name"]');

    // LLM image URLs and names
    const llmData = {
        llama3: {
            logo: "https://cdn.prod.website-files.com/6655a8fa5b60c0544c808c32/66e93ae1076e0bff4581f399_ollama-logo.svg",
            name: "llama3"
        },
        Gemini: {
            logo: "https://cdn.prod.website-files.com/6655a8fa5b60c0544c808c32/66e93ae19cb64853c103f9b8_gemini-logo.svg",
            name: "Gemini"
        },
        EleutherAI: {
            logo: "https://cdn.prod.website-files.com/6655a8fa5b60c0544c808c32/66e93ae0d44897553a3adde6_EleutherAI-logo.svg",
            name: "EleutherAI"
        },
        CustomLMM: {
            logo: "https://cdn.prod.website-files.com/6655a8fa5b60c0544c808c32/66e93ae0738531356c0ce9e6_custom_LMM-logo.svg",
            name: "Custom LMM"
        }
    };

    // Function to update LLM logo and name
    function updateLLM(selectedValue) {
        const selectedLLM = llmData[selectedValue];

        // Update all LLM logo images
        llmLogos.forEach(img => {
            img.setAttribute('src', selectedLLM.logo);
        });

        // Update LLM name
        llmName.textContent = selectedLLM.name;
    }

    // Initialize with default value (llama3)
    updateLLM("llama3");

    // Listen for changes in the radio buttons
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.checked) {
                updateLLM(this.value);
            }
        });
    });
});
