'use strict';
let log = require('../Common/log');
let mongoWrap = require('./handler/mongoWrap');

process.on('message',(msg)=>{
    mongoWrap(msg);
});