import { AlertCircle, Award, BarChart3, BookOpen, Brain, Calendar, CheckCircle, Circle, Database, Download, Edit2, Heart, ListTodo, Menu, MessageCircle, Mic, MicOff, Pause, Phone, Play, RotateCcw, Save, Shield, Sparkles, Target, Trash2, TrendingUp, Upload, Volume2, Wifi, WifiOff, Wind, X } from 'lucide-react';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import './App.css';

const API_BASE = 'http://localhost:5000/api';

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

// AI Mentor Component - Add this to your App.js file

const AIMentor = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { darkMode } = useTheme();

  // Smart response system that matches keywords
  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Anxiety-related responses
    if (input.includes('anxiety') || input.includes('anxious') || input.includes('worried') || input.includes('nervous')) {
      return "I understand that anxiety can feel overwhelming. Here are some strategies that might help:\n\n• Practice the 4-7-8 breathing technique (try our Breathing Exercise!)\n• Ground yourself using the 5-4-3-2-1 method: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste\n• Remember: anxiety is temporary and you have the strength to manage it\n• Consider journaling your thoughts to identify triggers\n\nWould you like to talk more about what's making you feel anxious?";
    }
    
    // Stress-related responses
    if (input.includes('stress') || input.includes('stressed') || input.includes('overwhelm')) {
      return "Stress is a natural response, but chronic stress needs attention. Here's what can help:\n\n• Break large tasks into smaller, manageable steps\n• Take regular breaks (try the Pomodoro Technique: 25 min work, 5 min break)\n• Physical exercise releases stress hormones\n• Set boundaries and learn to say 'no' when needed\n• Practice self-compassion - you're doing your best\n\nWhat's the main source of stress for you right now?";
    }
    
    // Sleep-related responses
    if (input.includes('sleep') || input.includes('insomnia') || input.includes('tired') || input.includes('rest')) {
      return "Quality sleep is crucial for mental health. Here are evidence-based tips:\n\n• Maintain a consistent sleep schedule (even on weekends)\n• Create a relaxing bedtime routine\n• Avoid screens 1 hour before bed (blue light disrupts melatonin)\n• Try our breathing exercises before sleep\n• Keep your bedroom cool, dark, and quiet\n• Limit caffeine after 2 PM\n\nHow many hours are you currently sleeping per night?";
    }
    
    // Depression-related responses
    if (input.includes('depress') || input.includes('sad') || input.includes('down') || input.includes('hopeless')) {
      return "I hear you, and what you're feeling is valid. Depression is treatable, and you deserve support:\n\n• Reach out to a mental health professional - this is a sign of strength\n• Stay connected with supportive friends and family\n• Set small, achievable goals each day\n• Try to maintain a routine, even when it's hard\n• Physical activity can boost mood (even a 10-minute walk helps)\n• Track your emotions in our Emotion Reflector\n\nIf you're in crisis, please check our Crisis Resources page. You're not alone in this. 💜";
    }
    
    // Habits-related responses
    if (input.includes('habit') || input.includes('routine') || input.includes('consistency')) {
      return "Building healthy habits takes time! Here's a proven approach:\n\n• Start SMALL - aim for 2 minutes daily rather than 30\n• Use habit stacking: attach new habits to existing ones\n• Track your progress visually (use our Goals section!)\n• Focus on ONE habit at a time\n• Celebrate small wins - they compound over time\n• If you miss a day, don't give up - just start again\n\nResearch shows it takes 21-66 days to form a habit. What habit would you like to build?";
    }
    
    // Self-care responses
    if (input.includes('self-care') || input.includes('self care') || input.includes('care for myself')) {
      return "Self-care isn't selfish - it's essential! Here are practical self-care ideas:\n\n• Physical: Regular exercise, healthy meals, adequate sleep\n• Emotional: Journaling, therapy, talking to friends\n• Mental: Reading, learning, limiting social media\n• Spiritual: Meditation, nature walks, gratitude practice\n• Social: Quality time with loved ones\n\nSelf-care doesn't have to be expensive or time-consuming. Even 10 minutes of intentional self-care makes a difference. What area of self-care feels most neglected for you?";
    }
    
    // Motivation responses
    if (input.includes('motivat') || input.includes('unmotivat') || input.includes('lazy') || input.includes('procrastinat')) {
      return "Lack of motivation is common and doesn't mean you're lazy! Try these strategies:\n\n• Start with the '2-minute rule' - commit to just 2 minutes\n• Identify your 'why' - connect tasks to your values\n• Break perfectionism - done is better than perfect\n• Remove barriers - make starting as easy as possible\n• Reward yourself after completing tasks\n• Consider if low motivation might be depression (worth discussing with a professional)\n\nRemember: motivation often comes AFTER starting, not before. What's one small thing you could do today?";
    }
    
    // Relationships responses
    if (input.includes('friend') || input.includes('relationship') || input.includes('family') || input.includes('social') || input.includes('lonely')) {
      return "Human connection is vital for mental health. Here's how to nurture relationships:\n\n• Quality over quantity - even one close relationship matters\n• Practice active listening without judgment\n• Set healthy boundaries to protect your energy\n• Join groups based on your interests\n• Reach out first - others often feel the same hesitation\n• Be vulnerable - authenticity builds deeper connections\n\nLoneliness is painful but temporary. Small steps toward connection can make a big difference. Would you like to talk more about your relationships?";
    }
    
    // Mindfulness/meditation responses
    if (input.includes('mindful') || input.includes('meditat') || input.includes('present')) {
      return "Mindfulness is a powerful tool for mental wellness! Here's how to start:\n\n• Begin with just 5 minutes daily\n• Try our Breathing Exercise for guided practice\n• Focus on one thing: your breath, sounds, or body sensations\n• When your mind wanders (it will!), gently bring it back\n• Use apps like Headspace or Calm for guidance\n• Practice 'informal mindfulness' - be fully present while eating, walking, or showering\n\nMindfulness isn't about emptying your mind - it's about noticing your thoughts without judgment. Ready to try it?";
    }
    
    // Work/school stress
    if (input.includes('work') || input.includes('job') || input.includes('school') || input.includes('study')) {
      return "Work/school stress is very real. Here's how to manage it:\n\n• Use time-blocking to create structure\n• Take regular breaks (your brain needs them!)\n• Separate work/study space from relaxation space\n• Practice saying 'no' to prevent overcommitment\n• Identify what you CAN control vs. what you can't\n• Set a hard stop time each day\n• Talk to supervisors/teachers if workload is unrealistic\n\nBurnout is real and preventable. What specific aspect of work/school is most stressful right now?";
    }
    
    // Positive/greeting responses
    if (input.includes('thank') || input.includes('good') || input.includes('better') || input.includes('great')) {
      return "I'm so glad to hear that! 🌟 Celebrating your progress, no matter how small, is important. Keep up the great work!\n\nRemember to:\n• Acknowledge your efforts\n• Share your wins with supportive people\n• Reflect on what's working so you can do more of it\n\nIs there anything else I can help you with today?";
    }
    
    // Hello/greeting
    if (input.includes('hi') || input.includes('hello') || input.includes('hey') || input === 'sup') {
      return "Hello! 👋 I'm here to support your mental wellness journey. I can help with:\n\n• Managing anxiety and stress\n• Building healthy habits\n• Sleep and self-care tips\n• Emotional support and coping strategies\n• Motivation and productivity\n• Relationships and social connections\n\nWhat's on your mind today?";
    }
    
    // Default thoughtful response
    return "Thank you for sharing that with me. While I'm here to provide general mental wellness guidance, I want to make sure you get the best support possible.\n\nHere are some things that might help:\n• Try our Emotion Reflector to process your feelings\n• Explore our Learn section for educational resources\n• Use our Breathing Exercise for immediate stress relief\n• Check out our Crisis Resources if you need urgent support\n\nCould you tell me more about what you're experiencing? Or let me know if you'd like guidance on any specific topic like anxiety, stress, sleep, or building healthy habits.";
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate API delay for realistic feel
    setTimeout(() => {
      const aiResponse = generateResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      setLoading(false);
    }, 1000);
  };

  const quickQuestions = [
    "How can I manage anxiety?",
    "Tips for better sleep",
    "Dealing with stress at work",
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

        {/* Chat Messages */}
        <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-xl p-4 h-96 overflow-y-auto mb-4 space-y-4`}>
          {messages.length === 0 ? (
            <div className="text-center mt-20">
              <Sparkles className="mx-auto mb-4 text-purple-400" size={48} />
              <p className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Welcome! How can I support you today?
              </p>
              <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Ask me anything about mental health, stress, emotions, or personal growth.
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

        {/* Quick Questions */}
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

        {/* Input Area */}
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

        {/* Disclaimer */}
        <p className={`text-xs mt-3 text-center ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          💜 This AI provides general guidance. For serious concerns, please contact a mental health professional or call emergency services.
        </p>
      </div>
    </div>
  );
};
// ==================== MOOD ANALYTICS COMPONENT ====================
function MoodAnalytics() {
  const [moodHistory, setMoodHistory] = useState([]);

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
        <h1 className="text-4xl font-bold text-gray-800">Mood Analytics</h1>
        <p className="text-gray-600">Track your emotional patterns over time</p>
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

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6">This Week's Moods</h2>
        {Object.keys(summary).length > 0 ? (
          <div className="space-y-4">
            {Object.entries(summary).map(([mood, count]) => (
              <div key={mood}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{mood}</span>
                  <span className="text-gray-600">{count} times</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No mood data yet. Start tracking your emotions!</p>
        )}
      </div>

      <div className="bg-purple-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4 text-purple-900">Insights & Recommendations</h2>
        <div className="space-y-3 text-gray-700">
          {moodHistory.length === 0 && (
            <p>📊 Start tracking your moods to get personalized insights!</p>
          )}
          {getAverageIntensity() > 7 && (
            <p>✨ Your emotions have been quite intense lately. Consider trying relaxation techniques.</p>
          )}
          {mostFrequent?.[0] === 'Anxious' && (
            <p>🌿 You've been feeling anxious often. Try our breathing exercises or talk to the AI Mentor.</p>
          )}
          {mostFrequent?.[0] === 'Happy' && (
            <p>🎉 You're doing great! Keep up the positive momentum.</p>
          )}
          {moodHistory.length >= 7 && (
            <p>🔥 {moodHistory.length} day streak! Consistent check-ins help build self-awareness.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== BREATHING EXERCISE COMPONENT ====================
function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('inhale');
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [backgroundMusic, setBackgroundMusic] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.3);
  const { darkMode } = useTheme();

  // Audio reference for background music
  const audioRef = React.useRef(null);

  const phases = {
    inhale: { duration: 4, text: 'Breathe In', color: 'from-blue-400 to-blue-600' },
    hold: { duration: 7, text: 'Hold', color: 'from-purple-400 to-purple-600' },
    exhale: { duration: 8, text: 'Breathe Out', color: 'from-pink-400 to-pink-600' }
  };

  // Available music tracks
  const musicTracks = [
    {
      name: 'Ocean Waves',
      url: '/sound/ocean-waves-250310.mp3',
      icon: '🌊'
    },
    {
      name: 'Rain Sounds',
      url: '/sound/mixkit-heavy-rain-drops-2399.wav',
      icon: '🌧️'
    },
    {
      name: 'Forest Birds',
      url: '/sound/Forest-birds-sound.mp3',
      icon: '🐦'
    },
    {
      name: 'Meditation',
      url: '/sound/breath-of-enlightenment-meditation-music-407178.mp3',
      icon: '🧘'
    }
  ];

  const [selectedTrack, setSelectedTrack] = useState(0);

  // Handle background music toggle
  useEffect(() => {
    if (audioRef.current) {
      if (backgroundMusic) {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [backgroundMusic]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume;
    }
  }, [musicVolume]);

  // Change track
  useEffect(() => {
    if (audioRef.current && backgroundMusic) {
      audioRef.current.load();
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
  }, [selectedTrack]);

  // Sound effects using Web Audio API
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
            // Play transition sound
            if (phase === 'inhale') {
              playSound(523.25, 0.3); // C note
              setPhase('hold');
            } else if (phase === 'hold') {
              playSound(587.33, 0.3); // D note
              setPhase('exhale');
            } else {
              playSound(659.25, 0.5); // E note (cycle complete)
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
      {/* Hidden audio element for background music */}
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
        {/* Sound & Music Controls */}
        <div className="w-full space-y-4 mb-6">
          {/* Top Row: Sound Effects & Background Music Toggle */}
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

          {/* Music Track Selection (only show when music is on) */}
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

              {/* Track Selector */}
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

              {/* Volume Slider */}
              <div className="flex items-center gap-3">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-purple-700'}`}>
                  🔉
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={musicVolume}
                  onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-purple-700'}`}>
                  🔊
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Breathing Circle Animation */}
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

        {/* Progress Bar */}
        <div className="w-full max-w-md mt-8">
          <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
            <div
              className={`bg-gradient-to-r ${currentPhase.color} h-2 rounded-full transition-all duration-1000`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => {
              setIsActive(!isActive);
              if (!isActive) playSound(440, 0.2); // Start sound
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

        {/* Cycle Counter */}
        <div className="mt-8 text-center">
          <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Completed Cycles
          </div>
          <div className="text-4xl font-bold text-purple-600">{cycles}</div>
        </div>

        {/* Now Playing Info */}
        {backgroundMusic && (
          <div className="mt-6 text-center">
            <p className={`text-sm animate-pulse ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
              🎵 Now Playing: {musicTracks[selectedTrack].icon} {musicTracks[selectedTrack].name}
            </p>
          </div>
        )}
      </div>

      {/* Instructions */}
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
          <p className="mt-2 text-sm font-medium">
            🎧 Tip: Use headphones for the best experience with background sounds!
          </p>
        </div>
      </div>
    </div>
  );
}
// ==================== CRISIS RESOURCES COMPONENT ====================
function CrisisResources() {
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

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Crisis Hotlines Worldwide</h2>
        <div className="space-y-4">
          {globalHotlines.map((hotline, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
              <div className="flex-1">
                <div className="font-bold text-lg text-gray-800">{hotline.country}</div>
                <div className="text-gray-600">{hotline.service}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">{hotline.number}</div>
                <div className="text-sm text-gray-500">{hotline.available}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-purple-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4 text-purple-900">While Waiting for Help</h2>
        <ul className="space-y-3 text-gray-700">
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

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
        <div className="space-y-3">
          <a href="https://www.nami.org" target="_blank" rel="noopener noreferrer" 
             className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
            <div className="font-bold text-blue-900">National Alliance on Mental Illness (NAMI)</div>
            <div className="text-sm text-blue-700">Mental health education and support</div>
          </a>
          <a href="https://www.mentalhealth.gov" target="_blank" rel="noopener noreferrer"
             className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition">
            <div className="font-bold text-green-900">MentalHealth.gov</div>
            <div className="text-sm text-green-700">Government mental health resources</div>
          </a>
        </div>
      </div>
    </div>
  );
}

function VoiceJournal() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [entries, setEntries] = useState([]);
  const [browserSupported, setBrowserSupported] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [voiceGender, setVoiceGender] = useState('female');
  const { darkMode } = useTheme();
  
  const recognitionRef = useRef(null);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => {
      setIsOnline(false);
      if (isRecording) stopRecording();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isRecording]);

  // Load entries and preferences
  useEffect(() => {
    const saved = localStorage.getItem('voiceJournalEntries');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading entries');
      }
    }
    
    const savedGender = localStorage.getItem('voiceGender');
    if (savedGender) {
      setVoiceGender(savedGender);
    }
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setBrowserSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    
    // Detect page language (set by Google Translate)
    const pageLang = document.documentElement.lang || 'en';
    recognition.lang = pageLang;

    recognition.onstart = () => {
      console.log('Speech recognition started');
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPiece + ' ';
        }
      }
      setTranscript(prev => prev + finalTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech') return;
      setIsRecording(false);
      alert(`Error: ${event.error}`);
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    if (!navigator.onLine) {
      alert('You are offline. Speech recognition requires internet.');
      return;
    }
    if (!recognitionRef.current) {
      alert('Speech recognition not supported. Please use Chrome or Edge.');
      return;
    }
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setTranscript('');
      recognitionRef.current.start();
    } catch (error) {
      console.error('Microphone error:', error);
      alert('Could not access microphone.');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
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
  };

  const deleteEntry = (id) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem('voiceJournalEntries', JSON.stringify(updatedEntries));
  };

  // NEW: Reads translated text from DOM
  const speakEntry = (entryId) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      // Get the actual displayed text (which might be translated)
      const entryElement = document.getElementById(`entry-text-${entryId}`);
      const displayedText = entryElement ? entryElement.innerText : '';
      
      if (!displayedText) {
        console.error('Could not find text to speak');
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(displayedText);
      utterance.rate = 0.9;
      utterance.pitch = voiceGender === 'female' ? 1.2 : 1.0;
      
      // Detect language from page (Google Translate sets this)
      const pageLang = document.documentElement.lang || 'en';
      utterance.lang = pageLang;
      
      console.log('🗣️ Speaking in language:', pageLang);
      console.log('📝 Text to speak:', displayedText.substring(0, 50) + '...');
      
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
          console.log('✅ Using voice:', selectedVoice.name);
        } else {
          console.log('⚠️ No specific voice found, using default');
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
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Voice Journal
        </h1>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
          Express your thoughts through voice - we'll transcribe them for you
        </p>
        
        {/* Voice Gender Selector */}
        <div className="flex justify-center items-center gap-2">
          <Volume2 className="w-5 h-5 text-pink-600" />
          <label className="font-medium">Voice Gender:</label>
          <select
            value={voiceGender}
            onChange={(e) => handleVoiceGenderChange(e.target.value)}
            className="px-4 py-2 border-2 border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="female">👩 Female</option>
            <option value="male">👨 Male</option>
          </select>
        </div>
      </div>

      {/* Online/Offline Status */}
      <div className={`flex items-center justify-center gap-2 p-3 rounded-lg ${
        isOnline 
          ? 'bg-green-50 border-2 border-green-300' 
          : 'bg-red-50 border-2 border-red-400'
      }`}>
        {isOnline ? (
          <>
            <Wifi className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">Connected - Ready to record</span>
          </>
        ) : (
          <>
            <WifiOff className="w-5 h-5 text-red-600" />
            <span className="text-red-800 font-medium">Offline - Internet required</span>
          </>
        )}
      </div>

      {/* Recording Card */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 space-y-6`}>
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

        {/* Transcript Area */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Transcript (You can edit this)
          </label>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Your voice will be transcribed here... or type manually"
            className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
              darkMode
                ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500'
                : 'bg-white border-gray-300 text-gray-800'
            }`}
            rows="6"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={saveEntry}
          disabled={!transcript.trim()}
          className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            transcript.trim()
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Save className="w-5 h-5" />
          Save Journal Entry
        </button>
      </div>

      {/* Journal Entries */}
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
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Listen to entry"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete entry"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                {/* CRITICAL: Add id to paragraph */}
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

      {/* Empty State */}
      {entries.length === 0 && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-12 text-center`}>
          <Mic className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
          <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            No journal entries yet
          </h3>
          <p className={darkMode ? 'text-gray-500' : 'text-gray-500'}>
            Start recording your thoughts!
          </p>
        </div>
      )}
    </div>
  );
}


function DataManagement() {
  const [exportStatus, setExportStatus] = useState('');
  const [importStatus, setImportStatus] = useState('');
  const { darkMode } = useTheme();

  // Get all data from localStorage
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

  // Export data as JSON file
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

  // Import data from JSON file
  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        // Validate data structure
        if (!data.version) {
          throw new Error('Invalid backup file format');
        }

        // Restore data to localStorage
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
          window.location.reload(); // Reload to show imported data
        }, 2000);
      } catch (error) {
        setImportStatus('error');
        console.error('Import error:', error);
        setTimeout(() => setImportStatus(''), 3000);
      }
    };
    reader.readAsText(file);
  };

  // Clear all data
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

      {/* Data Statistics */}
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

      {/* Export Section */}
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
            <div className="mt-4 p-4 bg-green-50 border-2 border-green-300 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800">✅ Data exported successfully!</span>
            </div>
          )}
          {exportStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-50 border-2 border-red-300 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-800">❌ Export failed. Please try again.</span>
            </div>
          )}
        </div>
      </div>

      {/* Import Section */}
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
            <div className="mt-4 p-4 bg-green-50 border-2 border-green-300 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800">✅ Data imported! Reloading page...</span>
            </div>
          )}
          {importStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-50 border-2 border-red-300 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-800">❌ Invalid file format. Please use a valid backup file.</span>
            </div>
          )}
        </div>
      </div>

      {/* Clear Data Section */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 space-y-6 border-2 border-red-200`}>
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

      {/* Information */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-blue-50'} rounded-2xl p-8`}>
        <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-900'}`}>
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
        {currentPage === 'journal' && <VoiceJournal/>}
        {currentPage === 'data' && <DataManagement/>}
      </main>

      <Footer />
    </div>
  );
}

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
    { id: 'data', label: 'Data', icon: Database }
  ];

  const allNavItems = [...mainNavItems, ...toolsItems];

  return (
    <nav className={`nav-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="nav-inner">
        <div className="nav-header">
          {/* Logo */}
          <div className="nav-logo">
            <Sparkles className={`w-7 h-7 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <span className="nav-logo-text">MindfulPath</span>
          </div>

          {/* Desktop Navigation - DROPDOWN MODE ONLY */}
          <div className="nav-desktop">
            {/* Main Nav Items */}
            {mainNavItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`nav-button ${currentPage === item.id ? 'active' : ''} ${darkMode ? 'dark' : 'light'}`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
            
            {/* Tools Dropdown */}
            <div className="nav-dropdown">
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className={`nav-button ${darkMode ? 'dark' : 'light'}`}
              >
                <Target className="w-4 h-4" />
                <span>Tools</span>
                <span style={{ 
                  transition: 'transform 0.2s',
                  transform: toolsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  fontSize: '0.7rem',
                  marginLeft: '4px'
                }}>▼</span>
              </button>
              
              {toolsOpen && (
                <div className={`dropdown-menu ${darkMode ? 'dark' : 'light'}`}>
                  {toolsItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentPage(item.id);
                        setToolsOpen(false);
                      }}
                      className={`dropdown-item ${currentPage === item.id ? 'active' : ''} ${darkMode ? 'dark' : 'light'}`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="mobile-controls">
            <button 
              onClick={toggleTheme}
              className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`mobile-menu-button ${darkMode ? 'dark' : 'light'}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            {allNavItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`mobile-menu-item ${currentPage === item.id ? 'active' : ''} ${darkMode ? 'dark' : 'light'}`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

function HomePage({ setCurrentPage }) {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Your Mental Health Journey Starts Here
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Track your emotions, learn about mental health, test your knowledge, and set meaningful goals - all in one supportive platform.
        </p>
      </div>

      {/* Feature Cards */}
      {/* In HomePage component, update the feature cards grid to include more cards: */}

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
</div>

      {/* Stats Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8 grid md:grid-cols-3 gap-8">
        <StatCard number="6" label="Educational Topics" />
        <StatCard number="10" label="Quiz Questions" />
        <StatCard number="∞" label="Goals You Can Set" />
      </div>

      {/* About Section */}
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

function StatCard({ number, label }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-purple-600 mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
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

function EmotionReflector() {
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState([]);

  const emotions = [
    { name: 'Happy', emoji: '😊', color: 'bg-yellow-100 border-yellow-300' },
    { name: 'Sad', emoji: '😢', color: 'bg-blue-100 border-blue-300' },
    { name: 'Anxious', emoji: '😰', color: 'bg-purple-100 border-purple-300' },
    { name: 'Angry', emoji: '😠', color: 'bg-red-100 border-red-300' },
    { name: 'Calm', emoji: '😌', color: 'bg-green-100 border-green-300' },
    { name: 'Excited', emoji: '🤩', color: 'bg-pink-100 border-pink-300' }
  ];

  // In your EmotionReflector component, replace the handleSave function with this:

const handleSave = () => {
  if (!selectedEmotion) return;
  
  const entry = {
    id: Date.now(),
    emotion: selectedEmotion,
    intensity,
    note,
    timestamp: new Date().toLocaleString()
  };
  
  const newEntries = [entry, ...entries];
  setEntries(newEntries);
  
  // Save to localStorage for analytics
  try {
    const existingHistory = localStorage.getItem('moodHistory');
    const history = existingHistory ? JSON.parse(existingHistory) : [];
    history.push(entry);
    localStorage.setItem('moodHistory', JSON.stringify(history));
  } catch (e) {
    console.error('Error saving to localStorage');
  }
  
  setSelectedEmotion('');
  setIntensity(5);
  setNote('');
};

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-800">Emotion Reflector</h1>
        <p className="text-gray-600">How are you feeling today?</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Emotion Selection */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Select your emotion</h3>
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

        {/* Intensity Slider */}
        {selectedEmotion && (
          <>
            <div>
              <h3 className="text-lg font-semibold mb-4">
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

            {/* Note */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Add a note (optional)</h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
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

      {/* History */}
      {entries.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Your Reflections</h2>
          <div className="space-y-4">
            {entries.map(entry => (
              <div key={entry.id} className="border-l-4 border-purple-500 pl-4 py-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-lg">{entry.emotion}</span>
                  <span className="text-sm text-gray-500">{entry.timestamp}</span>
                </div>
                <div className="text-sm text-gray-600">Intensity: {entry.intensity}/10</div>
                {entry.note && <p className="mt-2 text-gray-700">{entry.note}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LearnSection() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    // Simulated data - replace with actual API call
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
    return <TopicDetail topic={selectedTopic} onBack={() => setSelectedTopic(null)} />;
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-800">Learn About Mental Health</h1>
        <p className="text-gray-600">Choose a topic to explore</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map(topic => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopic(topic)}
            className="bg-white rounded-xl shadow-lg p-6 text-left hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <BookOpen className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
            <p className="text-gray-600">{topic.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function TopicDetail({ topic, onBack }) {
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

      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">{topic.title}</h1>
        <p className="text-xl text-gray-600">{topic.description}</p>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-purple-600">Key Points</h2>
            <ul className="space-y-3">
              {topicContent.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-purple-50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">Practical Tips</h2>
            <ul className="space-y-3">
              {topicContent.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <Target className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizSection() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  const questions = [
    {
      id: 1,
      question: "What is the '4-7-8' breathing technique used for?",
      options: [
        'Building muscle strength',
        'Reducing anxiety and promoting relaxation',
        'Improving digestion',
        'Increasing heart rate'
      ],
      correct: 1
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
      correct: 1
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
      correct: 2
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
      correct: 2
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
      correct: 0
    }
  ];

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
    setResults({
      score: Math.round((correct / questions.length) * 100),
      correct,
      total: questions.length
    });
    setShowResults(true);
  };

  const resetQuiz = () => {
    setStarted(false);
    setCurrentQ(0);
    setAnswers({});
    setShowResults(false);
    setResults(null);
  };

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <Award className="w-20 h-20 text-purple-600 mx-auto" />
          <h1 className="text-4xl font-bold text-gray-800">Mental Health Quiz</h1>
          <p className="text-xl text-gray-600">
            Test your knowledge and learn more about mental wellness
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-gray-700">5 multiple-choice questions</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-gray-700">Learn from detailed explanations</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-gray-700">Track your progress</span>
            </div>
          </div>

          <button
            onClick={() => setStarted(true)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
          <Award className="w-20 h-20 text-purple-600 mx-auto" />
          <h1 className="text-4xl font-bold text-gray-800">Quiz Complete!</h1>
          
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-8">
            <div className="text-6xl font-bold mb-2">{results.score}%</div>
            <div className="text-xl">
              You got {results.correct} out of {results.total} correct!
            </div>
          </div>

          <div className="text-left space-y-4">
            <h2 className="text-2xl font-bold">Your Performance</h2>
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className={`p-4 rounded-lg ${
                  answers[idx] === q.correct ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'
                }`}
              >
                <div className="font-semibold mb-2">Q{idx + 1}: {q.question}</div>
                <div className="text-sm">
                  Your answer: {q.options[answers[idx]]}
                  {answers[idx] !== q.correct && (
                    <div className="mt-1 text-green-700">
                      Correct answer: {q.options[q.correct]}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={resetQuiz}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-gray-600">
            Question {currentQ + 1} of {questions.length}
          </span>
          <span className="text-sm font-semibold text-purple-600">{Math.round(progress)}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-800">{question.question}</h2>

        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                answers[currentQ] === idx
                  ? 'border-purple-500 bg-purple-50 font-semibold'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={answers[currentQ] === undefined}
          className={`w-full py-4 rounded-xl font-semibold transition-all ${
            answers[currentQ] !== undefined
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {currentQ < questions.length - 1 ? 'Next Question' : 'See Results'}
        </button>
      </div>
    </div>
  );
}

function TodoSection() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  
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

    const updateTodos = [...todos, todo];
    setNewTodo('');

  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('mentalHealthGoals', JSON.stringify(updatedTodos));
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('mentalHealthGoals', JSON.stringify(updatedTodos));
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    const updatedTodos = todos.map(todo =>
      todo.id === editingId ? { ...todo, text: editText } : todo
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
        <h1 className="text-4xl font-bold text-gray-800">My Mental Health Goals</h1>
        <p className="text-gray-600">{currentMonth} {currentYear}</p>
      </div>

      {/* Progress Card */}
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

      {/* Add Todo */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-4">Add New Goal</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="E.g., Practice mindfulness for 10 minutes daily"
            className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
          />
          <button
            onClick={handleAdd}
            className="px-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Add
          </button>
        </div>
      </div>

      {/* Todo List */}
      {todos.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Your Goals</h2>
          <div className="space-y-4">
            {todos.map(todo => (
              <div
                key={todo.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  todo.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                }`}
              >
                {editingId === todo.id ? (
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 p-2 border-2 border-purple-300 rounded-lg focus:outline-none"
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
                      <p className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {todo.text}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{todo.createdAt}</p>
                    </div>
                    <button
                      onClick={() => startEdit(todo)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
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
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No goals yet</h3>
          <p className="text-gray-500">Start by adding your first mental health goal above!</p>
        </div>
      )}

      {/* Suggestions */}
      <div className="bg-purple-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4 text-purple-900">Goal Ideas</h2>
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
              className="p-3 bg-white rounded-lg text-left hover:shadow-md transition-all text-sm"
            >
              + {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-white mt-16 py-8 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <span className="text-xl font-bold text-gray-800">MindfulPath</span>
          </div>
          <p className="text-gray-600">
            Supporting mental health awareness and wellness for all
          </p>
          <p className="text-sm text-gray-500">
            Built with ❤️ for PeerBridge Mental Health Hacks 2025
          </p>
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <a href="#" className="hover:text-purple-600">About</a>
            <span>•</span>
            <a href="#" className="hover:text-purple-600">Resources</a>
            <span>•</span>
            <a href="#" className="hover:text-purple-600">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}