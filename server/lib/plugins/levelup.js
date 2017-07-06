const levelup = require('levelup')
const memdown = require('memdown')
const streamToPromise = require('stream-to-promise')
const promisify = require('pify')
const uuidv4 = require('uuid/v4')

const seedData = [{
  abv: 7.2,
  brewery: 'Ecliptic Brewing',
  description: null,
  ibu: 70,
  name: 'Filament Winter IPA',
  price: 4.69,
  rating: 3,
  style: 'IPA',
  tags: null
}, {
  abv: 7.3,
  brewery: 'Hopworks Urban Brewery',
  description: null,
  ibu: 70,
  name: 'Abominable Winter Ale',
  price: 5.99,
  rating: 3,
  style: 'Winter Warmer',
  tags: null
}, {
  abv: 6.9,
  brewery: 'Lompoc Brewing',
  description: null,
  ibu: 58,
  name: 'Lompoc Special Draft',
  price: 4.99,
  rating: 3,
  style: 'ESB',
  tags: null
}, {
  abv: 5.3,
  brewery: 'Golden Valley Brewery',
  description: null,
  ibu: 28,
  name: 'Dundee Porter',
  price: 4.99,
  rating: 4,
  style: 'Porter',
  tags: null,
}]

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
    server.expose('all', () => streamToPromise(db.createReadStream())
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

    /**
     * Seed database.
     * @todo Move to a script
     */
    return promisify(db.batch.bind(db))(seedData.map(beer => ({
      key: uuidv4(),
      type: 'put',
      value: beer
    })))
  })
  .then(next)
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

module.exports.register.attributes = {
  name: 'levelup'
}
