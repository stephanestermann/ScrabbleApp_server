let path = require('path'); 
let {db} = require("../database.js")
let moment = require('moment');

const {DBSOURCE} = require("../database.js")
let ResultStatistic = require('../models/resultStatistic.js');
const getAllSql ='select * from scrabble_results'
 

module.exports = {
    getResults: function (req, res) {
        db.all(getAllSql, [], function (err, rows) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({
                "message": "Resultate refolgreich gelesen",
                "data": rows
            })
        });
    },
    getSummarizedResults: function (req, res) {
        const sql = getSummarizedResultsSql(req)

        db.all(sql, [], function (err, rows) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            let resultAnica = new ResultStatistic(1);
            resultAnica.addRows(rows);
            let resultSteph = new ResultStatistic(2);
            resultSteph.addRows(rows);
            res.json({
                "message": "Resultate refolgreich gelesen",
                "data": [resultAnica, resultSteph]
            })
        });
    },
    getDatabase: function (req, res, next) {
        const fileName = DBSOURCE;
        const options = { 
            root: path.join(__dirname, '../') 
        }; 
        res.sendFile(fileName, options, function (err) { 
            if (err) { 
                next(err); 
            } else { 
                console.log('Sent:', fileName); 
            } 
        }); 
    }    
}

function getSummarizedResultsSql(req) {
    if (req.query && req.query.date) {
        let range
        let addUnit
        if (req.query && req.query.month) {
            range = 'month'
            addUnit = 'M'
        }
        if (req.query && req.query.year) {
            range = 'year'
            addUnit = 'y'
        }    
        if (range.length > 0) {
            const dateStart = moment(req.query.date).startOf(range)
            const dateEnd = dateStart.clone().add(1, addUnit)
            return getAllSql + " where game_date >= '" + dateStart.format('YYYY-MM-DD') + "' and game_date <= '" + dateEnd.format('YYYY-MM-DD') + "'"
        }
    }
    return getAllSql
}
