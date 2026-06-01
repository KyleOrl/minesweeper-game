class AudioManager {
    static synthesizeSound(frequency, duration, type = 'sine', volume = 0.3) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const now = audioContext.currentTime;
            
            // Create oscillator
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = type;
            oscillator.frequency.setValueAtTime(frequency, now);
            
            // Envelope
            gainNode.gain.setValueAtTime(volume, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);
            
            oscillator.start(now);
            oscillator.stop(now + duration);
        } catch (e) {
            console.log('Audio synthesis not available');
        }
    }

    static playClick() {
        // Classic Minesweeper-like click sound
        this.synthesizeSound(800, 0.1, 'sine', 0.2);
    }

    static playFlag() {
        // Flagging sound - ascending tone
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const now = audioContext.currentTime;
            
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.type = 'square';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
            
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            
            osc.start(now);
            osc.stop(now + 0.15);
        } catch (e) {
            console.log('Audio synthesis not available');
        }
    }

    static playReveal() {
        // Reveal sound - whoosh effect (low to mid)
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const now = audioContext.currentTime;
            
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(400, now + 0.2);
            
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            
            osc.start(now);
            osc.stop(now + 0.2);
        } catch (e) {
            console.log('Audio synthesis not available');
        }
    }

    static playWin() {
        // Victory fanfare
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const now = audioContext.currentTime;
            
            const notes = [
                { freq: 523, time: 0 },      // C
                { freq: 659, time: 0.15 },   // E
                { freq: 784, time: 0.3 },    // G
                { freq: 1047, time: 0.45 }   // C (high)
            ];
            
            notes.forEach(note => {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                
                osc.connect(gain);
                gain.connect(audioContext.destination);
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(note.freq, now + note.time);
                
                gain.gain.setValueAtTime(0.3, now + note.time);
                gain.gain.exponentialRampToValueAtTime(0.01, now + note.time + 0.2);
                
                osc.start(now + note.time);
                osc.stop(now + note.time + 0.2);
            });
        } catch (e) {
            console.log('Audio synthesis not available');
        }
    }

    static playLose() {
        // Lose sound - descending tone
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const now = audioContext.currentTime;
            
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(200, now + 0.4);
            
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
            
            osc.start(now);
            osc.stop(now + 0.4);
        } catch (e) {
            console.log('Audio synthesis not available');
        }
    }

    static playStreak() {
        // Streak sound - ding effect
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const now = audioContext.currentTime;
            
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, now);
            
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            
            osc.start(now);
            osc.stop(now + 0.3);
        } catch (e) {
            console.log('Audio synthesis not available');
        }
    }

    static playCombo() {
        // Combo bonus sound - ascending double beep
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const now = audioContext.currentTime;
            
            // First beep
            const osc1 = audioContext.createOscillator();
            const gain1 = audioContext.createGain();
            
            osc1.connect(gain1);
            gain1.connect(audioContext.destination);
            
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(700, now);
            
            gain1.gain.setValueAtTime(0.3, now);
            gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            
            osc1.start(now);
            osc1.stop(now + 0.1);
            
            // Second beep (higher)
            const osc2 = audioContext.createOscillator();
            const gain2 = audioContext.createGain();
            
            osc2.connect(gain2);
            gain2.connect(audioContext.destination);
            
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(1000, now + 0.15);
            
            gain2.gain.setValueAtTime(0.3, now + 0.15);
            gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
            
            osc2.start(now + 0.15);
            osc2.stop(now + 0.35);
        } catch (e) {
            console.log('Audio synthesis not available');
        }
    }
}
