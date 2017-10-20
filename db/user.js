/**
 * Created by wqs on 2017/10/20.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: { type : Number},
    openid: {type: String, default: '', trim: true}, //小程序平台openid
    service_openid: {type: String, default: '', trim: true}, //服务号平台的openid
    nickName: {type: String, default: '', trim: true},
    avatarUrl: {type: String, default: '', trim: true},
    gender: {type: Number, default: 0, trim: true},
    province: {type: String, default: '', trim: true},
    city: {type: String, default: '', trim: true},
    country: {type: String, default: '', trim: true},
    unionId: {type: String, default: '', trim: true}, //小程序的unionId 对应于 服务号的 unionid 请注意大小写

    points: {type: Number, default: 500}, //账户积分 默认500分
    totalGold: {type: Number, default: 0}, //账户金币
    goldTimes: {type: Number, default: 10}, //抽奖次数

    cash: {type: Number, default: 0}, //入账的总金额

    remindDays: {type: Number, default: 5},
    remindTime: {type: String, default: '08:00', trim: true},

    updatedAt: {type: Date},
    createdAt: {type: Date, default: new Date().toLocaleString()},
    // temp attribute
    buys: {type: Array, default: []},
    buysCount: {type: Number, default: 0, trim: true},
    isNewUser: {type: Boolean, default: false}
});
// methods
UserSchema.methods = {

};
// statics
UserSchema.statics = {
    loadById: function(id, cb) {
        this.findOne({
            _id: id
        }).exec(cb)
    },
};

module.exports = mongoose.model('User', UserSchema);