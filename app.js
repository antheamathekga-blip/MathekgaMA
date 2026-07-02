document.addEventListener("DOMContentLoaded", () => {
    // Structural UI Selection nodes
    const menuLinks = document.querySelectorAll(".menu-link");
    const portfolioSections = document.querySelectorAll(".portfolio-section");
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");

    /**
     * Component Navigation Controller Setup
     */
    menuLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Stop native link anchor jumps

            const targetSectionId = link.getAttribute("data-section");

            // 1. Cycle clean status removals for links
            menuLinks.forEach(item => item.classList.remove("active-link"));
            // Add focus highlighting style element
            link.classList.add("active-link");

            // 2. Cycle content panel screen layouts switching visibility active status
            portfolioSections.forEach(section => {
                section.classList.remove("section-active");
            });

            const activeTargetSection = document.getElementById(targetSectionId);
            if (activeTargetSection) {
                activeTargetSection.classList.add("section-active");
            }

            // 3. Interface quality closure layout fix for mobile responsive interaction
            navMenu.classList.remove("menu-open");
        });
    });

    /**
     * Mobile Menu Toggler Event Listener
     */
    hamburgerBtn.addEventListener("click", () => {
        navMenu.classList.toggle("menu-open");
    });

    // Run the weather process immediately on load
    initializationWeatherProcess();
});

/**
 * Live Geolocation Weather Integration Function
 */
function initializationWeatherProcess() {
    const weatherStatusNode = document.getElementById("weatherStatus");
    
    // ⚠️ IMPORTANT: Replace the text below with your actual OpenWeather API key string
    const WEATHER_API_KEY = "PASTE_YOUR_OPENWEATHER_API_KEY_HERE"; 

    if (WEATHER_API_KEY === "PASTE_YOUR_OPENWEATHER_API_KEY_HERE") {
        weatherStatusNode.textContent = "Please add your OpenWeather API key to app.js";
        return;
    }

    // Check if the browser supports geolocation privacy features
    if (!navigator.geolocation) {
        weatherStatusNode.textContent = "Geolocation is not supported by your browser.";
        return;
    }

    // Trigger device hardware location prompt
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            weatherStatusNode.textContent = "Fetching localized weather data...";

            try {
                // Fetch current metric units data directly via safe browser fetch pipeline
                const response = await fetch(
                    `https://openweathermap.org{lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
                );

                if (!response.ok) {
                    throw new Error("Unable to retrieve weather data from server.");
                }

                const data = await response.json();
                displayWeatherDOM(data);

            } catch (error) {
                console.error("Weather error:", error);
                weatherStatusNode.textContent = "Error loading weather. Please check your API key.";
            }
        },
        (error) => {
            // Handle cases where the user denies location permissions
            console.warn("Location permission error code:", error.code);
            weatherStatusNode.textContent = "Location access denied. Displaying default: Pretoria, ZA.";
            
            // Fallback: Fetch a default backup city if geolocation is blocked
            fetchFallbackWeather(WEATHER_API_KEY);
        }
    );
}

/**
 * Dynamically updates the HTML markup inside the weather card
 */
function displayWeatherDOM(data) {
    const weatherStatusNode = document.getElementById("weatherStatus");
    
    const cityName = data.name;
    const currentTemp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const iconCode = data.weather[0].icon;

    // Inject structured elements directly into your section view card
    weatherStatusNode.innerHTML = `
        <div style="margin-top: 15px;">
            <h3 style="color: #7B1FA2; font-size: 1.6rem; margin-bottom: 5px;">${cityName}</h3>
            <img src="https://openweathermap.org{iconCode}@2x.png" alt="${description}" style="width: 80px; height: 80px;">
            <p style="font-size: 2.2rem; font-weight: bold; margin: 10px 0;">${currentTemp}°C</p>
            <p style="text-transform: capitalize; font-weight: 500; color: #555;">${description}</p>
            <p style="margin-top: 15px; font-size: 0.9rem; color: #777;">Humidity: ${humidity}%</p>
        </div>
    `;
}

/**
 * Fallback handler if device location permissions are denied
 */
async function fetchFallbackWeather(apiKey) {
    try {
        const response = await fetch(
          `https://openweathermap.org{apiKey}&units=metric`
        );
        if (response.ok) {
            const data = await response.json();
            displayWeatherDOM(data);
        }
    } catch (err) {
        console.error("Fallback path failed.", err);
    }
}
