const server = require("./app");
require('dotenv').config()

const PORT = process.env.PORT || 3000;

// connect to database 
// I had made a mongoDb Atlas cluster to store user data but to keep it simple I have used a json file to store user data
// const connectDB = require("./database/db");

// connectDB();

// start the server

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});