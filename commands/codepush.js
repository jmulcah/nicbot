const axios = require("axios");

module.exports = function codepush(data) {
  const request = data.text.split(" ");
  const branch = request[2];
  const mandatory = request[3];
  const platform = request[4];
  return codepushToQA(branch, mandatory, platform).then((response) => {
    return response;
  });
};

async function codepushToQA(branch, mandatory, platform) {
  console.log(branch, mandatory, platform);
  return axios
    .post(
      `https://${process.env.CIRCLE_TOKEN}:@circleci.com/api/v1.1/project/github/phorest/rn-branded-app/tree/${branch}`,
      {
        build_parameters: {
          CIRCLE_JOB: "code_push",
          PLATFORM: platform,
          MANDATORY: mandatory
        }
      }
    )
    .then(function (response) {
      console.log(JSON.stringify(response.data.build_url));
      return `Ciao, Codepushing to QA from branch ${branch} with mandatory: ${mandatory} for platform: ${platform} now. \n ${response.data.build_url}`;
    })
    .catch(function (error) {
      console.log(error);
      return "codepush failed";
    });
}
