const express = require('express')
const { MongoClient } = require('mongodb');
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express()
app.use(cors())

const uri = "mongodb+srv://dbuser:imran12345@cluster0.s3qss.mongodb.net/backenddb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json())

app.get('/',(req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.use(bodyParser.urlencoded({ extended: false }))
client.connect(err => {
  const collection = client.db("backenddb").collection("datadb");
  // perform actions on the collection object

  collection.insertOne({
    name:"white-paper",price :25 ,
  })
  .then(() => {
      console.log("one product added");
  })
  console.log("database Connected");
});

app.listen(3000,()=>{
    console.log("done !!");
})