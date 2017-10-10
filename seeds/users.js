
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
        const users_array = [{
          name:'Pier Ollsen',
          email:'pollsen@gmail.com',
          role:'User',
          date:new Date(),
          login:'pollsen',
          password:'pollsen' },
          {
            name:'Serhii Dorofieiev',
            email:'sdorofeew@freshcode.org',
            role:'Admin',
            date:new Date(),
            login:'sdorofeew',
            password:'sdorofeew'
        }];
        return knex('users').insert(users_array);
    });
};
