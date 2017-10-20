/**
 * Created by wqs on 2017/10/19.
 */
var mongoose = require('mongoose');
const User = require('../db/user');

function test(req, params) {
    return new Promise(function (resolve, reject) {
        User.find({},function (err,docs) {
            if(err) console.log('find error')
        }).then(function (docs) {
            var newUser = new User({
                id:docs.length,
                nickName:'wqs',
            });
            newUser.save(function (err) {
                if(err)console.log('error');
                else console.log('成功');
                resolve(docs);
            })
        })
    });
}
function test2() {
    // 请求
    let request = require('request');
    let url = req.body.url;
    let formData = req.body.data;
    request.post({url:url, form: formData,json:true},function (error, response, body) {
        resolve(body);
    });
}
export {
    test,
    test2,
}