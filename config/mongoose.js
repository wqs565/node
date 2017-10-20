/**
 * Created by wqs on 2017/7/4.
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var config = require('./config.js');

module.exports = function () {
    var db = mongoose.connect(config.mongodb,{ useMongoClient: true });

    require('../models/user.server.model');
    return db;
};

