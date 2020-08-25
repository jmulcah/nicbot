const SlackBot = require("slackbots");
require("dotenv").config();
const hello = require("./commands/hello");
const pizza = require("./commands/pizza");
const help = require("./commands/help");
const weather = require("./commands/weather");
const codepush = require("./commands/codepush");

const bot = new SlackBot({
  token: process.env.SLACK_API_TOKEN,
  name: "nicbot"
});

// Error Handler
bot.on("error", (err) => console.log(err));

// Message Handler
bot.on("message", (data) => {
  if (data.type !== "message") {
    return;
  }
  handleMessage(data).then((response) => {
    bot.postMessage(data.channel, response, { as_user: true });
  });
});

// Response to Data
function handleMessage(data) {
  if (data.text.includes(" weather")) {
    return weather(data);
  }
  if (data.text.includes(" pizza")) {
    return Promise.resolve(pizza());
  }
  if (data.text.includes(" codepush")) {
    return codepush(data);
  }
  if (data.text.includes(" hello")) {
    return Promise.resolve(hello());
  }
  if (data.text.includes(" help")) {
    return Promise.resolve(help());
  }
}
