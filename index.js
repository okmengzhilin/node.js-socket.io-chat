var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var socketUser={};

app.use(express.static(__dirname + '/public'));

//定义页面的映射
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.get('/admin', function(req, res){
	res.sendFile(path.join(__dirname, '/public/admin.html'));
});
app.get('/menu_two', function(req, res){
	res.sendFile(path.join(__dirname, '/public/menu-two.html'));
});
   
   
//当新的socket连接成功后执行的操作   
io.on('connection', function(socket){   
	console.log(socket.id+"已经连接");
	//socketUser[socket.id] = {'socket':socket};
	
	socket.on('login', function (data,fn) {
		socketUser[socket.id] = {'id':data.id,'socket':socket};  //将每个socket用户存储到一个对象中
	});
	
	socket.on('disconnect', function(){       //socket断开连接时将该用户删除
	    console.log('链接断开['+socket.id+']');
	    delete socketUser[socket.id];
	});
	    
	socket.on('chat message', function(msg){
	    console.log('message: ' + msg);
	    
	     for(var values in socketUser){
	        socketUser[values].socket.emit('receive',msg); //将消息发送给已连接的用户
	     }
	    
	//  io.emit('chat message', msg);
	});
   
});
   
app.set('port', process.env.PORT || 3000);  //定义服务器监听的端口
   
var server = http.listen(app.get('port'), function() {
	console.log('start at port:' + server.address().port);
});