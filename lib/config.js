const pkg = require('./../package.json')
const rc = require('betterc')
const assign = require('assign-deep')
const request = require('request')
const CookieStore = require('tough-cookie-file-store')

const configs = rc.sync({
  name: pkg.name,
  defaults: {
    util: {
      hashAlgorithm: 'sha256'
    },
    integrator: {
      desktimeToJira: {
        workLog: {
          use: 'project',
          comment: 'Logged via DeskTime'
        }
      }
    },
    jira: {
      protocol: 'https'
    },
    desktime: {
      protocol: 'https',
      host: 'desktime.com'
    }
  }
})

const config = assign.apply(null, configs)
config.__cookie = new CookieStore(config.__source + 'cookie')
config.__jar = request.jar(config.__cookie)

module.exports = config
