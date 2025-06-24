const express = require("express");
const router = express.Router();
const needle = require("needle");

const API_GEO_BASE_URL = process.env.API_GEO_BASE_URL;
const API_WEATHER_BASE_URL = process.env.API_WEATHER_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

const cityName = "Liverpool";

router.get("/", async (req, res) => {
  try {
    const geoRes = await needle(
      "get",
      `${API_GEO_BASE_URL}?q=${cityName}&limit=5&${API_KEY_NAME}=${API_KEY_VALUE}`
    );
    const geoData = geoRes.body;
    res.status(200).json(geoData);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
