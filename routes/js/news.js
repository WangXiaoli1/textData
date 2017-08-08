var express = require('express');
var mysql=require('mysql');
var router=express.Router();

var pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'exam',
    port:3306
});

router.post("/",function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    pool.query(`SELECT * from news`, function(err, rows, fields) {
        if (err) throw err;
        res.send(rows)
    });
});

router.post("/news1",function(req,res){
    var id=req.body['id'];
    res.header("Access-Control-Allow-Origin", "*");
    pool.query(`SELECT * from news where id=${id}`, function(err, rows, fields) {
        if (err) throw err;
        res.send(rows)
    });
});

router.post('/upNews',function(req,res){
    var id=req.body["id"];
    var title=req.body["title"];
    var content=req.body["content"];
    res.header("Access-Control-Allow-Origin", "*");
    pool.query(`update news set title='${title}',content='${content}' where id=${id}`, function(err, rows, fields) {
        if (err) throw err;
        res.send("修改成功")
    });
});

router.post('/delNews',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    var id=req.body["id"]
    pool.query(`DELETE from news where id=${id}`,function(err,rows){
        pool.query(`SELECT * from news`,function(err,rows){
            if(err) throw err;
            res.send(rows);
        })
    });

});
module.exports=router;


