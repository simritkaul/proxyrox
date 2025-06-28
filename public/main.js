const cityInput = document.getElementById("city");
const weatherButton = document.getElementById("getWeather");
const weatherOutput = document.getElementById("weather");

const API_BASE_URL = "http://localhost:5000/api/weather";

weatherButton.addEventListener("click", async () => {
  const cityName = cityInput.value.trim();
  if (!cityName) {
    weatherOutput.textContent = "Please enter a city name.";
    return;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}?cityName=${encodeURIComponent(cityName)}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    weatherOutput.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    weatherOutput.textContent = `Error fetching weather data: ${error.message}`;
  }
});
