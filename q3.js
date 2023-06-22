const prompt = require('prompt-sync')();

class Player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}

class Team {
  constructor(name) {
    this.name = name;
    this.players = [];
  }

  promptForPlayers() {
    let numPlayers = parseInt(prompt("Enter number of players:"));
    for (let i = 0; i < numPlayers; i++) {
      let playerName = prompt(`Enter player ${i + 1} name:`);
      let playerScore = parseInt(prompt(`Enter player ${i + 1} score:`));
      this.addPlayer(new Player(playerName, playerScore));
    }
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
}

const mongoose = require('mongoose')
database='Teams'
url=`mongodb+srv://puneethhsbsc22:puneethhs9112004@cluster0.9zye9lm.mongodb.net/${database}?retryWrites=true&w=majority`

database = mongoose.connect(url)
console.log("Connected to Database")

const coll_schema = new mongoose.Schema(
  {
      Name:String,
      Score:Number,
  }
)

const collection = new mongoose.model("Insane",coll_schema);

async function inserting_data(s)
{
    for(let i=0;i<s.players.length;i++)
    {
        let doc = new collection(
            {
                Name:s.players[i].name,
                Score:s.players[i].score,
            }
        )
        await doc.save();
    }
    await console.log("Inserted Documents");
}

async function readTeam(name) {


    let team = await collection.findOne({ name });
    console.log(`Found team with name '${name}':`, team);

}

async function updateTeam() {

    let name = prompt("Select name of the player: ");
    let score = Number(prompt("Select score of the Student: "));
    await collection.updateOne({Name:name},{$set:{Score:score}});
    await console.log("Updated the Record")
    result = await collection.find({Score:score}).toArray();
    await console.log(result);

}

async function deleteTeam() {

    let name = prompt("Select name of the player: ");
    await collection.deleteOne({Name:name});
    await console.log("Deleted Record")

}

function main() {
  let teamName = prompt("Enter team name:");
  let team = new Team(teamName);
  // team.promptForPlayers();
  // inserting_data(team);
  readTeam();
  // deleteTeam();
  // updateTeam();

}

main();