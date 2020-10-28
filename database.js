var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite.scrabbleapp"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.debug('Connected to the SQLite database (Stephs Scrabble App).')
        db.run(`CREATE TABLE scrabble_results (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    scrabbler_id INTEGER NOT NULL,
                    point INTEGER NOT NULL,
                    won BOOLEAN NOT NULL CHECK (won IN (0,1)),
                    number_bingos INTEGER,
                    number_doubtes INTEGER,
                    number_wrong_doubtes INTEGER,
                    number_correct_doubtes INTEGER,  
                    game_ended BOOLEAN NOT NULL CHECK (won IN (0,1)),
                    left_points INTEGER
                )`,
        (err) => {
            if (err) {
                // Table already created
                console.debug('Table already created. Nothing to do. ' + err)
            } else {
                console.log('Table new created.')
            }
        });  
    }
});


module.exports = db
