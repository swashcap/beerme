const good = require('good')

module.exports = {
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
}
