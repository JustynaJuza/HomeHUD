var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var amqp = require('amqplib/callback_api');

server.listen(80);


app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

console.log('server started');

io.on('connection', function (socket) {

console.log('here !')
	amqp.connect('amqp://ziober:bogumarl@hql.cloudapp.net', function(err, conn) {
		if(err){
			console.log('something went wrong')
			console.log(err)	
		}else{
			console.log('connection established')
		}

		conn.createChannel(function(err, ch) {
		var q = 'heartbit';
	    	// ch.sendToQueue(q, new Buffer('Hello World!'));
	    	// console.log(" [x] Sent 'Hello World!'");

	    	ch.consume(q, function(msg) 
			{
	    		socket.emit('news', { ping: msg.content.toString() });
	  		//console.log(" [x] Received %s", msg.content.toString());
			
			}, {noAck: false});
		});


		//Moja lampka
		socket.on('sl1 event', function (data) {
			conn.createChannel(function(err,ch){
				console.dir(data)		
				console.log('received:' + data + ' ' + new Date(Date.now()));
	    			ch.assertQueue('switcher', {durable: false});
				ch.sendToQueue('switcher', new Buffer('sl1'));
			});
		});

		//lampka Justynki
		socket.on('sl2 event', function (data) {
			conn.createChannel(function(err,ch){
				console.dir(data)
				console.log('received:' + data + ' ' + new Date(Date.now()));
	    			ch.assertQueue('switcher', {durable: false});
				ch.sendToQueue('switcher', new Buffer('sl2'));
			});
		});


		//lampka w salonie przy telewizorze
		socket.on('sl3 event', function (data) {
			conn.createChannel(function(err,ch){
				console.dir(data)
				console.log('received:' + data + ' ' + new Date(Date.now()));
	    			ch.assertQueue('switcher', {durable: false});
				ch.sendToQueue('switcher', new Buffer('sl3'));
			});
		});

		//lampka w salonie przy oknie
		socket.on('sl4 event', function (data) {
			conn.createChannel(function(err,ch){
				console.dir(data)
				console.log('received:' + data + ' ' + new Date(Date.now()));
	    			ch.assertQueue('switcher', {durable: false});
				ch.sendToQueue('switcher', new Buffer('sl4'));
			});
		});
	});
});
