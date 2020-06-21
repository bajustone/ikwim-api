const { getMSQLConnection } = require('../connections');

app.get("/payments/mobile", async (req, res) => {
    const mysqlSession = getMSQLConnection();
    let sqlQuery = "SELECT * FROM `VentePompiste` WHERE ventePompisteDate>=? AND stationActivityId=?";
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
    
    
    mysqlSession.query(sqlQuery, queryOptions, function (error, results, fields) {
        if (error) {
            res.status(500).send(`Error caught: ${error}`);
        }
        mysqlSession.end();
        res.status(200).json(results);
    });
    
    
});
 