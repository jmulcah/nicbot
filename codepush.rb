require 'rest-client'
require 'json'
require "highline/import"

$circle_token = "248e173620570e0753cc40bd14d0ccde06a5c0ac"

def codepush(platform, branch, mandatory)

  branch = "master" if branch.nil? || branch.empty?

  response = RestClient.post(
  "https://#{$circle_token}:@circleci.com/api/v1.1/project/github/phorest/rn-branded-app/tree/#{branch}",
  {build_parameters: { CIRCLE_JOB: "code_push", PLATFORM: platform, MANDATORY: mandatory}}.to_json,
  {'accept': 'application/json',  "Content-Type": 'application/json'})
  circle_job = JSON.parse(response.body)
  build_url = circle_job['build_url']

  puts "New #{platform} build at #{build_url}."
  system("open #{build_url}")
end

puts "New Branded App CodePush QA."
puts "\n"

branch = ask "Please enter the branch you want to code push (hit enter for master): "
mandatory = ask "Is this a mandatory release (true | false): "

codepush("ios", branch, mandatory)
codepush("android", branch, mandatory)