module.exports = class ResultStatistic {
    constructor(scrabblerId) {
       this.scrabblerId = scrabblerId;
       this.totBegins = 0;
       this.totPoints = 0;
       this.totWins = 0;
       this.totBingos = 0;
       this.totDoubtes = 0;
       this.totWrongDoubtes = 0;       
       this.totCorrectDoubtes = 0;
       this.totGamesEnded = 0;
       this.totLeftPoints = 0;
       this.largestBingoScore = 0;
       this.largestNonBingoScore = 0;
    }
    addRows(rows) {
      rows.forEach(ele => {
         if(ele.scrabbler_id === this.scrabblerId) {
            ele.beginner ? this.totBegins++ : null;
            this.totPoints += ele.point;
            ele.won ? this.totWins++ : null;
            this.totBingos += ele.number_bingos;
            this.totDoubtes += ele.number_doubtes;
            this.totCorrectDoubtes += ele.number_correct_doubtes;
            this.totWrongDoubtes += ele.number_wrong_doubtes;
            ele.game_ended ? this.totGamesEnded++ : null;
            this.totLeftPoints += ele.left_points;
            this.largestBingoScore = (ele.largest_bingoscore > this.largestBingoScore) ?
               ele.largest_bingoscore : this.largestBingoScore;
            this.largestNonBingoScore = (ele.largest_non_bingoscore > this.largestNonBingoScore) ?
               ele.largest_non_bingoscore : this.largestNonBingoScore;
         }         
      });
    }
}