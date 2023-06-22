class Player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}
const prompt = require('prompt-sync')();
class Team {
  constructor(name) {
    this.name = name;
    this.players = [];
  }

  addPlayer(player) {
    this.players.push(player);
  }

  getAverageScore() {
    let totalScore = 0;
    for (let player of this.players) {
      totalScore += player.score;
    }
    return totalScore / this.players.length;
  }

  getMinimumScore() {
    let minScore = Infinity;
    for (let player of this.players) {
      if (player.score < minScore) {
        minScore = player.score;
      }
    }
    return minScore;
  }

  getMaximumScore() {
    let maxScore = -Infinity;
    for (let player of this.players) {
      if (player.score > maxScore) {
        maxScore = player.score;
      }
    }
    return maxScore;
  }

  promptForPlayers() {
    let numPlayers = parseInt(prompt("Enter number of players:"));
    for (let i = 0; i < numPlayers; i++) {
      let playerName = prompt(`Enter player ${i + 1} name:`);
      let playerScore = parseInt(prompt(`Enter player ${i + 1} score:`));
      this.addPlayer(new Player(playerName, playerScore));
    }
  }
}

function main() {
  let teamName = prompt("Enter team name:");
  let team = new Team(teamName);
  team.promptForPlayers();

  console.log(`Average score: ${team.getAverageScore()}`);
  console.log(`Minimum score: ${team.getMinimumScore()}`);
  console.log(`Maximum score: ${team.getMaximumScore()}`);
}

main();
