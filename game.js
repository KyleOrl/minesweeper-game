class Minesweeper {
    constructor() {
        this.width = 16;
        this.height = 16;
        this.mines = 40;
        this.board = [];
        this.revealed = [];
        this.flagged = [];
        this.gameOver = false;
        this.gameWon = false;
        this.startTime = null;
        this.timerInterval = null;
        this.soundEnabled = true;
        this.particlesEnabled = true;
        this.streak = 0;
        this.lastFlagWasSafe = false;
        
        this.initializeEventListeners();
        this.createNewGame();
    }

    initializeEventListeners() {
        document.getElementById('newGameBtn').addEventListener('click', () => this.createNewGame());
        document.getElementById('difficulty').addEventListener('change', (e) => this.handleDifficultyChange(e));
        document.getElementById('soundBtn').addEventListener('click', () => this.toggleSound());
        document.getElementById('particlesToggle').addEventListener('change', (e) => {
            this.particlesEnabled = e.target.checked;
        });
    }

    handleDifficultyChange(e) {
        const difficulty = e.target.value;
        const customSettings = document.getElementById('customSettings');
        
        if (difficulty === 'custom') {
            customSettings.style.display = 'grid';
        } else {
            customSettings.style.display = 'none';
            const settings = {
                beginner: { width: 8, height: 8, mines: 10 },
                intermediate: { width: 16, height: 16, mines: 40 },
                expert: { width: 16, height: 30, mines: 99 }
            };
            Object.assign(this, settings[difficulty]);
        }
        this.createNewGame();
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const btn = document.getElementById('soundBtn');
        btn.classList.toggle('active', this.soundEnabled);
        btn.textContent = this.soundEnabled ? '🔊 Sound' : '🔇 Muted';
        if (this.soundEnabled) {
            AudioManager.playClick();
        }
    }

    createNewGame() {
        // Get custom settings if custom difficulty
        const difficulty = document.getElementById('difficulty').value;
        if (difficulty === 'custom') {
            this.width = parseInt(document.getElementById('width').value);
            this.height = parseInt(document.getElementById('height').value);
            this.mines = parseInt(document.getElementById('mines').value);
        }

        this.board = Array(this.height).fill(null).map(() => Array(this.width).fill(0));
        this.revealed = Array(this.height).fill(null).map(() => Array(this.width).fill(false));
        this.flagged = Array(this.height).fill(null).map(() => Array(this.width).fill(false));
        this.gameOver = false;
        this.gameWon = false;
        this.startTime = null;
        this.streak = 0;
        this.lastFlagWasSafe = false;
        this.updateStreakDisplay();
        
        if (this.timerInterval) clearInterval(this.timerInterval);
        
        this.render();
        this.updateStats();
        this.updateStatus('Ready');
    }

    placeMines() {
        let minesPlaced = 0;
        while (minesPlaced < this.mines) {
            const x = Math.floor(Math.random() * this.width);
            const y = Math.floor(Math.random() * this.height);
            if (this.board[y][x] !== 'M') {
                this.board[y][x] = 'M';
                minesPlaced++;
            }
        }
        this.calculateNumbers();
    }

    calculateNumbers() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.board[y][x] !== 'M') {
                    let count = 0;
                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            const ny = y + dy;
                            const nx = x + dx;
                            if (ny >= 0 && ny < this.height && nx >= 0 && nx < this.width) {
                                if (this.board[ny][nx] === 'M') count++;
                            }
                        }
                    }
                    this.board[y][x] = count;
                }
            }
        }
    }

    startGame() {
        if (!this.startTime) {
            this.placeMines();
            this.startTime = Date.now();
            this.updateStatus('Playing');
            this.startTimer();
            AudioManager.playReveal();
        }
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            const seconds = Math.floor((Date.now() - this.startTime) / 1000);
            document.getElementById('timer').textContent = seconds + 's';
        }, 100);
    }

    revealCell(x, y) {
        if (this.gameOver || this.gameWon || this.revealed[y][x] || this.flagged[y][x]) {
            return;
        }

        if (!this.startTime) {
            this.startGame();
        }

        const value = this.board[y][x];

        if (value === 'M') {
            this.endGame(false, x, y);
            return;
        }

        this.revealed[y][x] = true;
        AudioManager.playClick();
        this.streak = 0;
        this.updateStreakDisplay();

        if (value === 0) {
            this.floodFill(x, y);
        }

        this.checkWin();
        this.render();
        this.updateStats();
    }

    floodFill(x, y) {
        const queue = [[x, y]];
        const visited = new Set();

        while (queue.length > 0) {
            const [cx, cy] = queue.shift();
            const key = `${cx},${cy}`;

            if (visited.has(key)) continue;
            visited.add(key);

            if (cx < 0 || cx >= this.width || cy < 0 || cy >= this.height) continue;
            if (this.revealed[cy][cx]) continue;

            this.revealed[cy][cx] = true;

            if (this.board[cy][cx] === 0) {
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        queue.push([cx + dx, cy + dy]);
                    }
                }
            }
        }
    }

    toggleFlag(x, y) {
        if (this.gameOver || this.gameWon || this.revealed[y][x]) {
            return;
        }

        if (!this.startTime) {
            this.startGame();
        }

        this.flagged[y][x] = !this.flagged[y][x];

        if (this.flagged[y][x]) {
            // Flag placed
            AudioManager.playFlag();
            
            // Check if it's a safe cell (not a mine)
            const isSafe = this.board[y][x] !== 'M';
            
            if (isSafe) {
                this.streak++;
                this.lastFlagWasSafe = true;
                
                // Trigger special effects at streak milestones
                if (this.streak === 5) {
                    AudioManager.playCombo();
                    if (this.particlesEnabled) {
                        ParticleSystem.burst(event?.clientX || window.innerWidth / 2, event?.clientY || window.innerHeight / 2, 'gold');
                    }
                } else if (this.streak === 10) {
                    AudioManager.playCombo();
                    if (this.particlesEnabled) {
                        ParticleSystem.burst(event?.clientX || window.innerWidth / 2, event?.clientY || window.innerHeight / 2, 'rainbow');
                    }
                } else if (this.streak > 5) {
                    if (this.particlesEnabled) {
                        ParticleSystem.burst(event?.clientX || window.innerWidth / 2, event?.clientY || window.innerHeight / 2, 'blue');
                    }
                }
            } else {
                // Flagged a mine - reset streak
                this.streak = 0;
                this.lastFlagWasSafe = false;
            }
        } else {
            // Flag removed
            AudioManager.playClick();
            this.streak = Math.max(0, this.streak - 1);
        }

        this.updateStreakDisplay();
        this.render();
        this.updateStats();
    }

    updateStreakDisplay() {
        const display = document.getElementById('streakDisplay');
        if (this.streak > 0) {
            display.style.display = 'block';
            document.getElementById('streakCounter').textContent = this.streak;
            
            const multiplier = Math.floor(this.streak / 5) + 1;
            document.getElementById('streakMultiplier').textContent = multiplier + 'x';
        } else {
            display.style.display = 'none';
        }
    }

    endGame(won, mineX, mineY) {
        this.gameOver = true;
        if (!won) {
            this.gameWon = false;
            // Reveal all mines
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    if (this.board[y][x] === 'M') {
                        this.revealed[y][x] = true;
                    }
                }
            }
            this.updateStatus('Lost');
            AudioManager.playLose();
            
            if (this.particlesEnabled && mineX !== undefined && mineY !== undefined) {
                const cellElement = document.querySelector(`[data-x="${mineX}"][data-y="${mineY}"]`);
                if (cellElement) {
                    const rect = cellElement.getBoundingClientRect();
                    ParticleSystem.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 'red');
                }
            }
        } else {
            this.gameWon = true;
            this.updateStatus('Won');
            AudioManager.playWin();
            
            if (this.particlesEnabled) {
                // Burst multiple times
                setTimeout(() => ParticleSystem.burst(window.innerWidth / 2, window.innerHeight / 2, 'rainbow'), 100);
                setTimeout(() => ParticleSystem.burst(window.innerWidth / 3, window.innerHeight / 3, 'gold'), 200);
                setTimeout(() => ParticleSystem.burst((window.innerWidth * 2) / 3, (window.innerHeight * 2) / 3, 'blue'), 300);
            }
        }

        if (this.timerInterval) clearInterval(this.timerInterval);
        this.render();
    }

    checkWin() {
        let unrevealedSafe = 0;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (!this.revealed[y][x] && this.board[y][x] !== 'M') {
                    unrevealedSafe++;
                }
            }
        }
        if (unrevealedSafe === 0) {
            this.endGame(true);
        }
    }

    updateStats() {
        document.getElementById('mineCount').textContent = this.mines - this.getFlags();
        document.getElementById('flagCount').textContent = this.getFlags();
    }

    updateStatus(status) {
        const statusElement = document.getElementById('status');
        statusElement.textContent = status;
        statusElement.className = 'value status-' + status.toLowerCase();
    }

    getFlags() {
        let count = 0;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.flagged[y][x]) count++;
            }
        }
        return count;
    }

    render() {
        const boardElement = document.getElementById('gameBoard');
        boardElement.innerHTML = '';
        boardElement.style.gridTemplateColumns = `repeat(${this.width}, 1fr)`;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.x = x;
                cell.dataset.y = y;

                if (this.flagged[y][x]) {
                    cell.classList.add('flagged');
                } else if (this.revealed[y][x]) {
                    cell.classList.add('revealed');
                    const value = this.board[y][x];
                    if (value === 'M') {
                        cell.classList.add('mine');
                        cell.textContent = '💣';
                    } else if (value > 0) {
                        cell.classList.add(`number-${value}`);
                        cell.textContent = value;
                    }
                }

                // Mouse events
                cell.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.revealCell(x, y);
                });

                cell.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    this.toggleFlag(x, y);
                });

                // Touch events for mobile
                let touchStartTime = 0;
                cell.addEventListener('touchstart', (e) => {
                    touchStartTime = Date.now();
                });

                cell.addEventListener('touchend', (e) => {
                    const touchDuration = Date.now() - touchStartTime;
                    if (touchDuration > 500) {
                        // Long press - flag
                        this.toggleFlag(x, y);
                    } else {
                        // Short tap - reveal
                        this.revealCell(x, y);
                    }
                });

                boardElement.appendChild(cell);
            }
        }
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new Minesweeper();
});
