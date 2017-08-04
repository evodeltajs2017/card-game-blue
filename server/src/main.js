const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();



app.use(cors());
app.use(bodyParser.json());

const SampleRoute = require("./routes/sample/SampleRoute");
const sampleRoute = new SampleRoute(app);
sampleRoute.initialize();

const AddNewCardRoute = require("./routes/addnewcard/AddNewCardRoute");
const addNewCardRoute = new AddNewCardRoute(app);
addNewCardRoute.initialize();

app.listen(3000, function() {
	console.log("Example app listening on port 3000!");
});