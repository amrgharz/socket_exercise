const http = require ('http')

const server = http.createServer()

const catNames = require ('cat-names');

const handleRequest = (req , res) =>{
    res.end('ok!')
}

server.on('request' , handleRequest)

server.listen(8888 , ()=> console.log('server is ready'))

const io = require ('socket.io')(server);

let globalNumber = 0

io.on('connection' , (socket) =>{
    const username = catNames.random()

    io.emit('user:new' , username)

    socket.emit('user:me' , username)

    console.log('a user connected')

    

    socket.on('disconnected',() =>{
        console.log('user disconnected')
    });

    socket.on('increment' , ()=>{
        globalNumber++
        io.emit('number:change',globalNumber)
    });

    socket.on('decrement' , ()=>{
        globalNumber--
        io.emit('number:change' , globalNumber)
    });

    socket.emit('number:change',globalNumber)
});