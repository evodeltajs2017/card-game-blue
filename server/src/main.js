const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const SampleRoute = require("./routes/sample/SampleRoute");
const sampleRoute = new SampleRoute(app);
sampleRoute.initialize();

const OpenPacksRoute = require("./routes/open-packs/OpenPacksRoute");
const openPacksRoute = new OpenPacksRoute(app);
openPacksRoute.initialize();

const DBConnection = require("../db_scripts/DBConnection.js");
const dbconnection = new DBConnection();

app.listen(3000, function() {
	dbconnection.initialize();
	console.log("Example app listening on port 3000!");
});