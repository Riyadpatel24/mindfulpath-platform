import { AlertCircle, Award, BarChart3, BookOpen, Brain, Calendar, CheckCircle, Circle, Database, Download, Edit2, Heart, ListTodo, Menu, MessageCircle, Mic, MicOff, Pause, Phone, Play, RotateCcw, Save, Shield, Sparkles, Target, Trash2, TrendingUp, Upload, Volume2, Wifi, WifiOff, Wind, X } from 'lucide-react';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import './App.css';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// AI Mentor Component
const AIMentor = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { darkMode } = useTheme();

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('anxiety') || input.includes('anxious') || input.includes('worried') || input.includes('nervous')) {
      return "I understand that anxiety can feel overwhelming. Here are some strategies that might help:\n\n• Practice the 4-7-8 breathing technique (try our Breathing Exercise!)\n• Ground yourself using the 5-4-3-2-1 method\n• Remember: anxiety is temporary and you have the strength to manage it\n• Consider journaling your thoughts to identify triggers\n\nWould you like to talk more about what's making you feel anxious?";
    }
    
    if (input.includes('stress') || input.includes('stressed') || input.includes('overwhelm')) {
      return "Stress is a natural response, but chronic stress needs attention. Here's what can help:\n\n• Break large tasks into smaller steps\n• Take regular breaks\n• Physical exercise releases stress hormones\n• Set boundaries and learn to say 'no'\n• Practice self-compassion\n\nWhat's the main source of stress for you right now?";
    }
    
    if (input.includes('sleep') || input.includes('insomnia') || input.includes('tired')) {
      return "Quality sleep is essential for mental health. Try these tips:\n\n• Maintain a consistent sleep schedule\n• Create a relaxing bedtime routine\n• Limit screen time before bed\n• Keep your bedroom cool and dark\n• Try our meditation exercises\n\nHow long have you been experiencing sleep issues?";
    }
    
    if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
      return "Hello! 👋 I'm here to support your mental wellness journey. I can help with anxiety, stress, sleep, self-care, and more. What's on your mind today?";
    }
    
    return "Thank you for sharing. I'm here to help with mental wellness topics like anxiety, stress, sleep, mindfulness, and self-care. Could you tell me more about what you're experiencing?";
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const aiResponse = generateResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      setLoading(false);
    }, 1000);
  };

  const quickQuestions = [
    "How can I manage anxiety?",
    "Tips for better sleep",
    "Dealing with stress",
    "Building healthy habits"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 mb-6`}>
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="text-purple-500" size={32} />
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              AI Mental Health Mentor
            </h2>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Your personal guide for mental wellness
            </p>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-xl p-4 h-96 overflow-y-auto mb-4 space-y-4`}>
          {messages.length === 0 ? (
            <div className="text-center mt-20">
              <Sparkles className="mx-auto mb-4 text-purple-400" size={48} />
              <p className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Welcome! How can I support you today?
              </p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'user' 
                    ? 'bg-purple-500 text-white rounded-br-none' 
                    : darkMode
                    ? 'bg-gray-800 text-gray-200 rounded-bl-none shadow'
                    : 'bg-white text-gray-800 rounded-bl-none shadow'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-lg shadow`}>
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {messages.length === 0 && (
          <div className="mb-4">
            <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Quick questions:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(q)}
                  className={`text-left p-2 text-sm ${
                    darkMode 
                      ? 'bg-purple-900/30 hover:bg-purple-900/50 text-purple-300' 
                      : 'bg-purple-50 hover:bg-purple-100 text-purple-700'
                  } rounded-lg transition`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me anything about mental wellness..."
            className={`flex-1 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              darkMode 
                ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500' 
                : 'bg-white border-gray-300 text-gray-800'
            }`}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

// Mood Analytics Component
function MoodAnalytics() {
  const [moodHistory, setMoodHistory] = useState([]);
  const { darkMode } = useTheme();

  useEffect(() => {
    const saved = localStorage.getItem('moodHistory');
    if (saved) {
      try {
        setMoodHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading mood history');
      }
    }
  }, []);

  const getWeeklySummary = () => {
    const last7Days = moodHistory.slice(-7);
    const moodCounts = {};
    last7Days.forEach(entry => {
      moodCounts[entry.emotion] = (moodCounts[entry.emotion] || 0) + 1;
    });
    return moodCounts;
  };

  const getAverageIntensity = () => {
    if (moodHistory.length === 0) return 0;
    const sum = moodHistory.reduce((acc, entry) => acc + entry.intensity, 0);
    return (sum / moodHistory.length).toFixed(1);
  };

  const summary = getWeeklySummary();
  const mostFrequent = Object.entries(summary).sort((a, b) => b[1] - a[1])[0];
  const maxCount = Math.max(...Object.values(summary), 1);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Mood Analytics</h1>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Track your emotional patterns over time</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-xl">
          <BarChart3 className="w-10 h-10 mb-3" />
          <div className="text-3xl font-bold">{moodHistory.length}</div>
          <div className="text-sm opacity-90">Total Check-ins</div>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-2xl p-6 shadow-xl">
          <TrendingUp className="w-10 h-10 mb-3" />
          <div className="text-3xl font-bold">{getAverageIntensity()}</div>
          <div className="text-sm opacity-90">Avg Intensity</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-xl">
          <Heart className="w-10 h-10 mb-3" />
          <div className="text-3xl font-bold">{mostFrequent?.[0] || 'N/A'}</div>
          <div className="text-sm opacity-90">Most Frequent Mood</div>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>This Week's Moods</h2>
        {Object.keys(summary).length > 0 ? (
          <div className="space-y-4">
            {Object.entries(summary).map(([mood, count]) => (
              <div key={mood}>
                <div className="flex justify-between mb-2">
                  <span className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{mood}</span>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{count} times</span>
                </div>
                <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3`}>
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No mood data yet. Start tracking your emotions!</p>
        )}
      </div>
    </div>
  );
}

