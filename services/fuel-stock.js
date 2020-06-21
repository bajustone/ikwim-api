const { getMSQLConnection } = require('../connections');
exports.receptionProduitBlanc = (req, res) => {
    let sqlQuery = `SELECT * FROM ReceptionProduitBlanc
	INNER JOIN ReceptionType on ReceptionProduitBlanc.ReceptionType = ReceptionType.receptionTypeId 
    INNER JOIN Product on ReceptionType.productId = Product.productId 
    WHERE  receptionProduitBlancDate = ? `

    const mysqlSession = getMSQLConnection();
    let date = req.query.date;
    let siteId = req.query.siteId;
    if(!date) {
        const today = new Date();
        
        date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    }
    const queryOptions = [date];

    if(siteId) {
        sqlQuery = `${sqlQuery} AND stationId = ?`;
        queryOptions.push(siteId);
    }
    
    
    mysqlSession.query(sqlQuery, queryOptions, function (error, results, fields) {
        if (error) {
            res.status(500).send(`Error caught: ${error}`);
        }
        mysqlSession.end();
        res.status(200).json(results);
    });
    

};

exports.receptionInCuves = (req, res) => {
    let sqlQuery = `SELECT * FROM ReceptionPerTour 
	INNER JOIN Cuve ON ReceptionPerTour.cuveId = Cuve.cuveId 
    INNER JOIN Station on Station.stationId = Cuve.stationId 
    INNER JOIN Product on Cuve.productId = Product.productId
    WHERE receptionProduiBlancId = ?`;
    
    const mysqlSession = getMSQLConnection();
    let receptionId = Number(req.params.receptionId);
    
    const queryOptions = [receptionId];

    
    
    mysqlSession.query(sqlQuery, queryOptions, function (error, results, fields) {
        if (error) {
            res.status(500).send(`Error caught: ${error}`);
        }
        mysqlSession.end();
        res.status(200).json(results);
    });
};




exports.siteReceptions = (req, res) => {
    let sqlQuery = `SELECT * FROM ReceptionPerTour 
	INNER JOIN Cuve ON ReceptionPerTour.cuveId = Cuve.cuveId 
    INNER JOIN Station on Station.stationId = Cuve.stationId 
    INNER JOIN Product on Cuve.productId = Product.productId
    INNER JOIN ReceptionProduitBlanc on ReceptionPerTour.receptionProduiBlancId = ReceptionProduitBlanc.receptionProduitBlancId
	WHERE ReceptionProduitBlanc.receptionProduitBlancDate = ? `;

    const mysqlSession = getMSQLConnection();
    let date = req.query.date;
    let siteId = req.query.siteId;
    if(!date) {
        const today = new Date();
        
        date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    }
    const queryOptions = [date];

    if(siteId) {
        sqlQuery = `${sqlQuery} AND ReceptionProduitBlanc.stationId = ?`;
        queryOptions.push(siteId);
    }
    
    
    mysqlSession.query(sqlQuery, queryOptions, function (error, results, fields) {
        if (error) {
            res.status(500).send(`Error caught: ${error}`);
        }
        mysqlSession.end();
        res.status(200).json(results);
    });
    

};
