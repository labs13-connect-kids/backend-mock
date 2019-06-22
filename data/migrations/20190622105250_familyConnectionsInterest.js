exports.up = function(knex, Promise) {
  return knex.schema.createTable('famConInterest', tbl => {
    tbl.increments();
    tbl
      .string('emailAddress', 128)
      .unique()
      .notNullable();
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('famConInterest');
};
