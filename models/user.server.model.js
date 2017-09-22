/**
 * Created by wqs on 2017/7/4.
 */
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    id: { type : Number},
    nickname: {type: String,default: 'wqs'},
    header: {type: String,default: 'http://show-resource.mumov.com/1.png'},
    gender: {type: Number,default: 0},
    pwd: {type: String,default: '123456'},
    updateTime: {type: Date,default: new Date()},
    creatTime: {type: Date,default: new Date()}
});

mongoose.model('User',UserSchema);