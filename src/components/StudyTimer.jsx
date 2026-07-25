import { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw, Volume2, VolumeX, Settings, ChevronDown, CheckCircle } from 'lucide-react';

export default function StudyTimer() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' | 'short_break' | 'long_break'
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [autoStart, setAutoStart] = useState(true);

  // Default durations in seconds
  const presetDurations = {
    focus: 25 * 60,
    short_break: 5 * 60,
    long_break: 15 * 60,
  };

  const dropdownRef = useRef(null);
  const timerRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Timer loop
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsActive(false);
            playCompletionSound();
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, mode]);

  // Handle timer completion and switch modes
  const handleTimerComplete = () => {
    if (mode === 'focus') {
      // Suggest moving to break
      setMode('short_break');
      setTimeLeft(presetDurations.short_break);
      if (autoStart) {
        setTimeout(() => setIsActive(true), 200);
      }
    } else {
      setMode('focus');
      setTimeLeft(presetDurations.focus);
      if (autoStart) {
        setTimeout(() => setIsActive(true), 200);
      }
    }
  };

  // Synthesize a gentle notification sound using Web Audio API
  const playCompletionSound = () => {
    if (isMuted) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      // Beep 1
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      gain1.gain.setValueAtTime(0.15, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.3);

      // Beep 2 slightly offset
      setTimeout(() => {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
        gain2.gain.setValueAtTime(0.15, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc2.start(ctx.currentTime);
        osc2.stop(ctx.currentTime + 0.4);
      }, 150);
    } catch (e) {
      console.warn("Audio context not allowed or supported yet.", e);
    }
  };

  const handleModeChange = (newMode) => {
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(presetDurations[newMode]);
  };

  const handleCustomDuration = (minutes) => {
    const parsed = parseInt(minutes, 10);
    if (!isNaN(parsed) && parsed > 0 && parsed <= 180) {
      setIsActive(false);
      setTimeLeft(parsed * 60);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(presetDurations[mode]);
  };

  // Format time (e.g., 25:00)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Percent for circular or bar indicators
  const totalDuration = presetDurations[mode];
  const progressPercent = Math.min(100, Math.max(0, ((totalDuration - timeLeft) / totalDuration) * 100));

  const modeLabels = {
    focus: 'Focus Session',
    short_break: 'Short Break',
    long_break: 'Long Break',
  };

  return (
    <div className="relative inline-block text-left select-none" ref={dropdownRef}>
      {/* Trigger Button in Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 border px-3 py-1.5 rounded-full shadow-sm text-xs font-bold font-mono transition-all cursor-pointer ${
          isActive 
            ? 'bg-[var(--accent-color)]/10 border-[var(--accent-color)] text-[var(--accent-color)] animate-pulse' 
            : 'bg-[var(--bg-secondary)] border-[var(--card-border)] text-[var(--text-primary)] hover:border-[var(--text-muted)]/50'
        }`}
      >
        <Timer className={`w-3.5 h-3.5 ${isActive ? 'animate-spin' : ''}`} style={{ animationDuration: isActive ? '8s' : '0s' }} />
        <span>{formatTime(timeLeft)}</span>
        <span className="text-[9px] uppercase font-semibold opacity-75 hidden sm:inline-block">
          ({mode === 'focus' ? 'Study' : 'Break'})
        </span>
        <ChevronDown className="w-3 h-3 text-[var(--text-muted)]" />
      </button>

      {/* Dropdown Container */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-xl z-50 p-4 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-xs font-black tracking-tight text-[var(--text-primary)] font-mono flex items-center gap-1.5">
              <Timer className="w-4 h-4 text-[var(--accent-color)]" />
              <span>STUDY TIMER SYSTEM</span>
            </h4>
            <div className="flex items-center gap-1">
              {/* Mute toggle */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                title={isMuted ? "Unmute Alarm" : "Mute Alarm"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="grid grid-cols-3 gap-1 bg-[var(--bg-secondary)] border border-[var(--card-border)] p-1 rounded-xl mb-4 text-[10px] font-bold">
            <button
              onClick={() => handleModeChange('focus')}
              className={`py-1.5 rounded-lg text-center cursor-pointer transition-all ${
                mode === 'focus'
                  ? 'bg-[var(--accent-color)] text-[var(--bg-color)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              Focus
            </button>
            <button
              onClick={() => handleModeChange('short_break')}
              className={`py-1.5 rounded-lg text-center cursor-pointer transition-all ${
                mode === 'short_break'
                  ? 'bg-[var(--accent-color)] text-[var(--bg-color)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              Short Break
            </button>
            <button
              onClick={() => handleModeChange('long_break')}
              className={`py-1.5 rounded-lg text-center cursor-pointer transition-all ${
                mode === 'long_break'
                  ? 'bg-[var(--accent-color)] text-[var(--bg-color)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              Long Break
            </button>
          </div>

          {/* Large timer display */}
          <div className="flex flex-col items-center justify-center py-4 bg-[var(--bg-secondary)]/50 border border-[var(--card-border)] rounded-xl mb-4 relative overflow-hidden">
            {/* Background progress bar */}
            <div 
              className="absolute left-0 bottom-0 top-0 bg-[var(--accent-color)]/5 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
            
            <span className="text-3xl font-black font-mono tracking-widest text-[var(--text-primary)] relative z-10 select-text">
              {formatTime(timeLeft)}
            </span>
            <span className="text-[10px] font-mono text-[var(--text-muted)] mt-1 uppercase tracking-wider relative z-10 font-bold">
              {modeLabels[mode]}
            </span>
          </div>

          {/* Timer controls */}
          <div className="flex items-center gap-2 mb-4">
            {isActive ? (
              <button
                onClick={() => setIsActive(false)}
                className="flex-1 py-2 bg-amber-500 text-black hover:bg-amber-400 font-bold font-mono text-[10.5px] rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer shadow-sm"
              >
                <Pause className="w-3.5 h-3.5 fill-black" />
                <span>PAUSE STUDY</span>
              </button>
            ) : (
              <button
                onClick={() => setIsActive(true)}
                className="flex-1 py-2 bg-[var(--accent-color)] text-[var(--bg-color)] hover:opacity-95 font-bold font-mono text-[10.5px] rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>START STUDY</span>
              </button>
            )}

            <button
              onClick={resetTimer}
              className="p-2 border border-[var(--card-border)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-color)] text-[var(--text-primary)] rounded-xl cursor-pointer"
              title="Reset timer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Custom controls or suggestions */}
          <div className="border-t border-[var(--card-border)] pt-3 flex flex-col gap-2">
            <div className="flex justify-between items-center text-[9px] font-mono text-[var(--text-muted)] font-bold uppercase">
              <span>Quick Intervals</span>
              <span>Auto-Start Next Break</span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-1">
                {[15, 25, 45, 60].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => handleCustomDuration(mins)}
                    className="px-2 py-1 text-[9px] font-mono font-bold bg-[var(--bg-secondary)] hover:bg-[var(--accent-color)] hover:text-[var(--bg-color)] border border-[var(--card-border)] rounded-md cursor-pointer transition-colors"
                  >
                    {mins}m
                  </button>
                ))}
              </div>

              {/* Toggle switch */}
              <div 
                onClick={() => setAutoStart(!autoStart)}
                className={`w-9 h-5 rounded-full cursor-pointer flex items-center p-0.5 transition-all duration-300 ${
                  autoStart ? 'bg-green-500' : 'bg-[var(--input-fill)] border border-[var(--card-border)]'
                }`}
              >
                <div 
                  className={`w-4 h-4 rounded-full bg-white transition-all transform ${
                    autoStart ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
