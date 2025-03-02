require("dotenv").config({ path: "./backend/.env.local" });
const CryptoJS = require("crypto-js");

// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// MongoDB setup
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongodbUser = process.env.MONGODB_USER;
const mongodbPassword = process.env.MONGODB_PASSWORD;
const mongodbCluster = process.env.MONGODB_CLUSTER;
const uri = `mongodb+srv://${mongodbUser}:${mongodbPassword}@${mongodbCluster}.wwhiw.mongodb.net/?retryWrites=true&w=majority&appName=${mongodbCluster}`;
console.log(uri);

// Serve static files from the 'public' folder
app.use(express.static("public"));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
async function retrieveReferralData(referralCode) {
  try {
    await client.connect();
    const database = client.db("patientDB");
    const collection = database.collection("patients.referrals");
    const query = { referralCode: referralCode };
    const referralData = await collection.findOne(query);
    return referralData;
  } finally {
    await client.close();
  }
}
async function storeResults() {
  try {
    const patientID = CryptoJS.SHA256(
      results.name.toUpperCase() + results.email.toUpperCase()
    ).toString(CryptoJS.enc.Hex);
    results.patientID = patientID;
    await client.connect();
    const database = client.db("patientDB");
    const collection = database.collection("patients.data");
    await collection.insertOne(results);
  } finally {
    await client.close();
  }
}

// Example endpoint to handle GET request
app.get("/api/data", (req, res) => {
  const data = {
    message: "Hello from the backend!",
  };
  res.json(data); // Send JSON response
});

// Valid HTTP POST request types
const RequestType = Object.freeze({
  PING: 0,
  FIND_REFERRAL: 1,
  STORE_RESULTS: 2,
  RESULT_CHUNK: 3,
});

// POST endpoint for receiving user data
app.post("/api/user", async (req, res) => {
  console.log("Received request");
  console.log(req.body);
  const requestType = req.body.requestType;
  const data = req.body.data;

  switch (requestType) {
    case RequestType.PING:
      res.status(200).json({ message: `Ping received at ${new Date()}` });
      break;
    case RequestType.FIND_REFERRAL:
      const referralData = await retrieveReferralData(data.referralCode);
      res.status(200).json(referralData);
      break;
    case RequestType.STORE_RESULTS:
      await storeResults();
      res.status(200).json({ message: "Data stored successfully" });
      break;
    case RequestType.DATA_CHUNK:
      receiveResults(data);
      res.status(200).json({ message: "Data chunk received" });
      break;
    default:
      res.status(400).json({ message: "Invalid request type" });
  }
});

const results = {
  name: "",
  email: "",
  data: {
    memory: {
      time: 0,
      accuracy: 0,
    },
    reaction: {
      time: 0,
      accuracy: 0,
    },
    processing: {
      time: 0,
      accuracy: 0,
    },
  },
};

function receiveResults(data) {
  console.log("Received results!");
  if (data.name) {
    results.name = data.name;
  }
  if (data.email) {
    results.email = data.email;
  }
  if (data.memory) {
    results.data.memory.time = data.memory.time;
    results.data.memory.accuracy = data.memory.accuracy;
  }
  if (data.reaction) {
    results.data.reaction.time = data.reaction.time;
    results.data.reaction.accuracy = data.reaction.accuracy;
  }
  if (data.processing) {
    results.data.processing.time = data.processing.time;
    results.data.processing.accuracy = data.processing.accuracy;
  }
}
