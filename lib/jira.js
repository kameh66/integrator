const config = require('./config')

const JiraClient = require('jira-connector')

config.jira.cookie_jar = config.__jar

const jira = new JiraClient(config.jira)

function addWorkLog(issueKey, timeSpent, comment = null) {
  const opts = {
    issueKey,
    worklog: {
      timeSpent,
      comment
    }
  }
  jira.issue.addWorkLog(opts, function(error, issue) {
    error && console.log(error)
    console.log(`${issueKey} ${timeSpent} ${issue}`)
  })
}

module.exports = {
  addWorkLog
}
