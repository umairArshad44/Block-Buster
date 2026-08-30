# Block Buster

Brick breaker game built with Node.js, Express, and MySQL — scores are saved straight to the database, no login needed.

## Setup (VS Code, Windows)

1. Open this folder in VS Code.
2. Install dependencies:
   ```
   npm install
   ```
3. Create your MySQL database and table — open MySQL Workbench (or run via terminal) and execute the contents of `schema.sql`.
4. Copy `.env.example` to a new file named `.env`:
   ```
   copy .env.example .env
   ```
5. Edit `.env`:
   - `DB_PASSWORD` — your MySQL root (or user) password
   - `PLAYER_NAME` — the name saved with your scores on the leaderboard
6. Run the server:
   ```
   npm start
   ```
7. Open `http://localhost:3000` in your browser.

## How it works

- `/` — straight to the game, no login screen
- `/api/score` — saves score + level reached to MySQL when a run ends
- `/api/leaderboard` — returns the top 10 scores, shown after each game over

## Next steps if you want to extend it

- Deploy online (same as the gallery project's pending step)
- Add more levels or a power-up system
- Add sound effects
