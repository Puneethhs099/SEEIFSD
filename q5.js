// const express = require('express');
// const app = express();
// const port = 3000;

// const prompt = require('prompt-sync')();
// app.use(express.json());

// class Player {
//   constructor(id, name, score) {
//     this.id = id;
//     this.name = name;
//     this.score = score;
//   }
// }

// let players = [];

// // POST - Create a new player
// app.post('/players', (req, res) => {
//   const id = players.length + 1;
//   const name = prompt('Enter player name: ');
//   const score = parseInt(prompt('Enter player score: '));

//   const player = new Player(id, name, score);
//   players.push(player);
//   res.status(201).json(player);
// });

// // GET - Get all players
// app.get('/players', (req, res) => {
//   res.json(players);
// });

// // GET - Get a specific player by ID
// app.get('/players/:id', (req, res) => {
//   const id = parseInt(req.params.id);

//   const player = players.find(player => player.id === id);
//   if (player) {
//     res.json(player);
//   } else {
//     res.status(404).json({});
//   }
// });

// // PUT - Update a player by ID
// app.put('/players/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const playerIndex = players.findIndex(player => player.id === id);

//   if (playerIndex !== -1) {
//     const name = prompt('Enter updated player name: ');
//     const score = parseInt(prompt('Enter updated player score: '));

//     players[playerIndex].name = name;
//     players[playerIndex].score = score;

//     res.json(players[playerIndex]);
//   } else {
//     res.status(404).json({ error: 'Player not found' });
//   }
// });

// // DELETE - Delete a player by ID
// app.delete('/players/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const playerIndex = players.findIndex(player => player.id === id);

//   if (playerIndex !== -1) {
//     const deletedPlayer = players.splice(playerIndex, 1);
//     res.json(deletedPlayer[0]);
//   } else {
//     res.status(404).json({});
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const prompt = require('prompt-sync')();

const app = express();
const port = 3000;

const uri = 'mongodb+srv://puneethhsbsc22:puneethhs9112004@cluster0.9zye9lm.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

app.use(express.json());

class Player {
  constructor(id, name, score) {
    this._id = id;
    this.name = name;
    this.score = score;
  }
}

let db;
let playersCollection;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('Teamplayer');
    playersCollection = db.collection('players');
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

connectToDatabase();

// POST - Create a new player
app.post('/players', async (req, res) => {
  const name = prompt('Enter player name: ');
  const score = parseInt(prompt('Enter player score: '));

  const player = new Player(null, name, score);
  const result = await playersCollection.insertOne(player);
  player._id = result.insertedId;

  res.status(201).json(player);
});

// GET - Get all players
app.get('/players', async (req, res) => {
  const players = await playersCollection.find().toArray();
  res.json(players);
});

// GET - Get a specific player by ID
app.get('/players/gbn', async (req, res) => {
    const Name = prompt('Enter the player name: ');
  const player = await playersCollection.findOne({name:Name});
  if (player) {
    res.json(player);
  } else {
    res.status(404).json({ error: 'Player not found' });
  }
});

// PUT - Update a player by ID
app.put('/players/ubn', async (req, res) => {
//   const name = req.params.name;
  const Name = prompt('Enter the player name: ');
  const Score = parseInt(prompt('Enter updated player score: '));

  const result = await playersCollection.updateOne(
    { name: Name },
    { $set: { score:Score } }
  );

  if (result.matchedCount > 0) {
    const updatedPlayer = await playersCollection.findOne({name: Name});
    res.json(updatedPlayer);
  } else {
    res.status(404).json({ error: 'Player not found' });
  }
});

// DELETE - Delete a player by ID
app.delete('/players/dbn', async (req, res) => {
    const Name = prompt('Enter the player name to delete: ');
  const result = await playersCollection.deleteOne({name:Name});
  if (result.deletedCount > 0) {
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Player not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
