var {db} = require("../database.js");
var moment = require('moment');
const {v4 : uuidv4} = require('uuid')

module.exports = {
    postResult: function (req, res) {
        if (!isValid(req, res)) {
            return;
        }
        const resultRecords = getRecords(req)
        const resultPlaceholders = resultRecords.map(() => "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").join(', ');
        const insertSql ='INSERT INTO scrabble_results' + 
            '(scrabbler_id, game_id, game_date, beginner, point, won, number_bingos, number_doubtes,' +
            ' number_wrong_doubtes, number_correct_doubtes, game_ended, left_points,' +
            ' largest_bingoscore, largest_non_bingoscore)' +
             'VALUES ' + resultPlaceholders
        let flatResults = [];
        resultRecords.forEach((arr) => { arr.forEach((item) => { flatResults.push(item) }) });

        db.serialize(function(){
            db.run(insertSql, flatResults, function (err, result) {
                if (err){
                    res.status(400).json({"error": err.message})
                    return;
                }
                res.json({
                    "message": "Resultate refolgreich gespeichert",
                    "data": result
                })
            });    
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
    const saveDate = moment();
    const gameId = uuidv4()
    let  records = [];

    [0,1].forEach(entry => {
        let record = [];
        record.push(body.scrabbler_ids[entry]);
        record.push(gameId)
        record.push(saveDate)
        record.push(body.beginner[entry]);
        record.push(body.points[entry]);
        record.push(body.won[entry]);
        record.push(body.number_bingos[entry]);
        record.push(body.number_doubtes[entry]);
        record.push(body.number_wrong_doubtes[entry]);
        record.push(body.number_correct_doubtes[entry]);
        record.push(body.game_ended[entry]);
        record.push(body.left_points[entry]);
        record.push(body.largestBingoScore[entry]);
        record.push(body.largestNonBingoScore[entry]);
        records.push(record);
    });
    return records;
}
