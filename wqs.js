/**
 * Created by wqs on 2017/6/23.
 */
var mongoose = require('mongoose');
var uri = "mongodb://localhost:27017";
mongoose.connect(uri);
var Wqs = new mongoose.Schema({
    nickname: String,
    header: String,
    gender: Number,
    pwd: String,
    updateTime: Date,
    creatTime: Date
});

var blogSchema = new mongoose.Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs:  Number
    }
});
mongoose.model('Wqs',Wqs);