
exports.up = function(knex, Promise) {
    return knex.schema.createTable( 'events' , tbl => {
        tbl.increments()
        tbl 
            .string( 'event' , 128 )
        tbl.bool( 'success' )
        tbl.timestamps( true , true )
        tbl
            .integer( 'eventId' )
            .unsigned();
        tbl
            .foreign( 'eventId' )
            .references( 'id' )
            .on( 'users' )
            .onDelete( 'CASCADE' )
    })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists( 'events' )
};
