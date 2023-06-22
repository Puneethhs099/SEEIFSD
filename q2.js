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

const {MongoClient} = require('mongodb');
url="mongodb+srv://puneethhsbsc22:puneethhs9112004@cluster0.9zye9lm.mongodb.net/?retryWrites=true&w=majority";
  
const client = new MongoClient(url, { useNewUrlParser: true });
const database = client.db('Teams');
const collection = database.collection('Top');

async function createTeam(team) {
  try {
    await client.connect();
    const db = client.db('Teams');
    const collection = db.collection('Top');
    let result = await collection.insertOne(team);
    console.log(`Created team with id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

async function inserting_data(s)
{
    data=[]
    for(let i=0;i<s.players.length;i++)
    {
        data.push({Name:s.players[i].name,Score:s.players[i].score});
    }
    result = await collection.insertMany(data);
    await console.log("Inserted the Data");
}

async function readTeam(name) {
  try {
    await client.connect();
    const db = client.db('Teams');
    const collection = db.collection('Top');
    let team = await collection.findOne({ name });
    console.log(`Found team with name '${name}':`, team);
  } finally {
    await client.close();
  }
}

async function updateTeam(name, update) {
  try {
    await client.connect();
    const db = client.db('Teams');
    const collection = db.collection('Top');
    let name = prompt("Select name of the player: ");
    let score = Number(prompt("Select score of the Student: "));
    await collection.updateOne({Name:name},{$set:{Score:score}});
    await console.log("Updated the Record")
    result = await collection.find({Score:score}).toArray();
    await console.log(result);
  } finally {
    await client.close();
  }
}

async function deleteTeam(name) {
  try {
    await client.connect();
    const db = client.db('Teams');
    const collection = db.collection('Top');
    let name = prompt("Select name of the player: ");
    await collection.deleteOne({Name:name});
    await console.log("Deleted Record")
  } finally {
    await client.close();
  }
}


function main() {
  let teamName = prompt("Enter team name:");
  let team = new Team(teamName);
  team.promptForPlayers();
  // inserting_data(team);
  // deleteTeam();
  // updateTeam();

}

main(); 