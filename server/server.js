var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var port = process.env.PORT || 3006;
// Avoir accès au donnée grâce à bodyparser et cors
app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
// Connexion a la BDD
const mongoURI =
  "mongodb+srv://Chris:ronaldinho@cluster0-g6d9f.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

var Contact = require("./routes/Contact");

app.use("/contacts", Contact);
// PORT
app.listen(port, () => {
  console.log("Server is running on port:" + port);
});
