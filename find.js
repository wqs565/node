/**
 * Created by wqs on 2017/6/23.
 */
var mongoose = require('mongoose');
require('./wqs.js')

var Wqs = mongoose.model('Wqs');

Wqs.find({},function (err,data) {
    if(!err){
        console.log(data)
    }else{
        console.log(err);
    }
})