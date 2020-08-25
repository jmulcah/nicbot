const axios = require("axios");

module.exports = async function weather(data) {
  const request = data.text.split(" ");
  const country = request[2];
  const res = await axios.get(
    `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_TOKEN}&query=${country}`
  );
  const temperature = res.data.current.temperature;
  const type = res.data.current.weather_descriptions;
  const response = `It is ${temperature} degrees with ${type} in ${country} right now.`;
  console.log("here " + response);
  return response;
};
