
//IMPORTS
const server = require( './src/server' );

const port = process.env.PORT || 4242;

server.listen( port, () => {
    console.log( `\n Server is up on http://localhost:${port} \n` )
})