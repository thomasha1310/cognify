require("dotenv").config({ path: "./backend/.env.local" });

// server.js
const express = require("express");
const app = express();
const port = 3000;

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
    const database = client.db("referral");
    const collection = database.collection("referralData");
    const query = { referralCode: referralCode };
    const referralData = await collection.findOne(query);
    return referralData;
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
});

// POST endpoint for receiving user data
app.post("/api/user", async (req, res) => {
  const { requestType, data } = req.body;

  switch (requestType) {
    case RequestType.PING:
      res.status(200).json({ message: `Ping received at ${new Date()}` });
      break;
    case RequestType.FIND_REFERRAL:
      const referralData = await retrieveReferralData(data.referralCode);
      res.status(200).json(referralData);
      break;

    default:
      res.status(400).json({ message: "Invalid request type" });
  }
});
