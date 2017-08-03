const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const ViewCardType = require("./routes/view_card_types/ViewCardTypes");
const ViewCardTypes = new ViewCardType(app);
ViewCardTypes.initialize();

app.listen(3000, function() {
    console.log("Example app listening on port 3000!");
});