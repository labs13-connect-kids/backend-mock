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

server.post( '/api/sendEvent' , ( req , res ) => {
    let { emailAddress , event } = req.body;
    if ( !emailAddress || !event ) {
        res.status( 400 ).json( 'Body must contain emailAddress and event' )
    }
    event = event.split( '-' )
    const success = event[ event.length - 1 ] == 'success' ? 1 : 0;
    res.status( 200 ).json({ emailAddress , success });
});

//MIDDLEWARE ERROR CHECK ⬇︎
server.use(
    middlewares.notFound ,
    middlewares.errorHandler
);

//EXPORTS ⬇︎
module.exports = server;