// Breathing Exercise Component
function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('inhale');
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [backgroundMusic, setBackgroundMusic] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.3);
  const { darkMode } = useTheme();

  const audioRef = React.useRef(null);

  const phases = {
    inhale: { duration: 4, text: 'Breathe In', color: 'from-blue-400 to-blue-600' },
    hold: { duration: 7, text: 'Hold', color: 'from-purple-400 to-purple-600' },
    exhale: { duration: 8, text: 'Breathe Out', color: 'from-pink-400 to-pink-600' }
  };

  const musicTracks = [
    { name: 'Ocean Waves', url: '/sound/ocean-waves-250310.mp3', icon: '🌊' },
    { name: 'Rain Sounds', url: '/sound/mixkit-heavy-rain-drops-2399.wav', icon: '🌧️' },
    { name: 'Forest Birds', url: '/sound/Forest-birds-sound.mp3', icon: '🐦' },
    { name: 'Meditation', url: '/sound/breath-of-enlightenment-meditation-music-407178.mp3', icon: '🧘' }
  ];

  const [selectedTrack, setSelectedTrack] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (backgroundMusic) {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [backgroundMusic]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume;
    }
  }, [musicVolume]);

  useEffect(() => {
    if (audioRef.current && backgroundMusic) {
      audioRef.current.load();
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
  }, [selectedTrack]);

  const playSound = (frequency, duration) => {
    if (!soundEnabled) return;
    
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => {
        setCount(prev => {
          const currentPhase = phases[phase];
          
          if (prev >= currentPhase.duration) {
            if (phase === 'inhale') {
              playSound(523.25, 0.3);
              setPhase('hold');
            } else if (phase === 'hold') {
              playSound(587.33, 0.3);
              setPhase('exhale');
            } else {
              playSound(659.25, 0.5);
              setPhase('inhale');
              setCycles(c => c + 1);
            }
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, phase]);

  const reset = () => {
    setIsActive(false);
    setPhase('inhale');
    setCount(0);
    setCycles(0);
  };

  const currentPhase = phases[phase];
  const progress = (count / currentPhase.duration) * 100;
  const scale = phase === 'inhale' ? 1 + (progress / 100) * 0.5 : 
                phase === 'exhale' ? 1.5 - (progress / 100) * 0.5 : 1.5;

  return (
    <div className={`max-w-4xl mx-auto space-y-8 ${darkMode ? 'text-white' : ''}`}>
      <audio ref={audioRef} loop>
        <source src={musicTracks[selectedTrack].url} type="audio/mpeg" />
      </audio>

      <div className="text-center space-y-2">
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          4-7-8 Breathing Exercise
        </h1>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
          Calm your mind and reduce anxiety
        </p>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 flex flex-col items-center`}>
        <div className="w-full space-y-4 mb-6">
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                soundEnabled 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {soundEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
            </button>
            <button
              onClick={() => setBackgroundMusic(!backgroundMusic)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                backgroundMusic 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {backgroundMusic ? '🎵 Music On' : '🎵 Music Off'}
            </button>
          </div>

          {backgroundMusic && (
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-purple-50'} space-y-3`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-purple-900'}`}>
                  🎧 Select Background Track
                </span>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-purple-700'}`}>
                  Volume: {Math.round(musicVolume * 100)}%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {musicTracks.map((track, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTrack(idx)}
                    className={`p-2 rounded-lg text-sm font-medium transition-all ${
                      selectedTrack === idx
                        ? 'bg-purple-600 text-white'
                        : darkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-white text-purple-700 hover:bg-purple-100'
                    }`}
                  >
                    {track.icon} {track.name}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-purple-700'}`}>🔉</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={musicVolume}
                  onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-purple-700'}`}>🔊</span>
              </div>
            </div>
          )}
        </div>

        <div className="relative w-80 h-80 flex items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${currentPhase.color} opacity-20 transition-transform duration-1000`}
            style={{ transform: `scale(${scale})` }}
          />
          <div
            className={`absolute w-64 h-64 rounded-full bg-gradient-to-br ${currentPhase.color} flex items-center justify-center shadow-2xl transition-transform duration-1000`}
            style={{ transform: `scale(${scale})` }}
          >
            <div className="text-center text-white">
              <div className="text-6xl font-bold mb-2">
                {currentPhase.duration - count}
              </div>
              <div className="text-2xl font-semibold">
                {currentPhase.text}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mt-8">
          <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
            <div
              className={`bg-gradient-to-r ${currentPhase.color} h-2 rounded-full transition-all duration-1000`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => {
              setIsActive(!isActive);
              if (!isActive) playSound(440, 0.2);
            }}
            className={`px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              isActive 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5" /> Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5" /> Start
              </>
            )}
          </button>
          <button
            onClick={reset}
            className={`px-8 py-4 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} rounded-xl font-semibold transition-all flex items-center gap-2`}
          >
            <RotateCcw className="w-5 h-5" /> Reset
          </button>
        </div>

        <div className="mt-8 text-center">
          <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Completed Cycles
          </div>
          <div className="text-4xl font-bold text-purple-600">{cycles}</div>
        </div>

        {backgroundMusic && (
          <div className="mt-6 text-center">
            <p className={`text-sm animate-pulse ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
              🎵 Now Playing: {musicTracks[selectedTrack].icon} {musicTracks[selectedTrack].name}
            </p>
          </div>
        )}
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-blue-50'} rounded-2xl p-8`}>
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
          How It Works
        </h2>
        <div className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <p>💙 <strong>Inhale</strong> through your nose for 4 seconds</p>
          <p>💜 <strong>Hold</strong> your breath for 7 seconds</p>
          <p>💗 <strong>Exhale</strong> slowly through your mouth for 8 seconds</p>
          <p className="mt-4 text-sm">
            ✨ This technique activates your parasympathetic nervous system, promoting relaxation and reducing anxiety.
          </p>
        </div>
      </div>
    </div>
  );
}

// Crisis Resources Component
function CrisisResources() {
  const { darkMode } = useTheme();

  const globalHotlines = [
    { country: 'India', number: '91529 87821', service: 'AASRA', available: '24/7' },
    { country: 'USA', number: '988', service: 'Suicide & Crisis Lifeline', available: '24/7' },
    { country: 'UK', number: '116 123', service: 'Samaritans', available: '24/7' },
    { country: 'Canada', number: '1-833-456-4566', service: 'Talk Suicide Canada', available: '24/7' },
    { country: 'Australia', number: '13 11 14', service: 'Lifeline', available: '24/7' },
    { country: 'International', number: 'findahelpline.com', service: 'Find Local Helplines', available: 'Worldwide' }
  ];

  const immediateHelp = [
    {
      icon: Phone,
      title: 'Call a Hotline',
      description: 'Speak with trained counselors immediately',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: MessageCircle,
      title: 'Text for Help',
      description: 'Text HELLO to 741741 (Crisis Text Line - USA)',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Emergency Services',
      description: 'Call 911 (USA) or your local emergency number',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-bold text-red-900 mb-2">Need Immediate Help?</h2>
            <p className="text-red-800 text-lg">
              If you're in crisis or thinking about self-harm, <strong>please reach out for help now</strong>. 
              You are not alone, and people want to support you.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {immediateHelp.map((item, idx) => (
          <div key={idx} className={`bg-gradient-to-br ${item.color} text-white rounded-2xl p-6 shadow-xl`}>
            <item.icon className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-sm opacity-90">{item.description}</p>
          </div>
        ))}
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
        <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Crisis Hotlines Worldwide</h2>
        <div className="space-y-4">
          {globalHotlines.map((hotline, idx) => (
            <div key={idx} className={`flex items-center justify-between p-4 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} rounded-xl transition`}>
              <div className="flex-1">
                <div className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>{hotline.country}</div>
                <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{hotline.service}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">{hotline.number}</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{hotline.available}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-purple-50'} rounded-2xl p-8`}>
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>While Waiting for Help</h2>
        <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
            <span>Stay with someone or call a trusted friend/family member</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
            <span>Remove any means of self-harm from your immediate surroundings</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
            <span>Try our breathing exercises to help calm down</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
            <span>Write down your feelings or talk to our AI Mentor</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// Voice Journal Component
function VoiceJournal() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [entries, setEntries] = useState([]);
  const [browserSupported, setBrowserSupported] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [voiceGender, setVoiceGender] = useState('female');
  const [errorMessage, setErrorMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const { darkMode } = useTheme();
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    const checkMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(checkMobile);
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setErrorMessage('');
    };
    const handleOffline = () => {
      setIsOnline(false);
      if (isRecording) stopRecording();
      setErrorMessage('❌ You are offline. Voice recognition needs internet connection.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isRecording]);

  useEffect(() => {
    const saved = localStorage.getItem('voiceJournalEntries');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading journal entries');
      }
    }
    
    const savedGender = localStorage.getItem('voiceGender');
    if (savedGender) {
      setVoiceGender(savedGender);
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setBrowserSupported(false);
      setErrorMessage('❌ Speech Recognition not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsRecording(true);
      setErrorMessage('');
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPiece + ' ';
        }
      }
      if (finalTranscript) {
        setTranscript(prev => prev + finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
      
      if (event.error === 'network') {
        setErrorMessage('🌐 Unable to connect to speech service. Please check your internet connection and try again.');
      } else if (event.error === 'no-speech') {
        setErrorMessage('🎤 No speech detected. Please speak clearly into your microphone.');
        setTimeout(() => setErrorMessage(''), 4000);
      } else if (event.error === 'not-allowed') {
        setErrorMessage('❌ Microphone access denied. Please allow microphone access in your browser settings.');
      } else if (event.error === 'aborted') {
        return;
      } else if (event.error === 'service-not-allowed') {
        setErrorMessage('❌ Speech recognition service is not available. Please try typing instead.');
      } else {
        setErrorMessage(`❌ Speech recognition error: ${event.error}. You can still type your journal entry.`);
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Already stopped
        }
      }
    };
  }, [isMobile]);

  const startRecording = async () => {
  // Check internet first
  if (!navigator.onLine) {
    setErrorMessage('❌ No internet connection. Voice recognition requires internet. You can still type your journal entry.');
    return;
  }

  // Test actual connectivity with timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    await fetch('https://www.google.com/generate_204', { 
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
  } catch (error) {
    if (error.name === 'AbortError') {
      setErrorMessage('🌐 Connection timeout. Your internet is too slow. Please try typing instead.');
    } else {
      setErrorMessage('🌐 Cannot reach speech service. Check your firewall or VPN settings. You can still type your journal entry.');
    }
    return;
  }
  
  if (!recognitionRef.current) {
    setErrorMessage('❌ Speech recognition not available in this browser. Please use Chrome, Edge, or Safari. You can still type your journal entry.');
    return;
  }

  if (isRecording) {
    return;
  }

  try {
    // Request microphone permission
    await navigator.mediaDevices.getUserMedia({ audio: true });
    setTranscript('');
    setErrorMessage('');
    
    // Add error handler before starting
    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
      
      if (event.error === 'network') {
        setErrorMessage('🌐 Network error. Google speech service is unreachable. Please check your internet and try again, or type your entry instead.');
      } else if (event.error === 'no-speech') {
        setErrorMessage('🎤 No speech detected. Please speak clearly into your microphone.');
        setTimeout(() => setErrorMessage(''), 4000);
      } else if (event.error === 'not-allowed') {
        setErrorMessage('❌ Microphone access denied. Please allow microphone access in your browser settings.');
      } else if (event.error === 'service-not-allowed') {
        setErrorMessage('❌ Speech service blocked. Check browser permissions or use typing instead.');
      } else {
        setErrorMessage(`❌ Error: ${event.error}. You can still type your journal entry.`);
      }
    };
    
    recognitionRef.current.start();
  } catch (error) {
    console.error('Microphone error:', error);
    if (error.name === 'NotAllowedError') {
      setErrorMessage('❌ Microphone access denied. Please allow microphone access in your browser settings.');
    } else if (error.name === 'NotFoundError') {
      setErrorMessage('❌ No microphone found. Please connect a microphone or type your entry.');
    } else {
      setErrorMessage('❌ Could not access microphone. You can still type your journal entry.');
    }
  }
};

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      try {
        recognitionRef.current.stop();
        setIsRecording(false);
      } catch (e) {
        console.error('Error stopping recognition:', e);
        setIsRecording(false);
      }
    }
  };

  const saveEntry = () => {
    if (!transcript.trim()) return;

    const newEntry = {
      id: Date.now(),
      text: transcript,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };
    
    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('voiceJournalEntries', JSON.stringify(updatedEntries));
    
    setTranscript('');
    setErrorMessage('');
  };

  const deleteEntry = (id) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem('voiceJournalEntries', JSON.stringify(updatedEntries));
  };

  const speakEntry = (entryId) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const entryElement = document.getElementById(`entry-text-${entryId}`);
      const displayedText = entryElement ? entryElement.innerText : '';
      
      if (!displayedText) {
        console.error('Could not find text to speak');
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(displayedText);
      utterance.rate = 0.9;
      utterance.pitch = voiceGender === 'female' ? 1.2 : 1.0;
      
      const pageLang = document.documentElement.lang || 'en';
      utterance.lang = pageLang;
      
      const setVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        
        let selectedVoice;
        
        if (voiceGender === 'female') {
          selectedVoice = voices.find(voice => 
            voice.lang.startsWith(pageLang.split('-')[0]) &&
            (voice.name.toLowerCase().includes('female') ||
             voice.name.toLowerCase().includes('woman') ||
             voice.name.includes('Samantha') ||
             voice.name.includes('Victoria') ||
             voice.name.includes('Zira'))
          );
        } else {
          selectedVoice = voices.find(voice => 
            voice.lang.startsWith(pageLang.split('-')[0]) &&
            (voice.name.toLowerCase().includes('male') ||
             voice.name.includes('Daniel') ||
             voice.name.includes('David'))
          );
        }
        
        if (!selectedVoice) {
          selectedVoice = voices.find(voice => 
            voice.lang.startsWith(pageLang.split('-')[0])
          );
        }
        
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
        
        window.speechSynthesis.speak(utterance);
      };
      
      if (window.speechSynthesis.getVoices().length > 0) {
        setVoice();
      } else {
        window.speechSynthesis.onvoiceschanged = setVoice;
      }
    }
  };

  const handleVoiceGenderChange = (gender) => {
    setVoiceGender(gender);
    localStorage.setItem('voiceGender', gender);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div className="text-center space-y-4">
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Voice Journal
        </h1>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
          Express your thoughts through voice
        </p>
        
        <div className="flex justify-center items-center gap-2">
          <Volume2 className="w-5 h-5 text-pink-600" />
          <label className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Playback Voice:</label>
          <select
            value={voiceGender}
            onChange={(e) => handleVoiceGenderChange(e.target.value)}
            className={`px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-pink-300 text-gray-800'
            }`}
          >
            <option value="female">👩 Female</option>
            <option value="male">👨 Male</option>
          </select>
        </div>
      </div>

      {isMobile && (
        <div className={`${darkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-300'} border-2 rounded-xl p-5`}>
          <div className="flex items-start gap-3">
            <Mic className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className={`font-bold mb-2 text-lg ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>📱 Using Voice on Mobile</h3>
              <p className={`${darkMode ? 'text-blue-200' : 'text-blue-800'} mb-3`}>
                To use voice input on your phone:
              </p>
              <ol className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-700'} space-y-2 list-decimal ml-5`}>
                <li><strong>Tap the text box below</strong></li>
                <li><strong>Your keyboard will appear</strong></li>
                <li><strong>Tap the 🎤 microphone icon</strong> on your keyboard</li>
                <li><strong>Speak</strong> - your words will appear as text!</li>
                <li><strong>Tap "Save"</strong> when done</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {!isMobile && (
        <div className={`flex items-center justify-center gap-2 p-3 rounded-lg ${
          isOnline 
            ? darkMode ? 'bg-green-900/30 border-green-700 border-2' : 'bg-green-50 border-2 border-green-300'
            : darkMode ? 'bg-red-900/30 border-red-700 border-2' : 'bg-red-50 border-2 border-red-400'
        }`}>
          {isOnline ? (
            <>
              <Wifi className="w-5 h-5 text-green-600" />
              <span className={`font-medium ${darkMode ? 'text-green-400' : 'text-green-800'}`}>Connected - Ready to record</span>
            </>
          ) : (
            <>
              <WifiOff className="w-5 h-5 text-red-600" />
              <span className={`font-medium ${darkMode ? 'text-red-400' : 'text-red-800'}`}>Offline - Internet required</span>
            </>
          )}
        </div>
      )}

      {errorMessage && (
        <div className={`${darkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-400'} border-2 rounded-xl p-4`}>
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <p className={`font-medium ${darkMode ? 'text-red-300' : 'text-red-800'}`}>{errorMessage}</p>
          </div>
        </div>
      )}

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 space-y-6`}>
        {!isMobile && (
          <div className="text-center">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={!browserSupported || !isOnline}
              className={`w-32 h-32 rounded-full flex items-center justify-center transition-all transform ${
                !browserSupported || !isOnline
                  ? 'bg-gray-300 cursor-not-allowed'
                  : isRecording
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse scale-110'
                  : 'bg-purple-500 hover:bg-purple-600 hover:scale-105'
              } shadow-2xl`}
            >
              {isRecording ? (
                <MicOff className="w-16 h-16 text-white" />
              ) : (
                <Mic className="w-16 h-16 text-white" />
              )}
            </button>
            <p className={`mt-4 text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {isRecording ? '🎤 Recording... Click to stop' : 'Click microphone to start'}
            </p>
            {isRecording && (
              <p className="mt-2 text-sm text-purple-600 animate-pulse">
                Listening... Speak clearly
              </p>
            )}
          </div>
        )}

        {isMobile && (
          <div className="text-center py-4">
            <div className={`inline-flex items-center gap-3 ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'} px-6 py-4 rounded-xl`}>
              <Mic className="w-8 h-8 text-purple-600" />
              <div className="text-left">
                <p className={`font-bold ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>Tap the text box below</p>
                <p className={`text-sm ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>Then use your keyboard's 🎤 button</p>
              </div>
            </div>
          </div>
        )}

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {isMobile ? '✍️ Tap here and use keyboard mic button' : 'Transcript (You can edit this)'}
          </label>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder={isMobile 
              ? "Tap here, then use the 🎤 on your keyboard to speak..." 
              : "Your voice will be transcribed here... or type manually"
            }
            className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-lg ${
              darkMode
                ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500'
                : 'bg-white border-gray-300 text-gray-800'
            }`}
            rows="8"
          />
        </div>

        <button
          onClick={saveEntry}
          disabled={!transcript.trim()}
          className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-lg ${
            transcript.trim()
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Save className="w-5 h-5" />
          Save Journal Entry
        </button>
      </div>

      {entries.length > 0 && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Your Journal Entries ({entries.length})
          </h2>
          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className={`p-4 rounded-xl border-2 ${
                  darkMode
                    ? 'bg-gray-900 border-gray-700'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {entry.date} at {entry.time}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => speakEntry(entry.id)}
                      className={`p-2 text-blue-600 rounded-lg transition ${darkMode ? 'hover:bg-blue-900/30' : 'hover:bg-blue-50'}`}
                      title="Listen to entry"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className={`p-2 text-red-600 rounded-lg transition ${darkMode ? 'hover:bg-red-900/30' : 'hover:bg-red-50'}`}
                      title="Delete entry"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p 
                  id={`entry-text-${entry.id}`}
                  className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}
                >
                  {entry.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {entries.length === 0 && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-12 text-center`}>
          <Mic className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
          <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            No journal entries yet
          </h3>
          <p className={darkMode ? 'text-gray-500' : 'text-gray-500'}>
            {isMobile 
              ? 'Tap the text box and use your keyboard\'s mic button to start!' 
              : 'Start recording your thoughts!'
            }
          </p>
        </div>
      )}
    </div>
  );
}

// Data Management Component
function DataManagement() {
  const [exportStatus, setExportStatus] = useState('');
  const [importStatus, setImportStatus] = useState('');
  const { darkMode } = useTheme();

  const getAllData = () => {
    return {
      moodHistory: JSON.parse(localStorage.getItem('moodHistory') || '[]'),
      voiceJournalEntries: JSON.parse(localStorage.getItem('voiceJournalEntries') || '[]'),
      todos: JSON.parse(localStorage.getItem('mentalHealthGoals') || '[]'),
      darkMode: JSON.parse(localStorage.getItem('darkMode') || 'false'),
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
  };

  const exportData = () => {
    try {
      const data = getAllData();
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `mindfulpath-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setExportStatus('success');
      setTimeout(() => setExportStatus(''), 3000);
    } catch (error) {
      setExportStatus('error');
      console.error('Export error:', error);
    }
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        if (!data.version) {
          throw new Error('Invalid backup file format');
        }

        if (data.moodHistory) {
          localStorage.setItem('moodHistory', JSON.stringify(data.moodHistory));
        }
        if (data.voiceJournalEntries) {
          localStorage.setItem('voiceJournalEntries', JSON.stringify(data.voiceJournalEntries));
        }
        if (data.todos) {
          localStorage.setItem('mentalHealthGoals', JSON.stringify(data.todos));
        }
        if (data.darkMode !== undefined) {
          localStorage.setItem('darkMode', JSON.stringify(data.darkMode));
        }

        setImportStatus('success');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setImportStatus('error');
        console.error('Import error:', error);
        setTimeout(() => setImportStatus(''), 3000);
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (window.confirm('⚠️ Are you sure you want to delete ALL your data? This cannot be undone!')) {
      localStorage.removeItem('moodHistory');
      localStorage.removeItem('voiceJournalEntries');
      localStorage.removeItem('mentalHealthGoals');
      alert('✅ All data has been cleared!');
      window.location.reload();
    }
  };

  const dataStats = getAllData();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Data Management
        </h1>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
          Export, import, or manage your mental health data
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center gap-3 mb-3">
            <Database className="w-8 h-8 text-purple-500" />
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {dataStats.moodHistory.length}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Mood Check-ins
              </div>
            </div>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center gap-3 mb-3">
            <Mic className="w-8 h-8 text-pink-500" />
            <div>
              <div className="text-3xl font-bold text-pink-600">
                {dataStats.voiceJournalEntries.length}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Journal Entries
              </div>
            </div>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-8 h-8 text-blue-500" />
            <div>
              <div className="text-3xl font-bold text-blue-600">
                {dataStats.todos.length}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Goals Set
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 space-y-6`}>
        <div>
          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            📥 Export Your Data
          </h2>
          <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Download all your mental health data as a backup file
          </p>
          <button
            onClick={exportData}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Export Data (JSON)
          </button>
          {exportStatus === 'success' && (
            <div className={`mt-4 p-4 ${darkMode ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-300'} border-2 rounded-lg flex items-center gap-2`}>
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className={darkMode ? 'text-green-400' : 'text-green-800'}>✅ Data exported successfully!</span>
            </div>
          )}
          {exportStatus === 'error' && (
            <div className={`mt-4 p-4 ${darkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-300'} border-2 rounded-lg flex items-center gap-2`}>
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className={darkMode ? 'text-red-400' : 'text-red-800'}>❌ Export failed. Please try again.</span>
            </div>
          )}
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 space-y-6`}>
        <div>
          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            📤 Import Your Data
          </h2>
          <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Restore your data from a previous backup file
          </p>
          <label className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer">
            <Upload className="w-5 h-5" />
            Import Data (JSON)
            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="hidden"
            />
          </label>
          {importStatus === 'success' && (
            <div className={`mt-4 p-4 ${darkMode ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-300'} border-2 rounded-lg flex items-center gap-2`}>
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className={darkMode ? 'text-green-400' : 'text-green-800'}>✅ Data imported! Reloading page...</span>
            </div>
          )}
          {importStatus === 'error' && (
            <div className={`mt-4 p-4 ${darkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-300'} border-2 rounded-lg flex items-center gap-2`}>
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className={darkMode ? 'text-red-400' : 'text-red-800'}>❌ Invalid file format. Please use a valid backup file.</span>
            </div>
          )}
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800 border-red-700' : 'bg-white border-red-200'} rounded-2xl shadow-xl p-8 space-y-6 border-2`}>
        <div>
          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            🗑️ Clear All Data
          </h2>
          <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            ⚠️ Warning: This will permanently delete all your data
          </p>
          <button
            onClick={clearAllData}
            className="w-full bg-red-500 text-white py-4 rounded-xl font-semibold hover:bg-red-600 transition-all"
          >
            Delete All Data
          </button>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-blue-50'} rounded-2xl p-8`}>
        <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
          ℹ️ About Your Data
        </h3>
        <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <li>• All your data is stored locally on your device</li>
          <li>• We never send your data to any servers</li>
          <li>• Export regularly to prevent data loss</li>
          <li>• Backup files can be transferred between devices</li>
          <li>• Your privacy is 100% protected</li>
        </ul>
      </div>
    </div>
  );
}

