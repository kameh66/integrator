const jira = require('./lib/jira')
const desktime = require('./lib/desktime')

desktime.fetchMyTime(function(time) {
  time.forEach(function(item) {
    jira.addWorkLog(item.issueKey, item.time, 'Logged via DeskTime')
  })
})
