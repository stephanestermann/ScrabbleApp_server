module.exports = class ResultStatistic {
    constructor(scrabblerId) {
       this.scrabblerId = scrabblerId;
       this.beginner = 0;
       this.point = 0;
       this.won = 0;
       this.numberBingos = 0;
       this.numberDoubtes = 0;
       this.numberWrongDoubtes = 0;       
       this.numberCorrectDoubtes = 0;
       this.gameEnded = 0;
       this.leftPoints = 0;
    }
    addRows(rows) {
      rows.forEach(ele => {
         if(ele.scrabbler_id === this.scrabblerId) {
            ele.beginner ? this.beginner++ : null;
            this.point += ele.point;
            ele.won ? this.won++ : null;
            this.numberBingos += ele.number_bingos;
            this.numberDoubtes += ele.number_doubtes;
            this.numberCorrectDoubtes += ele.number_correct_doubtes;
            this.numberWrongDoubtes += ele.number_wrong_doubtes;
            ele.game_ended ? this.gameEnded++ : null;
            this.leftPoints += ele.left_points;
         }         
      });
    }
}