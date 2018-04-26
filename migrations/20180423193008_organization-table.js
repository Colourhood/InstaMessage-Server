
exports.up = function(knex, Promise) {
    const firstQuery = knex.schema.createTable('organization', function(t) {
        t.string('name').notNullable()
        t.string('hours').notNullable()
        t.string('services').notNullable()
    });

    const secondQuery = knex.schema.createTable('services', function(t) {
        t.integer('id').notNullable()
    });

    return Promise.all([firstQuery, secondQuery])
};

exports.down = function(knex, Promise) {
  
};
