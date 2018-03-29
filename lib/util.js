const config = require('./config').util
const crypto = require('crypto')

/**
 *
 * @param content
 * @returns {PromiseLike<ArrayBuffer>}
 */
function hash(content) {
  return crypto.createHash(config.hashAlgorithm)
    .update(content)
    .digest('hex')
}

module.exports = {
  hash
}
