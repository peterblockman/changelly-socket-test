import io from 'socket.io-client';
// import cryptojs from 'crypto-js'
var crypto = require('crypto')

var URL = 'https://api.changelly.com';
const apiKey ='myApiKey'
const apiSecret ='myApiSecret'

const sign = (message) => {
      return crypto
        .createHmac('sha512', apiSecret)
        .update(JSON.stringify(message))
        .digest('hex');
    };

var socket = io.connect(URL, {
      'reconnection': true,
      'reconnectionDelay': 1000,
      'reconnectionDelayMax': 5000,
      'reconnectionAttempts': 'Infinity'
    });

export const status = (cb) => {
	socket.on('connect', () => {
      var message = {
        "Login": {}
      };
      socket.emit('subscribe', 
        {
          apiKey: apiKey,
          sign: sign(message),
          message: message
        }
      );
    });
   socket.on('status', (err, data) => {
		console.log(data)
	});
   socket.on('payin', (err, data) => {
	  cb(data)
	  if(err){
	  	console.log(err)
	  }
	});
  }





