const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send('<h1>Servidor del Juego</h1>');
});

io.on('connection', (socket) => {
    console.log("Un usuario se ha conectado");

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('pressedBtn', (btn) => {
        console.log('Se ha presionado: ' + btn);
        io.emit('pressedBtn', btn);
    });
    socket.on('releasedBtn', (btn) => {
        console.log('Se ha soltado: ' + btn);
        io.emit('releasedBtn', btn);
    });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
