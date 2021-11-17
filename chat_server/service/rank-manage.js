class RankManager {
    constructor() {
        this.rank = [
            {name: 'rophead', score: 1919},
            {name: 'jar', score: 1872},
            {name: 'trfg', score: 1334},
            {name: 'snowbe11', score: 1123},
            {name: 'jar-head', score: 892},
            {name: 'stike-LD', score: 516},
        ];
    }

    tryRegistRank = ({name, score}) => {
        this.rank.push({name, score});

        this.rank = this.rank.sort((a, b) => (a.score > b.score) ? 1 : 0);
    }

    getRank = (cut = 15) => {
        return this.rank.slice(0, cut);
    }
}

module.exports = new RankManager;