import { useState, useEffect, useRef } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, push, onChildAdded, query, limitToLast } from 'firebase/database';
import { 
  Send, 
  User, 
  Hash, 
  MessageSquare, 
  ShieldAlert, 
  Check, 
  Clock, 
  X,
  Image,
  Gamepad2,
  Film,
  Laugh
} from 'lucide-react';
import { isBlocked } from '../utils/BannedWords';

// Firebase credentials from the original widget
const firebaseConfig = {
  apiKey: "AIzaSyA_qbIeZ5rwP-8J5cMUYVlmtGdpwU7fr7Y",
  authDomain: "chat-f9251.firebaseapp.com",
  databaseURL: "https://chat-f9251-default-rtdb.firebaseio.com",
  projectId: "chat-f9251",
  storageBucket: "chat-f9251.firebasestorage.app",
  messagingSenderId: "143049478376",
  appId: "1:143049478376:web:10dd8fe116c3b9e473b95d",
  measurementId: "G-57D0W1FZ87"
};

// Prevent duplicate initializations in React HMR
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getDatabase(app);

const CHANNELS = [
  { id: 'general', name: 'general', description: 'Main chat lobby connected with site network', refPath: 'messages' },
  { id: 'gaming', name: 'gaming-hub', description: 'Talk about games, reviews, highscores and cheats', refPath: 'messages_gaming' },
  { id: 'cinema', name: 'cinema-club', description: 'Save movies lists, TV shows reviews and stream discussion', refPath: 'messages_cinema' },
  { id: 'memes', name: 'memes', description: 'Fun room for general memes, jokes and off-topic', refPath: 'messages_memes' }
];

