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

function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: "UnAuthorized access" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (err) {
        return res.status(403).send({ message: "Forbidden access" });
      }
      req.decoded = decoded;
      next();
    });
  }
  
  const auth = {
    auth: {
      api_key:process.env.EMAIL_SENDER_KEY,
      domain: process.env.EMAIL_SENDER_DOMAIN,
    },
  };
  

async function run() {
  try {
    await client.connect();

    const productsCollection = client.db("masonry").collection("products");

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

    app.get("/admin", async (req, res) => {
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const product = await productsCollection.findOne(query);
        res.send(product);
    });
    app.get("/order", async (req, res) => {
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const product = await productsCollection.findOne(query);
        res.send(product);
    });
    app.get("/review", async (req, res) => {
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const product = await productsCollection.findOne(query);
        res.send(product);
    });
    app.get("/review", async (req, res) => {
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const product = await productsCollection.findOne(query);
        res.send(product);
    });
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
