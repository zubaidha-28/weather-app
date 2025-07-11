const API_KEY = "ccb07d54a48a4ee55ad1b11fc7d0d9a3";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// Fetching HTML elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchbtn");
const weatherDisplay = document.getElementById("weatherDisplay");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const errorMessage = document.getElementById("errorMessage");

// Weather display elements
const CityName = document.getElementById("cityname");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const feelslike = document.getElementById("feelslike");
const humidity = document.getElementById("humidity");
const windspeed = document.getElementById("windspeed");

// Event listeners
searchBtn.addEventListener("click", handleSearch);
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});

// Handle search function
function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) {
        showError("Please enter a city name");
        return;
    }

    // Clear previous results and show loading
    hideAllSections();
    showLoading();

    // Fetch the weather data
    fetchWeatherData(city);
}

// Fetch weather data from API
async function fetchWeatherData(city) {
    try {
        const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found. Please check the spelling.");
            } else if (response.status === 401) {
                throw new Error("Invalid API key.");
            } else {
                throw new Error("Failed to fetch weather data.");
            }
        }

        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        hideLoading();
        showError(error.message);
    }
}

// Display weather data
function displayWeatherData(data) {
    hideLoading();

    const cityText = `${data.name}, ${data.sys.country}`;
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const feelsLikeTemp = Math.round(data.main.feels_like);
    const humidityValue = data.main.humidity;
    const windSpeedValue = Math.round(data.wind.speed);

    CityName.textContent = cityText;
    temperature.textContent = temp;
    weatherDescription.textContent = description;
    feelslike.textContent = feelsLikeTemp;
    humidity.textContent = humidityValue;
    windspeed.textContent = windSpeedValue;

    showWeatherDisplay();
}

// Show loading message
function showLoading() {
    loading.style.display = "block";
}

// Hide loading
function hideLoading() {
    loading.style.display = "none";
}

// Show error
function showError(message) {
    errorMessage.textContent = message;
    error.classList.remove("hidden");
}

// Hide error
function hideError() {
    error.classList.add("hidden");
}

// Show weather section
function showWeatherDisplay() {
    weatherDisplay.classList.remove("hidden");
}

// Hide weather section
function hideWeatherDisplay() {
    weatherDisplay.classList.add("hidden");
}

// Hide all
function hideAllSections() {
    hideLoading();
    hideError();
    hideWeatherDisplay();
}