const PRESET_GIFS = [
  { name: 'Cat Jam', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2g0Y2l3ejI5MXptZW80NHQ3Mmd4bzYydW14eWF3dWgycHZhdGtpZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GeimqsH0TLDt4tScGw/giphy.gif' },
  { name: 'Shocked Pikachu', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdm43ZzRka2ZndndjZ3hyOHkxbWFtZzdmeXNudmcyamxmdG5nYW11byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3kzJvEcif7i1y/giphy.gif' },
  { name: 'Popcat', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHpwN2t3am8wdXoxcmFka3oyZWtrNGoxM2M3dmxreGFpMXBndnphZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kFgzrTt798d2w/giphy.gif' },
  { name: 'Success Kid', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGJ3dzI4cm1xNmswbTNxZjMyOXh5am9reTZscmd0bXh2cjN5aWZpeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/111ebonMs96Y6y/giphy.gif' },
  { name: 'Drake Yes', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWJwbmt3dDUxdm5wcnpja2V5MXI2ZHhtMXVxb2dzNHNhd3VhdTVpNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7qDEq2bMbcbPRVP2/giphy.gif' },
  { name: 'Mind Blown', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2J2dmpyZGFpaTFod2Z5bWpzeXU4NDMxNzlqOXNtdGFsNzA3ejR3ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2rqEdFksE54SGjgRxp/giphy.gif' },
  { name: 'Dog Sips Coffee', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTBvNjQ1dzB5MGxhbW9rNWdzNGo1ZHVndW95aHphb3lseHF3bDVnYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9M5jK4GXfD6cE/giphy.gif' },
  { name: 'Rickroll', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExczM1dnBrYXphMmxzbXQxeTNnNWYyYzVvNjd0Yjd3OHZrb2FubTlxNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Vuw9m5wXviFIQ/giphy.gif' }
];

const isImageUrl = (url) => {
  if (typeof url !== 'string') return false;
  const cleanUrl = url.trim().toLowerCase();
  return (
    cleanUrl.endsWith('.gif') ||
    cleanUrl.endsWith('.png') ||
    cleanUrl.endsWith('.jpg') ||
    cleanUrl.endsWith('.jpeg') ||
    cleanUrl.endsWith('.webp') ||
    cleanUrl.startsWith('data:image/') ||
    (cleanUrl.startsWith('http') && (cleanUrl.includes('media.giphy.com') || cleanUrl.includes('tenor.com/view') || cleanUrl.includes('media.tenor.com')))
  );
};

export default function UserChat({ onClose, isMini = false }) {
  const [activeChannel, setActiveChannel] = useState(CHANNELS[0]);
  const [messages, setMessages] = useState([]);
  const [chatName, setChatName] = useState(() => localStorage.getItem('chat_name') || '');
  const [textInput, setTextInput] = useState('');
  
  // Interface animations & indicators
  const [shakeCompose, setShakeCompose] = useState(false);
  const [pulseName, setPulseName] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [showImagePanel, setShowImagePanel] = useState(false);
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaUrlInput, setMediaUrlInput] = useState('');

  // Refs for scrolling and focus
  const messagesEndRef = useRef(null);
  const nameInputRef = useRef(null);
  const textInputRef = useRef(null);
  
  // Store listeners so we can clean up on channel switch
  const listenerRef = useRef(null);

  // Hue calculation for usernames
  const getUsernameHue = (name) => {
    let h = 0;
    const cleanName = name || 'anonymous';
    for (let i = 0; i < cleanName.length; i++) {
       h = (h * 31 + cleanName.charCodeAt(i)) & 0xffff;
    }
    return [160, 180, 200, 260, 290, 320, 340][h % 7];
  };

  // Human clean date markers
  const formatDateLabel = (ts) => {
    const d = new Date(ts);
    const t = new Date();
    if (d.toDateString() === t.toDateString()) return 'Today';
    const y = new Date(t);
    y.setDate(t.getDate() - 1);
    if (d.toDateString() === y.toDateString()) return 'Yesterday';
    return d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatMessageTime = (ts) => {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Synchronize dynamic messages when changing channels
  useEffect(() => {
    // Clear display during transition
    setMessages([]);
    
    // Wire up child added subscription
    const msgsRef = ref(db, activeChannel.refPath);
    const recentQuery = query(msgsRef, limitToLast(100));

    // Handle incoming messages
    listenerRef.current = onChildAdded(recentQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages((prev) => {
          // Double check duplicate ids
          if (prev.some((m) => m.key === snapshot.key)) return prev;
          return [...prev, { ...data, key: snapshot.key }];
        });
      }
    });

    return () => {
      // Cleanup previous listener
      if (typeof listenerRef.current === 'function') {
        listenerRef.current();
      }
    };
  }, [activeChannel]);

  // Scroll to bottom whenever messages list grows
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle setting/saving the user nickname
  const handleNameChange = (e) => {
    const val = e.target.value;
    setChatName(val);
    localStorage.setItem('chat_name', val);
  };

  // Flash warning/toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Attempt to compose a message
  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    
    if (!chatName.trim()) {
      // Trigger locked feedback animations
      setShakeCompose(true);
      setPulseName(true);
      nameInputRef.current?.focus();
      triggerToast('Please enter a nickname above to chat!');
      
      setTimeout(() => {
        setShakeCompose(false);
        setPulseName(false);
      }, 1000);
      return;
    }

    const cleanText = textInput.trim();
    if (!cleanText && !mediaUrl) return;

    if (cleanText && isBlocked(cleanText)) {
      triggerToast('⚠️ That word is blocked.');
      return;
    }

    // Push message to active reference node
    const msgsRef = ref(db, activeChannel.refPath);
    push(msgsRef, {
      name: chatName.trim(),
      text: cleanText || "Sent a GIF/Image",
      imageUrl: mediaUrl || null,
      timestamp: Date.now()
    }).then(() => {
      setMediaUrl('');
    }).catch(() => {
      triggerToast('Error sending message. Check connection.');
    });

    setTextInput('');
    textInputRef.current?.focus();
  };

  const handleComposeKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickEmoji = (emoji) => {
    if (!chatName.trim()) {
      setPulseName(true);
      nameInputRef.current?.focus();
      triggerToast('Set name first!');
      setTimeout(() => setPulseName(false), 1000);
      return;
    }
    setTextInput((prev) => prev + emoji);
    textInputRef.current?.focus();
  };

  // Filter messages by search keyword if present
  const displayedMessages = messages.filter(m => {
    if (!searchFilter.trim()) return true;
    const query = searchFilter.toLowerCase();
    return (
      (m.name || '').toLowerCase().includes(query) ||
      (m.text || '').toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex w-full h-full bg-[#0a0d16] text-[#e2e8f0] overflow-hidden select-none font-sans">
      
      {/* LEFT SIDEBAR: ROOMS & NICKNAME CONFIG */}
      <aside className="hidden md:flex flex-col w-12 border-r border-white/5 bg-[#070a11] shrink-0 items-center py-2 gap-3">
        {/* ROOM BRAND LOGO / LIVE INDICATOR */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00e5b0] animate-pulse" title="Portal Chat Live Network" />
          <span className="text-[7px] font-black font-mono tracking-widest text-[#00e5b0]">LIVE</span>
        </div>

        {/* CHANNEL NAVIGATION RAIL - ICON BASED ONLY */}
        <div className="flex-1 flex flex-col gap-1.5 w-full px-1 items-center justify-start pt-2">
          {CHANNELS.map((ch) => {
            const isActive = activeChannel.id === ch.id;
            
            // Map channels to compact icons
            let IconComponent = Hash;
            if (ch.id === 'general') IconComponent = MessageSquare;
            if (ch.id === 'gaming') IconComponent = Gamepad2;
            if (ch.id === 'cinema') IconComponent = Film;
            if (ch.id === 'memes') IconComponent = Laugh;

            return (
              <button
                key={ch.id}
                onClick={() => {
                  setActiveChannel(ch);
                  setSearchFilter('');
                }}
                className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all relative group cursor-pointer ${
                  isActive 
                    ? 'bg-[#00e5b0]/20 text-[#00e5b0] shadow-sm border border-[#00e5b0]/30' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
                title={`${ch.name} - ${ch.description}`}
              >
                <IconComponent className="w-3.5 h-3.5 shrink-0" />
                
                {/* TOOLTIP ON HOVER */}
                <div className="absolute left-10 top-1/2 -translate-y-1/2 bg-[#090d16] border border-white/10 text-[9px] text-white font-semibold rounded px-2 py-1 shadow-lg whitespace-nowrap hidden group-hover:block z-50">
                  <div className="font-extrabold uppercase text-[#00e5b0]">#{ch.name}</div>
                  <div className="text-[8px] text-neutral-400 font-normal">{ch.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* RIGHT CONTAINER: MAIN CHAT PANEL */}
      <section className="flex-1 flex flex-col h-full overflow-hidden bg-[#0a0d16]">
        
        {/* MOBILE OR DYNAMIC CHANNEL CONTROL HEADER */}
        <header className="px-2.5 py-1.5 border-b border-white/5 bg-[#070a11]/95 flex items-center justify-between gap-2 shrink-0 select-none">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-neutral-500 font-extrabold text-[10px] hidden md:inline">#</span>
            <h1 className="text-[10px] font-black text-white tracking-tight flex items-center gap-0.5 uppercase truncate">
              {activeChannel.name}
            </h1>
            <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          </div>

          {/* Desktop embedded Nickname and Filter */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            {/* Nickname input */}
            <div className={`flex items-center gap-1 bg-[#0d1222]/80 border rounded px-1.5 py-0.5 transition-all ${pulseName ? 'border-rose-500' : 'border-white/5'}`}>
              <User className="w-2.5 h-2.5 text-neutral-500 shrink-0" />
              <input 
                ref={nameInputRef}
                type="text"
                placeholder="Set Nickname"
                value={chatName}
                onChange={handleNameChange}
                maxLength={16}
                className="bg-transparent text-[10px] font-extrabold text-white outline-none w-16 md:w-20 placeholder-neutral-500"
              />
            </div>

            {/* Filter messages search box */}
            <input 
              type="text"
              placeholder="Filter..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="bg-[#0d1222]/80 border border-white/5 rounded px-1.5 py-0.5 text-[9px] text-[#cbd5e1] outline-none w-12 md:w-16 placeholder-neutral-500"
            />
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* MOBILE SELECTION SELECTOR */}
            <select
              value={activeChannel.id}
              onChange={(e) => {
                const target = CHANNELS.find(c => c.id === e.target.value);
                if (target) {
                  setActiveChannel(target);
                  setSearchFilter('');
                }
              }}
              className="md:hidden bg-[#0d1222] border border-white/5 py-0.5 px-1 rounded text-[9px] font-bold uppercase outline-none text-[#00e5b0] max-w-[80px]"
            >
              {CHANNELS.map(c => (
                <option key={c.id} value={c.id}>
                  #{c.name}
                </option>
              ))}
            </select>

            {onClose && !isMini && (
              <button 
                onClick={onClose}
                className="p-1 hover:bg-white/10 text-neutral-400 hover:text-white rounded transition-all cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </header>

        {/* NICKNAME ROW FOR MINI OR MOBILE VIEWS */}
        {(isMini || window.innerWidth < 768) && (
          <div className="flex md:hidden items-center justify-between p-1 px-2 border-b border-white/5 bg-[#0e1627] shrink-0">
            <span className="text-[9px] uppercase font-black text-neutral-400 tracking-wider">
              Nick:
            </span>
            <input 
              type="text"
              placeholder="anonymous"
              value={chatName}
              onChange={handleNameChange}
              maxLength={16}
              className={`bg-[#070a11] text-[10px] px-1.5 py-0.5 rounded outline-none border focus:border-[#00e5b0] text-right max-w-[90px] font-extrabold ${
                pulseName ? 'border-rose-500' : 'border-white/5'
              }`}
            />
          </div>
        )}

        {/* MESSAGES LIST PANEL */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scrollbar-thin scrollbar-thumb-white/5">
          
          {displayedMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4 text-neutral-500">
              <div className="text-xl animate-bounce mb-2">💬</div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-neutral-300">
                {searchFilter ? 'No matches' : 'Beginning of Chat'}
              </h3>
            </div>
          ) : (
            displayedMessages.map((msg, index) => {
              const prevMsg = index > 0 ? displayedMessages[index - 1] : null;
              
              // Only print date labels if date changed
              const dateLabelNow = formatDateLabel(msg.timestamp || Date.now());
              const dateLabelPrev = prevMsg ? formatDateLabel(prevMsg.timestamp || Date.now()) : null;
              const printDateHeader = dateLabelNow !== dateLabelPrev;

              return (
                <div key={msg.key || index} className="space-y-1">
                  {printDateHeader && (
                    <div className="flex items-center gap-2 py-1 select-none">
                      <div className="flex-1 h-[1px] bg-white/5" />
                      <span className="text-[8px] font-bold font-mono text-[#718096] uppercase tracking-wider">
                        {dateLabelNow}
                      </span>
                      <div className="flex-1 h-[1px] bg-white/5" />
                    </div>
                  )}

                  <div className="flex flex-col gap-0.5 hover:bg-white/[0.01] px-1 rounded transition-all group">
                    <div className="flex items-baseline gap-1.5">
                      <span 
                        className="text-[11px] font-extrabold font-mono tracking-tight cursor-pointer hover:underline"
                        style={{ color: `hsl(${getUsernameHue(msg.name)}, 75%, 65%)` }}
                      >
                        {msg.name || 'anonymous'}
                      </span>
                      <span className="text-[7.5px] text-[#4a5568] group-hover:text-neutral-500 font-mono">
                        {formatMessageTime(msg.timestamp || Date.now())}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-200 leading-normal font-sans break-words pl-0.5">
                      {msg.text}
                    </div>
                    {(msg.imageUrl || isImageUrl(msg.text)) && (
                      <div className="mt-1 rounded-lg overflow-hidden max-w-[240px] border border-white/10 shadow-sm bg-neutral-900/50">
                        <img 
                          src={msg.imageUrl || msg.text} 
                          alt="Shared Media" 
                          className="w-full h-auto max-h-[160px] object-contain hover:scale-105 transition-all duration-300"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* TOAST SYSTEM ALERTS */}
        {toastMessage && (
          <div className="relative shrink-0 flex justify-center z-50">
            <div className="absolute bottom-1 bg-rose-500 text-white font-mono text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-lg flex items-center gap-1 shadow-md shadow-black/80 animate-fade-in border border-rose-400">
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* MESSAGE COMPOSER CONTAINER */}
        <footer className="p-2 border-t border-white/5 bg-[#070a11]/90 shrink-0">
          
          {/* Media URL attachment preview */}
          {mediaUrl && (
            <div className="flex items-center gap-2 bg-[#0d1222] border border-[#00e5b0]/30 p-1.5 rounded-xl mb-2 animate-fade-in">
              <div className="w-12 h-12 rounded overflow-hidden bg-neutral-900 shrink-0">
                <img src={mediaUrl} alt="Preview Attachment" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[10px] font-bold text-[#00e5b0] truncate">GIF/Image Attached</p>
                <p className="text-[9px] text-neutral-400 truncate">{mediaUrl}</p>
              </div>
              <button 
                type="button"
                onClick={() => setMediaUrl('')}
                className="p-1 text-neutral-400 hover:text-white hover:bg-white/5 rounded-md cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Image / GIF Picker Panel */}
          {showImagePanel && (
            <div className="bg-[#090d16] border border-white/5 rounded-xl p-2.5 mb-2.5 space-y-2 animate-fade-in text-left">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-extrabold text-neutral-400 tracking-wider">
                  Select Meme or Paste URL
                </span>
                <button 
                  type="button"
                  onClick={() => setShowImagePanel(false)}
                  className="text-neutral-500 hover:text-white text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
              
              {/* Preset GIFs grid */}
              <div className="grid grid-cols-4 gap-1.5 max-h-[120px] overflow-y-auto pr-1 scrollbar-thin">
                {PRESET_GIFS.map((gif, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setMediaUrl(gif.url);
                      setShowImagePanel(false);
                    }}
                    className="group relative h-12 rounded overflow-hidden bg-neutral-900 border border-white/5 hover:border-[#00e5b0]/60 active:scale-95 transition-all text-left cursor-pointer"
                    title={gif.name}
                  >
                    <img src={gif.url} alt={gif.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="text-[8px] text-white font-bold text-center truncate px-0.5">{gif.name}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Paste URL input */}
              <div className="flex gap-1.5">
                <input 
                  type="text"
                  placeholder="Paste any image or GIF URL here..."
                  value={mediaUrlInput}
                  onChange={(e) => setMediaUrlInput(e.target.value)}
                  className="flex-1 bg-[#0d1222] border border-white/5 focus:border-[#00e5b0]/60 rounded-lg text-[10px] px-2.5 py-1.5 outline-none text-white placeholder-neutral-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (mediaUrlInput.trim()) {
                      setMediaUrl(mediaUrlInput.trim());
                      setMediaUrlInput('');
                      setShowImagePanel(false);
                    }
                  }}
                  className="bg-[#00e5b0] hover:bg-[#00e5b0]/90 text-[#070a11] text-[10px] font-bold px-2.5 py-1.5 rounded-lg active:scale-95 transition-all cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
          )}

          {/* QUICK CHIPS AND EMOJI TICKER */}
          <div className="flex items-center gap-1 mb-1.5 overflow-x-auto pb-0.5 select-none scrollbar-none">
            {['🔥', '💀', '💯', '😂', '👑', '😮', '🎮', '🍿'].map((emoji, i) => (
              <button
                key={i}
                onClick={() => handleQuickEmoji(emoji)}
                className="hover:scale-125 rounded p-0.5 text-xs transition-all active:scale-95 flex items-center justify-center cursor-pointer"
              >
                {emoji}
              </button>
            ))}

            <div className="h-4 w-[1px] bg-white/10 mx-1.5 shrink-0" />

            <button
              type="button"
              onClick={() => setShowImagePanel(!showImagePanel)}
              className={`text-[10px] px-2 py-0.5 rounded-md transition-all font-mono font-bold flex items-center gap-1 cursor-pointer shrink-0 ${
                showImagePanel 
                  ? 'bg-[#00e5b0] text-[#070a11]' 
                  : 'bg-white/5 text-neutral-300 hover:text-[#00e5b0] hover:bg-white/10'
              }`}
            >
              <Image className="w-3 h-3 text-[#00e5b0]" />
              <span>GIF & Images</span>
            </button>
          </div>

          <form 
            onSubmit={handleSendMessage}
            className={`flex items-center gap-1.5 bg-[#0d1222] border rounded-xl p-1 transition-all focus-within:ring-1 focus-within:ring-[#00e5b0]/5 ${
              shakeCompose 
                ? 'animate-shake border-rose-500/50' 
                : !chatName.trim()
                ? 'opacity-40 border-white/5 cursor-not-allowed'
                : 'border-white/5 focus-within:border-[#00e5b0]/60'
            }`}
          >
            <input 
              ref={textInputRef}
              type="text"
              placeholder={chatName.trim() ? "Write message..." : "⚠️ Set nickname"}
              value={textInput}
              disabled={!chatName.trim()}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={handleComposeKeyPress}
              maxLength={300}
              className="flex-1 bg-transparent border-none text-[11px] text-white placeholder-neutral-500 pl-2 py-1 outline-none font-medium min-w-0"
            />
            <button
              type="submit"
              disabled={!chatName.trim() || (!textInput.trim() && !mediaUrl)}
              className={`p-1.5 rounded-lg transition-all flex items-center justify-center shrink-0 ${
                chatName.trim() && (textInput.trim() || mediaUrl)
                  ? 'bg-[#00e5b0] text-[#070a11] hover:scale-105 active:scale-95 cursor-pointer font-bold'
                  : 'bg-neutral-800 text-neutral-500'
              }`}
            >
              <Send className="w-3 h-3 fill-current" />
            </button>
          </form>
        </footer>

      </section>

    </div>
  );
}
