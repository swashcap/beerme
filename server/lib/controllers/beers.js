const boom = require('boom')
const joi = require('joi')
const uuidv4 = require('uuid/v4')

module.exports.delete = (
  {
    params: { id },
    server: {
      plugins: { levelup }
    }
  },
  reply
) => levelup.get(id)
  .then((beer) => {
    if (!beer) {
      throw boom.notFound(`${id} not found`)
    }

    return levelup.delete(id)
  })
  .catch(error => reply(boom.wrap(error)))

/**
 * @param {Object} request
 * @param {Function} reply
 */
module.exports.get = (
  {
    params: { id },
    server: {
      plugins: { levelup }
    }
  },
  reply
) => {
  const handleError = error => reply(boom.wrap(error))

  if (id) {
    return levelup.get(id).then((beer) => {
      if (!beer) {
        return reply(boom.notFound(`${id} not found`))
      }

      return reply(beer)
    })
    .catch(handleError)
  }

  return levelup.all()
    .then(reply)
    .catch(handleError)
}

/**
 * @param {Object} request
 * @param {Function} reply
 */
module.exports.options = ({ method, params: { id } }, reply) => {
  if ((method === 'PUT' || method === 'DELETE') && !id) {
    return reply(boom.badRequest())
  }

  return reply(':+1:')
}

module.exports.post = (
  {
    server: {
      plugins: { levelup }
    },
    payload
  },
  reply
) => {
  const id = uuidv4()

  return levelup.put(id, payload)
    .then(() => levelup.get(id))
    .then(beer => reply(beer).code(201))
    .catch(error => reply(boom.wrap(error)))
}

module.exports.put = (
  {
    server: {
      plugins: { levelup }
    },
    params: { id },
    payload
  },
  reply
) => levelup.get(id)
  .then((beer) => {
    if (!beer) {
      throw boom.notFound(`${id} not found`)
    }

    return levelup.put(id, payload)
  })
  .then(() => levelup.get(id))
  .then(beer => reply(beer).code(201))
  .catch(error => reply(boom.wrap(error)))

module.exports.schema = {
  abv: joi.number().positive().required(),
  brewery: joi.string().min(5).required(),
  description: joi.string(),
  ibu: joi.number().integer().min(0),
  name: joi.string().min(5).required(),
  price: joi.number().positive(),
  rating: joi.number().min(0).max(5).required(),
  style: joi.string().min(3).required(),
  tags: joi.array().items(joi.string().min(5))
}
