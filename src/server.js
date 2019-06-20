//IMPORTS ⬇︎
const express = require( 'express' );
const helmet = require( 'helmet' );
const morgan = require( 'morgan' );
const cors = require( 'cors' );
const server = express();
const middlewares = require( './middlewares' );

//MIDDLEWARE ⬇︎
server.use( 
    helmet(), 
    express.json(), 
    morgan( 'dev' ), 
    cors()
);

//SANITY CHECK ⬇︎
server.get( '/' , ( req , res ) => {
    res.status(200).json({ message: 'Sup ✌🏼 -Server' })
});

//MIDDLEWARE ERROR CHECK ⬇︎
server.use(
    middlewares.notFound ,
    middlewares.errorHandler
);

//EXPORTS ⬇︎
module.exports = server;