
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('organization').del()
    .then(() => {
      // Inserts seed entries
      return knex('organization').insert([
        {
            'name': 'Colourhood',
            'hours': 'Mon, Tue, Wed, Thur, Fri,',
            'services': '1, 2, 3, 4'
        },
        {
            'name': 'Union Gospel Mission',
            'hours': 'Mon, Tue, Wed, Thur, Fri, Sat, Sun',
            'services': '1, 2, 3, 4, 5, 6, 7, 8'
        },
        {
            'name': 'University Presbyterian Church',
            'hours': 'Mon, Tue, Wed, Thur, Fri, Sat, Sun',
            'services': '1, 3, 4'
        }
      ]);
    });
};
