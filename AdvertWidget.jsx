import React, { useState, useEffect } from 'react';
import WidgetWrapper from 'components/WidgetWrapper';

class Player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}

function PlayerForm({ onSubmit, onUpdate, isEditMode, playerToEdit }) {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');

  useEffect(() => {
    if (isEditMode && playerToEdit) {
      setName(playerToEdit.name);
      setScore(playerToEdit.score);
    }
  }, [isEditMode, playerToEdit]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isEditMode) {
      onUpdate(playerToEdit, new Player(name, score));
    } else {
      onSubmit(new Player(name, score));
    }
    setName('');
    setScore('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Player name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Player score"
        value={score}
        onChange={e => setScore(parseInt(e.target.value))}
      />
      <button type="submit">{isEditMode ? 'Update' : 'Add Player'}</button>
    </form>
  );
}

function PlayerList({ players, onDelete, onEdit }) {
  return (
    <ul>
      {players.map(player => (
        <li key={player.name}>
          {player.name} - {player.score}
          <button onClick={() => onDelete(player)}>Delete</button>
          <button onClick={() => onEdit(player)}>Update</button>
        </li>
      ))}
    </ul>
  );
}

function TeamWidget() {
  const [players, setPlayers] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [playerToEdit, setPlayerToEdit] = useState(null);

  function handleAddPlayer(player) {
    setPlayers([...players, player]);
  }

  function handleDeletePlayer(player) {
    setPlayers(players.filter(p => p !== player));
  }

  function handleEditPlayer(player) {
    setIsEditMode(true);
    setPlayerToEdit(player);
  }

  function handleUpdatePlayer(oldPlayer, updatedPlayer) {
    setPlayers(players.map(player => {
      if (player.name === oldPlayer.name) {
        return updatedPlayer;
      }
      return player;
    }));
    setIsEditMode(false);
    setPlayerToEdit(null);
  }

  function calculateAverageScore() {
    if (players.length === 0) {
      return 0;
    }
    const totalScore = players.reduce((sum, player) => sum + player.score, 0);
    return totalScore / players.length;
  }

  function calculateMinimumScore() {
    if (players.length === 0) {
      return 0;
    }
    return Math.min(...players.map(player => player.score));
  }

  function calculateMaximumScore() {
    if (players.length === 0) {
      return 0;
    }
    return Math.max(...players.map(player => player.score));
  }

  return (
    <WidgetWrapper>
    <div>
      <h2>Team Widget</h2>
      <PlayerForm
        onSubmit={handleAddPlayer}
        onUpdate={handleUpdatePlayer}
        isEditMode={isEditMode}
        playerToEdit={playerToEdit}
      />
      {players.length > 0 ? (
        <div>
          <h3>Player List</h3>
          <PlayerList
            players={players}
            onDelete={handleDeletePlayer}
            onEdit={handleEditPlayer}
          />
        </div>
      ) : (
        <p>No players added yet.</p>
      )}
      <p><b>Average score: {calculateAverageScore()}</b></p>
      <p><b>Minimum score: {calculateMinimumScore()}</b></p>
      <p><b>Maximum score: {calculateMaximumScore()}</b></p>
    </div>
    </WidgetWrapper>
  );
}

export default TeamWidget;
