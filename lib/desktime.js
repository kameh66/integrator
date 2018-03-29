const config = require('./config')
const util = require('./util')

const jsdom = require('jsdom')
const {JSDOM} = jsdom
const format = require('dateformat')

const request = require('request')

const baseUrl = `${config.desktime.protocol}://${config.desktime.host}`
const urlLogin = '/app/?session=' + config.desktime.APIkey

const req = request.defaults({baseUrl, jar: config.__jar})

function _parseValue(content) {
  content = content.trim()

  return content === '-' ? null : content
}

function _parseTime(html) {
  const {document} = new JSDOM(html).window
  const data = document.querySelectorAll('.table-projects > tbody > tr')

  const result = []
  data.forEach(function(item) {
    const cells = item.cells
    const project = _parseValue(cells.item(0).textContent)
    const task = _parseValue(cells.item(1).textContent)
    const time = _parseValue(cells.item(2).textContent)
    const id = util.hash(project + task + time)
    result.push({
      project,
      task,
      time,
      id
    })
  })

  return result
}

function _desktimeRequest(url, fn) {
  if (config.__cookie.isEmpty() || config.__cookie.isExpired()) {
    req(urlLogin, function(error) {
      error && console.log(error)
      req(url, fn)
    })
  } else {
    req(url, fn)
  }
}

/**
 * @param {Date} date
 * @param {callback} fn
 * @param {String} scope
 */
function fetchMyTime(date, fn, scope = 'day') {
  fn = fn || date
  date = typeof date === 'object' ? date : new Date()

  const url = `/app/my/${format(date, 'yyyy-mm-dd')}/${scope}`

  _desktimeRequest(url, function(error, response, body) {
    error && console.log(error)
    fn(_parseTime(body))
  })
}

module.exports = {
  fetchMyTime
}
