const joi = require('joi')

const beers = require('./controllers/beers.js')

module.exports.register = (server, options, next) => {
  server.route({
    config: {
      validate: {
        params: {
          id: joi.string().required(),
        }
      }
    },
    handler: beers.delete,
    method: 'DELETE',
    path: '/beers/{id}'
  })
  server.route({
    config: {
      validate: {
        params: {
          id: joi.string(),
        }
      }
    },
    handler: beers.get,
    method: 'GET',
    path: '/beers/{id?}'
  })
  server.route({
    config: {
      validate: {
        params: {
          id: joi.string(),
        }
      }
    },
    handler: beers.options,
    method: 'OPTIONS',
    path: '/beers/{id?}'
  })
  server.route({
    config: {
      validate: {
        payload: beers.schema,
      }
    },
    handler: beers.post,
    method: 'POST',
    path: '/beers'
  })
  server.route({
    config: {
      validate: {
        params: {
          id: joi.string().required(),
        },
        payload: beers.schema,
      }
    },
    handler: beers.put,
    method: 'PUT',
    path: '/beers/{id}'
  })

  next()
}

module.exports.register.attributes = {
  name: 'routes'
}
