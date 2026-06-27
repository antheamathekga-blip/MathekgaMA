document.addEventListener("DOMContentLoaded", () => {
    getLocation();
});

function getLocation() {

    if (!navigator.geolocation) {
        document.getElementById("location").innerHTML =
            "Geolocation is not supported.";
        return;
    }

    navigator.geolocation.getCurrentPosition(showPosition, showError);

}

async function showPosition(position) {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    document.getElementById("location").innerHTML =
        `Latitude: ${latitude.toFixed(2)}, Longitude: ${longitude.toFixed(2)}`;

    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    try {

        const response = await fetch(url);

        const data = await response.json();

        const weather = data.current_weather;

        document.getElementById("temperature").innerHTML =
            `🌡 Temperature: ${weather.temperature} °C`;

        document.getElementById("wind").innerHTML =
            `💨 Wind Speed: ${weather.windspeed} km/h`;

        let weatherCondition = "";

        switch (weather.weathercode) {

            case 0:
                weatherCondition = "☀ Clear Sky";
                break;

            case 1:
            case 2:
                weatherCondition = "🌤 Partly Cloudy";
                break;

            case 3:
                weatherCondition = "☁ Cloudy";
                break;

            case 45:
            case 48:
                weatherCondition = "🌫 Fog";
                break;

            case 51:
            case 53:
            case 55:
                weatherCondition = "🌦 Drizzle";
                break;

            case 61:
            case 63:
            case 65:
                weatherCondition = "🌧 Rain";
                break;

            case 71:
            case 73:
            case 75:
                weatherCondition = "❄ Snow";
                break;

            case 95:
                weatherCondition = "⛈ Thunderstorm";
                break;

            default:
                weatherCondition = "🌍 Weather Unavailable";

        }

        document.getElementById("condition").innerHTML = weatherCondition;

    } catch (error) {

        document.getElementById("location").innerHTML =
            "Unable to load weather.";

    }

}

function showError(error) {

    switch (error.code) {

        case error.PERMISSION_DENIED:
            document.getElementById("location").innerHTML =
                "Location permission denied.";
            break;

        case error.POSITION_UNAVAILABLE:
            document.getElementById("location").innerHTML =
                "Location unavailable.";
            break;

        case error.TIMEOUT:
            document.getElementById("location").innerHTML =
                "Location request timed out.";
            break;

        default:
            document.getElementById("location").innerHTML =
                "Unknown location error.";

    }

}
