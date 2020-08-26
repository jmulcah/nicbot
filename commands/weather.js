const axios = require("axios");

module.exports = async function weather(data) {
  const request = data.text.split(" ");
  const country = request[2];
  return axios
    .get(
      `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_TOKEN}&query=${country}`
    )
    .then(function (res) {
      console.log(res);
      const temperature = res.data.current.temperature;
      const type = res.data.current.weather_descriptions;
      const response = `It is ${temperature} degrees with ${type} in ${country} right now.`;
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return "Sorry I can't get the do that right now";
    });
};
