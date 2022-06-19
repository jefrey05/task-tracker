const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 8000;
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
        console.log(data)
     res.render("index.ejs",{info:data})
    })
})

app.post('/addTask',(req,res)=>{
    console.log(req.body)
})

app.listen(process.env.PORT || PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})