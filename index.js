const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
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
  //get data --- 
  app.get('/products', (req, res)=>{
    collection.find({})
    .toArray((err, result)=>{
      res.send(result);
    })
  })
  // perform actions on the collection object

  //post ---- 
  app.post('/addProduct',(req, res)=>{
    const product = req.body;
    // console.log(product);
    collection.insertOne(product)
    .then(data=>{
      res.send("data added")
      console.log(data);
    })
  })

  app.get("/product/:id", (req, res)=>{
    collection.find({_id: ObjectId(req.params.id)})
    .toArray((err, result)=>{
      res.send(result[0]);
    })
  })

  app.delete("/delete/:id",(req,res)=>{
    // console.log(req.params.id);
    collection.deleteOne({_id: ObjectId(req.params.id)})
    .then((result)=>{
      console.log(result);
    })
  })
  console.log("database Connected");
});



app.listen(3000,()=>{
    console.log("done !!");
})