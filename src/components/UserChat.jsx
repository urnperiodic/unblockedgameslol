import { useState, useEffect, useRef } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, push, onChildAdded, query, limitToLast, onValue, set, get } from 'firebase/database';
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
  Laugh,
  Plus,
  Lock,
  Unlock,
  Key
} from 'lucide-react';
import { isBlocked } from '../utils/bannedWords';

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
  const [chatName, setChatName] = useState('');
  const [textInput, setTextInput] = useState('');
  
  // Account authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tempNickname, setTempNickname] = useState('');
  const [useLocalFallback, setUseLocalFallback] = useState(false);
  
  // Interface animations & indicators
  const [shakeCompose, setShakeCompose] = useState(false);
  const [pulseName, setPulseName] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [showImagePanel, setShowImagePanel] = useState(false);
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaUrlInput, setMediaUrlInput] = useState('');

  // Password protected custom channels states
  const [customChannels, setCustomChannels] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newChanName, setNewChanName] = useState('');
  const [newChanDesc, setNewChanDesc] = useState('');
  const [newChanPass, setNewChanPass] = useState('');
  const [enteredPasscode, setEnteredPasscode] = useState('');

  const [unlockedChannelIds, setUnlockedChannelIds] = useState(() => {
    try {
      const saved = localStorage.getItem('unlocked_chat_channels');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const allChannels = [...CHANNELS, ...customChannels];
  const currentActiveChannel = allChannels.find(c => c.id === activeChannel.id) || activeChannel;

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

  // Synchronize custom channels from real-time database
  useEffect(() => {
    if (useLocalFallback) {
      const localChans = JSON.parse(localStorage.getItem('fallback_custom_channels') || '[]');
      setCustomChannels(localChans);
      return;
    }

    const customRef = ref(db, 'custom_channels');
    const unsubscribe = onValue(customRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        const list = Object.keys(val).map(key => ({
          id: key,
          name: val[key].name || 'custom-room',
          description: val[key].description || 'Custom chat room',
          refPath: `custom_messages_${key}`,
          isPasswordProtected: !!val[key].password,
          password: val[key].password || ''
        }));
        setCustomChannels(list);
      } else {
        setCustomChannels([]);
      }
    }, (err) => {
      console.warn("Firebase custom channels read failed, falling back to local database.", err);
      setUseLocalFallback(true);
      const localChans = JSON.parse(localStorage.getItem('fallback_custom_channels') || '[]');
      setCustomChannels(localChans);
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [useLocalFallback]);

  // Synchronize dynamic messages when changing channels
  useEffect(() => {
    // Clear display during transition
    setMessages([]);
    
    // Check if channel is locked
    const isLocked = currentActiveChannel.isPasswordProtected && !unlockedChannelIds[currentActiveChannel.id];
    if (isLocked) {
      return;
    }

    if (useLocalFallback) {
      const localMsgs = JSON.parse(localStorage.getItem(`fallback_msgs_${currentActiveChannel.id}`) || '[]');
      setMessages(localMsgs);
      return;
    }

    // Wire up child added subscription
    const msgsRef = ref(db, currentActiveChannel.refPath);
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
    }, (err) => {
      console.warn("Firebase messages sync failed, falling back to local database.", err);
      setUseLocalFallback(true);
      const localMsgs = JSON.parse(localStorage.getItem(`fallback_msgs_${currentActiveChannel.id}`) || '[]');
      setMessages(localMsgs);
    });

    return () => {
      // Cleanup previous listener
      if (typeof listenerRef.current === 'function') {
        listenerRef.current();
      }
    };
  }, [currentActiveChannel.id, unlockedChannelIds[currentActiveChannel.id], useLocalFallback]);

  // Scroll to bottom whenever messages list grows
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Flash warning/toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleJoinChat = (e) => {
    if (e) e.preventDefault();
    if (!tempNickname.trim()) {
      triggerToast('Nickname is required!');
      return;
    }
    const cleanName = tempNickname.trim().replace(/[^a-zA-Z0-9_-]/g, '');
    if (!cleanName) {
      triggerToast('Nickname must contain only letters, numbers, dashes, and underscores!');
      return;
    }
    if (cleanName.length < 2) {
      triggerToast('Nickname is too short! Min 2 characters.');
      return;
    }
    if (cleanName.length > 16) {
      triggerToast('Nickname is too long! Max 16 characters.');
      return;
    }

    localStorage.setItem('chat_name', cleanName);
    setChatName(cleanName);
    setIsAuthenticated(true);
    setTempNickname('');
    triggerToast(`Welcome @${cleanName} to the Live Network!`);
  };

  const handleLogout = () => {
    localStorage.removeItem('chat_name');
    setChatName('');
    setIsAuthenticated(false);
    triggerToast('Logged out of chat room.');
  };

  // On mount: check for saved nickname in localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('chat_name');
    if (savedName) {
      const cleanName = savedName.trim().replace(/[^a-zA-Z0-9_-]/g, '');
      if (cleanName) {
        setChatName(cleanName);
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Create password protected / public custom channels
  const handleCreateChannel = (e) => {
    if (e) e.preventDefault();
    if (!newChanName.trim()) {
      triggerToast('Channel name is required!');
      return;
    }

    const cleanName = newChanName.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-_]/g, '');
    if (!cleanName) {
      triggerToast('Invalid channel name. Use letters, numbers, and dashes.');
      return;
    }

    const exists = allChannels.some(c => c.name.toLowerCase() === cleanName);
    if (exists) {
      triggerToast('Channel name already exists!');
      return;
    }

    const pass = newChanPass.trim();
    const channelData = {
      name: cleanName,
      description: newChanDesc.trim() || 'A custom chat room',
      password: pass || null
    };

    const createLocalChannel = () => {
      const localChans = JSON.parse(localStorage.getItem('fallback_custom_channels') || '[]');
      const localId = 'local_' + Date.now();
      const newChanObj = {
        id: localId,
        name: cleanName,
        description: channelData.description,
        refPath: `custom_messages_${localId}`,
        isPasswordProtected: !!pass,
        password: pass
      };
      const updatedChans = [...localChans, newChanObj];
      localStorage.setItem('fallback_custom_channels', JSON.stringify(updatedChans));
      setCustomChannels(updatedChans);

      if (pass) {
        const updated = { ...unlockedChannelIds, [localId]: true };
        setUnlockedChannelIds(updated);
        localStorage.setItem('unlocked_chat_channels', JSON.stringify(updated));
      }

      setActiveChannel(newChanObj);
      setNewChanName('');
      setNewChanDesc('');
      setNewChanPass('');
      setShowCreateModal(false);
      triggerToast(`Channel #${cleanName} created (Local Secure Mode)!`);
    };

    if (useLocalFallback) {
      createLocalChannel();
      return;
    }

    const newChanRef = push(ref(db, 'custom_channels'));
    const id = newChanRef.key;

    set(newChanRef, channelData).then(() => {
      if (pass) {
        const updated = { ...unlockedChannelIds, [id]: true };
        setUnlockedChannelIds(updated);
        localStorage.setItem('unlocked_chat_channels', JSON.stringify(updated));
      }
      
      const newChanObj = {
        id,
        name: cleanName,
        description: channelData.description,
        refPath: `custom_messages_${id}`,
        isPasswordProtected: !!pass,
        password: pass
      };

      setActiveChannel(newChanObj);
      setNewChanName('');
      setNewChanDesc('');
      setNewChanPass('');
      setShowCreateModal(false);
      triggerToast(`Channel #${cleanName} created!`);
    }).catch((err) => {
      console.warn("Firebase custom channel creation failed, using local fallback.", err);
      setUseLocalFallback(true);
      createLocalChannel();
    });
  };

  // Unlock password protected channels with a passcode
  const handleUnlockChannel = (e) => {
    if (e) e.preventDefault();
    if (enteredPasscode === currentActiveChannel.password) {
      const updated = { ...unlockedChannelIds, [currentActiveChannel.id]: true };
      setUnlockedChannelIds(updated);
      localStorage.setItem('unlocked_chat_channels', JSON.stringify(updated));
      setEnteredPasscode('');
      triggerToast('🔓 Channel unlocked!');
    } else {
      triggerToast('❌ Incorrect passcode!');
    }
  };

  // Attempt to compose a message
  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    
    if (!isAuthenticated || !chatName.trim()) {
      setShakeCompose(true);
      triggerToast('Please log in or create an account to chat!');
      setTimeout(() => setShakeCompose(false), 1000);
      return;
    }

    const cleanText = textInput.trim();
    if (!cleanText && !mediaUrl) return;

    if (cleanText && isBlocked(cleanText)) {
      triggerToast('⚠️ That word is blocked.');
      return;
    }

    const msgData = {
      name: chatName.trim(),
      text: cleanText || "Sent a GIF/Image",
      imageUrl: mediaUrl || null,
      timestamp: Date.now()
    };

    const sendLocalMessage = () => {
      const channelKey = `fallback_msgs_${currentActiveChannel.id}`;
      const localMsgs = JSON.parse(localStorage.getItem(channelKey) || '[]');
      const newMsg = { ...msgData, key: Date.now().toString() };
      const updatedMsgs = [...localMsgs, newMsg];
      localStorage.setItem(channelKey, JSON.stringify(updatedMsgs));
      setMessages(updatedMsgs);
      setMediaUrl('');
    };

    if (useLocalFallback) {
      sendLocalMessage();
      setTextInput('');
      textInputRef.current?.focus();
      return;
    }

    // Push message to active reference node
    const msgsRef = ref(db, currentActiveChannel.refPath);
    push(msgsRef, msgData).then(() => {
      setMediaUrl('');
    }).catch((err) => {
      console.warn("Firebase message send failed, switching to local storage fallback.", err);
      setUseLocalFallback(true);
      sendLocalMessage();
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
    if (!isAuthenticated || !chatName.trim()) {
      triggerToast('Please log in or create an account to chat!');
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

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col w-full h-full bg-[#0a0d16] text-[#e2e8f0] overflow-hidden select-none font-sans relative p-4 items-center justify-center">
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 p-1 hover:bg-white/10 text-neutral-400 hover:text-white rounded transition-all cursor-pointer z-50"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        
        <div className="w-full max-w-sm bg-[#0b0f19] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 relative">
          <div className="text-center space-y-1.5 pb-2 border-b border-white/5">
            <div className="w-12 h-12 rounded-full bg-[#00e5b0]/10 flex items-center justify-center mx-auto border border-[#00e5b0]/20 shadow-[0_0_15px_rgba(0,229,176,0.05)]">
              <User className="w-5 h-5 text-[#00e5b0]" />
            </div>
            <h2 className="text-sm font-black uppercase text-white tracking-widest mt-2">Join Portal Chat</h2>
            <p className="text-neutral-400 text-[10px] leading-relaxed">
              Choose a clean nickname to enter the live chat rooms and chat with everyone.
            </p>
          </div>

          <form onSubmit={handleJoinChat} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-[9px] font-black uppercase tracking-wider text-neutral-400 block">
                Choose Nickname <span className="text-[#00e5b0]">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-[#00e5b0] font-black text-xs">@</span>
                <input 
                  type="text"
                  required
                  maxLength={16}
                  placeholder="e.g. cyber_sam"
                  value={tempNickname}
                  onChange={(e) => setTempNickname(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                  className="w-full bg-[#070a11] border border-white/5 focus:border-[#00e5b0]/60 rounded-xl py-2 pl-7 pr-3 text-xs text-white outline-none placeholder-neutral-600 font-bold"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#00e5b0] hover:bg-[#00e5b0]/90 text-[#070a11] text-[10px] font-black uppercase py-2.5 rounded-xl transition-all active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(0,229,176,0.15)]"
            >
              Join Live Chat Rooms
            </button>
          </form>
        </div>

        {toastMessage && (
          <div className="absolute bottom-4 bg-rose-950/90 border border-rose-500/50 px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-xl animate-bounce z-50">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="text-[10px] font-bold text-rose-200 tracking-tight">{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex w-full h-full bg-[#0a0d16] text-[#e2e8f0] overflow-hidden select-none font-sans relative">
      
      {/* LEFT SIDEBAR: ROOMS & NICKNAME CONFIG */}
      <aside className="hidden md:flex flex-col w-12 border-r border-white/5 bg-[#070a11] shrink-0 items-center py-2 gap-3">
        {/* ROOM BRAND LOGO / LIVE INDICATOR */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00e5b0] animate-pulse" title="Portal Chat Live Network" />
          <span className="text-[7px] font-black font-mono tracking-widest text-[#00e5b0]">LIVE</span>
        </div>

        {/* CHANNEL NAVIGATION RAIL - ICON BASED ONLY */}
        <div className="flex-1 flex flex-col gap-1.5 w-full px-1 items-center justify-start pt-2 overflow-y-auto scrollbar-none">
          {allChannels.map((ch) => {
            const isActive = currentActiveChannel.id === ch.id;
            const isLocked = ch.isPasswordProtected && !unlockedChannelIds[ch.id];
            
            // Map channels to compact icons
            let IconComponent = Hash;
            if (ch.id === 'general') IconComponent = MessageSquare;
            else if (ch.id === 'gaming') IconComponent = Gamepad2;
            else if (ch.id === 'cinema') IconComponent = Film;
            else if (ch.id === 'memes') IconComponent = Laugh;
            else if (ch.isPasswordProtected) IconComponent = isLocked ? Lock : Unlock;

            return (
              <button
                key={ch.id}
                onClick={() => {
                  setActiveChannel(ch);
                  setSearchFilter('');
                }}
                className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all relative group cursor-pointer shrink-0 ${
                  isActive 
                    ? 'bg-[#00e5b0]/20 text-[#00e5b0] shadow-sm border border-[#00e5b0]/30' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
                title={`${ch.name} - ${ch.description}`}
              >
                <IconComponent className="w-3.5 h-3.5 shrink-0" />
                
                {/* TOOLTIP ON HOVER */}
                <div className="absolute left-10 top-1/2 -translate-y-1/2 bg-[#090d16] border border-white/10 text-[9px] text-white font-semibold rounded px-2 py-1 shadow-lg whitespace-nowrap hidden group-hover:block z-50">
                  <div className="font-extrabold uppercase text-[#00e5b0] flex items-center gap-1">
                    <span>#{ch.name}</span>
                    {ch.isPasswordProtected && (
                      <span className="text-[7px] text-amber-500 font-bold flex items-center gap-0.5">
                        <Lock className="w-1.5 h-1.5" /> (Protected)
                      </span>
                    )}
                  </div>
                  <div className="text-[8px] text-neutral-400 font-normal max-w-[150px] truncate">{ch.description}</div>
                </div>
              </button>
            );
          })}

          {/* ADD CUSTOM CHANNEL BUTTON */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-8 h-8 flex items-center justify-center rounded-xl transition-all border border-dashed border-neutral-600 hover:border-[#00e5b0] text-neutral-500 hover:text-[#00e5b0] hover:bg-white/5 cursor-pointer shrink-0 mt-1"
            title="Create Custom Channel"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* RIGHT CONTAINER: MAIN CHAT PANEL */}
      <section className="flex-1 flex flex-col h-full overflow-hidden bg-[#0a0d16]">
        
        {/* MOBILE OR DYNAMIC CHANNEL CONTROL HEADER */}
        <header className="px-2.5 py-1.5 border-b border-white/5 bg-[#070a11]/95 flex items-center justify-between gap-2 shrink-0 select-none">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-neutral-500 font-extrabold text-[10px] hidden md:inline">#</span>
            <h1 className="text-[10px] font-black text-white tracking-tight flex items-center gap-1 uppercase truncate">
              {currentActiveChannel.isPasswordProtected && <Lock className="w-2.5 h-2.5 text-amber-500 shrink-0" />}
              <span>{currentActiveChannel.name}</span>
            </h1>
            <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            {useLocalFallback && (
              <span className="text-[7px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded-md uppercase tracking-wider font-extrabold shrink-0" title="Operating in offline/local storage mode due to restricted connection permissions.">
                Local Secure Mode
              </span>
            )}
          </div>

          {/* Desktop embedded Nickname and Filter */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            {/* Nickname badge */}
            <div className="flex items-center gap-1 bg-[#00e5b0]/10 border border-[#00e5b0]/20 rounded-xl px-2 py-0.5 select-none text-[9px] font-extrabold text-[#00e5b0] tracking-wider uppercase">
              <User className="w-2.5 h-2.5 text-[#00e5b0] shrink-0" />
              <span>{chatName}</span>
            </div>

            <button
              onClick={handleLogout}
              className="px-1.5 py-0.5 rounded-lg border border-rose-500/20 hover:border-rose-500/50 text-rose-400 hover:text-white bg-rose-500/5 hover:bg-rose-500/10 text-[8px] font-black uppercase transition-all cursor-pointer"
              title="Logout Account"
            >
              Sign Out
            </button>

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
              value={currentActiveChannel.id}
              onChange={(e) => {
                if (e.target.value === '__add__') {
                  setShowCreateModal(true);
                  return;
                }
                const target = allChannels.find(c => c.id === e.target.value);
                if (target) {
                  setActiveChannel(target);
                  setSearchFilter('');
                }
              }}
              className="md:hidden bg-[#0d1222] border border-white/5 py-0.5 px-1 rounded text-[9px] font-bold uppercase outline-none text-[#00e5b0] max-w-[80px]"
            >
              {allChannels.map(c => {
                const isLocked = c.isPasswordProtected && !unlockedChannelIds[c.id];
                return (
                  <option key={c.id} value={c.id}>
                    {isLocked ? '🔒 ' : ''}#{c.name}
                  </option>
                );
              })}
              <option value="__add__">+ CREATE</option>
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
          <div className="flex md:hidden items-center justify-between p-1.5 px-2.5 border-b border-white/5 bg-[#0e1627] shrink-0">
            <div className="flex items-center gap-1 select-none">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-bold text-[#00e5b0] tracking-wider uppercase">@{chatName}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-[8px] text-rose-400 hover:text-white font-extrabold tracking-wider uppercase border border-rose-500/20 hover:border-rose-500 bg-rose-500/5 px-2 py-0.5 rounded-md cursor-pointer transition-all active:scale-95"
            >
              Log Out
            </button>
          </div>
        )}

        {/* MESSAGES OR UNLOCK GATE */}
        {currentActiveChannel.isPasswordProtected && !unlockedChannelIds[currentActiveChannel.id] ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-[#070a11]/40 p-6 text-center select-none">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mb-4 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]">
              <Lock className="w-6 h-6 text-amber-500 animate-pulse" />
            </div>
            
            <h2 className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-1.5">
              <span>#{currentActiveChannel.name}</span>
            </h2>
            <p className="text-neutral-400 text-[10px] mt-1 max-w-xs leading-relaxed">
              {currentActiveChannel.description || 'This channel is password protected. Enter the passcode to join, speak, and see messages.'}
            </p>

            <form onSubmit={handleUnlockChannel} className="mt-5 w-full max-w-[200px] space-y-2">
              <div className="relative flex items-center">
                <Key className="absolute left-3 w-3.5 h-3.5 text-neutral-500" />
                <input 
                  type="password"
                  placeholder="Join Code"
                  value={enteredPasscode}
                  onChange={(e) => setEnteredPasscode(e.target.value)}
                  className="w-full bg-[#0d1222] border border-white/5 focus:border-[#00e5b0]/60 rounded-xl py-2 pl-9 pr-4 text-xs text-white outline-none placeholder-neutral-500 font-mono tracking-widest text-center"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#00e5b0] hover:bg-[#00e5b0]/90 text-[#070a11] text-xs font-black uppercase py-2 rounded-xl transition-all active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(0,229,176,0.1)]"
              >
                Join Channel
              </button>
            </form>
          </div>
        ) : (
          <>
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
                    : !isAuthenticated
                    ? 'opacity-40 border-white/5 cursor-not-allowed'
                    : 'border-white/5 focus-within:border-[#00e5b0]/60'
                }`}
              >
                <input 
                  ref={textInputRef}
                  type="text"
                  placeholder={isAuthenticated ? "Write message..." : "⚠️ Please login first"}
                  value={textInput}
                  disabled={!isAuthenticated}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={handleComposeKeyPress}
                  maxLength={300}
                  className="flex-1 bg-transparent border-none text-[11px] text-white placeholder-neutral-500 pl-2 py-1 outline-none font-medium min-w-0"
                />
                <button
                  type="submit"
                  disabled={!isAuthenticated || (!textInput.trim() && !mediaUrl)}
                  className={`p-1.5 rounded-lg transition-all flex items-center justify-center shrink-0 ${
                    isAuthenticated && (textInput.trim() || mediaUrl)
                      ? 'bg-[#00e5b0] text-[#070a11] hover:scale-105 active:scale-95 cursor-pointer font-bold'
                      : 'bg-neutral-800 text-neutral-500'
                  }`}
                >
                  <Send className="w-3 h-3 fill-current" />
                </button>
              </form>
            </footer>
          </>
        )}

        {/* TOAST SYSTEM ALERTS */}
        {toastMessage && (
          <div className="relative shrink-0 flex justify-center z-50">
            <div className="absolute bottom-1 bg-rose-500 text-white font-mono text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-lg flex items-center gap-1 shadow-md shadow-black/80 animate-fade-in border border-rose-400">
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

      </section>

      {/* CREATE CHANNEL MODAL OVERLAY */}
      {showCreateModal && (
        <div className="absolute inset-0 bg-[#06080e]/90 flex items-center justify-center p-4 z-50 animate-fade-in backdrop-blur-xs select-none">
          <div className="bg-[#0b0f19] border border-white/10 rounded-2xl w-full max-w-sm p-5 shadow-2xl flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <h2 className="text-xs font-black uppercase text-[#00e5b0] tracking-wider flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" /> Create Custom Channel
              </h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-neutral-500 hover:text-white p-0.5 rounded hover:bg-white/5 transition-all cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <form onSubmit={handleCreateChannel} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                  Channel Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-neutral-500 font-black text-xs">#</span>
                  <input 
                    type="text"
                    required
                    maxLength={20}
                    placeholder="e.g. secret-lounge"
                    value={newChanName}
                    onChange={(e) => setNewChanName(e.target.value)}
                    className="w-full bg-[#070a11] border border-white/5 focus:border-[#00e5b0]/60 rounded-xl py-2 pl-7 pr-3 text-xs text-white outline-none placeholder-neutral-600 font-bold"
                  />
                </div>
                <span className="text-[8px] text-neutral-500 font-medium block">
                  Only letters, numbers, dashes. Will be formatted as lowercase.
                </span>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                  Description
                </label>
                <input 
                  type="text"
                  maxLength={60}
                  placeholder="e.g. Discussion room for cool stuff"
                  value={newChanDesc}
                  onChange={(e) => setNewChanDesc(e.target.value)}
                  className="w-full bg-[#070a11] border border-white/5 focus:border-[#00e5b0]/60 rounded-xl py-2 px-3 text-xs text-white outline-none placeholder-neutral-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block flex items-center justify-between">
                  <span>Passcode <span className="text-neutral-500 font-normal">(Optional)</span></span>
                  <span className="text-[8px] text-amber-500 font-bold flex items-center gap-0.5">
                    <Lock className="w-2 h-2" /> Password-protect
                  </span>
                </label>
                <div className="relative flex items-center">
                  <Key className="absolute left-3 w-3.5 h-3.5 text-neutral-500" />
                  <input 
                    type="text"
                    maxLength={16}
                    placeholder="e.g. 12345 (Leave empty for public)"
                    value={newChanPass}
                    onChange={(e) => setNewChanPass(e.target.value)}
                    className="w-full bg-[#070a11] border border-white/5 focus:border-[#00e5b0]/60 rounded-xl py-2 pl-9 pr-3 text-xs text-white outline-none placeholder-neutral-600 font-mono"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2.5 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase py-2 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#00e5b0] hover:bg-[#00e5b0]/90 text-[#070a11] text-[10px] font-black uppercase py-2 rounded-xl transition-all cursor-pointer shadow-[0_0_15px_rgba(0,229,176,0.15)]"
                >
                  Create Channel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
