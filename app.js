const weatherCode = weatherData.current_weather.weathercode;

let weatherCondition = "";

switch (weatherCode) {

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

document.getElementById("condition").innerHTML =
    weatherCondition;
