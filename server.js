// server.js
const express = require("express");
const app = express();
const port = 3000;

// Serve static files from the 'public' folder
app.use(express.static("public"));

// Example endpoint to handle GET request
app.get("/api/data", (req, res) => {
  const data = {
    message: "Hello from the backend!",
  };
  res.json(data); // Send JSON response
});

// POST endpoint example
app.post("/api/data", (req, res) => {
  const userData = req.body;
  console.log("Received data:", userData);
  res.status(200).json({ message: "Data received successfully" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
