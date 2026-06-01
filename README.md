# 💣 Minesweeper - Full-Featured Web Game

A complete web-based implementation of the classic Windows Minesweeper game with modern features, sound effects, particle effects, and a fun surprise gameplay mechanic!

## ✨ Features

### Classic Minesweeper Gameplay
- **Authentic Windows Minesweeper replication** with accurate mine placement and number calculations
- **Three difficulty levels**: Beginner (8x8, 10 mines), Intermediate (16x16, 40 mines), Expert (16x30, 99 mines)
- **Custom difficulty** - set your own board size and mine count
- **Timer** to track your game time
- **Mine counter** showing remaining mines
- **Game status** display (Ready, Playing, Won, Lost)

### 🎮 🔥 Streak Mode (Special Feature!)
The game includes an exciting **Streak Mode** - a fun, unique gameplay feature:
- **Build streaks** by flagging consecutive safe cells (right-click or long-press on mobile)
- **Streak multipliers** - achieve 5+ streak for 2x multiplier, 10+ for 3x, and beyond!
- **Combo bonuses** at streak milestones:
  - 5-streak: Golden particle explosion + combo sound 🎆
  - 10-streak: Rainbow particle burst + enhanced effects 🌈
  - Higher streaks: Blue particle effects on each flag ✨
- **Streak resets** if you flag a mine, encouraging careful play
- **Visual feedback** with animated streak counter and multiplier display

### 🎵 Sound Effects
- **Web Audio API synthesis** - pure JavaScript sound generation (no external audio files needed!)
- Individual sounds for:
  - Cell click/reveal (beep)
  - Flag placement (ascending tone)
  - Game start (whoosh)
  - Victory fanfare (ascending notes)
  - Lose sound (descending note)
  - Streak achievements (ding)
  - Combo bonuses (double beep)
- **Sound toggle** - easily enable/disable all audio

### ✨ Particle Effects
- **Dynamic particle bursts** at key moments:
  - Victory - multi-color rainbow burst 🌈
  - Defeat - red explosion at mine location 💥
  - Streak milestones - colored particle effects 💫
- **Physics-based** particles with gravity and velocity
- **Smooth animations** with alpha blending
- **Particle system** fully customizable
- **Toggle particles** independently from sound

### 📱 Mobile & Touchscreen Support
- **Fully responsive design** - works on desktop, tablet, and mobile
- **Touch controls**:
  - **Short tap** (< 500ms) = reveal cell
  - **Long press** (500ms+) = flag cell
- **Mobile-optimized UI** with appropriate sizing and spacing
- **Touch-friendly buttons** and controls
- **Adaptive grid sizing** based on screen size (down to 30x30px cells on small screens)

### 🎨 Modern UI/UX
- **Beautiful gradient background** (purple to magenta)
- **Retro-inspired cell styling** with 3D effects and Windows 95 vibes
- **Smooth animations** and transitions throughout
- **Real-time statistics** display (mines, flags, timer, status)
- **Difficulty selector** with custom options
- **Accessibility** - clear visual feedback and status indicators
- **Responsive design** that scales perfectly on all devices

## 🚀 How to Play

### Basic Controls
1. **Left-click** (or tap) a cell to reveal it
2. **Right-click** (or long-press on mobile for 500ms+) to place/remove a flag
3. **New Game** button to start over
4. **Select difficulty** to choose your challenge level
5. **Toggle sound/particles** for your preferred experience

### Objective
- **Reveal all safe cells** without hitting a mine
- **Use numbers** to deduce where mines are located
- Numbers indicate how many mines are adjacent to that cell (1-8)
- **Flag suspected mines** to keep track and score points

### Streak Mode Strategy
- Flag safe cells **consecutively** to build your streak
- Each streak milestone (5, 10, 15+) triggers special effects and sounds
- Build longer streaks for higher multipliers (2x at 5, 3x at 10, 4x at 15, etc.)
- Be careful - flagging a mine resets your streak!
- Try to build massive streaks for the best visual and audio experience!

## 🛠️ Technical Details

### Architecture
- **Pure JavaScript** - no frameworks or dependencies
- **Object-oriented design** with clean class structure
- **Web Audio API** for real-time sound synthesis
- **Canvas-based** particle system for dynamic effects
- **Responsive CSS Grid** for adaptive board sizing
- **Touch event handling** for mobile support
- **ES6+ features** for modern JavaScript

### File Structure
```
minesweeper-game/
├── index.html          # Main HTML structure and UI
├── styles.css          # Complete styling and responsiveness
├── game.js             # Core Minesweeper logic and game state
├── audio.js            # Web Audio API sound synthesis
├── particles.js        # Particle system with physics
└── README.md           # This documentation
```

### Browser Compatibility
- **Modern browsers** supporting:
  - ES6 JavaScript (class syntax, arrow functions, etc.)
  - Web Audio API
  - Canvas 2D API
  - CSS Grid and Flexbox
  - Touch Events API
  - Modern DOM APIs

