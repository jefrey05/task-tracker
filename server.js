const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 3001;
require('dotenv').config();
const cors = require('cors');
app.use(cors());


let db,
dbConnectionString = process.env.DB_STRING,
dbName = 'task-list-db';

MongoClient.connect(dbConnectionString,{useUnifiedTopology: true})
.then(client=>{
    console.log(`connected to ${dbName} Database`)
    db = client.db(dbName)
})

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/',(req,res)=>{
    db.collection('tasks').find().toArray()
    .then(data=>{
       // console.log(data)
     res.render("index.ejs",{info:data})
    })
})

app.post('/addTask',(req,res)=>{
   db.collection('tasks').insertOne({task:req.body.task,status:'In progress'})
   .then(result=>{
    console.log("Task Added")
    res.redirect('/')
   })
})

app.delete('/deleteTask',(req,res)=>{
    db.collection('tasks').deleteOne({task: req.body.task,status: req.body.status})
    .then(result=>{
        console.log('Task Deleted');
        res.json('Task Deleted')
    })
    .catch(error=>console.error(error))
})

app.put('/updateTask',(req,res)=>{
   db.collection('tasks').updateOne({task: req.body.task},{
    $set: {
        status: 'Finished'
    }
   })
   .then(result=>{
    console.log("Updated Taks")
    res.json('Updated task')
   })
   .catch(error=> console.error(error))
})
app.listen(process.env.PORT || PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})