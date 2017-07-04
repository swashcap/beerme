const good = require('good')
const hapi = require('hapi')
const { promisify } = require('util')

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

register({
  register: good,
  options: {
    reporters: {
      consoleReporter: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{
            log: '*',
            response: '*'
          }]
        },
        {
          module: 'good-console'
        },
        'stdout'
      ]
    }
  }
})
  .then(() => promisify(server.start.bind(server))())
  .then(() => server.log(
    ['info', 'start'],
    `Server running at ${server.info.uri}`
  ))
