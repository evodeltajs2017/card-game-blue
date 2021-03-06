const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PlayGame = require("./routes/play_game/PlayGame");
const playGame = new PlayGame(app);
playGame.initialize();

const ViewCardType = require("./routes/view_card_types/ViewCardTypes");
const ViewCardTypes = new ViewCardType(app);
ViewCardTypes.initialize();

const OpenPacksRoute = require("./routes/open-packs/OpenPacksRoute");
const openPacksRoute = new OpenPacksRoute(app);
openPacksRoute.initialize();

const SampleRoute = require("./routes/sample/SampleRoute");
const sampleRoute = new SampleRoute(app);
sampleRoute.initialize();

const AddNewCardRoute = require("./routes/addnewcard/AddNewCardRoute");
const addNewCardRoute = new AddNewCardRoute(app);
addNewCardRoute.initialize();

const ViewDecks = require("./routes/view-decks/ViewDecks");
const viewDecks = new ViewDecks(app);
viewDecks.initialize();

const AddNewDeckRoute = require("./routes/addnewdeck/AddNewDeckRoute.js");
const addNewDeckRoute = new AddNewDeckRoute(app);
addNewDeckRoute.initialize();

const CreateArenaDeckRoute = require("./routes/create-arena-deck/CreateArenaDeckRoute.js");
const newDeckRoute = new CreateArenaDeckRoute(app);
newDeckRoute.initialize();

const DBConnection = require("../db_scripts/DBConnection.js");
const dbconnection = new DBConnection();

const ViewCards = require("./routes/view-cards/ViewCardsRoute");
const viewCards = new ViewCards(app);
viewCards.initialize();

app.listen(3000, function() {
    dbconnection.initialize();
    console.log("Example app listening on port 3000!");
});