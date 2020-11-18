let path = require('path'); 
let {db} = require("../database.js")
const {DBSOURCE} = require("../database.js")

module.exports = {
    getResults: function (req, res) {
        const getAllSql ='select * from scrabble_results'

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

function isValid(req) {
    let errors=[]
    if (!req.body.scrabbler_ids[0] && req.body.scrabbler_ids[1]){
        errors.push("Missing scrabble user id's");
    }
    if (!req.body.points[0] && req.body.points[1]){
        errors.push("Missing game points");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return false;
    }
    return true;
}

function getRecords(req) {
    const body = req.body;
    let  records = [];
    [0,1].forEach(entry => {
        let record = [];
        record.push(body.scrabbler_ids[entry]);
        record.push(body.points[entry]);
        record.push(body.won[entry]);
        record.push(body.number_bingos[entry]);
        record.push(body.number_doubtes[entry]);
        record.push(body.number_wrong_doubtes[entry]);
        record.push(body.number_correct_doubtes[entry]);
        record.push(body.game_ended[entry]);
        record.push(body.left_points[entry]);
        records.push(record);
    });
    return records;
}
