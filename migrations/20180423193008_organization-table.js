
exports.up = function(knex, Promise) {
    return knex.schema.createTable('organization', function(t) {
        t.string('name').notNullable()
        t.string('hours').notNullable()
        t.string('services').notNullable()
    })
};

exports.down = function(knex, Promise) {
  
};
