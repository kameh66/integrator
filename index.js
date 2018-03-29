const config = require('./lib/config').integrator
const jira = require('./lib/jira')
const desktime = require('./lib/desktime')

desktime.fetchMyTime(function(time) {
  const workLog = config.desktimeToJira.workLog

  time.forEach(function(item) {
    jira.addWorkLog(item[workLog.use], item.time, workLog.comment)
  })
})
