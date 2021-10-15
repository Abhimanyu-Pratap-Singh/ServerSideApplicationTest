const express = require('express')
const { MongoClient , ObjectId } = require('mongodb')
const route = express.Router()

var url = "mongodb+srv://AbhimanyuLearner:AbhimanyuLearner@abhimanyucluster1.adg8i.mongodb.net/EmpDB?retryWrites=true&w=majority"

route.get('/',(req,res)=>{

    MongoClient.connect(url,(error,cluster)=>{
        if(error){
            res.send("Connection with DB Failed")
        }
        else{
            cluster.db('EmpDB').collection('EmpCollection').find().toArray((err,response)=>{
                if(err){
                    res.send("Error while accessing the data")
                }
                else{
                    res.send(response)
                }
            })
        }
    })
})

route.get('/getsUser/:id',function(req,res){
    var id = req.params.id
    MongoClient.connect(url,(error,cluster)=>{
        if(error){
            res.send("Connection with DB Failed")
        }
        else{
            cluster.db('EmpDB').collection('EmpCollection').findOne({_id: ObjectId(id)},(err,success)=>{
                if(err){
                    res.send("Error while getting data")
                }else{
                    res.send(success)
                }
            })
        }
    })
})

route.put('/update/:id',function(req,res){
    var id = req.params.id
    var name = req.query.uname
    var password = req.query.upassword
    var updatedData = {
        name : name,
        password : password
    }
    MongoClient.connect(url,(error,cluster)=>{
        if(error){
            res.send("Connection with DB Failed")
        }
        else{
            cluster.db('EmpDB').collection('EmpCollection').updateOne({_id: ObjectId(id)},{
                $set:updatedData
            },(err,success)=>{
                if(err){
                    res.send("Error while Updating data")
                }else{
                    res.send("success")
                }
            })
        }
    })
})
//http://localhost:8000/user/userdata

route.post('/userdata',(req,res)=>{

    var data = req.body.udata

    MongoClient.connect(url,(error,cluster)=>{
        if(error){
            res.send("Error fetching data from database")
        }
        else{
            cluster.db('EmpDB').collection('EmpCollection').insertOne(data,(err,success)=>{
                if(err){
                    res.send("error while insering data")
                }
                else{
                    res.send("data inserted successfully")
                }
            })
        }
    })

})

route.delete('/delete/:id',(req,res)=>{
    var id = req.params.id
    MongoClient.connect(url,(error,cluster)=>{
        if(error){
            res.send("Error While Connecting to DB")
        }else{
            cluster.db('EmpDB').collection('EmpCollection').deleteOne({_id: ObjectId(id)},(err,sucess)=>{
                if(err){
                    res.send("Error while deleting the record")
                }
                else{
                    res.send("Deleted SuccessFully!")
                }
            })
        }
    })
})

module.exports = route