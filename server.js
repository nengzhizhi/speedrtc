var io = require('socket.io')(80);

io.on('message', function (data) {
	console.log(data);
});

