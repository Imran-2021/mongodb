//const username : dbuser 
//possword : uNIQuXXLFGnDk5ot
const express = require('express')
const { MongoClient } = require('mongodb');
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express()
app.use(cors())

const uri = "mongodb+srv://dbuser:uNIQuXXLFGnDk5ot@cluster0.s3qss.mongodb.net/backend-db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json())

app.get('/',(req, res)=>{
    res.send("hellow , i am using mongo-db ")
})

app.use(bodyParser.urlencoded({ extended: false }))
client.connect(err => {
  const collection = client.db("backend-db").collection("data-db");
  // perform actions on the collection object
  client.close();
});

app.listen(3000,()=>{
    console.log("done !!");
})