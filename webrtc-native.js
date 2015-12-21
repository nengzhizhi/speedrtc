var WebRTC = require('webrtc-native');
var io = require('socket.io')(80);

var config = {
	iceServers: [
		{
			url: 'stun:stun.l.google.com:19302'
		}
	]	
}

io.on('connection', function (socket) {
	var peer = new WebRTC.RTCPeerConnection(config);

	socket.on('sdp', function (data) {
		peer.setRemoteDescription(new WebRTC.RTCSessionDescription(data), function(){
			console.log(console.log(data));
		})
	})

	peer.onicecandidate = function(event){
		console.log('peer.onicecandidate');
	}
})
