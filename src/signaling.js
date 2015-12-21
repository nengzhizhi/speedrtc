var WebRTC = require('webrtc-native');
var socketIO = require('socket.io');

var config = {
	iceServers: [
		{
			url: 'stun:stun.l.google.com:19302'
		}
	]		
}

function Signaling(opt){
	this.io = new socketIO(3001);
	this.rooms = {};
}

Signaling.prototype.init = function(){
	var io = this.io;
	this.io.on('connection', function (socket) {
		socket.on('join', function (data) {
			var self = this;

			io.to(data.roomId).emit('offer', {
				sdp: data.sdp,
				connectionId: socket.id
			})

			socket.join(data.roomId);
		})

		//给对应的连接发送answer sdp，多次接收转发
		socket.on('answer', function (data){
			console.log(data.connectionId);
			io.sockets.connected[data.connectionId].emit('answer', {
				sdp: data.sdp
			})
		});
	})
}


// var signaling = function(opt){
// 	var self = this;
// 	self.io = new socketIO(80);
// 	self.rooms = {};

// 	self.io.on('connection', function (socket) {
// 		var self = this;
// 		console.log(self.io);

// 		socket.on('disconnect', function(){

// 		})

// 		socket.on('join', function (roomId, sessionDescription) {
// 			console.log(self.io);
// 			//TODO if (isValid(roomId))
// 			if (!self.rooms[roomId]) {
// 				socket.join(roomId);
// 				self.rooms[roomId] = {};

// 				//self.rooms[roomId].sdps = {};
// 				//self.rooms[roomId].sdps['xxx'] = sessionDescription;

// 				self.rooms[roomId].sdps = [];
// 				self.rooms[roomId].sdps.push(sessionDescription);

// 				// self.rooms[roomId] = {};
// 				// self.rooms[roomId].recordPeer = new WebRTC.RTCPeerConnection(config);
// 				// self.rooms[roomId].recordPeer.createOffer();
// 			}

// 			//向房间所有的其他连接发送offer sdp
// 			//self.broadcastNewPeerSdp(roomId, sessionDescription);

// 				self.io.to(roomId).emit('answer', {
// 					sessionDescription: [sessionDescription]
// 				});

		
// 			//向新连接发送其他连接的answer sdp
// 			socket.emit('answer', self.rooms[roomId].sdps);
// 		});

// 	});
// }

// signaling.prototype.broadcastNewPeerSdp = function(roomId, sessionDescription) {
// 	this.io.to(roomId).emit('answer', {
// 		sessionDescription: [sessionDescription]
// 	});
// };

module.exports = Signaling;