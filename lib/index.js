const hapi = require('hapi')
const { promisify } = require('util')

const goodPlugin = require('./plugins/good.js')
const levelUpPlugin = require('./plugins/levelup.js')
const routes = require('./routes.js')

const server = new hapi.Server()
const register = promisify(server.register.bind(server))

server.connection({
  host: 'localhost',
  port: 3000,
  routes: {
    cors: {
      credentials: true,
      origin: ['*']
    }
  }
})

register([
  goodPlugin,
  levelUpPlugin,
  routes
])
  .then(() => promisify(server.start.bind(server))())
  .then(() => server.log(
    ['info', 'start'],
    `Server running at ${server.info.uri}`
  ))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
