require('./models/Post')
require('./models/User')
const express = require('express');//importing express
//importing connecttoMonog function from db.js
const connectToMongo =require('./dbconnect');
connectToMongo();

const app = express();const port = 5000;//defining the port of localhost for backend
const cors = require('cors');
app.use(cors({
  'origin': '*',
}));
app.use(express.json())//express. json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.

// app.use("/api/auth", require("./routes/auth"));
app.use("/api/auth",require('./routes/auth'));
app.use("/routes/post",require('./routes/post'));
app.use("/routes/userpr",require('./routes/userpr'));


// app.get("/", (req, res) => {//request and response on the home page
//   res.send("Hello World!");
// });

app.listen(port, () => {//the app. listen() function is used to bind and listen the connections on the specified host and port. This method is identical to Node's http. Server.
  console.log(`Example app listening on port ${port}`);
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
  });
// // Require the cloudinary library
// const cloudinary = require('cloudinary').v2;

// cloudinary.config({ 
//   cloud_name: 'ycloud', 
//   api_key: '614353156711494', 
//   api_secret: '0695vvsfBs2PEWw77rCa2_TknTs' ,
//   secure: true
// });