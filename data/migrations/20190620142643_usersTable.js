
exports.up = function(knex, Promise) {
    return knex.schema.createTable( 'users' , tbl => {
        tbl.increments()
        tbl
            .string( 'email' , 128 )
            .unique()
            .notNullable()
        tbl.timestamps( true , true )
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists( 'users' );
};