// Emotion Reflector Component
function EmotionReflector() {
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState([]);
  const { darkMode } = useTheme();

  const emotions = [
    { name: 'Happy', emoji: '😊', color: 'bg-yellow-100 border-yellow-300' },
    { name: 'Sad', emoji: '😢', color: 'bg-blue-100 border-blue-300' },
    { name: 'Anxious', emoji: '😰', color: 'bg-purple-100 border-purple-300' },
    { name: 'Angry', emoji: '😠', color: 'bg-red-100 border-red-300' },
    { name: 'Calm', emoji: '😌', color: 'bg-green-100 border-green-300' },
    { name: 'Excited', emoji: '🤩', color: 'bg-pink-100 border-pink-300' }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('moodHistory');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading mood history');
      }
    }
  }, []);

  const handleSave = () => {
    if (!selectedEmotion) return;
    
    const newEntry = {
      id: Date.now(),
      emotion: selectedEmotion,
      intensity,
      note,
      timestamp: new Date().toLocaleString(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };
    
    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('moodHistory', JSON.stringify(updatedEntries));
    
    setSelectedEmotion('');
    setIntensity(5);
    setNote('');
    
    alert('✅ Mood saved successfully!');
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Emotion Reflector
        </h1>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
          How are you feeling today?
        </p>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 space-y-6`}>
        <div>
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Select your emotion
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {emotions.map(emotion => (
              <button
                key={emotion.name}
                onClick={() => setSelectedEmotion(emotion.name)}
                className={`p-4 rounded-xl border-2 transition-all ${emotion.color} ${
                  selectedEmotion === emotion.name ? 'ring-4 ring-purple-300 scale-105' : 'hover:scale-105'
                }`}
              >
                <div className="text-4xl mb-2">{emotion.emoji}</div>
                <div className="font-semibold">{emotion.name}</div>
              </button>
            ))}
          </div>
        </div>

        {selectedEmotion && (
          <>
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                How intense? <span className="text-purple-600">{intensity}/10</span>
              </h3>
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Add a note (optional)
              </h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's on your mind?"
                className={`w-full p-4 border-2 rounded-xl focus:outline-none resize-none ${
                  darkMode 
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500'
                    : 'bg-white border-gray-200 text-gray-800 focus:border-purple-500'
                }`}
                rows="4"
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Save Reflection
            </button>
          </>
        )}
      </div>

      {entries.length > 0 && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Your Reflections
          </h2>
          <div className="space-y-4">
            {entries.map(entry => (
              <div key={entry.id} className={`border-l-4 border-purple-500 pl-4 py-2 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-r-lg`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {entry.emotion}
                  </span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {entry.timestamp}
                  </span>
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Intensity: {entry.intensity}/10
                </div>
                {entry.note && (
                  <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {entry.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Learn Section Component
function LearnSection() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topics, setTopics] = useState([]);
  const { darkMode } = useTheme();

  useEffect(() => {
    const demoTopics = [
      {
        id: 'anxiety',
        title: 'Understanding Anxiety',
        description: 'Learn about anxiety, its symptoms, and effective coping strategies'
      },
      {
        id: 'depression',
        title: 'Understanding Depression',
        description: 'Explore depression, treatment options, and support resources'
      },
      {
        id: 'stress',
        title: 'Managing Stress',
        description: 'Discover practical techniques to manage daily stress'
      },
      {
        id: 'self_care',
        title: 'The Importance of Self-Care',
        description: 'Learn why self-care is essential for mental wellness'
      },
      {
        id: 'mindfulness',
        title: 'Introduction to Mindfulness',
        description: 'Practice being present and reducing anxiety through mindfulness'
      },
      {
        id: 'social_connections',
        title: 'The Power of Social Connections',
        description: 'Understand how relationships impact mental health'
      }
    ];
    setTopics(demoTopics);
  }, []);

  if (selectedTopic) {
    return <TopicDetail topic={selectedTopic} onBack={() => setSelectedTopic(null)} darkMode={darkMode} />;
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Learn About Mental Health</h1>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Choose a topic to explore</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map(topic => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopic(topic)}
            className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:shadow-xl'} rounded-xl shadow-lg p-6 text-left transition-all transform hover:-translate-y-1`}
          >
            <BookOpen className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{topic.title}</h3>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{topic.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function TopicDetail({ topic, onBack, darkMode }) {
  const content = {
    anxiety: {
      keyPoints: [
        'Anxiety affects over 40 million adults in the U.S.',
        'Common symptoms include racing heart, sweating, and worry',
        'Deep breathing and mindfulness can help manage anxiety',
        'Professional help is available and effective'
      ],
      tips: [
        'Practice 4-7-8 breathing technique',
        'Break tasks into smaller steps',
        'Exercise regularly to reduce stress hormones',
        'Connect with supportive friends and family'
      ]
    },
    depression: {
      keyPoints: [
        'Depression is one of the most common mental health conditions',
        "It's caused by a combination of genetic, biological, and environmental factors",
        'Symptoms include persistent sadness, loss of interest, and fatigue',
        'Treatment is highly effective with therapy and/or medication'
      ],
      tips: [
        'Maintain a regular sleep schedule',
        'Set small, achievable daily goals',
        'Stay connected with loved ones',
        "Seek professional help - it's a sign of strength"
      ]
    },
    stress: {
      keyPoints: [
        "Stress triggers the 'fight or flight' response",
        'Chronic stress can lead to health problems',
        'Everyone experiences stress differently',
        'Stress management is a learnable skill'
      ],
      tips: [
        'Identify your stress triggers',
        'Practice time management',
        'Take regular breaks during work',
        'Engage in activities you enjoy'
      ]
    },
    self_care: {
      keyPoints: [
        "Self-care is not selfish - it's necessary",
        'It includes physical, emotional, and mental health activities',
        'Regular self-care prevents burnout',
        'Small acts of self-care add up over time'
      ],
      tips: [
        "Schedule 'me time' into your week",
        "Practice saying 'no' to protect your energy",
        'Develop a bedtime routine',
        'Engage in hobbies that bring you joy'
      ]
    },
    mindfulness: {
      keyPoints: [
        'Mindfulness reduces stress and improves focus',
        'It can be practiced anywhere, anytime',
        'Research shows it changes brain structure positively',
        'Start with just 5 minutes a day'
      ],
      tips: [
        'Focus on your breath for 5 minutes daily',
        'Notice sensations in your body without judgment',
        'Practice mindful eating - savor each bite',
        'Use apps like Headspace or Calm for guidance'
      ]
    },
    social_connections: {
      keyPoints: [
        'Social connections boost happiness and reduce stress',
        'Loneliness can be as harmful as smoking',
        'Quality matters more than quantity in relationships',
        'Building connections takes effort and vulnerability'
      ],
      tips: [
        'Reach out to one friend or family member weekly',
        'Join clubs or groups based on your interests',
        'Volunteer in your community',
        'Practice active listening in conversations'
      ]
    }
  };

  const topicContent = content[topic.id] || { keyPoints: [], tips: [] };

  return (
    <div className="space-y-8">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-semibold"
      >
        <span>←</span>
        <span>Back to Topics</span>
      </button>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 space-y-6`}>
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{topic.title}</h1>
        <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{topic.description}</p>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-purple-600">Key Points</h2>
            <ul className="space-y-3">
              {topicContent.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'} rounded-xl p-6`}>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>Practical Tips</h2>
            <ul className="space-y-3">
              {topicContent.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <Target className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Quiz Section Component
// Enhanced Quiz Section with Unlimited Random Questions
function QuizSection() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quizHistory, setQuizHistory] = useState([]);
  const { darkMode } = useTheme();

  // Load quiz history
  useEffect(() => {
    const saved = localStorage.getItem('quizHistory');
    if (saved) {
      try {
        setQuizHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading quiz history');
      }
    }
  }, []);

  // Large pool of mental health questions
  const questionBank = [
    {
      id: 1,
      question: "What is the '4-7-8' breathing technique used for?",
      options: [
        'Building muscle strength',
        'Reducing anxiety and promoting relaxation',
        'Improving digestion',
        'Increasing heart rate'
      ],
      correct: 1,
      explanation: "The 4-7-8 breathing technique is specifically designed to activate the parasympathetic nervous system, helping reduce anxiety and promote relaxation."
    },
    {
      id: 2,
      question: 'Which of these is a common symptom of depression?',
      options: [
        'Increased energy',
        'Persistent sadness and loss of interest in activities',
        'Improved concentration',
        'Better sleep quality'
      ],
      correct: 1,
      explanation: "Persistent sadness and loss of interest (anhedonia) are hallmark symptoms of depression. Other symptoms may include fatigue, changes in appetite, and difficulty concentrating."
    },
    {
      id: 3,
      question: 'How long should you practice mindfulness daily to see benefits?',
      options: [
        'At least 2 hours',
        '30-60 minutes minimum',
        'Just 5-10 minutes is enough to start',
        'Only works if done for full day'
      ],
      correct: 2,
      explanation: "Research shows that even 5-10 minutes of daily mindfulness practice can provide significant benefits. Consistency matters more than duration."
    },
    {
      id: 4,
      question: 'What does self-care actually mean?',
      options: [
        'Being selfish and ignoring others',
        'Only spa days and luxury treatments',
        'Taking actions to maintain and improve your health and well-being',
        'Avoiding all responsibilities'
      ],
      correct: 2,
      explanation: "Self-care is about taking deliberate actions to maintain physical, mental, and emotional health. It's necessary for overall well-being, not selfish."
    },
    {
      id: 5,
      question: "What is the 'fight or flight' response related to?",
      options: [
        'Stress and anxiety',
        'Happiness',
        'Sleep patterns',
        'Digestion'
      ],
      correct: 0,
      explanation: "The fight or flight response is the body's automatic reaction to perceived threats, closely related to stress and anxiety. It triggers the release of adrenaline and cortisol."
    },
    {
      id: 6,
      question: 'Which neurotransmitter is often called the "feel-good" chemical?',
      options: [
        'Cortisol',
        'Adrenaline',
        'Serotonin',
        'Insulin'
      ],
      correct: 2,
      explanation: "Serotonin helps regulate mood, sleep, and appetite. Low serotonin levels are associated with depression and anxiety."
    },
    {
      id: 7,
      question: 'What does CBT stand for in mental health treatment?',
      options: [
        'Comprehensive Behavioral Therapy',
        'Cognitive Behavioral Therapy',
        'Clinical Brain Treatment',
        'Certified Behavior Training'
      ],
      correct: 1,
      explanation: "Cognitive Behavioral Therapy (CBT) is an evidence-based treatment that helps identify and change negative thought patterns and behaviors."
    },
    {
      id: 8,
      question: 'How much sleep do adults typically need per night for optimal mental health?',
      options: [
        '4-5 hours',
        '6-7 hours',
        '7-9 hours',
        '10-12 hours'
      ],
      correct: 2,
      explanation: "Most adults need 7-9 hours of sleep for optimal physical and mental health. Chronic sleep deprivation is linked to increased risk of depression and anxiety."
    },
    {
      id: 9,
      question: 'Which of these is a grounding technique for anxiety?',
      options: [
        'Ignoring the anxiety',
        'The 5-4-3-2-1 sensory method',
        'Drinking caffeine',
        'Staying in bed all day'
      ],
      correct: 1,
      explanation: "The 5-4-3-2-1 method (name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste) helps ground you in the present moment during anxiety."
    },
    {
      id: 10,
      question: 'What percentage of adults experience a mental health condition in their lifetime?',
      options: [
        'About 10%',
        'About 25%',
        'About 50%',
        'About 75%'
      ],
      correct: 2,
      explanation: "Research shows approximately 50% of people will experience a mental health condition at some point in their lives. Mental health issues are common and treatable."
    },
    {
      id: 11,
      question: 'Which activity is proven to reduce symptoms of depression and anxiety?',
      options: [
        'Watching TV all day',
        'Regular physical exercise',
        'Avoiding social interaction',
        'Skipping meals'
      ],
      correct: 1,
      explanation: "Regular exercise releases endorphins, improves mood, reduces stress hormones, and has been shown to be as effective as medication for mild to moderate depression in some studies."
    },
    {
      id: 12,
      question: 'What is "emotional regulation"?',
      options: [
        'Suppressing all emotions',
        'Only feeling positive emotions',
        'Managing and responding to emotions in healthy ways',
        'Never getting angry'
      ],
      correct: 2,
      explanation: "Emotional regulation is the ability to manage and respond to emotional experiences in adaptive ways, not suppressing or avoiding emotions entirely."
    },
    {
      id: 13,
      question: 'Which of these is a sign someone might need professional mental health help?',
      options: [
        'Feeling sad after a disappointment',
        'Persistent feelings that interfere with daily life',
        'Occasional stress at work',
        'Being tired after a long day'
      ],
      correct: 1,
      explanation: "When symptoms persist, intensify, or significantly interfere with daily functioning, it's important to seek professional help. Mental health treatment is most effective when started early."
    },
    {
      id: 14,
      question: 'What is "rumination" in the context of mental health?',
      options: [
        'A relaxation technique',
        'Repeatedly thinking about negative thoughts or experiences',
        'A type of meditation',
        'Planning for the future'
      ],
      correct: 1,
      explanation: "Rumination is repetitive, negative thinking about past events or worries. It's associated with increased depression and anxiety and is a target in many therapeutic approaches."
    },
    {
      id: 15,
      question: 'How does social connection impact mental health?',
      options: [
        'It has no real effect',
        'It only helps extroverts',
        'Strong social connections improve mental and physical health',
        'Too much connection causes stress'
      ],
      correct: 2,
      explanation: "Research consistently shows that strong social connections are one of the most important factors for mental well-being, comparable to not smoking and more important than exercise for longevity."
    },
    {
      id: 16,
      question: 'What is "progressive muscle relaxation"?',
      options: [
        'Lifting heavier weights over time',
        'Tensing and releasing muscle groups to reduce stress',
        'Stretching exercises',
        'Running longer distances'
      ],
      correct: 1,
      explanation: "Progressive muscle relaxation involves systematically tensing and relaxing different muscle groups to reduce physical tension and promote relaxation."
    },
    {
      id: 17,
      question: 'Which of these is true about mental health medication?',
      options: [
        'It changes your personality',
        'It\'s a sign of weakness',
        'It can be an effective part of treatment for many conditions',
        'It\'s only for severe cases'
      ],
      correct: 2,
      explanation: "Mental health medication can be highly effective for many conditions and is often most effective when combined with therapy. It's a legitimate medical treatment, not a sign of weakness."
    },
    {
      id: 18,
      question: 'What does "burnout" refer to?',
      options: [
        'A physical injury',
        'State of emotional, physical, and mental exhaustion from chronic stress',
        'Temporary tiredness',
        'A medical emergency'
      ],
      correct: 1,
      explanation: "Burnout is a state of complete mental, physical, and emotional exhaustion, often work-related. It's characterized by cynicism, detachment, and reduced effectiveness."
    },
    {
      id: 19,
      question: 'Which practice involves focusing attention on the present moment without judgment?',
      options: [
        'Overthinking',
        'Worrying',
        'Mindfulness',
        'Multitasking'
      ],
      correct: 2,
      explanation: "Mindfulness is the practice of maintaining moment-to-moment awareness of thoughts, feelings, and surroundings in a non-judgmental way."
    },
    {
      id: 20,
      question: 'What is the difference between sadness and clinical depression?',
      options: [
        'There is no difference',
        'Depression is longer-lasting and more severe, affecting daily functioning',
        'Sadness is worse than depression',
        'Depression only affects mood'
      ],
      correct: 1,
      explanation: "While sadness is a normal emotional response to loss or disappointment, clinical depression is more persistent, severe, and interferes with daily life, requiring professional treatment."
    }
  ];

  // Get random questions
  const getRandomQuestions = (count = 5) => {
    const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  };

  const startQuiz = (questionCount = 5) => {
    setLoading(true);
    // Simulate loading (you could fetch from an API here)
    setTimeout(() => {
      const randomQuestions = getRandomQuestions(questionCount);
      setQuestions(randomQuestions);
      setStarted(true);
      setLoading(false);
    }, 500);
  };

  const handleAnswer = (optionIndex) => {
    setAnswers({ ...answers, [currentQ]: optionIndex });
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) correct++;
    });
    
    const score = Math.round((correct / questions.length) * 100);
    const resultData = {
      score,
      correct,
      total: questions.length,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };
    
    setResults(resultData);
    
    // Save to history
    const updatedHistory = [resultData, ...quizHistory].slice(0, 10); // Keep last 10
    setQuizHistory(updatedHistory);
    localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
    
    setShowResults(true);
  };

  const resetQuiz = () => {
    setStarted(false);
    setCurrentQ(0);
    setAnswers({});
    setShowResults(false);
    setResults(null);
    setQuestions([]);
  };

  // Start screen
  if (!started && !loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <Award className="w-20 h-20 text-purple-600 mx-auto" />
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Mental Health Quiz</h1>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Test your knowledge with unlimited random questions
          </p>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 space-y-6`}>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>20+ questions in the database</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Random selection each time</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Detailed explanations for each answer</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Track your quiz history</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Choose Quiz Length:</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => startQuiz(5)}
                className="py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Quick Quiz (5 questions)
              </button>
              <button
                onClick={() => startQuiz(10)}
                className="py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Standard (10 questions)
              </button>
            </div>
            <button
              onClick={() => startQuiz(20)}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Full Quiz (20 questions)
            </button>
          </div>
        </div>

        {/* Quiz History */}
        {quizHistory.length > 0 && (
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              📊 Your Recent Scores
            </h2>
            <div className="space-y-3">
              {quizHistory.map((entry, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    darkMode ? 'bg-gray-900' : 'bg-gray-50'
                  }`}
                >
                  <div>
                    <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {entry.correct}/{entry.total} correct
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {entry.date} at {entry.time}
                    </div>
                  </div>
                  <div className={`text-3xl font-bold ${
                    entry.score >= 80 ? 'text-green-500' :
                    entry.score >= 60 ? 'text-yellow-500' :
                    'text-red-500'
                  }`}>
                    {entry.score}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Loading screen
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-12 text-center`}>
          <div className="animate-spin w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Preparing your quiz...
          </p>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    const emoji = results.score >= 80 ? '🎉' : results.score >= 60 ? '👍' : '💪';
    const message = results.score >= 80 ? 'Excellent!' : results.score >= 60 ? 'Good job!' : 'Keep learning!';

    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 text-center space-y-6`}>
          <div className="text-6xl">{emoji}</div>
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{message}</h1>
          
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-8">
            <div className="text-6xl font-bold mb-2">{results.score}%</div>
            <div className="text-xl">
              You got {results.correct} out of {results.total} correct!
            </div>
          </div>

          <div className="text-left space-y-4">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Review Your Answers</h2>
            {questions.map((q, idx) => {
              const isCorrect = answers[idx] === q.correct;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-lg ${
                    isCorrect
                      ? darkMode ? 'bg-green-900/30 border-green-700 border-2' : 'bg-green-50 border-2 border-green-300'
                      : darkMode ? 'bg-red-900/30 border-red-700 border-2' : 'bg-red-50 border-2 border-red-300'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-2xl">{isCorrect ? '✅' : '❌'}</span>
                    <div className="flex-1">
                      <div className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        Q{idx + 1}: {q.question}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <strong>Your answer:</strong> {q.options[answers[idx]]}
                      </div>
                      {!isCorrect && (
                        <div className={`text-sm mt-1 ${darkMode ? 'text-green-400' : 'text-green-700'} font-medium`}>
                          <strong>Correct answer:</strong> {q.options[q.correct]}
                        </div>
                      )}
                      {q.explanation && (
                        <div className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} italic`}>
                          💡 {q.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4">
            <button
              onClick={resetQuiz}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Take Another Quiz
            </button>
            <button
              onClick={() => window.location.reload()}
              className={`px-6 py-4 rounded-xl font-semibold ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz in progress
  const question = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 space-y-6`}>
        <div className="flex justify-between items-center mb-4">
          <span className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Question {currentQ + 1} of {questions.length}
          </span>
          <span className="text-sm font-semibold text-purple-600">{Math.round(progress)}%</span>
        </div>

        <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
          <div
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{question.question}</h2>

        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                answers[currentQ] === idx
                  ? darkMode
                    ? 'border-purple-500 bg-purple-900/30 font-semibold'
                    : 'border-purple-500 bg-purple-50 font-semibold'
                  : darkMode
                  ? 'border-gray-700 hover:border-purple-400 hover:bg-purple-900/20'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
              } ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          onClick={currentQ < questions.length - 1 ? handleNext : calculateResults}
          disabled={answers[currentQ] === undefined}
          className={`w-full py-4 rounded-xl font-semibold transition-all ${
            answers[currentQ] !== undefined
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
              : 'bg-gray-300 text-gray-400 cursor-not-allowed'
          }`}
        >
          {currentQ < questions.length - 1 ? 'Next Question →' : 'See Results 🎯'}
        </button>
      </div>
    </div>
  );
}

export { QuizSection };

// Todo Section Component
function TodoSection() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const { darkMode } = useTheme();
  
  useEffect(() => {
    const saved = localStorage.getItem('mentalHealthGoals');
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading goals');
      }
    }
  }, []);

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  const handleAdd = () => {
    if (!newTodo.trim()) return;
    
    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      createdAt: new Date().toLocaleString()
    };
    
    const updatedTodos = [...todos, todo];
    setTodos(updatedTodos);
    localStorage.setItem('mentalHealthGoals', JSON.stringify(updatedTodos));
    setNewTodo('');
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTodos(updatedTodos);
    localStorage.setItem('mentalHealthGoals', JSON.stringify(updatedTodos));
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(t => t.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('mentalHealthGoals', JSON.stringify(updatedTodos));
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    const updatedTodos = todos.map(t =>
      t.id === editingId ? { ...t, text: editText } : t
    );
    setTodos(updatedTodos);
    localStorage.setItem('mentalHealthGoals', JSON.stringify(updatedTodos));
    setEditingId(null);
    setEditText('');
  };

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>My Mental Health Goals</h1>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{currentMonth} {currentYear}</p>
      </div>

      {totalCount > 0 && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
          <div className="text-5xl font-bold mb-2">
            {completedCount}/{totalCount}
          </div>
          <p className="text-lg opacity-90">goals completed this month</p>
          <div className="w-full bg-white/20 rounded-full h-4 mt-4">
            <div
              className="bg-white h-4 rounded-full transition-all"
              style={{ width: `${totalCount ? (completedCount / totalCount) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Add New Goal</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="E.g., Practice mindfulness for 10 minutes daily"
            className={`flex-1 p-4 border-2 rounded-xl focus:outline-none ${
              darkMode
                ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500'
                : 'bg-white border-gray-200 text-gray-800 focus:border-purple-500'
            }`}
          />
          <button
            onClick={handleAdd}
            className="px-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Add
          </button>
        </div>
      </div>

      {todos.length > 0 ? (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Your Goals</h2>
          <div className="space-y-4">
            {todos.map(todo => (
              <div
                key={todo.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  todo.completed 
                    ? darkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'
                    : darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
                }`}
              >
                {editingId === todo.id ? (
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className={`flex-1 p-2 border-2 border-purple-300 rounded-lg focus:outline-none ${
                        darkMode ? 'bg-gray-800 text-white' : 'bg-white'
                      }`}
                      autoFocus
                    />
                    <button
                      onClick={saveEdit}
                      className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleComplete(todo.id)}
                      className="flex-shrink-0"
                    >
                      {todo.completed ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400" />
                      )}
                    </button>
                    <div className="flex-1">
                      <p className={`${todo.completed ? 'line-through' : ''} ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                        {todo.text}
                      </p>
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>{todo.createdAt}</p>
                    </div>
                    <button
                      onClick={() => startEdit(todo)}
                      className={`p-2 text-blue-600 rounded-lg ${darkMode ? 'hover:bg-blue-900/30' : 'hover:bg-blue-50'}`}
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className={`p-2 text-red-600 rounded-lg ${darkMode ? 'hover:bg-red-900/30' : 'hover:bg-red-50'}`}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-12 text-center`}>
          <Target className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
          <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No goals yet</h3>
          <p className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Start by adding your first mental health goal above!</p>
        </div>
      )}

      <div className={`${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'} rounded-2xl p-8`}>
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>Goal Ideas</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Practice 10 minutes of meditation daily',
            'Journal my thoughts 3 times a week',
            'Exercise for 30 minutes, 4 days a week',
            'Connect with a friend or family member weekly',
            'Practice gratitude - write 3 things daily',
            'Get 7-8 hours of sleep each night'
          ].map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => setNewTodo(suggestion)}
              className={`p-3 rounded-lg text-left transition-all text-sm ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                  : 'bg-white hover:shadow-md text-gray-800'
              }`}
            >
              + {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// HomePage Component
function HomePage({ setCurrentPage }) {
  const { darkMode } = useTheme();

  return (
    <div className="space-y-12">
      <div className="text-center space-y-6 py-12">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Your Mental Health Journey Starts Here
        </h1>
        <p className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Track your emotions, learn about mental health, test your knowledge, and set meaningful goals - all in one supportive platform.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          icon={Brain}
          title="Emotion Reflector"
          description="Understand and track your emotions with our interactive reflection tool"
          color="purple"
          onClick={() => setCurrentPage('emotion')}
        />
        <FeatureCard
          icon={TrendingUp}
          title="Mood Analytics"
          description="Visualize patterns and gain insights from your emotional journey"
          color="pink"
          onClick={() => setCurrentPage('analytics')}
        />
        <FeatureCard
          icon={Wind}
          title="Breathing Exercises"
          description="Calm your mind with guided 4-7-8 breathing technique"
          color="blue"
          onClick={() => setCurrentPage('breathing')}
        />
        <FeatureCard
          icon={BookOpen}
          title="Learn & Grow"
          description="Explore 6 essential mental health topics designed for beginners"
          color="indigo"
          onClick={() => setCurrentPage('learn')}
        />
        <FeatureCard
          icon={Award}
          title="Test Knowledge"
          description="Take our quiz to learn more about mental health and wellness"
          color="purple"
          onClick={() => setCurrentPage('quiz')}
        />
        <FeatureCard
          icon={ListTodo}
          title="Monthly Goals"
          description="Set and track your mental wellness goals month by month"
          color="pink"
          onClick={() => setCurrentPage('todos')}
        />
        <FeatureCard
          icon={Sparkles}
          title="AI Mentor"
          description="Get 24/7 support and guidance from our AI mental health companion"
          color="blue"
          onClick={() => setCurrentPage('mentor')}
        />
        <FeatureCard
          icon={Shield}
          title="Crisis Resources"
          description="Access immediate help and global crisis hotlines"
          color="indigo"
          onClick={() => setCurrentPage('crisis')}
        />
        <FeatureCard
          icon={Mic}
          title="Voice Journal"
          description="Record your thoughts with voice-to-text journaling"
          color="purple"
          onClick={() => setCurrentPage('journal')}
        />
        <FeatureCard
          icon={Database}
          title="Data Management"
          description="Export, import, and manage your mental health data"
          color="pink"
          onClick={() => setCurrentPage('data')}
        />
        <FeatureCard
          icon={Brain}
          title="CBT Thought Record"
          description="Challenge negative thoughts with cognitive behavioral therapy"
          color="indigo"
          onClick={() => setCurrentPage('cbt')}
        />
        <FeatureCard
          icon={Award}
          title="Achievements & Streaks"
          description="Track your progress and unlock achievements"
          color="purple"
          onClick={() => setCurrentPage('achievements')}
        />
        <FeatureCard
          icon={Calendar}
          title="Mood Calendar"
          description="Visualize your emotional patterns with a heatmap"
          color="pink"
          onClick={() => setCurrentPage('calendar')}
        />
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 grid md:grid-cols-3 gap-8`}>
        <StatCard number="6" label="Educational Topics" darkMode={darkMode} />
        <StatCard number="10" label="Quiz Questions" darkMode={darkMode} />
        <StatCard number="∞" label="Goals You Can Set" darkMode={darkMode} />
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">Why Mental Health Matters</h2>
        <p className="text-lg opacity-90 mb-6">
          Mental health is just as important as physical health. Whether you're dealing with stress, 
          anxiety, or just want to learn more about emotional wellness, we're here to support you 
          every step of the way.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <InfoPoint text="40+ million adults experience anxiety" />
          <InfoPoint text="Treatment is highly effective" />
          <InfoPoint text="Early awareness makes a difference" />
          <InfoPoint text="You're not alone in this journey" />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, color, onClick }) {
  const colorClasses = {
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    pink: 'from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700',
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    indigo: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700'
  };

  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-br ${colorClasses[color]} text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-left`}
    >
      <Icon className="w-12 h-12 mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
    </button>
  );
}

function StatCard({ number, label, darkMode }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-purple-600 mb-2">{number}</div>
      <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{label}</div>
    </div>
  );
}

function InfoPoint({ text }) {
  return (
    <div className="flex items-center space-x-2">
      <CheckCircle className="w-5 h-5 flex-shrink-0" />
      <span>{text}</span>
    </div>
  );
}

// Navigation Component
function Navigation({ currentPage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen }) {
  const { darkMode, toggleTheme } = useTheme();
  const [toolsOpen, setToolsOpen] = useState(false);

  const mainNavItems = [
    { id: 'home', label: 'Home', icon: Heart },
    { id: 'emotion', label: 'Emotions', icon: Brain },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'mentor', label: 'AI Mentor', icon: Sparkles },
    { id: 'journal', label: 'Voice Journal', icon: Mic },
  ];

  const toolsItems = [
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'breathing', label: 'Breathe', icon: Wind },
    { id: 'quiz', label: 'Quiz', icon: Award },
    { id: 'todos', label: 'Goals', icon: ListTodo },
    { id: 'crisis', label: 'Crisis', icon: Shield },
    { id: 'data', label: 'Data', icon: Database },
    { id: 'cbt', label: 'CBT Record', icon: Brain },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ];

  const allNavItems = [...mainNavItems, ...toolsItems];

  return (
    <nav className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg border-b sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg lg:hidden ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <Menu size={24} className={darkMode ? 'text-white' : 'text-gray-800'} />
            </button>
            <div className="flex items-center gap-3">
              <Sparkles className="text-purple-500" size={28} />
              <div>
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  MindfulPath
                </h1>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {mainNavItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  currentPage === item.id
                    ? 'bg-purple-500 text-white shadow-lg'
                    : darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
            
            <div className="relative">
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Target size={18} />
                <span>Tools</span>
                <span style={{ 
                  transition: 'transform 0.2s',
                  transform: toolsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  fontSize: '0.7rem',
                  marginLeft: '4px'
                }}>▼</span>
              </button>
              
              {toolsOpen && (
                <div className={`absolute top-full right-0 mt-2 w-48 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-lg shadow-xl border-2 py-2 z-50`}>
                  {toolsItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentPage(item.id);
                        setToolsOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left transition-all flex items-center gap-2 ${
                        currentPage === item.id
                          ? 'bg-purple-500 text-white'
                          : darkMode
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              {mobileMenuOpen ? <X size={24} className={darkMode ? 'text-white' : 'text-gray-800'} /> : <Menu size={24} className={darkMode ? 'text-white' : 'text-gray-800'} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`lg:hidden pb-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-t`}>
            <div className="space-y-2 pt-4">
              {allNavItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    currentPage === item.id
                      ? 'bg-purple-500 text-white shadow-lg'
                      : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Footer Component
function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} mt-16 py-8 border-t`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>MindfulPath</span>
          </div>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Supporting mental health awareness and wellness for all
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Built with ❤️ for better mental wellness
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export default function MentalHealthPlatform() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <ThemedApp 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </ThemeProvider>
  );
}

function ThemedApp({ currentPage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen }) {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50'
    }`}>
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'emotion' && <EmotionReflector />}
        {currentPage === 'analytics' && <MoodAnalytics />}
        {currentPage === 'breathing' && <BreathingExercise />}
        {currentPage === 'learn' && <LearnSection />}
        {currentPage === 'quiz' && <QuizSection />}
        {currentPage === 'todos' && <TodoSection />}
        {currentPage === 'mentor' && <AIMentor />}
        {currentPage === 'crisis' && <CrisisResources />}
        {currentPage === 'journal' && <VoiceJournal />}
        {currentPage === 'data' && <DataManagement />}
        {currentPage === 'cbt' && <CBTThoughtRecord />}
        {currentPage === 'achievements' && <AchievementSystem />}
        {currentPage === 'calendar' && <MoodCalendarHeatmap />}
      </main>

      <Footer />
    </div>
  );
}

// Achievement & Streak System Component
function AchievementSystem() {
  const [achievements, setAchievements] = useState([]);
  const [streaks, setStreaks] = useState({
    mood: { current: 0, best: 0, lastDate: null },
    journal: { current: 0, best: 0, lastDate: null },
    breathing: { current: 0, best: 0, lastDate: null }
  });
  const { darkMode } = useTheme();

  // Define all possible achievements
  const allAchievements = [
    // Streak Achievements
    { id: 'mood_3day', title: 'Getting Started', description: '3-day mood tracking streak', icon: '🔥', type: 'mood', requirement: 3, earned: false },
    { id: 'mood_7day', title: 'Week Warrior', description: '7-day mood tracking streak', icon: '⭐', type: 'mood', requirement: 7, earned: false },
    { id: 'mood_30day', title: 'Monthly Master', description: '30-day mood tracking streak', icon: '👑', type: 'mood', requirement: 30, earned: false },
    
    { id: 'journal_3day', title: 'Journal Beginner', description: '3-day journaling streak', icon: '📝', type: 'journal', requirement: 3, earned: false },
    { id: 'journal_7day', title: 'Consistent Writer', description: '7-day journaling streak', icon: '✍️', type: 'journal', requirement: 7, earned: false },
    { id: 'journal_30day', title: 'Journaling Pro', description: '30-day journaling streak', icon: '📚', type: 'journal', requirement: 30, earned: false },
    
    { id: 'breathing_3day', title: 'Breath Novice', description: '3-day breathing practice streak', icon: '🌬️', type: 'breathing', requirement: 3, earned: false },
    { id: 'breathing_7day', title: 'Calm Seeker', description: '7-day breathing practice streak', icon: '🧘', type: 'breathing', requirement: 7, earned: false },
    { id: 'breathing_30day', title: 'Zen Master', description: '30-day breathing practice streak', icon: '☮️', type: 'breathing', requirement: 30, earned: false },
    
    // First Time Achievements
    { id: 'first_mood', title: 'First Reflection', description: 'Track your first mood', icon: '🎯', type: 'first', requirement: 1, earned: false },
    { id: 'first_journal', title: 'First Entry', description: 'Write your first journal entry', icon: '📖', type: 'first', requirement: 1, earned: false },
    { id: 'first_breathing', title: 'First Breath', description: 'Complete your first breathing exercise', icon: '💨', type: 'first', requirement: 1, earned: false },
    
    // Milestone Achievements
    { id: 'mood_10', title: 'Mood Tracker', description: 'Track 10 moods', icon: '📊', type: 'count', requirement: 10, earned: false },
    { id: 'mood_50', title: 'Emotion Expert', description: 'Track 50 moods', icon: '🎓', type: 'count', requirement: 50, earned: false },
    { id: 'mood_100', title: 'Century Club', description: 'Track 100 moods', icon: '💯', type: 'count', requirement: 100, earned: false },
    
    { id: 'journal_10', title: 'Regular Writer', description: 'Write 10 journal entries', icon: '📔', type: 'count', requirement: 10, earned: false },
    { id: 'journal_50', title: 'Prolific Author', description: 'Write 50 journal entries', icon: '🏆', type: 'count', requirement: 50, earned: false },
    
    { id: 'goals_5', title: 'Goal Setter', description: 'Create 5 goals', icon: '🎯', type: 'count', requirement: 5, earned: false },
    { id: 'goals_completed_10', title: 'Goal Crusher', description: 'Complete 10 goals', icon: '💪', type: 'count', requirement: 10, earned: false },
  ];

  // Load achievements and streaks from localStorage
  useEffect(() => {
    const savedAchievements = localStorage.getItem('achievements');
    const savedStreaks = localStorage.getItem('streaks');
    
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    } else {
      setAchievements(allAchievements);
    }
    
    if (savedStreaks) {
      setStreaks(JSON.parse(savedStreaks));
    }
    
    // Check and update achievements based on current data
    checkAchievements();
  }, []);

  // Calculate if date is today
  const isToday = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Calculate if date is yesterday
  const isYesterday = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
  };

  // Update streak
  const updateStreak = (type) => {
    const today = new Date().toISOString();
    const currentStreak = { ...streaks };
    
    if (isToday(currentStreak[type].lastDate)) {
      // Already logged today, don't update
      return currentStreak;
    } else if (isYesterday(currentStreak[type].lastDate)) {
      // Continue streak
      currentStreak[type].current += 1;
      currentStreak[type].best = Math.max(currentStreak[type].best, currentStreak[type].current);
    } else {
      // Streak broken, start new
      currentStreak[type].current = 1;
    }
    
    currentStreak[type].lastDate = today;
    setStreaks(currentStreak);
    localStorage.setItem('streaks', JSON.stringify(currentStreak));
    
    // Check for new achievements
    checkAchievements(currentStreak);
    
    return currentStreak;
  };

  // Check and unlock achievements
  const checkAchievements = (currentStreaks = streaks) => {
    const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    const journalEntries = JSON.parse(localStorage.getItem('voiceJournalEntries') || '[]');
    const goals = JSON.parse(localStorage.getItem('mentalHealthGoals') || '[]');
    
    let updatedAchievements = [...(achievements.length > 0 ? achievements : allAchievements)];
    let newUnlocks = [];
    
    updatedAchievements = updatedAchievements.map(achievement => {
      if (achievement.earned) return achievement;
      
      let shouldEarn = false;
      
      // Streak achievements
      if (achievement.type === 'mood' && currentStreaks.mood.current >= achievement.requirement) {
        shouldEarn = true;
      } else if (achievement.type === 'journal' && currentStreaks.journal.current >= achievement.requirement) {
        shouldEarn = true;
      } else if (achievement.type === 'breathing' && currentStreaks.breathing.current >= achievement.requirement) {
        shouldEarn = true;
      }
      
      // First time achievements
      if (achievement.id === 'first_mood' && moodHistory.length >= 1) shouldEarn = true;
      if (achievement.id === 'first_journal' && journalEntries.length >= 1) shouldEarn = true;
      
      // Count achievements
      if (achievement.id === 'mood_10' && moodHistory.length >= 10) shouldEarn = true;
      if (achievement.id === 'mood_50' && moodHistory.length >= 50) shouldEarn = true;
      if (achievement.id === 'mood_100' && moodHistory.length >= 100) shouldEarn = true;
      if (achievement.id === 'journal_10' && journalEntries.length >= 10) shouldEarn = true;
      if (achievement.id === 'journal_50' && journalEntries.length >= 50) shouldEarn = true;
      if (achievement.id === 'goals_5' && goals.length >= 5) shouldEarn = true;
      if (achievement.id === 'goals_completed_10' && goals.filter(g => g.completed).length >= 10) shouldEarn = true;
      
      if (shouldEarn && !achievement.earned) {
        newUnlocks.push(achievement);
        return { ...achievement, earned: true, earnedDate: new Date().toISOString() };
      }
      
      return achievement;
    });
    
    setAchievements(updatedAchievements);
    localStorage.setItem('achievements', JSON.stringify(updatedAchievements));
    
    // Show notification for new achievements
    if (newUnlocks.length > 0) {
      newUnlocks.forEach(ach => {
        setTimeout(() => {
          alert(`🎉 Achievement Unlocked!\n\n${ach.icon} ${ach.title}\n${ach.description}`);
        }, 300);
      });
    }
  };

  // Expose function to be called from other components
  useEffect(() => {
    window.updateAchievementStreak = updateStreak;
  }, [streaks]);

  const earnedAchievements = achievements.filter(a => a.earned);
  const lockedAchievements = achievements.filter(a => !a.earned);
  const totalAchievements = achievements.length;
  const earnedCount = earnedAchievements.length;
  const completionPercentage = totalAchievements > 0 ? Math.round((earnedCount / totalAchievements) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          🏆 Achievements & Streaks
        </h1>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
          Track your progress and unlock achievements
        </p>
      </div>

      {/* Progress Overview */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Overall Progress
          </h2>
          <div className="text-right">
            <div className="text-4xl font-bold text-purple-600">{earnedCount}/{totalAchievements}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Achievements</div>
          </div>
        </div>
        <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-4`}>
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500 flex items-center justify-center text-white text-xs font-bold"
            style={{ width: `${completionPercentage}%` }}
          >
            {completionPercentage > 10 && `${completionPercentage}%`}
          </div>
        </div>
      </div>

      {/* Current Streaks */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="text-5xl">🔥</div>
            <div className="text-right">
              <div className="text-4xl font-bold">{streaks.mood.current}</div>
              <div className="text-sm opacity-90">Day Streak</div>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-1">Mood Tracking</h3>
          <p className="text-sm opacity-90">Best: {streaks.mood.best} days</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="text-5xl">📝</div>
            <div className="text-right">
              <div className="text-4xl font-bold">{streaks.journal.current}</div>
              <div className="text-sm opacity-90">Day Streak</div>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-1">Journaling</h3>
          <p className="text-sm opacity-90">Best: {streaks.journal.best} days</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="text-5xl">🧘</div>
            <div className="text-right">
              <div className="text-4xl font-bold">{streaks.breathing.current}</div>
              <div className="text-sm opacity-90">Day Streak</div>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-1">Breathing</h3>
          <p className="text-sm opacity-90">Best: {streaks.breathing.best} days</p>
        </div>
      </div>

      {/* Earned Achievements */}
      {earnedAchievements.length > 0 && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            ✨ Earned Achievements ({earnedAchievements.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnedAchievements.map(achievement => (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border-2 border-yellow-400 ${
                  darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'
                } transform hover:scale-105 transition-all`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-4xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className={`font-bold ${darkMode ? 'text-yellow-300' : 'text-yellow-900'}`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
                {achievement.earnedDate && (
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Earned: {new Date(achievement.earnedDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            🔒 Locked Achievements ({lockedAchievements.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedAchievements.map(achievement => (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border-2 ${
                  darkMode 
                    ? 'bg-gray-900 border-gray-700' 
                    : 'bg-gray-50 border-gray-300'
                } opacity-60`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-4xl grayscale">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className={`font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className={`${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'} rounded-2xl p-8`}>
        <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>
          💡 Tips to Earn Achievements
        </h3>
        <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <li>• Track your mood daily to build streaks</li>
          <li>• Write in your journal consistently</li>
          <li>• Practice breathing exercises regularly</li>
          <li>• Set and complete your wellness goals</li>
          <li>• Come back every day - consistency is key!</li>
        </ul>
      </div>
    </div>
  );
}

// Export function to update streaks from other components
export { AchievementSystem };

// Helper function to call from other components
// Add this to your mood tracker, journal, and breathing components:
/*
  After saving mood/journal/breathing:
  if (window.updateAchievementStreak) {
    window.updateAchievementStreak('mood'); // or 'journal' or 'breathing'
  }
*/

// Mood Calendar Heatmap Component
function MoodCalendarHeatmap() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [moodHistory, setMoodHistory] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    const saved = localStorage.getItem('moodHistory');
    if (saved) {
      try {
        setMoodHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading mood history');
      }
    }
  }, []);

  // Get calendar days for current month
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  // Get mood data for a specific date
  const getMoodForDate = (date) => {
    if (!date) return null;
    
    const dateStr = date.toLocaleDateString();
    const moods = moodHistory.filter(mood => {
      const moodDate = new Date(mood.timestamp);
      return moodDate.toLocaleDateString() === dateStr;
    });
    
    return moods;
  };

  // Calculate average intensity for a day
  const getAverageIntensity = (moods) => {
    if (moods.length === 0) return 0;
    const sum = moods.reduce((acc, mood) => acc + mood.intensity, 0);
    return sum / moods.length;
  };

  // Get color based on average intensity
  const getColorForIntensity = (intensity) => {
    if (intensity === 0) return darkMode ? 'bg-gray-800' : 'bg-gray-100';
    if (intensity <= 3) return 'bg-red-500';
    if (intensity <= 5) return 'bg-orange-500';
    if (intensity <= 7) return 'bg-yellow-500';
    if (intensity <= 9) return 'bg-green-500';
    return 'bg-emerald-500';
  };

  // Navigate months
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const days = getCalendarDays();
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate stats for current month
  const monthMoods = moodHistory.filter(mood => {
    const moodDate = new Date(mood.timestamp);
    return moodDate.getMonth() === currentMonth.getMonth() && 
           moodDate.getFullYear() === currentMonth.getFullYear();
  });
  
  const daysTracked = new Set(monthMoods.map(m => new Date(m.timestamp).toLocaleDateString())).size;
  const avgIntensity = monthMoods.length > 0 ? (monthMoods.reduce((acc, m) => acc + m.intensity, 0) / monthMoods.length).toFixed(1) : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          📅 Mood Calendar
        </h1>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
          Visualize your emotional journey over time
        </p>
      </div>

      {/* Month Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center gap-3">
            <Calendar className="w-10 h-10 text-purple-500" />
            <div>
              <div className="text-3xl font-bold text-purple-600">{daysTracked}</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Days Tracked</div>
            </div>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center gap-3">
            <Heart className="w-10 h-10 text-pink-500" />
            <div>
              <div className="text-3xl font-bold text-pink-600">{monthMoods.length}</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Check-ins</div>
            </div>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-10 h-10 text-blue-500" />
            <div>
              <div className="text-3xl font-bold text-blue-600">{avgIntensity}</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Intensity</div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={previousMonth}
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <span className="text-2xl">←</span>
          </button>
          
          <div className="text-center">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {monthName}
            </h2>
            <button
              onClick={goToToday}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              Go to Today
            </button>
          </div>
          
          <button
            onClick={nextMonth}
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <span className="text-2xl">→</span>
          </button>
        </div>

        {/* Week Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map(day => (
            <div
              key={day}
              className={`text-center font-semibold text-sm py-2 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const moods = getMoodForDate(date);
            const avgIntensity = getAverageIntensity(moods);
            const colorClass = getColorForIntensity(avgIntensity);
            const isToday = date.toDateString() === new Date().toDateString();
            const dayNumber = date.getDate();

            return (
              <button
                key={date.toISOString()}
                onClick={() => setSelectedDay(date)}
                className={`aspect-square rounded-lg ${colorClass} ${
                  isToday ? 'ring-4 ring-purple-500' : ''
                } hover:opacity-80 transition-all relative group`}
              >
                <div className={`absolute inset-0 flex items-center justify-center ${
                  avgIntensity === 0 
                    ? darkMode ? 'text-gray-500' : 'text-gray-400'
                    : 'text-white'
                } font-semibold`}>
                  {dayNumber}
                </div>
                
                {/* Tooltip on hover */}
                <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 ${
                  darkMode ? 'bg-gray-900' : 'bg-gray-800'
                } text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10`}>
                  {moods.length > 0 
                    ? `${moods.length} check-in${moods.length > 1 ? 's' : ''} • Avg: ${avgIntensity.toFixed(1)}`
                    : 'No data'
                  }
                </div>
                
                {moods.length > 1 && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Intensity:
          </span>
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`} />
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>None</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-red-500" />
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>1-3</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-orange-500" />
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>4-5</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-yellow-500" />
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>6-7</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-green-500" />
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>8-9</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-500" />
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>10</span>
          </div>
        </div>
      </div>

      {/* Selected Day Details */}
      {selectedDay && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {selectedDay.toLocaleDateString('default', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h2>
            <button
              onClick={() => setSelectedDay(null)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <X className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
            </button>
          </div>

          {(() => {
            const dayMoods = getMoodForDate(selectedDay);
            
            if (dayMoods.length === 0) {
              return (
                <div className="text-center py-12">
                  <Calendar className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                  <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    No mood entries for this day
                  </p>
                </div>
              );
            }

            return (
              <div className="space-y-4">
                {dayMoods.map((mood, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl ${
                      darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
                    } border-2`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">
                          {mood.emotion === 'Happy' && '😊'}
                          {mood.emotion === 'Sad' && '😢'}
                          {mood.emotion === 'Anxious' && '😰'}
                          {mood.emotion === 'Angry' && '😠'}
                          {mood.emotion === 'Calm' && '😌'}
                          {mood.emotion === 'Excited' && '🤩'}
                        </span>
                        <div>
                          <div className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {mood.emotion}
                          </div>
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Intensity: {mood.intensity}/10
                          </div>
                        </div>
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(mood.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    {mood.note && (
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mt-2`}>
                        {mood.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      )}

      {/* Tips */}
      <div className={`${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} rounded-2xl p-8`}>
        <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
          💡 Understanding Your Mood Calendar
        </h3>
        <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <li>• Track your mood daily to see patterns emerge</li>
          <li>• Brighter colors indicate higher intensity/better moods</li>
          <li>• Click any day to see detailed entries</li>
          <li>• Multiple check-ins per day show a white dot</li>
          <li>• Use this to identify triggers and positive patterns</li>
        </ul>
      </div>
    </div>
  );
}

export { MoodCalendarHeatmap };

// CBT Thought Record Component
// CBT Thought Record Component - PART 1: Imports, State, and Data Loading
// Copy this as the beginning of your CBTThoughtRecord component

function CBTThoughtRecord() {
  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    situation: '',
    thought: '',
    feeling: '',
    feelingIntensity: 5,
    evidence: '',
    alternative: '',
    outcome: '',
    outcomeIntensity: 5
  });
  const { darkMode } = useTheme();

  // Load saved records from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cbtRecords');
    if (saved) {
      try {
        setRecords(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading CBT records');
      }
    }
  }, []);

  // Common cognitive distortions reference
  const cognitiveDistortions = [
    { name: 'All-or-Nothing', description: 'Seeing things in black and white categories' },
    { name: 'Overgeneralization', description: 'Seeing a single negative event as a never-ending pattern' },
    { name: 'Mental Filter', description: 'Picking out a single negative detail and dwelling on it' },
    { name: 'Jumping to Conclusions', description: 'Making negative interpretations without evidence' },
    { name: 'Catastrophizing', description: 'Expecting the worst possible outcome' },
    { name: 'Emotional Reasoning', description: 'Assuming emotions reflect reality' },
    { name: 'Should Statements', description: 'Criticizing yourself with "should" or "must"' },
    { name: 'Labeling', description: 'Attaching negative labels to yourself' }
  ];

  // Handler functions
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.situation.trim().length > 0;
      case 2:
        return formData.thought.trim().length > 0;
      case 3:
        return formData.feeling.trim().length > 0;
      case 4:
        return formData.alternative.trim().length > 0;
      case 5:
        return formData.outcome.trim().length > 0;
      default:
        return false;
    }
  };

  const saveRecord = () => {
    const newRecord = {
      id: Date.now(),
      ...formData,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };

    const updatedRecords = [newRecord, ...records];
    setRecords(updatedRecords);
    localStorage.setItem('cbtRecords', JSON.stringify(updatedRecords));

    // Reset form
    setFormData({
      situation: '',
      thought: '',
      feeling: '',
      feelingIntensity: 5,
      evidence: '',
      alternative: '',
      outcome: '',
      outcomeIntensity: 5
    });
    setCurrentStep(1);
    setShowForm(false);

    alert('✅ Thought record saved successfully!');
  };

  const deleteRecord = (id) => {
    if (window.confirm('Are you sure you want to delete this thought record?')) {
      const updatedRecords = records.filter(r => r.id !== id);
      setRecords(updatedRecords);
      localStorage.setItem('cbtRecords', JSON.stringify(updatedRecords));
    }
  };

  if (showForm) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            🧠 CBT Thought Record
          </h1>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            Challenge negative thoughts with cognitive behavioral therapy
          </p>
        </div>

        {/* Progress Bar */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
          <div className="flex items-center justify-between mb-4">
            <span className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Step {currentStep} of 5
            </span>
            <span className="text-sm font-semibold text-purple-600">{(currentStep / 5 * 100).toFixed(0)}%</span>
          </div>
          <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3`}>
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Steps */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
          
          {/* STEP 1: Describe the Situation */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  1. Describe the Situation
                </h2>
                <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  What happened? When and where did it occur?
                </p>
              </div>
              <textarea
                value={formData.situation}
                onChange={(e) => handleInputChange('situation', e.target.value)}
                placeholder="Example: I sent a text to my friend 3 hours ago and they haven't responded..."
                className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
                  darkMode 
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-800'
                }`}
                rows="6"
              />
              <div className={`${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} rounded-lg p-4`}>
                <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                  💡 <strong>Tip:</strong> Be specific. Include who, what, when, where. Stick to facts, not interpretations.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: Automatic Thought */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  2. What Was Your Automatic Thought?
                </h2>
                <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  What went through your mind? What did you think this meant?
                </p>
              </div>
              <textarea
                value={formData.thought}
                onChange={(e) => handleInputChange('thought', e.target.value)}
                placeholder="Example: They're ignoring me. They don't want to be my friend anymore. I must have said something wrong..."
                className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
                  darkMode 
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-800'
                }`}
                rows="6"
              />
              <div className={`${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} rounded-lg p-4`}>
                <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                  💡 <strong>Tip:</strong> Write down the thought exactly as it occurred. Don't censor or rationalize yet.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons - shown on all steps */}
          <div className="flex gap-4 mt-8">
            {currentStep > 1 && (
              <button
                onClick={previousStep}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                ← Previous
              </button>
            )}
            
            <button
              onClick={() => setShowForm(false)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              Cancel
            </button>

            <button
              onClick={currentStep === 5 ? saveRecord : nextStep}
              disabled={!canProceed()}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
                canProceed()
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentStep === 5 ? '✓ Save Record' : 'Next →'}
            </button>
          </div>
        </div>

        // CBT Thought Record - PART 3 & 4: Steps 3-5 and Main List View
// Add these steps after Step 2 in the form (inside the form div, before navigation buttons)

          {/* STEP 3: Emotion & Intensity */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  3. What Did You Feel?
                </h2>
                <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Name the emotion and rate its intensity
                </p>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Emotion(s):
                </label>
                <input
                  type="text"
                  value={formData.feeling}
                  onChange={(e) => handleInputChange('feeling', e.target.value)}
                  placeholder="Example: Anxious, sad, rejected, worried..."
                  className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    darkMode 
                      ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-800'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Intensity: <span className="text-purple-600 font-bold">{formData.feelingIntensity}/10</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.feelingIntensity}
                  onChange={(e) => handleInputChange('feelingIntensity', parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-xs mt-2">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Mild</span>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Moderate</span>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Intense</span>
                </div>
              </div>

              <div className={`${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} rounded-lg p-4`}>
                <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                  💡 <strong>Tip:</strong> You can have multiple emotions. Focus on the strongest one first.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: Alternative Thought */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  4. Challenge Your Thought
                </h2>
                <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  What's a more balanced or realistic way to think about this?
                </p>
              </div>

              {/* Evidence Questions */}
              <div className={`${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'} rounded-lg p-4 space-y-2`}>
                <p className={`font-semibold ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>
                  Consider these questions:
                </p>
                <ul className={`text-sm space-y-1 ${darkMode ? 'text-purple-200' : 'text-purple-800'}`}>
                  <li>• What's the evidence for and against this thought?</li>
                  <li>• Am I jumping to conclusions?</li>
                  <li>• What would I tell a friend in this situation?</li>
                  <li>• Is there another way to look at this?</li>
                  <li>• What's the worst, best, and most realistic outcome?</li>
                </ul>
              </div>

              <textarea
                value={formData.alternative}
                onChange={(e) => handleInputChange('alternative', e.target.value)}
                placeholder="Example: There could be many reasons they haven't responded - they might be busy, at work, or their phone died. Not responding to one text doesn't mean they don't want to be my friend. I'm jumping to conclusions without evidence..."
                className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
                  darkMode 
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-800'
                }`}
                rows="6"
              />

              <div className={`${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} rounded-lg p-4`}>
                <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                  💡 <strong>Tip:</strong> You don't have to believe it 100%. Just find a thought that's more balanced and realistic.
                </p>
              </div>
            </div>
          )}

          {/* STEP 5: Outcome */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  5. What's the Outcome?
                </h2>
                <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  After challenging your thought, how do you feel now?
                </p>
              </div>

              <textarea
                value={formData.outcome}
                onChange={(e) => handleInputChange('outcome', e.target.value)}
                placeholder="Example: I feel a bit calmer. Still slightly anxious, but not as convinced they're mad at me. I can wait and see what happens instead of spiraling..."
                className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
                  darkMode 
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-800'
                }`}
                rows="6"
              />

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  New Emotion Intensity: <span className="text-green-600 font-bold">{formData.outcomeIntensity}/10</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.outcomeIntensity}
                  onChange={(e) => handleInputChange('outcomeIntensity', parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <div className="flex justify-between text-xs mt-2">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Much Better</span>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Same</span>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Worse</span>
                </div>
              </div>

              {formData.outcomeIntensity < formData.feelingIntensity && (
                <div className={`${darkMode ? 'bg-green-900/30' : 'bg-green-50'} rounded-lg p-4`}>
                  <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
                    ✅ <strong>Great work!</strong> You reduced your emotional intensity by {formData.feelingIntensity - formData.outcomeIntensity} points.
                  </p>
                </div>
              )}
            </div>
          )}

        {/* Cognitive Distortions Reference (shown in form) */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 mt-8`}>
          <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Common Cognitive Distortions
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {cognitiveDistortions.map((distortion, idx) => (
              <div key={idx} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className={`font-semibold ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                  {distortion.name}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {distortion.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // PART 4: MAIN VIEW - Record List (when showForm is false)
  // ============================================================
  
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          🧠 CBT Thought Record
        </h1>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
          Challenge negative thoughts with cognitive behavioral therapy
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center gap-3">
            <Brain className="w-10 h-10 text-purple-500" />
            <div>
              <div className="text-3xl font-bold text-purple-600">{records.length}</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Records</div>
            </div>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-10 h-10 text-green-500" />
            <div>
              <div className="text-3xl font-bold text-green-600">
                {records.length > 0 
                  ? (records.reduce((sum, r) => sum + (r.feelingIntensity - r.outcomeIntensity), 0) / records.length).toFixed(1)
                  : '0'
                }
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Improvement</div>
            </div>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-10 h-10 text-blue-500" />
            <div>
              <div className="text-3xl font-bold text-blue-600">
                {records.filter(r => r.outcomeIntensity < r.feelingIntensity).length}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Successful</div>
            </div>
          </div>
        </div>
      </div>

      {/* New Record Button */}
      <div className="text-center">
        <button
          onClick={() => setShowForm(true)}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          + New Thought Record
        </button>
      </div>

      {/* Records List */}
      {records.length > 0 ? (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Your Thought Records ({records.length})
          </h2>
          <div className="space-y-4">
            {records.map(record => (
              <div
                key={record.id}
                className={`p-6 rounded-xl border-2 ${
                  darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
                      {record.date} at {record.time}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Before:
                        </span>
                        <span className="text-lg font-bold text-red-600">
                          {record.feelingIntensity}/10
                        </span>
                      </div>
                      <span className="text-gray-400">→</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          After:
                        </span>
                        <span className="text-lg font-bold text-green-600">
                          {record.outcomeIntensity}/10
                        </span>
                      </div>
                      {record.outcomeIntensity < record.feelingIntensity && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                          ↓ {record.feelingIntensity - record.outcomeIntensity} points
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteRecord(record.id)}
                    className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} text-red-600`}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className={`text-sm font-semibold ${darkMode ? 'text-purple-400' : 'text-purple-700'} mb-1`}>
                      Situation:
                    </div>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {record.situation}
                    </p>
                  </div>

                  <div>
                    <div className={`text-sm font-semibold ${darkMode ? 'text-purple-400' : 'text-purple-700'} mb-1`}>
                      Automatic Thought:
                    </div>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {record.thought}
                    </p>
                  </div>

                  <div>
                    <div className={`text-sm font-semibold ${darkMode ? 'text-purple-400' : 'text-purple-700'} mb-1`}>
                      Feeling: {record.feeling}
                    </div>
                  </div>

                  <div>
                    <div className={`text-sm font-semibold ${darkMode ? 'text-green-400' : 'text-green-700'} mb-1`}>
                      Alternative Thought:
                    </div>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {record.alternative}
                    </p>
                  </div>

                  <div>
                    <div className={`text-sm font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-700'} mb-1`}>
                      Outcome:
                    </div>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {record.outcome}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-12 text-center`}>
          <Brain className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
          <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            No thought records yet
          </h3>
          <p className={darkMode ? 'text-gray-500' : 'text-gray-500'}>
            Click "New Thought Record" to start challenging your negative thoughts
          </p>
        </div>
      )}

      {/* What is CBT Info Section */}
      <div className={`${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} rounded-2xl p-8`}>
        <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
          💡 What is CBT Thought Recording?
        </h3>
        <div className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <p>
            Cognitive Behavioral Therapy (CBT) is an evidence-based approach that helps you identify and challenge negative thought patterns.
          </p>
          <p className="font-semibold">How it works:</p>
          <ul className="space-y-2 ml-4">
            <li>• Identify the situation that triggered negative feelings</li>
            <li>• Recognize automatic negative thoughts</li>
            <li>• Notice the emotions and their intensity</li>
            <li>• Challenge thoughts with evidence and alternative perspectives</li>
            <li>• Observe how your emotions change</li>
          </ul>
          <p className="mt-4">
            <strong>Research shows:</strong> Regular CBT practice can significantly reduce anxiety and depression symptoms.
          </p>
        </div>
      </div>
    </div>
  );
}

export { CBTThoughtRecord };

