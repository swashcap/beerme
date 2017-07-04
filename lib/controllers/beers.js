const boom = require('boom')

module.exports.delete = (request, reply) => {
  return reply()
}

/**
 * @param {Object} request
 * @param {Function} reply
 */
module.exports.get = ({ params: { id } }, reply) => {
  return reply()
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

module.exports.post = (request, reply) => {
  return reply().code(201)
}

module.exports.put = (request, reply) => {
  return reply(request.payload).code(201)
}