Tested and working on:
- Chrome/Chromium (v60+)
- Firefox (v55+)
- Safari (v11+)
- Edge (v79+)
- Mobile browsers:
  - iOS Safari (v11+)
  - Chrome Mobile (latest)
  - Firefox Mobile (latest)
  - Samsung Internet (latest)

### Size and Performance
- **Lightweight** - all in 5 files, no external dependencies
- **Performant** - optimized particle system with requestAnimationFrame
- **Fast loading** - instant startup, no assets to download
- **Low memory** - efficient board representation and cleanup

## 🎯 Game Tips & Strategies

### Beginner Tips
1. Start with Beginner difficulty to learn the mechanics
2. Numbers tell you exactly how many mines are nearby
3. If all neighboring cells are flagged, you can safely reveal the rest

### Intermediate Strategies
1. Look for patterns in the numbers
2. Use logic to eliminate possibilities
3. Flag mines strategically to mark your progress

### Advanced Techniques
1. **1-2 Rule**: If a "1" is adjacent to a "2", one is a mine and one is safe
2. **Chord Clicking**: If you've flagged all mines around a number, click it to reveal all adjacent safe cells
3. **Streak Building**: Always look for consecutive safe cells to flag for maximum multipliers

### Streak Mode Mastery
- 🔥 Every 5 consecutive safe flags = multiplier boost
- 💫 Watch for the visual cues to know when you're hitting milestones
- 🎵 Listen for the combo sound - it means you're on a hot streak!
- ⚡ The longer your streak, the more impressive the particle effects

## 🎮 Keyboard Shortcuts
- **Right-click** on cells to flag (desktop)
- **Long-press** on cells to flag (mobile)
- **Left-click/tap** to reveal cells

## 📊 Stats Displayed
- **Mines**: Total mines minus flags placed
- **Flags**: Number of cells you've flagged
- **Time**: Elapsed time since first cell reveal
- **Status**: Current game state (Ready, Playing, Won, Lost)
- **Streak**: Current flag streak with multiplier bonus (when active)

## 🔧 Customization

### Modify Difficulties
Edit `game.js` in the `handleDifficultyChange()` method:
```javascript
const settings = {
    beginner: { width: 8, height: 8, mines: 10 },
    intermediate: { width: 16, height: 16, mines: 40 },
    expert: { width: 16, height: 30, mines: 99 }
};
```

### Adjust Particle Colors
In `particles.js`, modify the `colorMap` in `ParticleSystem.burst()`:
```javascript
const colorMap = {
    gold: '#FFD700',
    blue: '#4A90E2',
    red: '#FF4444',
    rainbow: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'],
    default: '#667eea'
};
```

### Fine-tune Sound Effects
In `audio.js`, adjust frequency, duration, and volume parameters in each `playXxx()` method:
```javascript
static playClick() {
    // Frequency: Hz (lower = deeper, higher = higher pitch)
    // Duration: seconds
    // Volume: 0-1
    this.synthesizeSound(800, 0.1, 'sine', 0.2);
}
```

### Change UI Colors
Edit the CSS gradient in `styles.css`:
```css
html, body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 📚 Learning Resources

This project demonstrates:
- **Game development** in JavaScript
- **Web Audio API** for procedural sound synthesis
- **Canvas API** for particle effects and animations
- **Touch event handling** for mobile games
- **Responsive web design** principles
- **Object-oriented programming** patterns
- **Game state management** and logic
- **Performance optimization** techniques

## 🚀 Future Enhancement Ideas
- [ ] Leaderboard with high scores (using localStorage)
- [ ] Multiple themes (dark mode, retro, neon, dark matter)
- [ ] Multiplayer mode (competitive or cooperative)
- [ ] Replay system to watch games
- [ ] Achievement badges and progression
- [ ] Difficulty presets for speed-running competitions
- [ ] Statistics tracking and analytics
- [ ] Difficulty rating based on board configuration
- [ ] AI opponent mode
- [ ] Campaign/story mode

## 🤝 Contributing

Feel free to fork, modify, and enhance this project! Some ideas:
- Additional sound effects or sound themes
- More particle effect styles and animations
- New game modes or features
- Performance optimizations
- Accessibility improvements
- Localization to other languages
- Bug fixes and improvements

## 📄 License

This project is open source and available for personal and educational use.

## 🎮 Enjoy!

Have fun playing Minesweeper! Challenge yourself with different difficulty levels, build massive streaks, and enjoy the satisfying sounds and visual effects. 

---

### Pro Tips for Maximum Fun:
- 🚀 The faster you play, the higher your score multiplier potential
- 💡 Use the numbers to deduce mine locations logically
- 🔥 Try to build the longest streak possible - chase those multipliers!
- 📱 Use custom difficulty to create your perfect challenge level
- 🎵 Turn on sound for the full atmospheric experience
- ✨ Watch the particle effects - they're a visual reward for your streaks!
- 🌈 Try to hit the 10-streak milestone for the rainbow particle effect

**Happy sweeping!** 💣

---

**Made with ❤️ using vanilla JavaScript**
