const express = require("express");
const router = express.Router();
const needle = require("needle");

const API_GEO_BASE_URL = process.env.API_GEO_BASE_URL;
const API_WEATHER_BASE_URL = process.env.API_WEATHER_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

router.get("/weather", async (req, res) => {
  const { cityName } = req.query;
  if (!cityName) {
    return res.status(400).json({ error: "City name is required" });
  }

  try {
    const geoRes = await needle(
      "get",
      `${API_GEO_BASE_URL}?q=${cityName}&limit=5&${API_KEY_NAME}=${API_KEY_VALUE}`
    );
    const geoData = geoRes.body;

    if (geoData.length === 0) {
      return res.status(404).json({ error: "City not found" });
    }

    const { lat, lon } = geoData[0];
    const weatherRes = await needle(
      "get",
      `${API_WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&${API_KEY_NAME}=${API_KEY_VALUE}`
    );
    const weatherData = weatherRes.body;

    // Logging for non-prod
    if (process.env.NODE_ENV !== "production") {
      console.log(
        "Weather Request URL:",
        `${API_WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&${API_KEY_NAME}=${API_KEY_VALUE}`
      );
    }

    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
