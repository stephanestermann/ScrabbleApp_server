class Result {
    constructor(rows){
       this.scrabblerId = rows.scrabbler_id;
       this.gameId = rows.game_id;
       this.gameDate = rows.game_date;
       this.beginner = rows.beginner;
       this.point = rows.point;
       this.won = rows.won;
       this.numberBingos = rows.number_bingos;
       this.numberDoubtes = rows.number_doubtes;
       this.numberCorrectDoubtes = rows.number_correct_doubtes;
       this.gameEnded = rows.game_ended;
       this.leftPoints = rows.left_points;
    }   
    print(){
       console.log('Name is :'+ this.scrabblerId);
    }
}