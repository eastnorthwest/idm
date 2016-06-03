/* eslint-disable no-var */

var config = require('../config')
config()

exports.up = function (r, conn) {
  return Promise.all([
    r.table('users').indexCreate('handle').run(conn),
  ])
}

exports.down = function (r, conn) {
  return Promise.all([
    r.table('users').indexDrop('handle').run(conn),
  ])
}
