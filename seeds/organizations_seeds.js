
const organizationData = require('./organization_data');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('organization').del()
    .then(() => {
      // Inserts seed entries
      return knex('organization').insert(organizationData)
        .then(() => {
          return Promise.all()
        });
    });
};
