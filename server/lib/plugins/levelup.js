const levelup = require('levelup')
const memdown = require('memdown')
const streamToPromise = require('stream-to-promise')
const { promisify } = require('util')

module.exports.register = (server, options, next) =>
  promisify(levelup)(memdown, { valueEncoding: 'json' }).then((db) => {
    const del = promisify(db.del.bind(db))
    const get = promisify(db.get.bind(db))
    const put = promisify(db.put.bind(db))

    /**
     * {@link https://github.com/Level/levelup#createReadStream}
     *
     * @returns {Promise<Object[]|Error>}
     */
    server.expose('all', () => streamToPromise(db.createReadStream)
      .then(datas => datas.map(
        ({ key: id, value }) => Object.assign({ id }, value)
      ))
    )

    /**
     * @private
     */
    server.expose('db', db)

    /**
     * @param {string} id
     * @returns {Promise<Object|Error>}
     */
    server.expose('delete', id => del(id))

    /**
     * @param {string} id
     * @returns {Promise<Object|Error>}
     */
    server.expose('get', id => get(id).catch((error) => {
      if (error.notFound) {
        return
      }

      throw error
    }))

    /**
     * @param {string} id
     * @param {Object} value
     * @returns {Promise<Object|Error>}
     */
    server.expose('put', (id, value) => put(id, value))

    return next()
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

module.exports.register.attributes = {
  name: 'levelup'
}
