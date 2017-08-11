const sql = require("mssql");
const Validator = require("../../components/validator/Validator");

class AddNewCardRoute {
    constructor(expressApp) {
        this.app = expressApp;
    }

    initialize() {
        const config = {
            user: "test",
            password: "test",
            server: "localhost",
            database: "CardGame",
            port: 60654
        };

        this.app.post("/addnewcard", (req, res) => {
            let backendValidator = new Validator(req.body, (errorArray) => {
                if (errorArray.length == 0) {               

                        new sql.Request().query(`INSERT INTO [dbo].[CardType] (Name, Cost, Damage, Health, ImageIdentifier)
					VALUES ('${req.body.name}', ${req.body.cost}, ${req.body.damage}, ${req.body.health}, '${req.body.image}')`, (err, result) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            res.send("Success");
                            console.log("rerouting...");
                        });
                } else {
                    res.status(400).send(errorArray);
                    console.log("card Exists");
                }
            });

            backendValidator.isNameUnique = (name, callback) => {
             
                    new sql.Request().query(`SELECT COUNT(*) AS response FROM [dbo].[CardType] WHERE '${name}' = [dbo].[CardType].[Name]`, (err, result) => {
                        if (err) {
                            console.log(err);                       
                            return;
                        }
                        let isUnique = result.recordset[0].response == 0;                      
                        callback(isUnique);
                    });
        
            };
            backendValidator.initialize();
        });
    }
}

module.exports = AddNewCardRoute;