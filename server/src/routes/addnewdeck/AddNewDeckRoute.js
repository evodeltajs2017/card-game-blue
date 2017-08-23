const sql = require("mssql");

class AddNewDeckRoute {
    constructor(expressApp) {
        this.app = expressApp;
    }

    initialize(){

    	let cardResult = [];

    	this.app.get("/addnewdeck", (req, res) => {
    		var myQuery = `SELECT p.Id, q.Name, q.Cost FROM [dbo].[Card] AS p
    							INNER JOIN [dbo].[CardType] AS q 
    							ON p.CardTypeId = q.Id
    							ORDER BY p.Id`;

	        new sql.Request().query(myQuery, (err, result) => {
                console.log("err", err);
               	cardResult = result.recordset.map((x) => {
           	    	return {
	                    id: x.Id,
	                    name: x.Name,
	                    cost: x.Cost,	        
                	};
            	});
             //  	console.log("test", cardResult);
            res.json({ items: cardResult });
            
        	});

    	});
    

 
        this.app.post("/addnewdeck", (req, res) => {
            console.log("name is", req.body.name);
            let deckName = req.body.name;
            let cardIdArr = req.body.ids;
            console.log("ids is", req.body.ids);
            
            new sql.Request().query(`INSERT INTO [dbo].[Deck] ([Name]) OUTPUT INSERTED.ID VALUES ('${req.body.name}')`, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }

                let deckId = result.recordset[0].ID;
                let insertData = "";
                let lengthOfcardIdArr = cardIdArr.length;

                for (let i=0; i < cardIdArr.length-1; i++)
                    insertData += `(${deckId}, ${cardIdArr[i]}), `;
                insertData += `(${deckId}, ${cardIdArr[cardIdArr.length-1]})`;

                new sql.Request().query(`INSERT INTO [dbo].[DeckCards] ([DeckId], [CardId]) VALUES ${insertData}`, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    
                    res.json({
                        status: result.rowsAffected[0]
                    });
                });
            });
        });
    }
}

module.exports = AddNewDeckRoute;