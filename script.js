// Using XMLHttpRequest (XHR)
function getWeatherXHR() {
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;
    const weatherIcon = document.getElementById("weather-icon");
    const weatherDescription = document.getElementById("weather-description");
    const weatherTemperature = document.getElementById("weather-temperature");

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);

                const icon = getWeatherIcon(data.current.weathercode);
                const description = getWeatherDescription(data.current.weathercode);
                const temperature = data.current.temperature_2m + "°C";

                weatherIcon.textContent = icon;
                weatherDescription.textContent = description;
                weatherTemperature.textContent = temperature;
            } else {
                console.error("An error occurred:", xhr.statusText);
            }
        }
    };
    xhr.open("GET", `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&current=weathercode`, true);
    xhr.send();
}

// Using Fetch with Promises
function getWeatherFetchwPromises() {
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;
    const weatherIcon = document.getElementById("weather-icon");
    const weatherDescription = document.getElementById("weather-description");
    const weatherTemperature = document.getElementById("weather-temperature");

    // Fetch weather data
    doFetch(latitude, longitude)
        .then(data => {
            const icon = getWeatherIcon(data.current.weathercode);
            const description = getWeatherDescription(data.current.weathercode);
            const temperature = data.current.temperature_2m + "°C";

            weatherIcon.textContent = icon;
            weatherDescription.textContent = description;
            weatherTemperature.textContent = temperature;
        })
        .catch(error => {
            console.error("An error occurred:", error);
        });
}

function doFetch(latitude, longitude) {
    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&current=weathercode`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });
}

// Using Fetch with async/await
async function getWeatherAsync() {
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;
    const weatherIcon = document.getElementById("weather-icon");
    const weatherDescription = document.getElementById("weather-description");
    const weatherTemperature = document.getElementById("weather-temperature");

    // Fetch weather data
    try {
        const data = await doFetchAsync(latitude, longitude);
        const icon = getWeatherIcon(data.current.weathercode);
        const description = getWeatherDescription(data.current.weathercode);
        const temperature = data.current.temperature_2m + "°C";

        weatherIcon.textContent = icon;
        weatherDescription.textContent = description;
        weatherTemperature.textContent = temperature;
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

async function doFetchAsync(latitude, longitude) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&current=weathercode`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

function getWeatherIcon(weatherCode) {
    const weatherIcons = {
        "0": "☀️", // Clear sky
        "1": "🌥️", // Mainly clear
        "2": "🌥️", // Partly cloudy
        "3": "☁️", // Overcast
        "45": "🌫️", // Fog and depositing rime fog
        "48": "🌫️", // Fog and depositing rime fog
        "51": "🌧️", // Drizzle: Light intensity
        "53": "🌧️", // Drizzle: Moderate intensity
        "55": "🌧️", // Drizzle: Dense intensity
        "56": "❄️", // Freezing Drizzle: Light intensity
        "57": "❄️", // Freezing Drizzle: Dense intensity
        "61": "🌧️", // Rain: Slight intensity
        "63": "🌧️", // Rain: Moderate intensity
        "65": "🌧️", // Rain: Heavy intensity
        "66": "❄️", // Freezing Rain: Light intensity
        "67": "❄️", // Freezing Rain: Heavy intensity
        "71": "🌨️", // Snowfall: Slight intensity
        "73": "🌨️", // Snowfall: Moderate intensity
        "75": "🌨️", // Snowfall: Heavy intensity
        "77": "🌨️", // Snow grains
        "80": "🌧️", // Rain showers: Slight intensity
        "81": "🌧️", // Rain showers: Moderate intensity
        "82": "🌧️", // Rain showers: Violent intensity
        "85": "🌨️", // Snow showers: Slight intensity
        "86": "🌨️", // Snow showers: Heavy intensity
        "95": "⛈️", // Thunderstorm: Slight or moderate
        "96": "⛈️", // Thunderstorm with slight hail
        "99": "⛈️", // Thunderstorm with heavy hail
    };

    return weatherIcons[weatherCode] || "❓";
}

function getWeatherDescription(weatherCode) {
    const weatherDescriptions = {
        "0": "Clear sky",
        "1": "Mainly clear",
        "2": "Partly cloudy",
        "3": "Overcast",
        "45": "Fog and depositing rime fog",
        "48": "Fog and depositing rime fog",
        "51": "Drizzle: Light intensity",
        "53": "Drizzle: Moderate intensity",
        "55": "Drizzle: Dense intensity",
        "56": "Freezing Drizzle: Light intensity",
        "57": "Freezing Drizzle: Dense intensity",
        "61": "Rain: Slight intensity",
        "63": "Rain: Moderate intensity",
        "65": "Rain: Heavy intensity",
        "66": "Freezing Rain: Light intensity",
        "67": "Freezing Rain: Heavy intensity",
        "71": "Snowfall: Slight intensity",
        "73": "Snowfall: Moderate intensity",
        "75": "Snowfall: Heavy intensity",
        "77": "Snow grains",
        "80": "Rain showers: Slight intensity",
        "81": "Rain showers: Moderate intensity",
        "82": "Rain showers: Violent intensity",
        "85": "Snow showers: Slight intensity",
        "86": "Snow showers: Heavy intensity",
        "95": "Thunderstorm: Slight or moderate",
        "96": "Thunderstorm with slight hail",
        "99": "Thunderstorm with heavy hail",
    };

    return weatherDescriptions[weatherCode] || "Unknown Weather";
}
