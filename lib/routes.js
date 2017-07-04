const beers = require('./controllers/beers.js')
const joi = require('joi')

module.exports.register = (server, options, next) => {
  server.route({
    config: {
      validate: {
        params: {
          id: joi.number().integer().positive().required()
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
          id: joi.number().integer().positive()
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
          id: joi.number().integer().positive()
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
        payload: {
          abv: joi.number().positive().required(),
          brewery: joi.string().min(5).required(),
          description: joi.string(),
          ibu: joi.number().integer().min(0),
          name: joi.string().min(5).required(),
          rating: joi.number().min(0).max(5).required(),
          tags: joi.array().items(joi.string().min(5))
        }
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
          id: joi.number().integer().positive().required()
        },
        payload: {
          abv: joi.number().positive().required(),
          brewery: joi.string().min(5).required(),
          description: joi.string(),
          ibu: joi.number().integer().min(0),
          name: joi.string().min(5).required(),
          rating: joi.number().min(0).max(5).required(),
          tags: joi.array().items(joi.string().min(5))
        }
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
