const express = require('express');
const connectDB = require('./backend/Connection');
const app = express();

connectDB();
app.use(express.json({extended:false}));
app.use('/api/userModel',require('./Api/User'));
const Port =  process.env.Port || 3000;

app.listen(Port,() => console.log('Server Started'));

var path = require ('path');
var bodyParser = require('body-parser');
var mongo= require('mongoose');

var db = mongo.connect("mongofb://localhost:27017/AngularCRUD", function(err, response){
    if(err){console.log(err); }
    else{console.log('Connected to' +db, '+', response);}
});

app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));


app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Credentials', true);
    next();

});

var Schema = mongo.Schema;
var UsersSchema = new Schema({
    name: { type: String },
    address: { type: String },
},{ versionKey: false});

var model = mongo.model ('users', UsersSchema, 'users');

app.post("/api/SaveUser",function(req, res){
    var mod = new model(req.body);
    if (req.body.mode =="Save")
    {
        mod.save(function(err, data){
            if (err){
                res.send(err);

            }
            else{
                res.send({data: "Record has been Inserted..!!"});
            }
        });
    }
    else
    {
        model.findByAndUpdate(req.body.id, {name: req.body.name, address: req.body.address},
            function(err,data){
                if(err){
                    res.send(err);
                }
                else{
                    res.send({data:"Record has been Updated..!!"});
                }
            });
    }
})

app.post("/api/deleteUser",function(req,res){
    model.remove({ _id: req.body.id}, function(err){
        if(err){
            res.send(err)
        }
        else{
            res.send({data:"Record has been Deleted..!!"});
        }
    });
})


app.get("/api/getUser", function(req,res){
    model.find({}, function(err, data){
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
})

app.listen(8080, function () {
    console.log('Example app listening on port 8080')
})