import connectToMongo from './dbconnect';//importing connecttoMonog function from db.js

connectToMongo();
import express, { json } from 'express';//importing express
const app = express();
const port = 5000;//defining the port of localhost for backend

import cors from 'cors';
app.use(cors())


app.use(json())//express. json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.


app.use("/api/auth", require("./routes/auth"));
app.get("/", (req, res) => {//request and response on the home page
  res.send("Hello World!");
});

app.listen(port, () => {//the app. listen() function is used to bind and listen the connections on the specified host and port. This method is identical to Node's http. Server.
  console.log(`Example app listening on port ${port}`);
});
