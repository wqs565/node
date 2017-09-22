/**
 * Created by wqs on 2017/7/4.
 */
var express = require('express');
var app = express();
var router = express.Router();

var mongoose = require('./config/mongoose');

var db = mongoose();
var mongo = require('mongoose');
var User = mongo.model('User');
var fs = require('fs');

//允许跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// app.get('/', function(res, rep) {
//
//     rep.send('Hello, word!');
// });
app.get("/", function(request, response) {
    fs.readFile("./dist/index.html",function(err,data){
        // body
        if(err){
            console.log(err);
            //404：NOT FOUND
            response.writeHead(404,{"Content-Type":"text/html"});
        }
        else{
            //200：OK
            response.writeHead(200,{"Content-Type":"text/html"});
            response.write(data.toString());
        }
        response.end();
    });
});

app.use('/static', express.static('dist'));

app.post('/test',function (req,res,next) {

        User.find({},function (err,docs) {

            if(err){
                console.log('find error')
            }else{
                console.log(docs.length);

            }
        }).then(function (docs) {
            console.log(docs);
            console.log(docs.length);
            var newUser = new User({
                id:docs.length,
                header: 'test',
                gender: 0,
                pwd: '123456',
                updateTime: new Date(),
                creatTime: new Date()
            });
            newUser.save(function (err) {
                if(err)console.log('error');
                else console.log('成功');
                res.json(docs);
            })
        })


    // User.find({},function (err,docs) {
    //
    //     if(err){
    //         console.log('find error')
    //     }else{
    //         console.log(docs.length);
    //         var newUser = new User({
    //             numId:docs.length,
    //             header: 'test',
    //             gender: 0,
    //             pwd: '123456',
    //             updateTime: new Date(),
    //             creatTime: new Date()
    //         });
    //         newUser.save(function (err) {
    //             if(err)console.log('error');
    //             else console.log('成功');
    //             res.json(docs);
    //         })
    //     }
    // });

    // return new Promise((resolve, reject) => {
    //
    //
    //     User.aggregate([{$group : {_id : "$_id",count:{$sum:'$_id'} }}],(err,idCount)=>{
    //         if(err) reject(err);
    //         else console.log(idCount); resolve(idCount) ;
    //     })
    // })

    // 移除
    // user.remove({nickane:'wqs'},(err)=>{
    //     console.log('---clean db ---------------------------------------');
    //     if (err) {
    //         console.log('Phone remove all occur a error:', err);
    //     } else {
    //         console.log('remove all success.');
    //             User.find({},function (err,docs) {
    //                 if(err){
    //                     console.log('find error')
    //                 }else{
    //                     res.json(docs);
    //
    //                 }
    //             })
    //
    //     }
    // });
    // User.save(function (err) {
    //     if(err){
    //         console.log('error')
    //     }
    //     User.find({},function (err,docs) {
    //         if(err){
    //             console.log('find error')
    //         }else{
    //             res.json(docs);
    //
    //         }
    //     })
    // })
    // user.find({nickname:'wqsong'},function (err,docs) {
    //     if(err){
    //
    //     }else{
    //         res.json(docs);
    //     }
    // })

        // User.find({},function (err,docs) {
        //     if(err){
        //         console.log('find error')
        //     }else{
        //         res.json(docs);
        //     }
        // })

})

app.listen(3000,function () {
    console.log('监听 3000 端口')
});