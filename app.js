/**
 * Created by wqs on 2017/10/20.
 */
import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import * as actions from './actions/index';
import mapUrl from './utils/mapUrl';
import bodyParser from 'body-parser';
import config from './config/config'

var app = express();
var router = express.Router();
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb,{ useMongoClient: true });

//允许跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/', function(res, rep) {
    rep.send('Hello, word!');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res) => {
    const splittedUrlPath = req.url.split('?')[0].split('/').slice(2);
    if(splittedUrlPath.length && splittedUrlPath[0] === 'api') {
        splittedUrlPath.shift()
    }
    const {action, params} = mapUrl(actions, splittedUrlPath);
    console.log(req.url);
    if (action) {
        action(req, params).then((result) => {
                if (result instanceof Function) {
                    result(res);
                } else {
                    res.json(result);
                }
            }, (reason) => {
                if (reason && reason.redirect) {
                    res.redirect(reason.redirect);
                } else {
                    console.error('API ERROR:', reason ? pretty.render(reason) : 'no error msg');
                    res.status(reason.status || 500).json(reason);
                }
            });
    } else {
        res.status(404).end('NOT FOUND');
    }

});

app.get('/test',function (req,res,next) {

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
})

app.listen(3000,function () {
    console.log('监听 3000 端口')
});