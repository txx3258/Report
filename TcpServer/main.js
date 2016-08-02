'use strict';

let child_process = require('child_process');

let child = require('child_process');
let jsonServer = child_process.fork('./server.js', ['json'], {encoding:'utf8' });
let streamServer = child_process.fork('./server.js', ['stream'], {encoding:'utf8'});

let jsonCount ={time:new Date().getTime()};
let streamCount ={time:new Date().getTime()};

//***************计数***************************/
jsonServer.on('message', function(m) {
  if (m.action=='heart'){
    jsonCount = m;
  }else{
    console.log(m);
  }
});

streamServer.on('message', function(m) {
  if (m.action=='heart'){
    streamCount = m;
  }else{
    console.log(m);
  }
});

//****************监控****************************/
setInterval(()=>{
  let time = new Date().getTime();
  if (time - jsonCount.time>10000){
    jsonServer = child_process.fork('./server.js', ['json'], {encoding:'utf8' });
  }

  if (time - jsonCount.time>10000){
     streamServer = child_process.fork('./server.js', ['stream'], {encoding:'utf8'});
  } 

  jsonServer.send({time:time,action:'heart'});
  streamServer.send({time:time,action:'heart'});
},2000)
