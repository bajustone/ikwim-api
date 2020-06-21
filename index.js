const express = require("express");
const app = express();
const { getMSQLConnection } = require('./connections');
const {receptionProduitBlanc, receptionInCuves, siteReceptions} = require( "./services/fuel-stock");

app.use(express.json());

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App listenig on: ${port}`);
});
app.get("/", (req, res) => {
    res.json({status: "App and running"});
});
app.get("/payments/mobile", async (req, res) => {
    const mysqlSession = getMSQLConnection();
    let sqlQuery = "SELECT * FROM PaymentTour WHERE paymentDate=?";
    let date = req.query.date;
    let siteId = req.query.siteId;
    if(!date) {
        const today = new Date();
        
        date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    }
    const queryOptions = [date];

    if(siteId) {
        sqlQuery = `${sqlQuery} AND stationActivityId = ?`;
        queryOptions.push(siteId);
    }
    

    console.log(queryOptions);
    
    
    mysqlSession.query(sqlQuery, queryOptions, function (error, results, fields) {
        if (error) {
            res.status(500).send(`Error caught: ${error}`);
        }
        mysqlSession.end();
        res.status(200).json(results);
    });
    
    
});

app.get("/receptions/fuel", receptionProduitBlanc );
app.get("/reception/:receptionId", receptionInCuves );
app.get("/receptions/", siteReceptions );


