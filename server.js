require('dotenv').config();
const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let pool;
async function initDb(){
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10
  });
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'game.html'));
});

app.post('/api/score', async (req, res) => {
  try {
    const { score, levelReached, playerName } = req.body;
    if (typeof score !== 'number' || score < 0){
      return res.status(400).json({ error: 'Invalid score' });
    }
    const name = (typeof playerName === 'string' && playerName.trim().length > 0)
      ? playerName.trim().slice(0, 30)
      : 'Player';
    await pool.execute(
      'INSERT INTO scores (player_name, score, level_reached) VALUES (?, ?, ?)',
      [name, score, levelReached || 1]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not save score' });
  }
});

app.get('/api/leaderboard', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT player_name, score, level_reached, created_at FROM scores ORDER BY score DESC LIMIT 10'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load leaderboard' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Block Buster running at http://localhost:${PORT}`);
  });
});
