const knex = require('knex')(require('../../knexfile'))


function all() {
    return knex('organization').select('name', 'hours', 'services')
}

function dataFor(name) {
    return knex('organization').where({ 'name': name }).select('name', 'hours', 'services')
}

module.exports = { all, dataFor }