const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// var nodemailer = require("nodemailer");
// const mg = require("nodemailer-mailgun-transport");
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@manosry.lqzku.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
  

async function run() {
  try {
    await client.connect();

    const productsCollection = client.db("masonry").collection("products");
    const ordersCollection = client.db("masonry").collection("orders");
    const usersCollection = client.db("masonry").collection("users");

    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = productsCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get("/product/:id", async (req, res) => {
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const product = await productsCollection.findOne(query);
        res.send(product);
    });

    app.post('/orders', async (req,res)=> {
        const orders = req.body;
        const result = await ordersCollection.insertOne(orders);
        res.send(result);
    })
    app.get('/orders', async (req,res)=> {
        const orders = await ordersCollection.find().toArray();
        res.send(orders);
    })

    app.post('/users', async(req,res)=>{
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.send('hello');
    })
    app.get('/users', async (req,res)=>{
        const users = await usersCollection.find().toArray();
        res.send(users);
    })
    app.get('/users/:email', async (req,res)=>{
        const email = req.params.email;
        const user = await usersCollection.findOne({email:email});
        res.send(user);
    })

  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Mansory started!");
});

app.listen(port, () => {
  console.log(`Masonry working at ${port}`);
});
