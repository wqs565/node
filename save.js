/**
 * Created by wqs on 2017/6/23.
 */
var mongoose = require('mongoose');
require('./wqs.js')

var Wqs = mongoose.model('Wqs');

var wqs_data = new Wqs({
    nickname:"wqs",
    header:"1.png",
    gender:0,
    pwd:'wqs.2016',
    updateTime:new Date(),
    creatTime:new Date()
});

wqs_data.save(function (err) {
    if(!err){
        console.log(err+'--------success')
    }else{
        console.log(err)
    }
})
