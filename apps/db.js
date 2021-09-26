var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/calendar";

var datebase;

const createDb = (callback) => {
    if (!datebase) {
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            console.log('数据库已创建');
            datebase = db;
            var dbase = db.db('calendar');
            !dbase.collection('eventList') && dbase.createCollection('eventList', (err, res) => {
                if (err) throw err;
                console.log('创建集合成功');
            })
            callback();
        })
        return;
    }
    callback();
}

const insert = (key, value) => {
    createDb(() => {
        var dbase = datebase.db('calendar');
        dbase.collection('eventList').insertOne({[key]: value}, (err, res) => {
            if (err) throw err;
            console.log('文档插入成功');
        })
    })
}

// db.close();

module.exports = {
    insert
};