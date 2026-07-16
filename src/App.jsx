import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { games as gamesData } from './data/games';
import { slopeGames } from './data/slopeGames';

// Merge curated catalog with the 1090 Slope-3 Classroom6x games, then
// ensure every entry has a stable unique id (used for keys & favorites).
const games = [...gamesData, ...slopeGames].map((game, index) => {
  if (!game.id) {
    const slug = (game.title || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return {
      ...game,
      id: `game-gen-${index}-${slug}`
    };
  }
  return game;
});
import { initialArticles, gameOptions, toneOptions, generateMockAIArticle } from './data/articles';
import FlashcardsWorkspace from './components/FlashcardsWorkspace';
import QuizWorkspace from './components/QuizWorkspace';
import GrammarCheckerWorkspace from './components/GrammarCheckerWorkspace';
import ChatWorkspace from './components/ChatWorkspace';
import UserChat from './components/UserChat';
import MoviesWorkspace from './components/MoviesWorkspace';
import InformationSection from './components/InformationSection';
import { 
  School, 
  Search, 
  Play,
  Info, 
  ExternalLink, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Plus, 
  Minus, 
  Heart, 
  ShieldAlert, 
  Gamepad2, 
  Users, 
  Layers,
  Sparkles,
  ArrowLeft,
  Volume2,
  Tv,
  MessageSquare,
  Globe,
  Dribbble,
  BookOpen,
  Github,
  Compass,
  FileText,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Lock,
  Unlock,
  LogOut,
  Copy,
  Code,
  Share2,
  Download,
  Upload,
  Settings,
  Check,
  X,
  Shuffle,
  Cpu,
  Box,
  Mail,
  Crosshair,
  Trophy,
  PartyPopper
} from 'lucide-react';

// Safe storage helper to prevent SecurityError crash in sandboxed iframes
const safeStorage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      // Ignore security errors
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      // Ignore security errors
    }
  }
};

export default function App() {
  // Helper to optimize and resize thumbnail URLs dynamically to Poki recommended size (512x512) for fast load & high clarity
  const getOptimizedThumbnail = (url) => {
    if (!url) return '';
    if (url.includes('img.poki-cdn.com')) {
      return url
        .replace('width=1200', 'width=512')
        .replace('height=1200', 'height=512');
    }
    return url;
  };

  const [theme, setTheme] = useState(() => {
    const saved = safeStorage.getItem('unblocked-theme');
    return saved && ['cyborg', 'violet', 'ice', 'rose-pine', 'none'].includes(saved) ? saved : 'none';
  });
  const [mode, setMode] = useState(() => {
    const savedMode = safeStorage.getItem('unblocked-mode');
    if (savedMode) return savedMode;
    const initialViewMode = safeStorage.getItem('classroom-view-mode') || 'articles';
    return initialViewMode === 'games' ? 'dark' : 'light';
  });
  const [filter, setFilter] = useState(() => {
    try {
      const hasVisited = safeStorage.getItem('has-visited-before');
      if (!hasVisited) {
        safeStorage.setItem('has-visited-before', 'true');
        return 'info';
      }
      const saved = safeStorage.getItem('unblocked-last-filter');
      return saved || 'all';
    } catch {
      return 'info';
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedGame, setSelectedGame] = useState(() => {
    try {
      const savedId = safeStorage.getItem('unblocked-last-game');
      if (savedId) {
        return games.find(g => g.id === savedId) || null;
      }
      return null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    safeStorage.setItem('unblocked-last-filter', filter);
  }, [filter]);

  useEffect(() => {
    if (selectedGame) {
      safeStorage.setItem('unblocked-last-game', selectedGame.id);
    } else {
      safeStorage.removeItem('unblocked-last-game');
      setWindowFullscreen(false);
    }
  }, [selectedGame]);
  const [toolsExpanded, setToolsExpanded] = useState(false);
  const [altBarOpen, setAltBarOpen] = useState(true);
  const [headerOpen, setHeaderOpen] = useState(false);

  const openWorkspaceInAboutBlank = (currentFilter) => {
    let url = "";
    if (currentFilter === 'movies') {
      url = window.location.origin + '?filter=movies';
    } else if (currentFilter === 'youtube') {
      url = 'https://urnperiodic.github.io/youtube1/';
    } else if (currentFilter === 'chat') {
      url = 'https://urnperiodic.github.io/extrastuffforwebsite/';
    } else if (currentFilter === 'lobbychat') {
      url = window.location.origin + '?filter=lobbychat';
    } else if (currentFilter === 'proxy') {
      url = 'https://scramjet.mercurywork.shop/';
    } else {
      url = window.location.origin;
    }

    const win = window.open('about:blank', '_blank');
    if (win) {
      let parentTitle = "StudyTools";
      let parentFavicon = "https://ssl.gstatic.com/classroom/favicon.png";
      
      if (decoyType === 'classroom') {
        parentTitle = "Home - Classroom";
        parentFavicon = "https://ssl.gstatic.com/classroom/favicon.png";
      } else if (decoyType === 'clever') {
        parentTitle = "Clever | Log in with Clever";
        parentFavicon = "https://www.google.com/s2/favicons?sz=64&domain=clever.com";
      } else if (decoyType === 'campus') {
        parentTitle = "Campus Student";
        parentFavicon = "https://jerseycitynj.infinitecampus.org/campus/favicon-32x32.png";
      } else if (decoyType === 'docs') {
        parentTitle = "Google Docs";
        parentFavicon = "https://ssl.gstatic.com/docs/documents/images/docs-favicon-2026-v2.ico";
      } else if (decoyType === 'gmail') {
        parentTitle = "Inbox - Jersey City Public Schools";
        parentFavicon = "https://ssl.gstatic.com/ui/v1/icons/mail/images/favicon_gmail_2026_v2.ico";
      }

      win.document.write(`<html><head><title>${parentTitle}</title><link rel="icon" href="${parentFavicon}"><style>html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:#000;}iframe{width:100vw;height:100vh;border:none;display:block;margin:0;padding:0;}</style></head><body><iframe src="${url}" allow="fullscreen; autoplay; encrypted-media; picture-in-picture; clipboard-write; microphone; camera; geolocation" allowfullscreen="true"></iframe></body></html>`);
      win.document.close();
    }
  };

  // States for collapsible & resizable docked game chat
  const [dockedChatWidth, setDockedChatWidth] = useState(288); // 288px default (w-72)
  const [dockedChatCollapsed, setDockedChatCollapsed] = useState(true);
  const [isDraggingDock, setIsDraggingDock] = useState(false);

  // Monitor mouse moving & mouse up for docking drag resize
  useEffect(() => {
    if (!isDraggingDock) return;
    const handleMouseMove = (e) => {
      const container = document.getElementById('game-arena-container');
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const width = rect.right - e.clientX;
      
      // Clamp width: min 180px, max 50% of the game arena container width
      const minW = 180;
      const maxW = Math.min(600, rect.width * 0.5);
      if (width >= minW && width <= maxW) {
        setDockedChatWidth(width);
      }
    };
    const handleMouseUp = () => {
      setIsDraggingDock(false);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingDock]);

  const [zoom, setZoom] = useState(1);
  const [windowFullscreen, setWindowFullscreen] = useState(false);
  const [failedThumbnails, setFailedThumbnails] = useState({});
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = safeStorage.getItem('unblocked-favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('unlocked') === 'true' || params.get('view') === 'games') {
        safeStorage.setItem('classroom-view-mode', 'games');
        return 'games';
      }
    }
    const saved = safeStorage.getItem('classroom-view-mode');
    if (saved === 'games') return 'games';
    return 'articles'; // Innocent educational syllabus base is shown on first startup
  });

  const isPasscodeUnlocked = viewMode === 'games';

  const setViewModeAndSave = (mode) => {
    setViewMode(mode);
    safeStorage.setItem('classroom-view-mode', mode);
    safeStorage.setItem('classroom-passcode-unlocked', mode === 'games' ? 'true' : 'false');
    if (mode === 'games') {
      setHeaderOpen(false);
      setSidebarOpen(false);
    }
  };

    useEffect(() => {
      if (viewMode === 'games') {
        setHeaderOpen(false);
        setSidebarOpen(false);
      }
    }, [viewMode]);

  const [passcode, setPasscode] = useState('');
  const [isShake, setIsShake] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [isGlobalSettingsOpen, setIsGlobalSettingsOpen] = useState(false);

  // Articles and Custom AI article generator states
  const [activeEduTab, setActiveEduTab] = useState('articles'); // 'articles' | 'flashcards' | 'grammar' | 'quiz'
  const [articles, setArticles] = useState(initialArticles);
  const [selectedArticleId, setSelectedArticleId] = useState(initialArticles[0].id);
  const [articleSearch, setArticleSearch] = useState('');
  const [selectedArticleCategory, setSelectedArticleCategory] = useState('All');

  // Classroom/Games Cloak/Decoy State
  const [decoyType, setDecoyType] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlDecoyType = params.get('decoyType');
      if (urlDecoyType && ['none', 'classroom', 'clever', 'campus', 'docs', 'gmail'].includes(urlDecoyType)) {
        return urlDecoyType;
      }
      const urlDecoy = params.get('decoy');
      if (urlDecoy === 'true') return 'classroom';
      if (urlDecoy === 'false') return 'none';
      if (urlDecoy && ['none', 'classroom', 'clever', 'campus', 'docs', 'gmail'].includes(urlDecoy)) {
        return urlDecoy;
      }
      const cached = localStorage.getItem('study-tools-decoy-type');
      if (cached && ['none', 'classroom', 'clever', 'campus', 'docs', 'gmail'].includes(cached)) {
        return cached;
      }
      const cachedLegacy = localStorage.getItem('study-tools-classroom-decoy');
      if (cachedLegacy === 'true') return 'classroom';
    }
    return 'none';
  });

  const useClassroomDecoy = decoyType !== 'none';

  // Persist decoy state to localStorage
  useEffect(() => {
    localStorage.setItem('study-tools-decoy-type', decoyType);
    localStorage.setItem('study-tools-classroom-decoy', String(decoyType !== 'none'));
  }, [decoyType]);

  // Set white as the main starting color for articles (light mode), and black for games (dark mode)
  useEffect(() => {
    if (viewMode === 'articles') {
      setMode('light');
    } else if (viewMode === 'games') {
      setMode('dark');
    }
  }, [viewMode]);

  const handlePasswordSubmit = (customPass) => {
    const inputPass = (customPass !== undefined ? customPass : passcode).trim().toLowerCase();
    if (!inputPass) return;

    if (inputPass === 'ttt0609') {
      const win = window.open("about:blank", "_blank");
      if (win) {
        // Automatically save that we are unlocked so the iframe can read it
        safeStorage.setItem('classroom-view-mode', 'games');
        safeStorage.setItem('classroom-passcode-unlocked', 'true');

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('unlocked', 'true');
        searchParams.set('decoyType', decoyType);
        const iframeSrc = `${window.location.origin}${window.location.pathname}?${searchParams.toString()}${window.location.hash}`;
        
        let parentTitle = "StudyTools";
        let parentFavicon = "https://ssl.gstatic.com/classroom/favicon.png";
        
        if (decoyType === 'classroom') {
          parentTitle = "Home - Classroom";
          parentFavicon = "https://ssl.gstatic.com/classroom/favicon.png";
        } else if (decoyType === 'clever') {
          parentTitle = "Clever | Log in with Clever";
          parentFavicon = "https://www.google.com/s2/favicons?sz=64&domain=clever.com";
        } else if (decoyType === 'campus') {
          parentTitle = "Campus Student";
          parentFavicon = "https://jerseycitynj.infinitecampus.org/campus/favicon-32x32.png";
        } else if (decoyType === 'docs') {
          parentTitle = "Google Docs";
          parentFavicon = "https://ssl.gstatic.com/docs/documents/images/docs-favicon-2026-v2.ico";
        } else if (decoyType === 'gmail') {
          parentTitle = "Inbox - Jersey City Public Schools";
          parentFavicon = "https://ssl.gstatic.com/ui/v1/icons/mail/images/favicon_gmail_2026_v2.ico";
        }

        win.document.write(`<html><head><title>${parentTitle}</title><link rel="icon" href="${parentFavicon}"><style>html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:#0c0a09;}iframe{width:100vw;height:100vh;border:none;display:block;}</style></head><body><iframe src="${iframeSrc}" allow="fullscreen"></iframe></body></html>`);
        win.document.close();
      } else {
        alert("Popup blocked! Please allow popups to open the games in a cloaked tab.");
      }
      setPasscode('');
    } else if (inputPass === 'tt0609' || inputPass === '1378') {
      setTimeout(() => {
        setViewModeAndSave('games');
        setPasscode('');
      }, 150);
    } else if (inputPass === '0609') {
      setTimeout(() => {
        setViewModeAndSave('articles');
        setPasscode('');
      }, 150);
    } else if (
      inputPass === '1212' || 
      inputPass === '1111' || 
      ['school', 'classroom', 'study', 'science', 'math', 'education', 'admin', 'password', 'open', 'class'].includes(inputPass)
    ) {
      setTimeout(() => {
        setViewModeAndSave('articles');
        setPasscode('');
      }, 150);
    } else {
      setTimeout(() => {
        setIsShake(true);
        setErrorCount(prev => prev + 1);
        setTimeout(() => {
          setIsShake(false);
          setPasscode('');
        }, 500);
      }, 100);
    }
  };

  const handleDigitInput = (digit) => {
    if (viewMode === 'games') return;
    const nextPasscode = passcode + digit;
    setPasscode(nextPasscode);

    // Instant matching for rapid-pins (2026, 0609, 1212, 1111)
    if (nextPasscode === '2026') {
      setTimeout(() => {
        setViewModeAndSave('games');
        setPasscode('');
      }, 150);
    } else if (nextPasscode === '0609' || nextPasscode === '1212' || nextPasscode === '1111') {
      setTimeout(() => {
        setViewModeAndSave('articles');
        setPasscode('');
      }, 150);
    } else if (nextPasscode.length >= 4 && !isNaN(nextPasscode)) {
      setTimeout(() => {
        setIsShake(true);
        setErrorCount(prev => prev + 1);
        setTimeout(() => {
          setIsShake(false);
          setPasscode('');
        }, 500);
      }, 200);
    }
  };

  useEffect(() => {
    if (viewMode !== 'locked') return;
    
    const handleKeyDown = (e) => {
      // If focused inside the text input, let native browser behavior take over. Only intercept Enter/Escape.
      if (document.activeElement?.tagName === 'INPUT') {
        if (e.key === 'Escape') {
          setPasscode('');
        }
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        handleDigitInput(e.key);
      } else if (e.key === 'Backspace') {
        setPasscode(prev => prev.slice(0, -1));
      } else if (e.key === 'Escape') {
        setPasscode('');
      } else if (e.key === 'Enter') {
        handlePasswordSubmit();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [passcode, viewMode]);

  // Automated trigger checks for "0609" and "2026" within the article system's search tab
  useEffect(() => {
    const q = articleSearch.trim().toLowerCase();
    if (q === 'ttt0609') {
      setArticleSearch('');
      handlePasswordSubmit('ttt0609');
    } else if (q === '2026' || q === 'tt0609') {
      setViewModeAndSave('games');
      setArticleSearch('');
    } else if (q === '0609') {
      setViewModeAndSave('locked');
      setArticleSearch('');
    }
  }, [articleSearch]);

  // Global keydown listeners for quick keystroke combinations
  useEffect(() => {
    let sequenceBuffer = '';
    const handleGlobalSequence = (e) => {
      // Avoid intercepting if targeted on search input to let them type fully
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }
      if (e.key >= '0' && e.key <= '9') {
        sequenceBuffer += e.key;
        if (sequenceBuffer.length > 4) {
          sequenceBuffer = sequenceBuffer.slice(-4);
        }
        
        if (sequenceBuffer === '0609') {
          setViewModeAndSave('locked');
          setPasscode('');
          sequenceBuffer = '';
        } else if (sequenceBuffer === '2026') {
          setViewModeAndSave('games');
          setPasscode('');
          sequenceBuffer = '';
        }
      } else if (e.key === 'Escape') {
        sequenceBuffer = '';
      }
    };
    window.addEventListener('keydown', handleGlobalSequence);
    return () => window.removeEventListener('keydown', handleGlobalSequence);
  }, [viewMode]);

  // Global Panic Key Handler
  useEffect(() => {
    let lastZeroTime = 0;
    let lastEscapeTime = 0;
    const handlePanic = (e) => {
      if (e.key === '[' || e.key === ']') {
        e.preventDefault();
        setViewModeAndSave('articles');
        setSelectedGame(null); // Instantly close active game to clear screen
      } else if (e.key === '`' || e.key === '\\') {
        e.preventDefault();
        try {
          window.close();
        } catch (err) {
          console.error(err);
        }
        // Fallback if window.close() is blocked/ignored
        window.location.href = "https://classroom.google.com";
      } else if (e.key === 'Escape') {
        const now = Date.now();
        if (now - lastEscapeTime < 1000) {
          e.preventDefault();
          try {
            window.close();
          } catch (err) {
            console.error(err);
          }
          window.location.href = "https://classroom.google.com";
        } else {
          // If in window fullscreen, exit on single escape
          setWindowFullscreen(curr => {
            if (curr) {
              e.preventDefault();
              return false;
            }
            return curr;
          });
        }
        lastEscapeTime = now;
      }
    };
    window.addEventListener('keydown', handlePanic);
    return () => window.removeEventListener('keydown', handlePanic);
  }, []);

  // Prevent accidental close or refresh only when actively inside a game
  useEffect(() => {
    if (!selectedGame) return;
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ''; // Required for most browsers to show prompt
      return ''; 
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [selectedGame]);

  // Parse filter parameter from query string on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlFilter = params.get('filter');
      if (urlFilter && ['chat', 'lobbychat', 'movies', 'youtube', 'info', 'all'].includes(urlFilter)) {
        setFilter(urlFilter);
        // Ensure games mode is active so the user goes straight to the loaded workspace
        if (viewMode !== 'games') {
          setViewMode('games');
        }
      }
    }
  }, []);

  // Set dynamic browser tab title & favicon based on current section & decoy toggle
  useEffect(() => {
    const setBothTitles = (title) => {
      document.title = title;
      try {
        if (window.parent && window.parent !== window && window.parent.document) {
          window.parent.document.title = title;
        }
      } catch (err) {
        // ignore cross-origin sandbox restrictions
      }
    };

    const updateFavicon = (href) => {
      const applyIcon = (doc, iconUrl) => {
        // Remove ALL existing favicon links to avoid browser caching or conflict issues
        const existingLinks = doc.querySelectorAll("link[rel*='icon']");
        existingLinks.forEach(link => {
          if (link.parentNode) {
            link.parentNode.removeChild(link);
          }
        });

        // Determine correct mime-type
        let typeVal = 'image/png';
        if (iconUrl.includes('.ico')) {
          typeVal = 'image/x-icon';
        } else if (iconUrl.includes('.webp')) {
          typeVal = 'image/webp';
        } else if (iconUrl.includes('image/svg+xml') || iconUrl.startsWith('data:image/svg+xml')) {
          typeVal = 'image/svg+xml';
        }

        // Add standard icon element with cache buster to force immediate update
        const cacheBuster = `?v=${Date.now()}`;
        const finalUrl = iconUrl.includes('?') ? `${iconUrl}&v=${Date.now()}` : `${iconUrl}${cacheBuster}`;

        const newLink = doc.createElement('link');
        newLink.rel = 'icon';
        newLink.type = typeVal;
        newLink.href = finalUrl;
        doc.head.appendChild(newLink);

        // Add shortcut icon element for maximum compatibility
        const shortcutLink = doc.createElement('link');
        shortcutLink.rel = 'shortcut icon';
        shortcutLink.type = typeVal;
        shortcutLink.href = finalUrl;
        doc.head.appendChild(shortcutLink);
      };

      // Current document
      applyIcon(document, href);

      // Parent document
      try {
        if (window.parent && window.parent !== window && window.parent.document) {
          applyIcon(window.parent.document, href);
        }
      } catch (err) {
        // ignore cross-origin sandbox restrictions
      }
    };

    const bookSvgDataUri = "https://ssl.gstatic.com/classroom/favicon.png";

    if (viewMode === 'articles') {
      setBothTitles("StudyTools");
      updateFavicon(bookSvgDataUri);
    } else if (viewMode === 'games') {
      if (decoyType === 'classroom') {
        setBothTitles("Home - Classroom");
        updateFavicon("https://ssl.gstatic.com/classroom/favicon.png");
      } else if (decoyType === 'clever') {
        setBothTitles("Clever | Log in with Clever");
        updateFavicon("https://www.google.com/s2/favicons?sz=64&domain=clever.com");
      } else if (decoyType === 'campus') {
        setBothTitles("Campus Student");
        updateFavicon("https://jerseycitynj.infinitecampus.org/campus/favicon-32x32.png");
      } else if (decoyType === 'docs') {
        setBothTitles("Google Docs");
        updateFavicon("https://ssl.gstatic.com/docs/documents/images/docs-favicon-2026-v2.ico");
      } else if (decoyType === 'gmail') {
        setBothTitles("Inbox - Jersey City Public Schools");
        updateFavicon("https://ssl.gstatic.com/ui/v1/icons/mail/images/favicon_gmail_2026_v2.ico");
      } else {
        setBothTitles("StudyTools");
        updateFavicon(bookSvgDataUri);
      }
    } else {
      // Default to StudyTools for locked/welcome screens
      setBothTitles("StudyTools");
      updateFavicon(bookSvgDataUri);
    }
  }, [viewMode, decoyType]);

  // Set LocalStorage theme and mode on change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-mode', mode);
    safeStorage.setItem('unblocked-theme', theme);
    safeStorage.setItem('unblocked-mode', mode);
  }, [theme, mode]);

  // Set LocalStorage favorites on change
  useEffect(() => {
    safeStorage.setItem('unblocked-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Hide/show chat widget based on lock state
  useEffect(() => {
    document.body.setAttribute('data-locked', isPasscodeUnlocked ? 'false' : 'true');
  }, [isPasscodeUnlocked]);



  // Handle addition/removal of favorites
  const toggleFavorite = (e, gameId) => {
    e.stopPropagation();
    if (favorites.includes(gameId)) {
      setFavorites(favorites.filter(id => id !== gameId));
    } else {
      setFavorites([...favorites, gameId]);
    }
  };

  // Helper method to draw beautiful game art based on game title / id
  const renderGameArt = (game) => {
    const iconSize = 48;
    switch (game.id) {
      case 'neon-breakout':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-neutral-950">
            {/* Ambient cyber grid */}
            <div className="absolute inset-0 opacity-25 overflow-hidden">
              <div className="w-full h-full bg-[linear-gradient(to_bottom,rgba(244,63,94,0.15)_1px,transparent_1px),linear-gradient(to_right,rgba(244,63,94,0.15)_1px,transparent_1px)] bg-[size:14px_14px]" />
            </div>
            {/* Retro ball bounce */}
            <div className="relative flex flex-col items-center gap-2.5 z-10">
              <div className="flex gap-1.5">
                <div className="w-7 h-3.5 bg-rose-500 rounded-sm shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                <div className="w-7 h-3.5 bg-pink-500 rounded-sm shadow-[0_0_8px_rgba(236,72,153,0.8)] animate-pulse" />
                <div className="w-7 h-3.5 bg-purple-500 rounded-sm shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
              </div>
              <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee] animate-bounce my-1.5" />
              <div className="w-16 h-2 bg-cyan-500 rounded-full shadow-[0_0_8px_#06b6d4] translate-x-1" />
            </div>
          </div>
        );
      case 'synthwave-runner':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-[#050512]">
            {/* Sunrise halo */}
            <div className="absolute top-4 w-24 h-24 bg-gradient-to-t from-pink-600 via-orange-500 to-yellow-400 rounded-full opacity-70 filter blur-sm animate-pulse" />
            {/* Horizontal lines */}
            <div className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(to_bottom,rgba(168,85,247,0.25)_1px,transparent_1px)] bg-[size:100%_8px]" />
            {/* Space ship silhouette */}
            <div className="relative z-10 flex flex-col items-center gap-1.5">
              <div className="w-9 h-9 bg-gradient-to-b from-white to-pink-500 rounded-full border-2 border-pink-400 flex items-center justify-center shadow-[0_0_15px_#ec4899] transform -rotate-12 hover:rotate-12 transition-transform duration-300">
                <span className="text-xs">🏎️</span>
              </div>
              <div className="text-[9px] font-mono tracking-widest text-cyan-400 font-black uppercase animate-pulse">SUNSET GRID</div>
            </div>
          </div>
        );
      case 'tron-lightcycle':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-[#02020a]">
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_bottom,#00f0ff_1px,transparent_1px),linear-gradient(to_right,#00f0ff_1px,transparent_1px)] bg-[size:12px_12px]" />
            {/* Cycle line trail with neon glow */}
            <div className="absolute left-6 bottom-12 w-28 h-1 bg-gradient-to-r from-transparent via-[#ff007f] to-[#ff007f] shadow-[0_0_8px_#ff007f]" />
            <div className="absolute left-32 bottom-12 w-1 h-14 bg-gradient-to-b from-[#ff007f] to-[#ff007f] shadow-[0_0_8px_#ff007f]" />
            {/* Lightcycle pod */}
            <div className="absolute left-28 bottom-26 w-8 h-4 bg-cyan-400 rounded-sm border-2 border-white flex items-center justify-center shadow-[0_0_12px_#00f0ff] animate-pulse">
              <span className="text-[10px]">🏍️</span>
            </div>
            <div className="relative z-10 text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase mt-12 bg-neutral-900/80 px-2 py-0.5 rounded border border-cyan-500/20">LIGHTCYCLE GRID</div>
          </div>
        );
      case 'cyber-defenders':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-[#030310]">
            {/* Vaporwave Sun */}
            <div className="absolute -bottom-6 w-28 h-28 bg-gradient-to-t from-pink-500 via-[#ff007f] to-orange-400 rounded-full opacity-60 filter blur-[1px]" />
            {/* Falling alien pixel ships */}
            <div className="absolute top-4 left-6 flex gap-3 animate-pulse">
              <span className="text-sm">👾</span>
              <span className="text-sm text-cyan-400">👾</span>
            </div>
            <div className="absolute top-10 right-8 flex gap-3 animate-pulse duration-1000">
              <span className="text-sm text-yellow-300">👾</span>
              <span className="text-sm">👾</span>
            </div>
            {/* Laser beams */}
            <div className="absolute top-14 left-16 w-0.5 h-6 bg-rose-500 shadow-[0_0_5px_red] animate-bounce" />
            <div className="absolute bottom-10 right-16 w-0.5 h-8 bg-cyan-400 shadow-[0_0_5px_cyan] animate-bounce" />
            {/* Player shooter */}
            <div className="absolute bottom-3 w-8 h-6 bg-gradient-to-t from-cyan-600 to-cyan-300 rounded-t-lg flex items-center justify-center shadow-[0_0_12px_#00f0ff]">
              <span className="text-[10px]">🚀</span>
            </div>
            <div className="relative z-10 text-[9px] font-mono tracking-widest text-[#ff007f] font-black uppercase mt-12 bg-neutral-900/80 px-2.5 py-0.5 rounded border border-pink-500/20">DEFEND CORE</div>
          </div>
        );
      case 1: // Slope
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Grid background effect */}
            <div className="absolute inset-0 opacity-15 overflow-hidden">
              <div className="w-full h-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:16px_16px]" />
              <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-emerald-500/30 to-transparent" />
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-emerald-500/20 blur-md animate-pulse" />
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 border-2 border-white flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)] transform hover:rotate-45 transition-transform duration-500" />
            </div>
            <div className="absolute bottom-3 w-1/2 h-[3px] bg-emerald-400/50 rounded transform rotate-12" />
          </div>
        );
      case 2: // 2048
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="grid grid-cols-2 gap-1 bg-amber-950/20 p-2 rounded">
              <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center text-xs font-black text-black">2</div>
              <div className="w-8 h-8 rounded bg-orange-500 flex items-center justify-center text-xs font-black text-white">0</div>
              <div className="w-8 h-8 rounded bg-yellow-500 flex items-center justify-center text-xs font-black text-white">4</div>
              <div className="w-8 h-8 rounded bg-amber-600 flex items-center justify-center text-xs font-black text-white animate-bounce">8</div>
            </div>
          </div>
        );
      case 3: // Retro Bowl
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute top-2 left-2 text-[10px] font-mono text-blue-400 opacity-60">QUARTERBACK</div>
            <div className="relative w-14 h-8 bg-amber-800 rounded-full border-y-[3px] border-white/60 flex items-center justify-center shadow-lg transform -rotate-12">
              <div className="w-1 h-6 bg-white/80 absolute" />
              <div className="w-3 h-[2px] bg-white translate-x-2 absolute" />
              <div className="w-3 h-[2px] bg-white -translate-x-2 absolute" />
            </div>
          </div>
        );
      case 4: // Flappy Bird
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-y-0 right-6 w-5 h-full flex flex-col justify-between py-2">
              <div className="w-full h-8 bg-green-500 rounded-b border-2 border-white/40" />
              <div className="w-full h-12 bg-green-500 rounded-t border-2 border-white/40" />
            </div>
            <div className="relative w-10 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full border-2 border-white flex items-center justify-center shadow-md animate-bounce">
              <div className="absolute right-1 w-3 h-3 bg-white rounded-full border border-black flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-black rounded-full" />
              </div>
              <div className="absolute left-1 w-3 h-2 bg-orange-500 rounded-lg" />
              <div className="absolute bottom-1 w-4 h-2 bg-white/80 rounded-full border border-black/40 rotate-12" />
            </div>
          </div>
        );
      case 5: // Pacman Retro
        return (
          <div className="relative w-full h-full flex items-center justify-center gap-2">
            <div className="w-10 h-10 bg-yellow-400 rounded-full border-r-4 border-transparent rotate-45 animate-pulse" />
            <div className="w-2 h-2 bg-white rounded-full" />
            <div className="w-2 h-2 bg-white/60 rounded-full" />
            <div className="w-2 h-2 bg-white/30 rounded-full" />
          </div>
        );
      case 6: // Tunnel rush
        return (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <div className="absolute w-24 h-24 border-2 border-dashed border-purple-500/40 rounded-full animate-spin" />
            <div className="absolute w-16 h-16 border border-purple-500/30 rounded-full animate-ping" />
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border border-white" />
          </div>
        );
      case 7: // Chess
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]">
            <div className="border border-white/20 p-1 bg-black/40 rounded flex flex-col gap-0.5">
              <div className="flex gap-0.5">
                <div className="w-4 h-4 bg-white" />
                <div className="w-4 h-4 bg-stone-700" />
              </div>
              <div className="flex gap-0.5">
                <div className="w-4 h-4 bg-stone-700" />
                <div className="w-4 h-4 bg-white" />
              </div>
            </div>
            <div className="absolute text-2xl font-semibold transform hover:scale-110 duration-200">♟️</div>
          </div>
        );
      case 8: // Bubble shooter
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute top-3 flex gap-2">
              <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_8px_cyan]" />
              <div className="w-4 h-4 bg-red-400 rounded-full shadow-[0_0_8px_red]" />
              <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_8px_yellow]" />
            </div>
            <div className="absolute bottom-2 w-2 h-8 bg-zinc-400 rounded-full origin-bottom rotate-45 animate-pulse" />
          </div>
        );
      case 9: // Crossy Road
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-x-0 h-4 bg-neutral-800/80 border-y border-neutral-700" />
            <div className="w-8 h-8 bg-white border border-neutral-300 rounded flex flex-col items-center justify-center transform hover:translate-y-[-6px] transition-transform shadow-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-1" />
              <div className="w-3 h-1.5 bg-yellow-500 rounded-b mt-0.5" />
            </div>
          </div>
        );
      case 10: // Solitaire
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-9 h-14 bg-white border border-neutral-200 rounded-md shadow-md flex flex-col justify-between p-1 text-red-600 transform hover:-translate-y-2 hover:rotate-6 duration-300">
              <span className="text-[9px] font-black leading-none">A</span>
              <span className="text-sm self-center">♥️</span>
              <span className="text-[9px] font-black leading-none self-end scale-y-[-1]">A</span>
            </div>
            <div className="absolute w-9 h-14 bg-red-600 border border-white rounded-md shadow-md flex flex-col justify-between p-1 text-white -translate-x-3 translate-y-1 transform hover:rotate-12 duration-300">
              <div className="w-full h-full border border-white/20 rounded flex items-center justify-center text-xs">✨</div>
            </div>
          </div>
        );
      case 11: // Doodle jump
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute w-8 h-1.5 bg-green-500 rounded bottom-6" />
            <div className="w-8 h-10 bg-lime-400 rounded-t-full border border-green-600 flex flex-col items-center relative animate-bounce shadow">
              <div className="w-4 h-1.5 bg-lime-500 rounded absolute -bottom-1" />
              <div className="flex gap-1 mt-2">
                <div className="w-1.5 h-1.5 bg-black rounded-full" />
                <div className="w-1.5 h-1.5 bg-black rounded-full" />
              </div>
              <div className="w-1.5 h-4 bg-lime-600 rounded-full mt-1" />
            </div>
          </div>
        );
      case 12: // Classroom portal
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="bg-sky-500/10 p-3 rounded-full border border-sky-400/20">
              <MessageSquare className="text-sky-400 w-10 h-10 animate-pulse" />
            </div>
          </div>
        );
      case 13: // Youtube stealth
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-14 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg relative cursor-pointer transform hover:scale-105 duration-200">
              <Play className="fill-white text-white w-5 h-5 ml-0.5" />
            </div>
          </div>
        );
      case 14: // Stealth proxy frame
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="bg-zinc-800 p-3 rounded-lg border-2 border-zinc-700 flex flex-col items-center gap-1 shadow-md">
              <Globe className="text-zinc-300 w-8 h-8 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
          </div>
        );
      case 15: // Sim Life
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="bg-pink-500/10 p-4 rounded-full border border-pink-400/30">
              <Users className="text-pink-400 w-8 h-8 hover:rotate-12 duration-200" />
            </div>
          </div>
        );
      case 16: // Sandbox Island
        return (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 to-amber-950 opacity-40" />
            <div className="relative w-12 h-12 bg-amber-800 rounded-md border-t-[8px] border-emerald-500 shadow-xl flex items-center justify-center font-mono font-bold text-white/50 text-[10px]">
              3D
            </div>
          </div>
        );
      default:
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <Gamepad2 className="text-neutral-400 w-12 h-12" />
          </div>
        );
    }
  };

  const isSinglePlayerCategory = (cat) => {
    if (!cat) return true;
    const c = cat.toLowerCase().trim();
    if (c === 'minecraft' || c === 'emulated' || c === 'other websites') return true;
    return ['solo', 'single', 'platformer', 'skill', 'science', 'driving', 'horror', 'creative', 'ai'].some(kw => c.includes(kw));
  };

  const isMultiplayerCategory = (cat) => {
    if (!cat) return false;
    const c = cat.toLowerCase().trim();
    if (c === 'minecraft' || c === 'random' || c === 'other websites') return true;
    return ['social', 'sport', 'multiplayer', 'fast', 'party', 'puzzle', 'shooter'].some(kw => c.includes(kw)) || c.includes('or');
  };

  // Filter games based on category sidebar, matching search query
  const filteredGames = games.filter(game => {
    if (filter === 'single') {
      if (!isSinglePlayerCategory(game.category)) return false;
    } else if (filter === 'multiplayer') {
      if (!isMultiplayerCategory(game.category)) return false;
    } else if (filter === 'favorites') {
      if (!favorites.includes(game.id)) return false;
    } else if (filter === 'featured') {
      if (!game.featured) return false;
    } else if (filter !== 'all') {
      // Direct category filter matching
      if ((game.category || '').toLowerCase().trim() !== filter.toLowerCase().trim()) return false;
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = (game.title || '').toLowerCase().includes(q);
      const matchDesc = (game.description || '').toLowerCase().includes(q);
      const matchCat = (game.category || '').toLowerCase().includes(q);
      return matchTitle || matchDesc || matchCat;
    }

    return true;
  });



  if (!isPasscodeUnlocked) {
    const filteredArticles = articles.filter(art => {
      const matchesCategory = selectedArticleCategory === 'All' || art.category === selectedArticleCategory;
      if (!matchesCategory) return false;

      const q = articleSearch.toLowerCase().trim();
      if (!q) return true;
      return art.title.toLowerCase().includes(q) || 
             art.content.toLowerCase().includes(q) || 
             art.category.toLowerCase().includes(q);
    });

    const selectedArticle = filteredArticles.find(art => art.id === selectedArticleId) || filteredArticles[0] || articles[0];

    const renderFormattedText = (text) => {
      if (!text) return null;
      
      const lines = text.split('\n');
      const elements = [];
      let i = 0;
      let elementKey = 0;
      
      // Inline formatting helper
      const parseInlineFormatting = (str) => {
        if (!str) return '';
        let cleaned = str
          // Chemical formulas subscripts
          .replace(/CO_2/g, 'CO₂')
          .replace(/H_2O/g, 'H₂O')
          .replace(/\\\text\{([^}]+)\}/g, '$1') // '\text{CO}' -> 'CO'
          .replace(/(\s*)\^(\w+)/g, '<sup>$2</sup>') // superscript like ^+ or ^-
          .replace(/(\s*)\_(\w+)/g, '<sub>$2</sub>') // subscript like _2
          .replace(/\\longrightarrow/g, ' ⟶ ')
          .replace(/\\rightarrow/g, ' → ')
          .replace(/\$\+\/\+\$/g, '➕/➕ (Mutualism)')
          .replace(/\$\+\/0\$/g, '➕/🫙 (Commensalism)')
          .replace(/\$\+\/\-\$/g, '➕/➖ (Parasitism)')
          .replace(/\$/g, ''); // strip any raw dollar signs
          
        // Let's parse bold **bold** and italic *italic* using react elements
        const parts = [];
        let index = 0;
        const regex = /(\*\*|__)(.*?)\1|(\*|_)(.*?)\3/g;
        let match;
        
        while ((match = regex.exec(cleaned)) !== null) {
          if (match.index > index) {
            parts.push(cleaned.substring(index, match.index));
          }
          if (match[1]) {
            parts.push(<strong key={match.index} className="font-extrabold text-[var(--accent-color)]">{match[2]}</strong>);
          } else if (match[3]) {
            parts.push(<em key={match.index} className="italic text-[var(--text-primary)]">{match[4]}</em>);
          }
          index = regex.lastIndex;
        }
        
        if (index < cleaned.length) {
          parts.push(cleaned.substring(index));
        }
        
        return parts.length > 0 ? parts : cleaned;
      };
      
      const formatEquationToHtml = (eq) => {
        let formatted = eq.trim();
        
        if (formatted.includes('Atom')) {
          return (
            <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2.5 text-xs text-[var(--text-primary)] font-mono tracking-tight py-2 w-full">
              <span className="font-semibold px-2 py-1 bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)] hover:border-[var(--accent-color)] transition-colors">Atom</span> 
              <span className="text-[var(--accent-color)] text-sm">⟶</span>
              <span className="font-semibold px-2 py-1 bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)] hover:border-[var(--accent-color)] transition-colors">Molecule</span> 
              <span className="text-[var(--accent-color)] text-sm">⟶</span>
              <span className="font-semibold px-2 py-1 bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)] hover:border-[var(--accent-color)] transition-colors">Organelle</span> 
              <span className="text-[var(--accent-color)] text-sm">⟶</span>
              <span className="font-semibold px-2 py-1 bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)] hover:border-[var(--accent-color)] transition-colors">Cell</span> 
              <span className="text-[var(--accent-color)] text-sm">⟶</span>
              <span className="font-semibold px-2 py-1 bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)] hover:border-[var(--accent-color)] transition-colors">Tissue</span> 
              <span className="text-[var(--accent-color)] text-sm">⟶</span>
              <span className="font-semibold px-2 py-1 bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)] hover:border-[var(--accent-color)] transition-colors">Organ</span> 
              <span className="text-[var(--accent-color)] text-sm">⟶</span>
              <span className="font-semibold px-2 py-1 bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)] hover:border-[var(--accent-color)] transition-colors">Organ System</span> 
              <span className="text-[var(--accent-color)] text-sm">⟶</span>
              <span className="font-extrabold text-[var(--accent-color)] bg-[var(--accent-color)]/15 px-3 py-1 rounded-xl border border-[var(--accent-color)] shadow-sm animate-pulse">Organism</span>
            </div>
          );
        }
        
        if (formatted.includes('Photosynthesis') || (formatted.includes('6CO') && formatted.includes('Solar'))) {
          return (
            <div className="text-center font-bold text-xs flex flex-wrap items-center justify-center gap-1.5 leading-relaxed py-2 select-text w-full">
              <span className="text-[var(--text-primary)] font-semibold">Carbon Dioxide</span>
              <span className="text-[var(--text-muted)] font-mono text-[10px] bg-black/10 px-1 rounded">(6CO₂)</span>
              <span className="text-[var(--accent-color)] mx-0.5 font-mono">+</span>
              <span className="text-[var(--text-primary)] font-semibold">Water</span>
              <span className="text-[var(--text-muted)] font-mono text-[10px] bg-black/10 px-1 rounded">(6H₂O)</span>
              <span className="text-[var(--accent-color)] mx-0.5 font-mono">+</span>
              <span className="text-yellow-500 font-semibold flex items-center gap-0.5 bg-yellow-500/10 px-1.5 py-0.5 rounded border border-yellow-500/20 text-[10px]"><span className="animate-pulse">☀️</span> Solar Light</span>
              <span className="text-[var(--accent-color)] text-sm mx-1">⟶</span>
              <span className="text-[var(--text-primary)] font-semibold">Glucose</span>
              <span className="text-[var(--text-muted)] font-mono text-[10px] bg-black/10 px-1 rounded">(C₆H₁₂O₆)</span>
              <span className="text-[var(--accent-color)] mx-0.5 font-mono">+</span>
              <span className="text-[var(--text-primary)] font-semibold">Oxygen</span>
              <span className="text-[var(--text-muted)] font-mono text-[10px] bg-black/10 px-1 rounded">(6O₂)</span>
            </div>
          );
        }
        
        if (formatted.includes('Respiration') || formatted.includes('ATP') || (formatted.includes('6CO') && formatted.includes('Oxygen'))) {
          return (
            <div className="text-center font-bold text-xs flex flex-wrap items-center justify-center gap-1.5 leading-relaxed py-2 select-text w-full">
              <span className="text-[var(--text-primary)] font-semibold">Glucose</span>
              <span className="text-[var(--text-muted)] font-mono text-[10px] bg-black/10 px-1 rounded">(C₆H₁₂O₆)</span>
              <span className="text-[var(--accent-color)] mx-0.5 font-mono">+</span>
              <span className="text-[var(--text-primary)] font-semibold">Oxygen</span>
              <span className="text-[var(--text-muted)] font-mono text-[10px] bg-black/10 px-1 rounded">(6O₂)</span>
              <span className="text-[var(--accent-color)] text-sm mx-1">⟶</span>
              <span className="text-[var(--text-primary)] font-semibold">Carbon Dioxide</span>
              <span className="text-[var(--text-muted)] font-mono text-[10px] bg-black/10 px-1 rounded">(6CO₂)</span>
              <span className="text-[var(--accent-color)] mx-0.5 font-mono">+</span>
              <span className="text-[var(--text-primary)] font-semibold">Water</span>
              <span className="text-[var(--text-muted)] font-mono text-[10px] bg-black/10 px-1 rounded">(6H₂O)</span>
              <span className="text-[var(--accent-color)] mx-0.5 font-mono">+</span>
              <span className="text-emerald-500 font-bold flex items-center gap-0.5 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 text-[10px] animate-pulse">⚡ ATP Energy</span>
            </div>
          );
        }

        return <span>{formatted}</span>;
      };

      while (i < lines.length) {
        const line = lines[i];
        const trimmed = line.trim();
        
        // 1. Equations (Centered math block)
        if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
          const content = trimmed.substring(2, trimmed.length - 2);
          elements.push(
            <div key={elementKey++} className="bg-[var(--bg-primary)] border border-[var(--accent-color)]/20 p-4 rounded-xl text-center my-4 shadow-sm text-[var(--accent-color)] flex items-center justify-center overflow-x-auto select-all">
              {formatEquationToHtml(content)}
            </div>
          );
          i++;
          continue;
        }
        
        // 2. Custom block code (e.g., Birthday card layout block)
        if (trimmed.startsWith('```') || trimmed.startsWith('`\\`\\`')) {
          let codeBlockLines = [];
          i++; // skip initial tag
          while (i < lines.length && !lines[i].trim().startsWith('```') && !lines[i].trim().startsWith('`\\`\\`')) {
            codeBlockLines.push(lines[i]);
            i++;
          }
          elements.push(
            <pre key={elementKey++} className="bg-black/40 border border-[var(--card-border)] p-4.5 rounded-xl text-[10.5px] font-mono text-[var(--text-primary)] whitespace-pre-wrap leading-normal shadow-inner my-3 select-all">
              {codeBlockLines.join('\n')}
            </pre>
          );
          i++; // skip final tag
          continue;
        }

        // 3. Simple blockquotes / horizontal separators
        if (trimmed.startsWith('---')) {
          elements.push(<hr key={elementKey++} className="border-t border-[var(--card-border)] my-5" />);
          i++;
          continue;
        }

        // 4. Tables parsing
        if (trimmed.startsWith('|')) {
          const headerRow = trimmed;
          let tableLines = [headerRow];
          i++;
          
          // Gather consecutive table rows
          while (i < lines.length && lines[i].trim().startsWith('|')) {
            tableLines.push(lines[i]);
            i++;
          }
          
          // Process Table Rows
          const filteredRows = tableLines.filter(r => !r.includes('| :---') && !r.includes('|---|') && !r.includes('| :--- |'));
          
          const parseColumns = (rowText) => {
            return rowText.split('|').slice(1, -1).map(col => col.trim());
          };

          if (filteredRows.length > 0) {
            const headers = parseColumns(filteredRows[0]);
            const bodyRows = filteredRows.slice(1).map(r => parseColumns(r));
            
            elements.push(
              <div key={elementKey++} className="my-4.5 overflow-x-auto rounded-xl border border-[var(--card-border)] bg-[var(--bg-primary)]/40 shadow-sm">
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-[var(--bg-secondary)] border-b border-[var(--card-border)]">
                      {headers.map((h, hIdx) => (
                        <th key={hIdx} className="p-3.5 font-bold text-[var(--text-primary)] font-mono uppercase tracking-wider text-[9px] border-r border-[var(--card-border)] last:border-r-0">
                          {parseInlineFormatting(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bodyRows.map((row, rIdx) => (
                      <tr key={rIdx} className="border-b last:border-b-0 border-[var(--card-border)] hover:bg-[var(--accent-color)]/5 transition-colors duration-150 odd:bg-black/[0.02] even:bg-transparent">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-3 text-[var(--text-muted)] border-r border-[var(--card-border)] last:border-r-0 leading-relaxed font-sans font-medium">
                            {parseInlineFormatting(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          continue;
        }

        // 5. Headings (### H3)
        if (trimmed.startsWith('###')) {
          const hText = trimmed.replace(/^###\s*/, '');
          elements.push(
            <h4 key={elementKey++} className="text-xs font-bold font-mono tracking-tight text-[var(--text-primary)] border-l-2 border-[var(--accent-color)] pl-2.5 mt-5 mb-2 flex items-center gap-1.5 uppercase">
              {parseInlineFormatting(hText)}
            </h4>
          );
          i++;
          continue;
        }

        // 6. Bold Headers inside content e.g. "#### Header" or "**Header:**" or "Header:" followed by line bullet tags
        if (trimmed.startsWith('####')) {
          const hText = trimmed.replace(/^####\s*/, '');
          elements.push(
            <h5 key={elementKey++} className="text-[11px] font-extrabold font-mono tracking-tight text-[var(--text-primary)] mt-3 mb-1 text-[var(--accent-color)]">
              {parseInlineFormatting(hText)}
            </h5>
          );
          i++;
          continue;
        }

        // 7. Standard Lists starting with '*' or '-' or '●'
        if (trimmed.startsWith('*') || trimmed.startsWith('-') || trimmed.startsWith('●') || trimmed.startsWith('○')) {
          let cleanItem = trimmed.replace(/^(\*|-|●|○)\s*/, '');
          // Identify if it's high indentation (sub-list)
          const isNested = line.startsWith('  ') || line.startsWith('\t') || trimmed.startsWith('○');
          elements.push(
            <div key={elementKey++} className={`flex items-start gap-2 text-[11px] text-[var(--text-muted)] leading-relaxed mb-1.5 ${isNested ? 'ml-6' : 'ml-2'}`}>
              <span className={`flex-shrink-0 text-[10px] mt-0.5 select-none ${isNested ? 'text-[var(--text-muted)]/50 font-mono' : 'text-[var(--accent-color)]'}`}>
                {isNested ? '○' : '◼'}
              </span>
              <span className="font-medium font-sans">{parseInlineFormatting(cleanItem)}</span>
            </div>
          );
          i++;
          continue;
        }

        // 8. Ordered Lists (e.g., 1. Item)
        if (trimmed.match(/^\d+\./)) {
          const itemNum = trimmed.match(/^(\d+)\./)[1];
          const cleanItem = trimmed.replace(/^\d+\.\s*/, '');
          elements.push(
            <div key={elementKey++} className="flex items-start gap-2.5 text-[11px] text-[var(--text-muted)] leading-relaxed ml-2 mb-1.5">
              <span className="font-mono text-[9px] font-bold text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-1.5 py-0.5 rounded border border-[var(--accent-color)]/20 flex-shrink-0 mt-0.5 min-w-[20px] text-center">
                {itemNum}
              </span>
              <span className="font-medium font-sans">{parseInlineFormatting(cleanItem)}</span>
            </div>
          );
          i++;
          continue;
        }

        // 9. Standard paragraphs
        if (trimmed === '') {
          elements.push(<div key={elementKey++} className="h-2" />);
        } else {
          elements.push(
            <p key={elementKey++} className="text-[11px] text-[var(--text-muted)] leading-relaxed mb-3 font-medium font-sans">
              {parseInlineFormatting(trimmed)}
            </p>
          );
        }
        
        i++;
      }
      
      return <div className="space-y-1.5">{elements}</div>;
    };

    if (viewMode === 'articles') {
      return (
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)] flex flex-col p-4 md:p-6 transition-colors duration-300 relative select-text">
          
          {/* Decoy Legitimate Educational Header */}
          <header className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center pb-4 mb-4 border-b border-[var(--card-border)] gap-4 select-none">
            <div 
              onClick={() => { setActiveEduTab('articles'); setArticleSearch(''); }}
              className="flex items-center gap-3 cursor-pointer active:scale-98 transition-transform self-stretch sm:self-auto"
              title="StudyTools Home"
            >
              <div className="p-2 bg-[var(--accent-color)] text-[var(--bg-color)] rounded-xl shadow-[0_2px_8.5px_var(--accent-shadow)] border border-[var(--card-border)]">
                <School className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight text-[var(--text-primary)] sm:text-base">
                  StudyTools <span className="text-[9px] font-mono border border-[var(--accent-color)] bg-[var(--accent-color)]/10 text-[var(--accent-color)] px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">Academic Base</span>
                </h1>
              </div>
            </div>

            {/* HIGHLY ACCESSIBLE PRIMARY TAB SWITCHER */}
            <div className="flex items-center gap-1 bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-full p-1 shadow-sm select-none max-w-full overflow-x-auto scrollbar-none">
              {[
                { id: 'articles', label: 'Syllabus Articles', icon: BookOpen },
                { id: 'flashcards', label: 'Study Flashcards', icon: Layers },
                { id: 'quiz', label: 'Practice Quizzes', icon: Gamepad2 },
                { id: 'grammar', label: 'Grammar Scanner', icon: FileText }
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isSelected = activeEduTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveEduTab(tab.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-[var(--accent-color)] text-[var(--bg-color)] font-bold shadow-sm'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    <span className="leading-none">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-start">
              {/* Light/Dark Toggle */}
              <div className="flex items-center gap-2 border border-[var(--card-border)] bg-[var(--bg-secondary)] py-1.5 px-2.5 rounded-full shadow-sm">
                <div 
                  onClick={() => setMode(prev => prev === 'light' ? 'dark' : 'light')}
                  className="relative w-[50px] h-6 bg-[var(--input-fill)] border border-[var(--card-border)] rounded-full cursor-pointer flex items-center p-0.5 transition-all duration-300"
                >
                  <div 
                    className={`w-5 h-5 rounded-full bg-[var(--accent-color)] transition-all flex items-center justify-center text-[10px] transform ${
                      mode === 'dark' ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  >
                    {mode === 'dark' ? '🌙' : '☀️'}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Actual Articles Hub Grid (Occupies full-screen width) */}
          <div className="w-full max-w-7xl mx-auto bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl p-5 md:p-6 shadow-2xl transition-all flex flex-col gap-4 flex-1 md:h-[650px] overflow-hidden">
            
            {activeEduTab === 'articles' && (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-1 min-h-0 overflow-hidden">
                {/* Left Column - Articles selection */}
                <div className="md:col-span-2 flex flex-col gap-3 overflow-hidden h-full">
                  
                  {/* Subject Specific Sections */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 flex-shrink-0 scrollbar-none select-none">
                    {['All', 'Science', 'Mathematics', 'ELA', 'Social Studies', 'Italian'].map((cat) => {
                      const isSelected = selectedArticleCategory === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedArticleCategory(cat);
                            const firstInCat = articles.find(art => cat === 'All' || art.category === cat);
                            if (firstInCat) {
                              setSelectedArticleId(firstInCat.id);
                            }
                          }}
                          className={`px-3 py-1.5 rounded-xl text-[10px] font-mono border font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-98 ${
                            isSelected
                              ? 'bg-[var(--accent-color)] text-[var(--bg-color)] border-[var(--accent-color)] shadow-[0_2px_8px_var(--accent-shadow)]'
                              : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] border-[var(--card-border)] hover:border-[var(--text-muted)]/50 hover:text-[var(--text-primary)]'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>

                  <div className="relative flex-shrink-0">
                    <input
                      type="text"
                      placeholder="Search curriculum papers..."
                      value={articleSearch}
                      onChange={(e) => setArticleSearch(e.target.value)}
                      className="w-full text-xs rounded-xl py-1.5 pl-8 pr-3 border border-[var(--card-border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-color)] placeholder:opacity-50 transition-all font-mono"
                    />
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[var(--text-muted)]" />
                  </div>

                  {/* Feed list */}
                  <div className="flex-1 flex flex-col gap-2 overflow-y-auto py-0.5 scrollbar-thin">
                    {filteredArticles.length === 0 ? (
                      <div className="text-center py-4 text-xs text-[var(--text-muted)] font-mono select-none">
                        No matching resource files available
                      </div>
                    ) : (
                      filteredArticles.map((art) => {
                        const isSelected = art.id === selectedArticleId;
                        return (
                          <div
                            key={art.id}
                            onClick={() => setSelectedArticleId(art.id)}
                            className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-[var(--accent-color)]/10 border-[var(--accent-color)] shadow-sm scale-[1.01]'
                                : 'bg-[var(--bg-secondary)] border-[var(--card-border)] hover:border-[var(--text-muted)]/40'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1 mb-0.5 flex-wrap">
                              <span className="text-[8px] font-bold font-mono tracking-wider px-1.5 py-0.5 rounded bg-[var(--input-fill)] text-[var(--accent-color)] uppercase">
                                {art.category}
                              </span>
                              <span className="text-[8px] text-[var(--text-muted)] font-mono">
                                {art.readTime}
                              </span>
                            </div>
                            <h4 className="text-[11px] font-bold leading-snug text-[var(--text-primary)] line-clamp-1">
                              {art.title}
                            </h4>
                            <p className="text-[9px] text-[var(--text-muted)] mt-0.5 font-mono">
                              {art.date}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Right Column - Deep Active Article view */}
                <div className="md:col-span-3 flex flex-col bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-2xl overflow-hidden h-full">
                  {selectedArticle ? (
                    <div className="flex flex-col h-full overflow-hidden text-left justify-between">
                      
                      {/* Title Bar details */}
                      <div className="p-4 border-b border-[var(--card-border)] bg-[var(--card-bg)] flex-shrink-0 flex justify-between items-center gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--accent-color)] uppercase tracking-wider border border-[var(--card-border)]">
                              {selectedArticle.category}
                            </span>
                            <span className="text-[9px] text-[var(--text-muted)] font-mono bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded border border-[var(--card-border)]">
                              {selectedArticle.readTime}
                            </span>
                          </div>
                          <h3 className="text-sm font-extrabold text-[var(--text-primary)] leading-snug line-clamp-1">
                            {selectedArticle.title}
                          </h3>
                        </div>

                        {/* Interactive prompt linkages */}
                        <div className="flex items-center gap-1.5 shrink-0 select-none">
                          <button
                            type="button"
                            onClick={() => setActiveEduTab('flashcards')}
                            className="bg-[var(--accent-color)]/10 text-[var(--accent-color)] hover:bg-[var(--accent-color)] hover:text-[var(--bg-color)] font-mono text-[9px] font-bold px-2 py-1.5 rounded-xl border border-[var(--accent-color)] flex items-center gap-1 transition-all cursor-pointer"
                            title="Interactive Flashcards deck for this syllabus article"
                          >
                            <Layers className="w-3.5 h-3.5" />
                            <span>STUDY TERMS</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveEduTab('quiz')}
                            className="bg-[var(--accent-color)]/10 text-[var(--accent-color)] hover:bg-[var(--accent-color)] hover:text-[var(--bg-color)] font-mono text-[9px] font-bold px-2 py-1.5 rounded-xl border border-[var(--accent-color)] flex items-center gap-1 transition-all cursor-pointer"
                            title="Generate Quiz based on this syllabus"
                          >
                            <Gamepad2 className="w-3.5 h-3.5" />
                            <span>TAKE TEST</span>
                          </button>
                        </div>
                      </div>

                      <div className="p-4 overflow-y-auto text-left flex-1 min-h-0 scrollbar-thin">
                        {renderFormattedText(selectedArticle.content)}
                      </div>

                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-[var(--text-muted)] font-mono">
                      Select a core paper assignment to read content
                    </div>
                  )}
                </div>

              </div>
            )}

            {activeEduTab === 'flashcards' && (
              <FlashcardsWorkspace 
                refArticle={selectedArticle} 
                onGeneratedSuccess={(targetTab) => setActiveEduTab(targetTab)} 
              />
            )}

            {activeEduTab === 'quiz' && (
              <QuizWorkspace 
                refArticle={selectedArticle} 
                onGeneratedSuccess={(targetTab) => setActiveEduTab(targetTab)} 
              />
            )}

            {activeEduTab === 'grammar' && (
              <GrammarCheckerWorkspace />
            )}

          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)] flex flex-col xl:flex-row items-center xl:items-center justify-center p-4 md:p-8 xl:p-12 gap-8 md:gap-10 transition-colors duration-350 relative select-none">
        
        {/* Floating Controls inside Lock Screen */}
        <div className="absolute top-4 right-4 flex items-center gap-3">
          
          {/* Light/Dark Slider */}
          <div className="flex items-center gap-2 border border-[var(--card-border)] bg-[var(--bg-secondary)] py-1.5 px-2.5 rounded-full shadow-sm">
            <div 
              onClick={() => setMode(prev => prev === 'light' ? 'dark' : 'light')}
              className="relative w-[50px] h-6 bg-[var(--input-fill)] border border-[var(--card-border)] rounded-full cursor-pointer flex items-center p-0.5 select-none transition-all duration-300"
              title="Toggle Light/Dark Theme Mode"
            >
              <div 
                className={`w-5 h-5 rounded-full bg-[var(--accent-color)] shadow-md transition-all duration-350 ease-out flex items-center justify-center text-[10px] transform ${
                  mode === 'dark' ? 'translate-x-6' : 'translate-x-0'
                }`}
              >
                {mode === 'dark' ? '🌙' : '☀️'}
              </div>
            </div>
          </div>

          {/* Theme custom capsule */}
          <div className="border border-[var(--card-border)] bg-[var(--bg-secondary)] px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
            <div className="flex items-center gap-1.5">
              {[
                { key: 'cyborg', color: 'bg-green-500 border-green-300 shadow-[0_0_5px_green]', tooltip: 'Cyborg Theme' },
                { key: 'sunset', color: 'bg-amber-500 border-amber-300', tooltip: 'Sunset Theme' },
                { key: 'midnight', color: 'bg-indigo-600 border-indigo-400', tooltip: 'Midnight Theme' },
                { key: 'forest', color: 'bg-emerald-500 border-emerald-300', tooltip: 'Forest Theme' },
                { key: 'violet', color: 'bg-indigo-600 border-indigo-400', tooltip: 'Violet Theme' },
                { key: 'ice', color: 'bg-sky-400 border-sky-300', tooltip: 'Glacier Theme' },
                { key: 'rose-pine', color: 'bg-rose-300 border-rose-200', tooltip: 'Rose Pine Theme' },
                { key: 'none', color: 'bg-gradient-to-br from-neutral-300 to-neutral-700 border-neutral-400', tooltip: 'No Theme (Monochrome)' }
              ].map((themeOpt) => (
                <button
                  key={themeOpt.key}
                  title={themeOpt.tooltip}
                  onClick={() => setTheme(themeOpt.key)}
                  className={`w-3.5 h-3.5 rounded-full ${themeOpt.color} border transition-all duration-200 hover:scale-130 cursor-pointer ${
                    theme === themeOpt.key ? 'ring-2 ring-offset-2 ring-[var(--accent-color)]' : 'opacity-80'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Lock Card Content Container */}
        <div className={`w-full max-w-sm bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl p-6 md:p-8 shadow-2xl transition-all duration-300 flex flex-col items-center gap-6 flex-shrink-0 ${isShake ? 'animate-shake' : ''}`}>
          
          <div className="text-center">
            <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">Portal Secured</h2>
            <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed">This is a paid Science, Math, ELA, and Social Studies article website. Please enter a correct password to continue to the website.</p>
          </div>

          {/* Alphanumeric Text/Passcode Input Field */}
          <div className="w-full flex flex-col gap-2.5">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter password..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handlePasswordSubmit();
                  }
                }}
                className="w-full px-4 py-2.5 border border-[var(--card-border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] text-center text-sm font-bold font-mono tracking-widest rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] placeholder:text-[10px] placeholder:font-sans placeholder:tracking-normal outline-none transition-all placeholder:opacity-60"
                autoFocus
              />
              {passcode.length > 0 && (
                <button 
                  type="button"
                  onClick={() => setPasscode('')}
                  className="absolute right-3.5 top-3 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] font-bold cursor-pointer"
                  title="Clear input"
                >
                  ✕
                </button>
              )}
            </div>
            
            <button
              type="button"
              onClick={() => handlePasswordSubmit()}
              className="w-full text-xs font-mono font-bold bg-[var(--accent-color)] text-[var(--bg-color)] py-2.5 rounded-xl hover:opacity-95 active:scale-98 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>SUBMIT PASSWORD</span>
            </button>
          </div>

          {/* Indicators for passcode digits */}
          {(!passcode || (!isNaN(passcode) && passcode.length <= 4)) && (
            <div className="flex justify-center gap-4 py-1">
              {[0, 1, 2, 3].map((index) => {
                const isFilled = passcode.length > index;
                return (
                  <div 
                    key={index}
                    className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-150 transform ${
                      isFilled 
                        ? 'bg-[var(--accent-color)] border-[var(--accent-color)] scale-110 shadow-[0_0_8px_var(--accent-shadow)]' 
                        : 'border-[var(--card-border)] bg-[var(--bg-secondary)]'
                    }`}
                  />
                );
              })}
            </div>
          )}

          {/* Secure Pad Grid */}
          <div className="grid grid-cols-3 gap-3.5 w-full max-w-[245px] mt-2">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
              <button
                key={num}
                onClick={() => handleDigitInput(num)}
                className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold border border-[var(--card-border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--accent-color)] hover:text-[var(--bg-color)] hover:border-[var(--accent-color)] active:scale-95 hover:scale-105 transition-all duration-150 cursor-pointer shadow-sm mx-auto"
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => setPasscode('')}
              className="w-14 h-14 rounded-full flex items-center justify-center text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--card-border)] hover:bg-[var(--bg-secondary)] active:scale-90 transition-all duration-150 cursor-pointer mx-auto"
            >
              Clear
            </button>
            <button
              onClick={() => handleDigitInput('0')}
              className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold border border-[var(--card-border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--accent-color)] hover:text-[var(--bg-color)] hover:border-[var(--accent-color)] active:scale-95 hover:scale-105 transition-all duration-150 cursor-pointer shadow-sm mx-auto"
            >
              0
            </button>
            <button
              onClick={() => setPasscode(prev => prev.slice(0, -1))}
              className="w-14 h-14 rounded-full flex items-center justify-center text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--card-border)] hover:bg-[var(--bg-secondary)] active:scale-90 transition-all duration-150 cursor-pointer mx-auto"
            >
              Del
            </button>
          </div>

          {errorCount > 0 && (
            <span className="text-[10.5px] text-red-500 font-medium font-mono animate-bounce mt-1">
              Access Denied! Attempt #{errorCount}
            </span>
          )}

        </div>

        {/* ==================== ARTICLES SECTION ==================== */}
        <div className="w-full max-w-4xl bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl p-5 md:p-6 shadow-2xl transition-all duration-300 flex flex-col gap-4 select-text max-h-[90vh] md:h-[600px] overflow-hidden">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--card-border)]">
            <div>
              <h3 className="text-lg font-extrabold tracking-tight text-[var(--text-primary)] flex items-center gap-2">
                <img src="https://ssl.gstatic.com/classroom/favicon.png" className="w-5 h-5 object-contain" alt="Classroom Logo" referrerPolicy="no-referrer" />
                Examples of some articles
              </h3>
            </div>
            <div className="flex items-center gap-1.5 self-start sm:self-auto uppercase tracking-wider text-[10px] font-mono bg-[var(--bg-secondary)] py-1 px-2 rounded-md border border-[var(--card-border)] text-[var(--accent-color)]">
              <span>Educational examples</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-1 min-h-0 overflow-hidden">
            {/* Left lists & creator pane (cols 2) */}
            <div className="md:col-span-2 flex flex-col gap-3 overflow-hidden h-full">
              
              {/* Subject Specific Sections */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 flex-shrink-0 scrollbar-none select-none">
                {['All', 'Science', 'Mathematics', 'ELA', 'Social Studies', 'Italian'].map((cat) => {
                  const isSelected = selectedArticleCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedArticleCategory(cat);
                        const firstInCat = articles.find(art => cat === 'All' || art.category === cat);
                        if (firstInCat) {
                          setSelectedArticleId(firstInCat.id);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-mono border font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-98 ${
                        isSelected
                          ? 'bg-[var(--accent-color)] text-[var(--bg-color)] border-[var(--accent-color)] shadow-[0_2px_8px_var(--accent-shadow)]'
                          : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] border-[var(--card-border)] hover:border-[var(--text-muted)]/50 hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Internal search inside articles */}
              <div className="relative flex-shrink-0">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={articleSearch}
                  onChange={(e) => setArticleSearch(e.target.value)}
                  className="w-full text-xs rounded-xl py-1.5 pl-8 pr-3 border border-[var(--card-border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-color)] placeholder:opacity-50 transition-all font-mono"
                />
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[var(--text-muted)]" />
              </div>

              {/* Feed items */}
              <div className="flex-1 flex flex-col gap-2 overflow-y-auto py-0.5 scrollbar-thin">
                {filteredArticles.length === 0 ? (
                  <div className="text-center py-4 text-xs text-[var(--text-muted)] font-mono">
                    No articles found matching query
                  </div>
                ) : (
                  filteredArticles.map((art) => {
                    const isSelected = art.id === selectedArticleId;
                    return (
                      <div
                        key={art.id}
                        onClick={() => setSelectedArticleId(art.id)}
                        className={`p-2 md:p-2.5 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'bg-[var(--accent-color)]/10 border-[var(--accent-color)] shadow-sm scale-[1.01]'
                            : 'bg-[var(--bg-secondary)] border-[var(--card-border)] hover:border-[var(--text-muted)]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-0.5 flex-wrap">
                          <span className="text-[8px] font-bold font-mono tracking-wider px-1.5 py-0.5 rounded bg-[var(--input-fill)] text-[var(--accent-color)] uppercase">
                            {art.category}
                          </span>
                          <span className="text-[8px] text-[var(--text-muted)] font-mono">
                            {art.readTime}
                          </span>
                        </div>
                        <h4 className="text-[11px] font-bold leading-snug text-[var(--text-primary)] line-clamp-1">
                          {art.title}
                        </h4>
                        <p className="text-[9px] text-[var(--text-muted)] mt-0.5 font-mono">
                          {art.date}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>

            </div>

            {/* Right expanded active details reader card (cols 3) */}
            <div className="md:col-span-3 flex flex-col bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-2xl overflow-hidden h-[300px] md:h-full">
              {selectedArticle ? (
                <div className="flex flex-col h-full overflow-hidden">
                  {/* Article banner */}
                  <div className="p-4 border-b border-[var(--card-border)] bg-[var(--card-bg)] flex-shrink-0">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--accent-color)] uppercase tracking-wider border border-[var(--card-border)]">
                        {selectedArticle.category}
                      </span>
                      <span className="text-[9px] text-[var(--text-muted)] font-mono bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded border border-[var(--card-border)]">
                        {selectedArticle.readTime}
                      </span>
                    </div>
                    <h3 className="text-sm font-extrabold text-[var(--text-primary)] leading-snug">
                      {selectedArticle.title}
                    </h3>
                    <p className="text-[10px] text-[var(--text-muted)] mt-1 font-mono">
                      {selectedArticle.subtitle} • {selectedArticle.date}
                    </p>
                  </div>

                  {/* Article body */}
                  <div className="p-4 overflow-y-auto text-left flex-1 min-h-0 scrollbar-thin">
                    {renderFormattedText(selectedArticle.content)}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-xs text-[var(--text-muted)] font-mono">
                  Select an article to begin reading
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    );
  }



  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* HEADER */}
      {headerOpen ? (
        <nav className="border-b border-[var(--card-border)] bg-[var(--header-bg)] py-3.5 px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 transition-colors duration-300 sticky top-0 z-50 shadow-sm animate-fade-in">
        
        {/* Left Side: Logo & Title */}
        <div 
          onClick={() => { setFilter('all'); setSelectedGame(null); setSearchQuery(''); }}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          title="Go to homepage"
        >
          <div className="p-1.5 bg-[var(--accent-color)] text-[var(--bg-color)] rounded-lg border border-[var(--card-border)] shadow-md group-hover:rotate-12 transition-all duration-300 transform">
            <School className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter text-[var(--text-primary)] leading-none group-hover:text-[var(--accent-color)] transition-colors">
              StudyTools
            </h1>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 self-stretch sm:self-auto justify-between sm:justify-end">
          
          {/* Workspaces Group */}
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Movies Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setFilter(filter === 'movies' ? 'all' : 'movies'); setSelectedGame(null); }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-all duration-200 ${
                filter === 'movies'
                  ? 'bg-[var(--accent-color)] text-[var(--bg-color)] border-[var(--accent-color)] shadow-[0_2px_8px_var(--accent-shadow)]'
                  : 'bg-[var(--card-bg)] text-[var(--text-primary)] border-[var(--card-border)] hover:border-[var(--accent-color)]/50 hover:text-[var(--accent-color)]'
              }`}
              title="Movies Workspace"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Movies</span>
            </motion.button>

            {/* Lobby Chat Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setFilter(filter === 'lobbychat' ? 'all' : 'lobbychat'); setSelectedGame(null); }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-all duration-200 ${
                filter === 'lobbychat'
                  ? 'bg-[var(--accent-color)] text-[var(--bg-color)] border-[var(--accent-color)] shadow-[0_2px_8px_var(--accent-shadow)] font-bold'
                  : 'bg-[var(--card-bg)] text-[var(--text-primary)] border-[var(--card-border)] hover:border-[var(--accent-color)]/50 hover:text-[var(--accent-color)]'
              }`}
              title="Lobby Chat"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Lobby Chat</span>
            </motion.button>

            {/* Proxy Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setFilter(filter === 'proxy' ? 'all' : 'proxy'); setSelectedGame(null); }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-all duration-200 ${
                filter === 'proxy'
                  ? 'bg-[var(--accent-color)] text-[var(--bg-color)] border-[var(--accent-color)] shadow-[0_2px_8px_var(--accent-shadow)] font-bold'
                  : 'bg-[var(--card-bg)] text-[var(--text-primary)] border-[var(--card-border)] hover:border-[var(--accent-color)]/50 hover:text-[var(--accent-color)]'
              }`}
              title="Proxy"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Proxy</span>
            </motion.button>

            {/* Cloak Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const win = window.open("about:blank", "_blank");
                if (!win) { alert("Popup blocked!"); return; }
                const searchParams = new URLSearchParams(window.location.search);
                searchParams.set('decoyType', decoyType);
                const iframeSrc = `${window.location.origin}${window.location.pathname}?${searchParams.toString()}${window.location.hash}`;
                let parentTitle = "StudyTools";
                let parentFavicon = "https://ssl.gstatic.com/classroom/favicon.png";
                
                if (decoyType === 'classroom') {
                  parentTitle = "Home - Classroom";
                  parentFavicon = "https://ssl.gstatic.com/classroom/favicon.png";
                } else if (decoyType === 'clever') {
                  parentTitle = "Clever | Log in with Clever";
                  parentFavicon = "https://www.google.com/s2/favicons?sz=64&domain=clever.com";
                } else if (decoyType === 'campus') {
                  parentTitle = "Campus Student";
                  parentFavicon = "https://jerseycitynj.infinitecampus.org/campus/favicon-32x32.png";
                } else if (decoyType === 'docs') {
                  parentTitle = "Google Docs";
                  parentFavicon = "https://ssl.gstatic.com/docs/documents/images/docs-favicon-2026-v2.ico";
                } else if (decoyType === 'gmail') {
                  parentTitle = "Inbox - Jersey City Public Schools";
                  parentFavicon = "https://ssl.gstatic.com/ui/v1/icons/mail/images/favicon_gmail_2026_v2.ico";
                }

                win.document.write(`<html><head><title>${parentTitle}</title><link rel="icon" href="${parentFavicon}"><style>html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:#0c0a09;}iframe{width:100vw;height:100vh;border:none;display:block;}</style></head><body><iframe src="${iframeSrc}" allow="fullscreen"></iframe></body></html>`);
                win.document.close();
              }}
              className="px-3 py-1.5 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--accent-color)] hover:border-[var(--accent-color)] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              title="Cloak in about:blank"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Cloak</span>
            </motion.button>

            {/* Decoy Selector */}
            <div className="flex items-center bg-[var(--bg-secondary)] border border-[var(--card-border)] px-2.5 py-1.5 rounded-lg text-xs font-mono shadow-sm">
              <School className="w-3.5 h-3.5 mr-1.5 text-[var(--accent-color)]" />
              <span className="text-[10px] font-bold text-neutral-400 mr-1 uppercase">DECOY:</span>
              <select 
                value={decoyType}
                onChange={(e) => setDecoyType(e.target.value)}
                className="bg-transparent border-none outline-none font-bold cursor-pointer text-[var(--text-primary)] text-xs"
                style={{ colorScheme: mode }}
              >
                <option value="none" style={{ backgroundColor: mode === 'dark' ? '#1a1a24' : '#ffffff', color: mode === 'dark' ? '#ffffff' : '#000000' }}>Off</option>
                <option value="classroom" style={{ backgroundColor: mode === 'dark' ? '#1a1a24' : '#ffffff', color: mode === 'dark' ? '#ffffff' : '#000000' }}>Classroom</option>
                <option value="clever" style={{ backgroundColor: mode === 'dark' ? '#1a1a24' : '#ffffff', color: mode === 'dark' ? '#ffffff' : '#000000' }}>Clever</option>
                <option value="campus" style={{ backgroundColor: mode === 'dark' ? '#1a1a24' : '#ffffff', color: mode === 'dark' ? '#ffffff' : '#000000' }}>Campus</option>
                <option value="docs" style={{ backgroundColor: mode === 'dark' ? '#1a1a24' : '#ffffff', color: mode === 'dark' ? '#ffffff' : '#000000' }}>Docs</option>
                <option value="gmail" style={{ backgroundColor: mode === 'dark' ? '#1a1a24' : '#ffffff', color: mode === 'dark' ? '#ffffff' : '#000000' }}>Inbox</option>
              </select>
            </div>

            {/* Quick Exit & Open Separately buttons for Workspaces (Sticky) */}
            <AnimatePresence>
              {(filter === 'movies' || filter === 'chat' || filter === 'youtube' || filter === 'lobbychat' || filter === 'proxy') && (
                <motion.div 
                  initial={{ opacity: 0, x: -10, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 'auto' }}
                  exit={{ opacity: 0, x: -10, width: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex items-center gap-1.5 pl-2 ml-1 border-l border-[var(--card-border)]/50 overflow-hidden whitespace-nowrap"
                >
                  <button
                    onClick={() => openWorkspaceInAboutBlank(filter)}
                    className="px-2.5 py-1.5 text-[10px] font-mono font-black tracking-tight uppercase border border-[#00e5b0]/30 hover:border-[#00e5b0] bg-[#00e5b0]/10 hover:bg-[#00e5b0]/20 text-[#00e5b0] rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-sm shrink-0"
                    title="Open Workspace in a cloaked about:blank Page"
                    style={{ backgroundColor: '#000000', borderColor: '#ffffff' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" style={{ color: '#ffffff' }}>
                      <path d="M15 3h6v6" />
                      <path d="M10 14 21 3" />
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                    <span style={{ fontSize: '6px', fontFamily: 'Verdana', fontWeight: 'normal', color: '#ffffff', height: '10px' }}>About:blank</span>
                  </button>

                  <button
                    onClick={() => {
                      const url = filter === 'movies' 
                        ? 'https://urnperiodic.github.io/p/' 
                        : filter === 'youtube'
                        ? 'https://urnperiodic.github.io/youtube1/'
                        : filter === 'chat'
                        ? 'https://urnperiodic.github.io/extrastuffforwebsite/'
                        : filter === 'proxy'
                        ? 'https://scramjet.mercurywork.shop/'
                        : window.location.origin + '?filter=lobbychat';
                      window.open(url, '_blank');
                    }}
                    className="px-2.5 py-1.5 text-[10px] font-mono font-black tracking-tight uppercase border border-[var(--accent-color)]/30 hover:border-[var(--accent-color)] bg-[var(--accent-color)]/10 hover:bg-[var(--accent-color)]/20 text-[var(--accent-color)] rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-sm shrink-0"
                    title="Open separately"
                    style={{ fontSize: '10px' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                      <path d="M15 3h6v6" />
                      <path d="M10 14 21 3" />
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" style={{ fontSize: '8px' }} />
                    </svg>
                    <span style={{ fontSize: '6px', fontFamily: 'Verdana', fontWeight: 'normal' }}>Open Link</span>
                  </button>
                  
                  <button
                    onClick={() => setFilter('all')}
                    className="p-1.5 rounded-lg border border-rose-500/40 hover:border-rose-500 bg-rose-500/10 text-rose-500 hover:text-white hover:bg-rose-500 transition-all cursor-pointer flex items-center justify-center shrink-0 group"
                    title="Close Workspace"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </nav>
      ) : (
        <nav className="border-b border-[var(--card-border)] bg-[var(--header-bg)] py-1.5 pl-4 pr-14 flex flex-col md:flex-row justify-between items-center gap-3 transition-colors duration-300 sticky top-0 z-50 shadow-sm animate-fade-in">
          
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            {/* Left Side: Decoy Classroom Title (Compact) */}
            <div className="flex items-center gap-2">
              <div 
                onClick={() => { setFilter('all'); setSelectedGame(null); setSearchQuery(''); }}
                className="flex items-center gap-1.5 cursor-pointer select-none group"
                title="Go to homepage"
              >
                <div className="p-1 bg-[var(--accent-color)] text-[var(--bg-color)] rounded border border-[var(--card-border)] shadow-sm group-hover:rotate-12 transition-all duration-300 transform">
                  <School className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold tracking-tight text-[var(--text-primary)] block group-hover:text-[var(--accent-color)] transition-colors leading-none">
                    {decoyType === 'classroom' 
                      ? "Home - Classroom" 
                      : decoyType === 'clever' 
                      ? "Clever | Log in" 
                      : decoyType === 'campus' 
                      ? "Campus" 
                      : decoyType === 'docs' 
                      ? "Docs" 
                      : decoyType === 'gmail' 
                      ? "Inbox" 
                      : "StudyTools"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Sections with backgrounds for mobile/tablet wrapped cleanly */}
            <div className="flex md:hidden items-center gap-1 bg-[var(--bg-secondary)] border border-[var(--card-border)]/50 p-0.5 rounded-lg shadow-sm">
              <button
                onClick={() => { setFilter(filter === 'movies' ? 'all' : 'movies'); setSelectedGame(null); }}
                className={`p-1 rounded-md text-xs transition-all duration-200 ${
                  filter === 'movies'
                    ? 'bg-[var(--accent-color)] text-[var(--bg-color)] shadow-[0_1px_5px_var(--accent-shadow)] font-bold'
                    : 'bg-transparent text-[var(--text-primary)] hover:text-[var(--accent-color)]'
                }`}
                title="Movies"
              >
                <Tv className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => { setFilter(filter === 'chat' ? 'all' : 'chat'); setSelectedGame(null); }}
                className={`p-1 px-1.5 rounded-md text-xs font-sans font-black transition-all duration-200 ${
                  filter === 'chat'
                    ? 'bg-[var(--accent-color)] text-[var(--bg-color)] shadow-[0_1px_5px_var(--accent-shadow)]'
                    : 'bg-transparent text-[var(--text-primary)] hover:text-[var(--accent-color)]'
                }`}
                title="Chat"
              >
                <span>AI</span>
              </button>

              <button
                onClick={() => { setFilter(filter === 'lobbychat' ? 'all' : 'lobbychat'); setSelectedGame(null); }}
                className={`p-1 rounded-md text-xs transition-all duration-200 ${
                  filter === 'lobbychat'
                    ? 'bg-[var(--accent-color)] text-[var(--bg-color)] shadow-[0_1px_5px_var(--accent-shadow)] font-bold'
                    : 'bg-transparent text-[var(--text-primary)] hover:text-[var(--accent-color)]'
                }`}
                title="Lobby Chat"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => { setFilter(filter === 'youtube' ? 'all' : 'youtube'); setSelectedGame(null); }}
                className={`p-1 rounded-md text-xs transition-all duration-200 ${
                  filter === 'youtube'
                    ? 'bg-red-600 text-white shadow-[0_1px_5px_rgba(220,38,38,0.5)] font-bold'
                    : 'bg-transparent text-[var(--text-primary)] hover:text-red-500'
                }`}
                title="YouTube"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837z" fill={filter === 'youtube' ? "#FFFFFF" : "#FF0000"} />
                  <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill={filter === 'youtube' ? "#FF0000" : "#FFFFFF"} />
                </svg>
              </button>

              <button
                onClick={() => { setFilter(filter === 'proxy' ? 'all' : 'proxy'); setSelectedGame(null); }}
                className={`p-1 rounded-md text-xs transition-all duration-200 ${
                  filter === 'proxy'
                    ? 'bg-[var(--accent-color)] text-[var(--bg-color)] shadow-[0_1px_5px_var(--accent-shadow)] font-bold'
                    : 'bg-transparent text-[var(--text-primary)] hover:text-[var(--accent-color)]'
                }`}
                title="Proxy"
              >
                <Globe className="w-3.5 h-3.5" />
              </button>

            {/* Cloak Button */}
            <button
              onClick={() => {
                const win = window.open("about:blank", "_blank");
                if (!win) {
                  alert("Popup blocked!");
                  return;
                }
                const searchParams = new URLSearchParams(window.location.search);
                searchParams.set('decoyType', decoyType);
                const iframeSrc = `${window.location.origin}${window.location.pathname}?${searchParams.toString()}${window.location.hash}`;
                let parentTitle = "StudyTools";
                let parentFavicon = "https://ssl.gstatic.com/classroom/favicon.png";
                
                if (decoyType === 'classroom') {
                  parentTitle = "Home - Classroom";
                  parentFavicon = "https://ssl.gstatic.com/classroom/favicon.png";
                } else if (decoyType === 'clever') {
                  parentTitle = "Clever | Log in with Clever";
                  parentFavicon = "https://www.google.com/s2/favicons?sz=64&domain=clever.com";
                } else if (decoyType === 'campus') {
                  parentTitle = "Campus Student";
                  parentFavicon = "https://jerseycitynj.infinitecampus.org/campus/favicon-32x32.png";
                } else if (decoyType === 'docs') {
                  parentTitle = "Google Docs";
                  parentFavicon = "https://ssl.gstatic.com/docs/documents/images/docs-favicon-2026-v2.ico";
                } else if (decoyType === 'gmail') {
                  parentTitle = "Inbox - Jersey City Public Schools";
                  parentFavicon = "https://ssl.gstatic.com/ui/v1/icons/mail/images/favicon_gmail_2026_v2.ico";
                }

                win.document.write(`<html><head><title>${parentTitle}</title><link rel="icon" href="${parentFavicon}"><style>html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:#0c0a09;}iframe{width:100vw;height:100vh;border:none;display:block;}</style></head><body><iframe src="${iframeSrc}" allow="fullscreen"></iframe></body></html>`);
                win.document.close();
              }}
              className="p-1 rounded-md text-[var(--accent-color)] hover:bg-[var(--accent-color)]/10 transition-all"
              title="Cloak site"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Decoy Selector */}
            <select 
              value={decoyType}
              onChange={(e) => setDecoyType(e.target.value)}
              className="p-0.5 text-[8px] font-mono border border-[var(--card-border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded cursor-pointer outline-none font-bold"
              style={{ colorScheme: mode }}
            >
              <option value="none" style={{ backgroundColor: mode === 'dark' ? '#1a1a24' : '#ffffff', color: mode === 'dark' ? '#ffffff' : '#000000' }}>Off</option>
              <option value="classroom" style={{ backgroundColor: mode === 'dark' ? '#1a1a24' : '#ffffff', color: mode === 'dark' ? '#ffffff' : '#000000' }}>Classroom</option>
              <option value="clever" style={{ backgroundColor: mode === 'dark' ? '#1a1a24' : '#ffffff', color: mode === 'dark' ? '#ffffff' : '#000000' }}>Clever</option>
              <option value="campus" style={{ backgroundColor: mode === 'dark' ? '#1a1a24' : '#ffffff', color: mode === 'dark' ? '#ffffff' : '#000000' }}>Campus</option>
              <option value="docs" style={{ backgroundColor: mode === 'dark' ? '#1a1a24' : '#ffffff', color: mode === 'dark' ? '#ffffff' : '#000000' }}>Docs</option>
              <option value="gmail" style={{ backgroundColor: mode === 'dark' ? '#1a1a24' : '#ffffff', color: mode === 'dark' ? '#ffffff' : '#000000' }}>Inbox</option>
            </select>
          </div>
          </div>

          {/* Middle: Section Icons with Background (Visible on medium+ screens) */}
          <div className="hidden md:flex items-center gap-1.5 bg-[var(--bg-secondary)] border border-[var(--card-border)]/50 p-1 rounded-xl shadow-sm">
            {/* Movies Button */}
            <button
              onClick={() => { setFilter(filter === 'movies' ? 'all' : 'movies'); setSelectedGame(null); }}
              className={`p-1.5 rounded-lg border text-xs font-mono font-bold flex items-center justify-center cursor-pointer transition-all duration-200 ${
                filter === 'movies'
                  ? 'bg-[var(--accent-color)] text-[var(--bg-color)] border-[var(--accent-color)] shadow-[0_2px_8px_var(--accent-shadow)]'
                  : 'bg-[var(--card-bg)] text-[var(--text-primary)] border-[var(--card-border)] hover:border-[var(--accent-color)]/50 hover:text-[var(--accent-color)]'
              }`}
              title="Movies Workspace"
            >
              <Tv className="w-3.5 h-3.5" />
            </button>

            {/* Socratic Tutor Button */}
            <button
              onClick={() => { setFilter(filter === 'chat' ? 'all' : 'chat'); setSelectedGame(null); }}
              className={`p-1.5 px-2.5 rounded-lg border text-xs font-sans font-black flex items-center justify-center cursor-pointer transition-all duration-200 ${
                filter === 'chat'
                  ? 'bg-[var(--accent-color)] text-[var(--bg-color)] border-[var(--accent-color)] shadow-[0_2px_8px_var(--accent-shadow)]'
                  : 'bg-[var(--card-bg)] text-[var(--text-primary)] border-[var(--card-border)] hover:border-[var(--accent-color)]/50 hover:text-[var(--accent-color)]'
              }`}
              title="Chat Tutor"
            >
              <span>AI</span>
            </button>

            {/* Lobby Chat Button */}
            <button
              onClick={() => { setFilter(filter === 'lobbychat' ? 'all' : 'lobbychat'); setSelectedGame(null); }}
              className={`p-1.5 rounded-lg border text-xs font-mono font-bold flex items-center justify-center cursor-pointer transition-all duration-200 ${
                filter === 'lobbychat'
                  ? 'bg-[var(--accent-color)] text-[var(--bg-color)] border-[var(--accent-color)] shadow-[0_2px_8px_var(--accent-shadow)]'
                  : 'bg-[var(--card-bg)] text-[var(--text-primary)] border-[var(--card-border)] hover:border-[var(--accent-color)]/50 hover:text-[var(--accent-color)]'
              }`}
              title="Lobby Chat"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </button>

            {/* Proxy Button */}
            <button
              onClick={() => { setFilter(filter === 'proxy' ? 'all' : 'proxy'); setSelectedGame(null); }}
              className={`p-1.5 rounded-lg border text-xs font-mono font-bold flex items-center justify-center cursor-pointer transition-all duration-200 ${
                filter === 'proxy'
                  ? 'bg-[var(--accent-color)] text-[var(--bg-color)] border-[var(--accent-color)] shadow-[0_2px_8px_var(--accent-shadow)]'
                  : 'bg-[var(--card-bg)] text-[var(--text-primary)] border-[var(--card-border)] hover:border-[var(--accent-color)]/50 hover:text-[var(--accent-color)]'
              }`}
              title="Proxy"
            >
              <Globe className="w-3.5 h-3.5" />
            </button>

            {/* Cloak Button */}
            <button
              onClick={() => {
                const win = window.open("about:blank", "_blank");
                if (!win) { alert("Popup blocked!"); return; }
                const searchParams = new URLSearchParams(window.location.search);
                searchParams.set('decoyType', decoyType);
                const iframeSrc = `${window.location.origin}${window.location.pathname}?${searchParams.toString()}${window.location.hash}`;
                let parentTitle = "StudyTools";
                let parentFavicon = "https://ssl.gstatic.com/classroom/favicon.png";
                
                if (decoyType === 'classroom') {
                  parentTitle = "Home - Classroom";
                  parentFavicon = "https://ssl.gstatic.com/classroom/favicon.png";
                } else if (decoyType === 'clever') {
                  parentTitle = "Clever | Log in with Clever";
                  parentFavicon = "https://www.google.com/s2/favicons?sz=64&domain=clever.com";
                } else if (decoyType === 'campus') {
                  parentTitle = "Campus Student";
                  parentFavicon = "https://jerseycitynj.infinitecampus.org/campus/favicon-32x32.png";
                } else if (decoyType === 'docs') {
                  parentTitle = "Google Docs";
                  parentFavicon = "https://ssl.gstatic.com/docs/documents/images/docs-favicon-2026-v2.ico";
                } else if (decoyType === 'gmail') {
                  parentTitle = "Inbox - Jersey City Public Schools";
                  parentFavicon = "https://ssl.gstatic.com/ui/v1/icons/mail/images/favicon_gmail_2026_v2.ico";
                }

                win.document.write(`<html><head><title>${parentTitle}</title><link rel="icon" href="${parentFavicon}"><style>html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:#0c0a09;}iframe{width:100vw;height:100vh;border:none;display:block;}</style></head><body><iframe src="${iframeSrc}" allow="fullscreen"></iframe></body></html>`);
                win.document.close();
              }}
              className="p-1.5 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--accent-color)] hover:border-[var(--accent-color)] transition-all cursor-pointer flex items-center justify-center"
              title="Cloak in about:blank"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Decoy Selector */}
            <div className="flex items-center bg-[var(--bg-secondary)] border border-[var(--card-border)] px-1.5 py-0.5 rounded-lg text-[10px] font-mono shadow-sm">
              <School className="w-3.5 h-3.5 mr-1.5 text-[var(--accent-color)]" />
              <select 
                value={decoyType}
                onChange={(e) => setDecoyType(e.target.value)}
                className="bg-transparent border-none outline-none font-bold cursor-pointer text-[var(--text-primary)]"
                style={{ colorScheme: mode }}
              >
                <option value="none" style={{ backgroundColor: mode === 'dark' ? '#1a1a24' : '#ffffff', color: mode === 'dark' ? '#ffffff' : '#000000' }}>Off</option>
                <option value="classroom" style={{ backgroundColor: mode === 'dark' ? '#1a1a24' : '#ffffff', color: mode === 'dark' ? '#ffffff' : '#000000' }}>Class</option>
                <option value="clever" style={{ backgroundColor: mode === 'dark' ? '#1a1a24' : '#ffffff', color: mode === 'dark' ? '#ffffff' : '#000000' }}>Clever</option>
                <option value="campus" style={{ backgroundColor: mode === 'dark' ? '#1a1a24' : '#ffffff', color: mode === 'dark' ? '#ffffff' : '#000000' }}>Campus</option>
                <option value="docs" style={{ backgroundColor: mode === 'dark' ? '#1a1a24' : '#ffffff', color: mode === 'dark' ? '#ffffff' : '#000000' }}>Docs</option>
                <option value="gmail" style={{ backgroundColor: mode === 'dark' ? '#1a1a24' : '#ffffff', color: mode === 'dark' ? '#ffffff' : '#000000' }}>Inbox</option>
              </select>
            </div>

            {/* Quick Exit & Open Separately buttons for Workspaces (Main) */}
            <AnimatePresence>
              {(filter === 'movies' || filter === 'chat' || filter === 'youtube' || filter === 'lobbychat' || filter === 'proxy') && (
                <motion.div 
                  initial={{ opacity: 0, x: -10, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 'auto' }}
                  exit={{ opacity: 0, x: -10, width: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex items-center gap-1.5 pl-2 ml-1 border-l border-[var(--card-border)]/50 overflow-hidden whitespace-nowrap"
                >
                  <button
                    onClick={() => openWorkspaceInAboutBlank(filter)}
                    className="px-2.5 py-1.5 text-[10px] font-mono font-black tracking-tight uppercase border border-[#00e5b0]/30 hover:border-[#00e5b0] bg-[#00e5b0]/10 hover:bg-[#00e5b0]/20 text-[#00e5b0] rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-sm shrink-0"
                    title="Open Workspace in a cloaked about:blank Page"
                    style={{ backgroundColor: '#000000', borderColor: '#ffffff' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" style={{ color: '#ffffff' }}>
                      <path d="M15 3h6v6" />
                      <path d="M10 14 21 3" />
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                    <span style={{ fontSize: '6px', fontFamily: 'Verdana', fontWeight: 'normal', color: '#ffffff', height: '10px' }}>About:blank</span>
                  </button>

                  <button
                    onClick={() => {
                      const url = filter === 'movies' 
                        ? 'https://urnperiodic.github.io/p/' 
                        : filter === 'youtube'
                        ? 'https://urnperiodic.github.io/youtube1/'
                        : filter === 'chat'
                        ? 'https://urnperiodic.github.io/extrastuffforwebsite/'
                        : filter === 'proxy'
                        ? 'https://scramjet.mercurywork.shop/'
                        : window.location.origin + '?filter=lobbychat';
                      window.open(url, '_blank');
                    }}
                    className="px-2.5 py-1.5 text-[10px] font-mono font-black tracking-tight uppercase border border-[var(--accent-color)]/30 hover:border-[var(--accent-color)] bg-[var(--accent-color)]/10 hover:bg-[var(--accent-color)]/20 text-[var(--accent-color)] rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-sm shrink-0"
                    title="Open separately"
                    style={{ fontSize: '10px' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                      <path d="M15 3h6v6" />
                      <path d="M10 14 21 3" />
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" style={{ fontSize: '8px' }} />
                    </svg>
                    <span style={{ fontSize: '6px', fontFamily: 'Verdana', fontWeight: 'normal' }}>Open Link</span>
                  </button>
                  
                  <button
                    onClick={() => setFilter('all')}
                    className="p-1.5 rounded-lg border border-rose-500/40 hover:border-rose-500 bg-rose-500/10 text-rose-500 hover:text-white hover:bg-rose-500 transition-all cursor-pointer flex items-center justify-center shrink-0 group"
                    title="Close Workspace"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Side: Made By + Slider + Theme (Compact) */}
          <div className="flex items-center gap-2">

            {/* Light/Dark slider (Compact) */}
            <div className="flex items-center gap-1 border border-[var(--card-border)] bg-[var(--bg-secondary)] p-0.5 rounded-full shadow-sm">
              <div 
                onClick={() => setMode(prev => prev === 'light' ? 'dark' : 'light')}
                className="relative w-[34px] h-4 bg-[var(--input-fill)] border border-[var(--card-border)] rounded-full cursor-pointer flex items-center p-0.5 select-none transition-all duration-300"
                title="Slide to change Mode"
              >
                <div 
                  className={`w-3 h-3 rounded-full bg-[var(--accent-color)] shadow-sm transition-all duration-300 ease-out flex items-center justify-center text-[7px] transform ${
                    mode === 'dark' ? 'translate-x-4' : 'translate-x-0'
                  }`}
                >
                  {mode === 'dark' ? '🌙' : '☀️'}
                </div>
              </div>
            </div>

            {/* Unified Settings, Colors Group (Compact) */}
            <div className="flex items-center gap-1.5 border border-[var(--card-border)] bg-[var(--bg-secondary)] p-0.5 rounded-lg shadow-sm">
              {/* Settings Gear Button */}
              <button
                onClick={() => setIsGlobalSettingsOpen(true)}
                className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--accent-color)] hover:bg-[var(--card-bg)] transition-all cursor-pointer flex items-center justify-center shrink-0"
                title="System Settings (Backup & Restore)"
              >
                <Settings className="w-3 h-3" />
              </button>

              <button
                onClick={() => setViewModeAndSave('articles')}
                className="p-1 rounded-md text-[var(--text-muted)] hover:text-red-500 hover:bg-[var(--card-bg)] transition-all cursor-pointer flex items-center justify-center shrink-0"
                title="Sign Out (Lock Workspace)"
              >
                <LogOut className="w-3 h-3" />
              </button>

              <div className="w-[1px] h-3 bg-[var(--card-border)]/80" />

              {/* Colors picker dots */}
              <div className="flex items-center gap-1 px-0.5">
                {[
                  { key: 'cyborg', color: 'bg-green-500 border-green-300 shadow-[0_0_5px_green]', tooltip: 'Cyborg Theme' },
                  { key: 'sunset', color: 'bg-amber-500 border-amber-300', tooltip: 'Sunset Theme' },
                  { key: 'midnight', color: 'bg-indigo-600 border-indigo-400', tooltip: 'Midnight Theme' },
                  { key: 'forest', color: 'bg-emerald-500 border-emerald-300', tooltip: 'Forest Theme' },
                  { key: 'violet', color: 'bg-indigo-600 border-indigo-400', tooltip: 'Violet Theme' },
                  { key: 'ice', color: 'bg-sky-400 border-sky-300', tooltip: 'Glacier Theme' },
                  { key: 'rose-pine', color: 'bg-rose-300 border-rose-200', tooltip: 'Rose Pine Theme' },
                  { key: 'none', color: 'bg-gradient-to-br from-neutral-300 to-neutral-700 border-neutral-400', tooltip: 'No Theme (Monochrome)' }
                ].map((themeOpt) => (
                  <button
                    key={themeOpt.key}
                    title={themeOpt.tooltip}
                    onClick={() => setTheme(themeOpt.key)}
                    className={`w-2 h-2 rounded-full ${themeOpt.color} border border-transparent transition-all duration-200 hover:scale-125 cursor-pointer ${
                      theme === themeOpt.key ? 'ring-1 ring-offset-1 ring-[var(--accent-color)]' : 'opacity-60 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>

        </nav>
      )}

      {/* ALT LINKS BAR */}
      {headerOpen && altBarOpen && (
        <section className="bg-[var(--bg-secondary)] border-b border-[var(--card-border)] py-3 px-4 md:px-6 transition-colors duration-300 animate-fade-in">
        <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          {/* Alt Links Removed */}

          <div className="flex flex-wrap items-center gap-2 md:ml-auto w-full md:w-auto overflow-visible">
            {/* Go back to games back button */}
            {(filter === 'chat' || filter === 'movies' || filter === 'proxy') && (
              <button
                id="chat-back-button"
                onClick={() => setFilter('all')}
                className="flex items-center gap-1.5 text-xs font-mono font-bold py-1.5 px-3.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-primary)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] transition-all cursor-pointer shadow-[0_2px_8.5px_rgba(0,0,0,0.1)] active:scale-98"
                title="Go back to games list"
                aria-label="Back"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                <span>Go back to games</span>
              </button>
            )}

            {/* Movies Workspace button */}
            <button
              onClick={() => { setFilter(filter === 'movies' ? 'all' : 'movies'); setSelectedGame(null); }}
              className={`text-xs border py-1.5 px-3.5 rounded-full font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-[0_2px_8.5px_rgba(0,0,0,0.1)] transition-all duration-200 active:scale-98 ${
                filter === 'movies'
                  ? 'bg-[var(--accent-color)] text-[var(--bg-color)] border-[var(--accent-color)] shadow-[0_4px_12px_var(--accent-shadow)] font-extrabold'
                  : 'bg-[var(--card-bg)] text-[var(--text-primary)] border-[var(--card-border)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)]'
              }`}
              title="Toggle Movies - Stream Movies and TV Shows"
            >
              <Tv className="w-3.5 h-3.5 text-[var(--accent-color)]" />
              <span>Movies</span>
            </button>

            {/* Decoy Mode Selector */}
            <div className={`flex items-center border rounded-full px-3 py-1.5 text-xs font-mono shadow-sm transition-all duration-300 ${
              decoyType !== 'none' 
                ? 'bg-[var(--accent-color)]/10 border-[var(--accent-color)] text-[var(--accent-color)]' 
                : 'bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--text-muted)]'
            }`}>
              <span className="text-[10px] uppercase font-extrabold mr-1.5 flex items-center gap-1">
                <School className="w-3.5 h-3.5" />
                <span>Decoy:</span>
              </span>
              <select 
                value={decoyType}
                onChange={(e) => setDecoyType(e.target.value)}
                className={`bg-transparent border-none outline-none font-bold cursor-pointer py-0.5 ${
                  decoyType !== 'none' ? 'text-[var(--accent-color)]' : 'text-[var(--text-primary)]'
                }`}
                style={{ colorScheme: mode }}
              >
                <option value="none" style={{ backgroundColor: '#1a1a24', color: '#ffffff' }}>Off (StudyTools)</option>
                <option value="classroom" style={{ backgroundColor: '#1a1a24', color: '#ffffff' }}>Google Classroom</option>
                <option value="clever" style={{ backgroundColor: '#1a1a24', color: '#ffffff' }}>Clever Login</option>
                <option value="campus" style={{ backgroundColor: '#1a1a24', color: '#ffffff' }}>Infinite Campus</option>
                <option value="docs" style={{ backgroundColor: '#1a1a24', color: '#ffffff' }}>Google Docs</option>
                <option value="gmail" style={{ backgroundColor: '#1a1a24', color: '#ffffff' }}>Inbox - Jersey City Public Schools</option>
              </select>
            </div>

            {/* Light/Dark Mode slider */}
            <div className="flex items-center gap-1 border border-[var(--card-border)] bg-[var(--bg-secondary)] p-1 rounded-full shadow-sm">
              <div 
                onClick={() => setMode(prev => prev === 'light' ? 'dark' : 'light')}
                className="relative w-[38px] h-5 bg-[var(--input-fill)] border border-[var(--card-border)] rounded-full cursor-pointer flex items-center p-0.5 select-none transition-all duration-300"
                title="Slide to change Mode"
              >
                <div 
                  className={`w-3.5 h-3.5 rounded-full bg-[var(--accent-color)] shadow-sm transition-all duration-300 ease-out flex items-center justify-center text-[8px] transform ${
                    mode === 'dark' ? 'translate-x-4' : 'translate-x-0'
                  }`}
                >
                  {mode === 'dark' ? '🌙' : '☀️'}
                </div>
              </div>
            </div>

            {/* Unified Settings, Colors & Sign Out Group */}
            <div className="flex items-center gap-2 border border-[var(--card-border)] bg-[var(--bg-secondary)] p-1 rounded-full shadow-sm">
              {/* Settings Gear Button (opens System Settings Modal) */}
              <button
                onClick={() => setIsGlobalSettingsOpen(true)}
                className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--accent-color)] hover:bg-[var(--card-bg)] transition-all cursor-pointer flex items-center justify-center shrink-0"
                title="System Settings (Backup & Restore)"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setViewModeAndSave('articles')}
                className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-red-500 hover:bg-[var(--card-bg)] transition-all cursor-pointer flex items-center justify-center shrink-0"
                title="Sign Out (Lock Workspace)"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>

              <div className="w-[1px] h-3.5 bg-[var(--card-border)]/80" />

              {/* Colors picker dots */}
              <div className="flex items-center gap-1 px-0.5">
                {[
                  { key: 'cyborg', color: 'bg-green-500 border-green-300 shadow-[0_0_5px_green]', tooltip: 'Cyborg Theme' },
                  { key: 'sunset', color: 'bg-amber-500 border-amber-300', tooltip: 'Sunset Theme' },
                  { key: 'midnight', color: 'bg-indigo-600 border-indigo-400', tooltip: 'Midnight Theme' },
                  { key: 'forest', color: 'bg-emerald-500 border-emerald-300', tooltip: 'Forest Theme' },
                  { key: 'violet', color: 'bg-indigo-600 border-indigo-400', tooltip: 'Violet Theme' },
                  { key: 'ice', color: 'bg-sky-400 border-sky-300', tooltip: 'Glacier Theme' },
                  { key: 'rose-pine', color: 'bg-rose-300 border-rose-200', tooltip: 'Rose Pine Theme' },
                  { key: 'none', color: 'bg-gradient-to-br from-neutral-300 to-neutral-700 border-neutral-400', tooltip: 'No Theme (Monochrome)' }
                ].map((themeOpt) => (
                  <button
                    key={themeOpt.key}
                    title={themeOpt.tooltip}
                    onClick={() => setTheme(themeOpt.key)}
                    className={`w-2 h-2 rounded-full ${themeOpt.color} border border-transparent transition-all duration-200 hover:scale-125 cursor-pointer ${
                      theme === themeOpt.key ? 'ring-1 ring-offset-1 ring-[var(--accent-color)] scale-110' : 'opacity-60 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      )}


      {/* MAIN CONTAINER: SIDEBAR + GAMES */}
      <div className={`flex-1 flex flex-col md:flex-row w-full mx-auto transition-all duration-300 ${
        (filter === 'chat' || filter === 'movies' || filter === 'lobbychat' || filter === 'youtube' || filter === 'proxy')
          ? 'max-w-none p-0 gap-0 border-t border-[var(--card-border)]/50 lg:bg-[#07090e]' 
          : 'max-w-8xl p-4 md:p-6 gap-6 self-center'
      }`}>
        
        {/* LEFT NAV PANEL - CAT SIDEBAR */}
        {filter !== 'chat' && filter !== 'movies' && filter !== 'youtube' && filter !== 'lobbychat' && filter !== 'proxy' && (
          <aside className={`transition-all duration-300 ease-in-out shrink-0 flex flex-col gap-2 overflow-hidden ${
            sidebarOpen ? 'w-full md:w-44' : 'w-full md:w-14'
          }`}>
            
            <div className="flex items-center justify-between px-2 py-1 min-h-[36px]">
              {sidebarOpen ? (
                <span className="text-[10px] font-mono tracking-wider opacity-50 uppercase whitespace-nowrap" style={{ borderColor: '#ffffff', color: '#ffffff', fontFamily: 'Verdana', fontWeight: 'normal' }}>
                  Browse Portals
                </span>
              ) : (
                <span className="hidden md:inline text-[9px] font-mono tracking-wider opacity-50 uppercase text-center mx-auto font-bold text-[var(--accent-color)]" style={{ borderColor: '#ffffff', color: '#ffffff', fontFamily: 'Verdana', fontWeight: 'normal' }}>
                  NAV
                </span>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1.5 rounded-lg hover:bg-[var(--card-bg)] text-[var(--accent-color)] transition-all duration-250 cursor-pointer flex items-center justify-center ml-auto"
                title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              >
                {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 animate-bounce" />}
              </button>
            </div>


            <motion.button
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setFilter('info')}
              className={`w-full text-left py-2.5 px-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-all duration-200 cursor-pointer ${
                filter === 'info' 
                  ? 'bg-[var(--accent-color)] text-[var(--bg-color)] shadow-lg shadow-[var(--accent-color)]/20' 
                  : 'hover:bg-[var(--card-bg)] text-[var(--text-primary)] opacity-80'
              }`}
            >
              <Info className="w-4.5 h-4.5 shrink-0" />
              <span className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none md:hidden'}`}>Information</span>
            </motion.button>

            <motion.button
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { window.open('https://forms.gle/YCN8itY7WqmN82CY8', '_blank'); }}
              className="w-full text-left py-2.5 px-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-all duration-200 cursor-pointer hover:bg-[var(--card-bg)] text-[var(--text-primary)] opacity-80"
            >
              <ExternalLink className="w-4.5 h-4.5 shrink-0" />
              <span className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none md:hidden'}`}>Request a Game</span>
            </motion.button>

            <motion.button
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setFilter('all'); setSelectedGame(null); }}
            className={`w-full text-left py-2.5 px-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-all duration-200 cursor-pointer ${
              filter === 'all' && !selectedGame
                ? 'bg-[var(--accent-color)] text-[var(--bg-color)] shadow-[0_4px_12px_var(--accent-shadow)] font-bold'
                : 'hover:bg-[var(--card-bg)] text-[var(--text-primary)] opacity-80'
            }`}
          >
            <Layers className="w-4.5 h-4.5 shrink-0" />
            <span className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none md:hidden'}`}>All Classrooms</span>
          </motion.button>

          <motion.button
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setFilter('favorites'); setSelectedGame(null); }}
            className={`w-full text-left py-2.5 px-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-all duration-200 cursor-pointer ${
              filter === 'favorites' && !selectedGame
                ? 'bg-[var(--accent-color)] text-[var(--bg-color)] shadow-[0_4px_12px_var(--accent-shadow)] font-bold'
                : 'hover:bg-[var(--card-bg)] text-[var(--text-primary)] opacity-80 text-rose-500/90 hover:text-rose-400'
            }`}
          >
            <Heart className="w-4.5 h-4.5 shrink-0" />
            <span className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none md:hidden'}`}>Favorites</span>
          </motion.button>

          <motion.button
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setFilter('featured'); setSelectedGame(null); }}
            className={`w-full text-left py-2.5 px-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-all duration-200 cursor-pointer ${
              filter === 'featured' && !selectedGame
                ? 'bg-[var(--accent-color)] text-[var(--bg-color)] shadow-[0_4px_12px_var(--accent-shadow)] font-bold'
                : 'hover:bg-[var(--card-bg)] text-[var(--text-primary)] opacity-80 text-amber-400/90 hover:text-amber-300'
            }`}
          >
            <Sparkles className="w-4.5 h-4.5 shrink-0" />
            <span className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none md:hidden'}`}>Featured</span>
          </motion.button>

          <motion.button
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setFilter('single'); setSelectedGame(null); }}
            className={`w-full text-left py-2.5 px-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-all duration-200 cursor-pointer ${
              filter === 'single' && !selectedGame
                ? 'bg-[var(--accent-color)] text-[var(--bg-color)] shadow-[0_4px_12px_var(--accent-shadow)] font-bold'
                : 'hover:bg-[var(--card-bg)] text-[var(--text-primary)] opacity-80'
            }`}
          >
            <Gamepad2 className="w-4.5 h-4.5 shrink-0" />
            <span className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none md:hidden'}`}>Single Player</span>
          </motion.button>

          <motion.button
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setFilter('multiplayer'); setSelectedGame(null); }}
            className={`w-full text-left py-2.5 px-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-all duration-200 cursor-pointer ${
              filter === 'multiplayer' && !selectedGame
                ? 'bg-[var(--accent-color)] text-[var(--bg-color)] shadow-[0_4px_12px_var(--accent-shadow)] font-bold'
                : 'hover:bg-[var(--card-bg)] text-[var(--text-primary)] opacity-80'
            }`}
          >
            <Users className="w-4.5 h-4.5 shrink-0" />
            <span className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none md:hidden'}`}>Multiplayer</span>
          </motion.button>

          <motion.button
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setFilter('Shooter'); setSelectedGame(null); }}
            className={`w-full text-left py-2.5 px-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-all duration-200 cursor-pointer ${
              filter === 'Shooter' && !selectedGame
                ? 'bg-[var(--accent-color)] text-[var(--bg-color)] shadow-[0_4px_12px_var(--accent-shadow)] font-bold'
                : 'hover:bg-[var(--card-bg)] text-[var(--text-primary)] opacity-80'
            }`}
          >
            <Crosshair className="w-4.5 h-4.5 shrink-0" />
            <span className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none md:hidden'}`}>Shooter</span>
          </motion.button>

          <motion.button
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setFilter('Party'); setSelectedGame(null); }}
            className={`w-full text-left py-2.5 px-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-all duration-200 cursor-pointer ${
              filter === 'Party' && !selectedGame
                ? 'bg-[var(--accent-color)] text-[var(--bg-color)] shadow-[0_4px_12px_var(--accent-shadow)] font-bold'
                : 'hover:bg-[var(--card-bg)] text-[var(--text-primary)] opacity-80'
            }`}
          >
            <PartyPopper className="w-4.5 h-4.5 shrink-0" />
            <span className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none md:hidden'}`}>Party</span>
          </motion.button>

          <motion.button
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setFilter('Sports'); setSelectedGame(null); }}
            className={`w-full text-left py-2.5 px-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-all duration-200 cursor-pointer ${
              filter === 'Sports' && !selectedGame
                ? 'bg-[var(--accent-color)] text-[var(--bg-color)] shadow-[0_4px_12px_var(--accent-shadow)] font-bold'
                : 'hover:bg-[var(--card-bg)] text-[var(--text-primary)] opacity-80'
            }`}
          >
            <Trophy className="w-4.5 h-4.5 shrink-0" />
            <span className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none md:hidden'}`}>Sports</span>
          </motion.button>
          
          <motion.button
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setFilter('Random'); setSelectedGame(null); }}
            className={`w-full text-left py-2.5 px-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-all duration-200 cursor-pointer ${
              filter === 'Random' && !selectedGame
                ? 'bg-[var(--accent-color)] text-[var(--bg-color)] shadow-[0_4px_12px_var(--accent-shadow)] font-bold'
                : 'hover:bg-[var(--card-bg)] text-[var(--text-primary)] opacity-80'
            }`}
          >
            <Shuffle className="w-4.5 h-4.5 shrink-0" />
            <span className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none md:hidden'}`}>Random Games</span>
          </motion.button>

          <motion.button
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setFilter('Emulated'); setSelectedGame(null); }}
            className={`w-full text-left py-2.5 px-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-all duration-200 cursor-pointer ${
              filter === 'Emulated' && !selectedGame
                ? 'bg-[var(--accent-color)] text-[var(--bg-color)] shadow-[0_4px_12px_var(--accent-shadow)] font-bold'
                : 'hover:bg-[var(--card-bg)] text-[var(--text-primary)] opacity-80'
            }`}
          >
            <Cpu className="w-4.5 h-4.5 shrink-0" />
            <span className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none md:hidden'}`}>Emulated</span>
          </motion.button>

          <motion.button
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setFilter('minecraft'); setSelectedGame(null); }}
            className={`w-full text-left py-2.5 px-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-all duration-200 cursor-pointer ${
              filter === 'minecraft' && !selectedGame
                ? 'bg-[var(--accent-color)] text-[var(--bg-color)] shadow-[0_4px_12px_var(--accent-shadow)] font-bold'
                : 'hover:bg-[var(--card-bg)] text-[var(--text-primary)] opacity-80'
            }`}
          >
            <Box className="w-4.5 h-4.5 shrink-0" />
            <span className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none md:hidden'}`}>Minecraft</span>
          </motion.button>

          <motion.button
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setFilter('Not Games'); setSelectedGame(null); }}
            className={`w-full text-left py-2.5 px-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-all duration-200 cursor-pointer ${
              filter === 'Not Games' && !selectedGame
                ? 'bg-[var(--accent-color)] text-[var(--bg-color)] shadow-[0_4px_12px_var(--accent-shadow)] font-bold'
                : 'hover:bg-[var(--card-bg)] text-[var(--text-primary)] opacity-80'
            }`}
          >
            <Globe className="w-4.5 h-4.5 shrink-0" />
            <span className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none md:hidden'}`}>Other Websites</span>
          </motion.button>

          <div className="flex-1" />

          <motion.button
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsGlobalSettingsOpen(true)}
            className="w-full text-left py-2.5 px-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-all duration-200 cursor-pointer hover:bg-[var(--card-bg)] text-[var(--text-primary)] opacity-80 mt-auto"
          >
            <Settings className="w-4.5 h-4.5 shrink-0" />
            <span className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none md:hidden'}`}>Settings</span>
          </motion.button>

        </aside>
        )}

        {/* GLOBAL SETTINGS MODAL */}
        {isGlobalSettingsOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center select-none">
            <div 
              onClick={() => setIsGlobalSettingsOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm animate-fade-in"
            />
            <div className="relative w-full max-w-md bg-[#12121a] border border-white/10 rounded-2xl p-7 flex flex-col shadow-2xl z-10 animate-fade-in">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-white" />
                  <h3 className="text-xl font-extrabold uppercase tracking-wider text-white">System Settings</h3>
                </div>
                <button 
                  onClick={() => setIsGlobalSettingsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/5 text-neutral-400 hover:text-white cursor-pointer transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-black text-white mb-2 uppercase tracking-widest">One-Click Backup & Restore</h4>
                  <p className="text-xs text-neutral-400 mb-5 leading-relaxed">
                    Export your favorited games, bookmarked films, watch history, and chat nickname to a JSON file. Use it to carry your profile across devices.
                  </p>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => {
                        const data = {
                          favorites: safeStorage.getItem('unblocked-favorites'),
                          moviesBookmarks: safeStorage.getItem('movies-bookmarks'),
                          moviesHistory: safeStorage.getItem('movies-history'),
                          chatName: safeStorage.getItem('chat_name')
                        };
                        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'unblocked-backup.json';
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="flex-1 py-3 px-4 rounded-xl text-xs font-mono font-black uppercase tracking-wider text-center bg-white hover:bg-neutral-200 text-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md select-none hover:scale-[1.02] active:scale-95"
                    >
                      <Download className="w-4 h-4 text-black" />
                      EXPORT DATA
                    </button>
                    
                    <label className="flex-1 py-3 px-4 rounded-xl text-xs font-mono font-black uppercase tracking-wider text-center bg-[#202028] border border-white/10 text-white hover:bg-[#2a2a34] hover:border-white/20 transition-all cursor-pointer flex items-center justify-center gap-2 select-none hover:scale-[1.02] active:scale-95">
                      <input 
                        type="file" 
                        accept=".json" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            try {
                              const data = JSON.parse(event.target.result);
                              if (data.favorites) safeStorage.setItem('unblocked-favorites', data.favorites);
                              if (data.moviesBookmarks) safeStorage.setItem('movies-bookmarks', data.moviesBookmarks);
                              if (data.moviesHistory) safeStorage.setItem('movies-history', data.moviesHistory);
                              if (data.chatName) safeStorage.setItem('chat_name', data.chatName);
                              
                              if (data.favorites) setFavorites(JSON.parse(data.favorites));
                              alert("Data restored successfully!");
                            } catch (err) {
                              alert("Invalid backup file.");
                            }
                          };
                          reader.readAsText(file);
                        }} 
                      />
                      <Upload className="w-4 h-4 text-white" />
                      IMPORT DATA
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MAIN BODY DISPLAY */}
        <main className="flex-1 min-w-0">
          
          {!selectedGame ? (
            <AnimatePresence mode="wait">
              {filter === 'chat' ? (
                <motion.div 
                  key="chat"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className={`flex flex-col w-full min-h-[550px] bg-[var(--bg-secondary)] ${headerOpen ? 'h-[calc(100vh-140px)] md:h-[calc(100vh-120px)]' : 'h-[calc(100vh-100px)] md:h-[calc(100vh-80px)]'}`}
                >
                  <ChatWorkspace onClose={() => setFilter('all')} />
                </motion.div>
              ) : filter === 'lobbychat' ? (
                <motion.div 
                  key="lobbychat"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className={`flex flex-col w-full min-h-[550px] bg-[var(--bg-secondary)] ${headerOpen ? 'h-[calc(100vh-140px)] md:h-[calc(100vh-120px)]' : 'h-[calc(100vh-100px)] md:h-[calc(100vh-80px)]'}`}
                >
                  <UserChat onClose={() => setFilter('all')} />
                </motion.div>
              ) : filter === 'info' ? (
                <motion.div 
                  key="info"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className={`flex flex-col w-full min-h-[550px] bg-[var(--bg-secondary)] ${headerOpen ? 'h-[calc(100vh-140px)] md:h-[calc(100vh-120px)]' : 'h-[calc(100vh-100px)] md:h-[calc(100vh-80px)]'}`}
                >
                  <InformationSection 
                    onClose={() => setFilter('all')} 
                    games={games}
                    onPlayGame={(game) => {
                      setSelectedGame(game);
                      setFilter('all');
                    }}
                    onGoToFeatured={() => {
                      setFilter('featured');
                      setSelectedGame(null);
                    }}
                  />
                </motion.div>
              ) : filter === 'movies' ? (
                <motion.div 
                  key="movies"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className={`flex flex-col w-full min-h-[550px] bg-[var(--bg-secondary)] ${headerOpen ? 'h-[calc(100vh-140px)] md:h-[calc(100vh-120px)]' : 'h-[calc(100vh-100px)] md:h-[calc(100vh-80px)]'}`}
                >
                  <MoviesWorkspace onClose={() => setFilter('all')} />
                </motion.div>
              ) : filter === 'youtube' ? (
                <motion.div 
                  key="youtube"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className={`flex flex-col w-full min-h-[550px] bg-[#0c0a09] border border-[var(--card-border)]/60 rounded-2xl overflow-hidden ${headerOpen ? 'h-[calc(100vh-140px)] md:h-[calc(100vh-120px)]' : 'h-[calc(100vh-100px)] md:h-[calc(100vh-80px)]'}`}
                >
                  <iframe 
                    src="https://urnperiodic.github.io/youtube1/" 
                    className="w-full h-full border-none flex-1 shadow-inner bg-[#0c0a09]"
                    allow="fullscreen"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ) : filter === 'proxy' ? (
                <motion.div 
                  key="proxy"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className={`flex flex-col w-full min-h-[550px] bg-[#0c0a09] ${headerOpen ? 'h-[calc(100vh-140px)] md:h-[calc(100vh-120px)]' : 'h-[calc(100vh-100px)] md:h-[calc(100vh-80px)]'}`}
                >
                  <iframe 
                    src="https://scramjet.mercurywork.shop/" 
                    className="w-full h-full border-none flex-1 shadow-inner bg-[#0c0a09]"
                    allow="fullscreen"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ) : (
                <motion.div 
                  key="games-list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-6"
                >
              
              <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center border-l-4 border-[var(--accent-color)] pl-3 gap-4 sm:gap-10">
                <div>
                  <h2 className="text-lg font-black uppercase tracking-wider text-[var(--text-primary)]">
                    {filter === 'all' && 'Games Library'}
                    {filter === 'favorites' && 'Bookmarked Games'}
                    {filter === 'featured' && 'Featured Showcases'}
                    {filter === 'single' && 'Singleplayer Arcades'}
                    {filter === 'multiplayer' && 'Multiplayer Hub'}
                    {filter === 'Shooter' && 'Shooter Games'}
                    {filter === 'Party' && 'Party Games'}
                    {filter === 'Sports' && 'Sports Games'}
                    {filter === 'Random' && 'Random Games'}
                    {filter === 'Emulated' && 'Emulated Archives'}
                    {filter === 'minecraft' && 'Minecraft Platform'}
                    {filter === 'Not Games' && 'Not Games'}
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Showing {filteredGames.length} unblocked resources
                  </p>
                </div>

                {/* Library Search Bar */}
                <div className="relative w-full max-w-xs">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-muted)]">
                    <Search className="h-4 w-4 text-[var(--accent-color)] animate-pulse" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search unblocked resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs rounded-xl py-2 pl-9 pr-4 border border-[var(--card-border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-color)] placeholder:opacity-50 transition-all duration-300 shadow-sm"
                  />
                </div>
              </div>

              {filteredGames.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 border border-dashed border-[var(--card-border)] rounded-2xl bg-[var(--bg-secondary)]">
                  <Gamepad2 className="w-16 h-16 text-[var(--text-muted)] stroke-1 opacity-40 animate-pulse" />
                  <p className="text-sm font-semibold mt-4 text-[var(--text-primary)]">No games found matches filter</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">Try searching a different keyword or resetting filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredGames.map(game => {
                    const isFav = favorites.includes(game.id);
                    return (
                      <motion.div 
                        key={game.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { setSelectedGame(game); setZoom(1); }}
                        className={`custom-card flex flex-col rounded-xl overflow-hidden cursor-pointer h-full transition-all duration-300 ${
                          game.featured 
                            ? 'border-amber-500/20 hover:border-amber-500/50 shadow-md hover:shadow-amber-500/5' 
                            : ''
                        }`}
                        style={{ contentVisibility: 'auto' }}
                      >
                        {/* Artwork container */}
                        <div className="relative aspect-video w-full bg-neutral-950 flex-shrink-0 flex items-center justify-center border-b border-[var(--card-border)] overflow-hidden">
                          {game.thumbnail && !failedThumbnails[game.id] ? (
                            <img 
                              src={getOptimizedThumbnail(game.thumbnail)} 
                              alt={game.title} 
                              referrerPolicy="no-referrer"
                              onError={() => setFailedThumbnails(prev => ({ ...prev, [game.id]: true }))}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                            />
                          ) : (
                            renderGameArt(game)
                          )}

                          {game.featured && (
                            <span className="absolute top-2.5 left-2.5 text-[12px] font-black uppercase tracking-widest bg-black/85 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-md inline-block z-10 shadow-sm font-mono">
                              ★ FEATURED
                            </span>
                          )}

                          <span className="absolute top-2.5 right-2.5 text-[8px] font-bold uppercase tracking-widest bg-black/75 backdrop-blur-sm text-white border border-white/10 px-2.5 py-0.5 rounded-full inline-block z-10">
                            {game.category}
                          </span>

                          <button
                            onClick={(e) => toggleFavorite(e, game.id)}
                            className={`absolute top-2.5 ${game.featured ? 'left-[120px]' : 'left-2.5'} p-1.5 rounded-full bg-black/40 hover:bg-black/80 text-white/90 border border-white/10 hover:text-rose-500 hover:scale-110 active:scale-95 transition-all duration-200 z-10`}
                            title={isFav ? "Remove Bookmark" : "Add Bookmark"}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                          </button>

                          {game.isAiGenerated && (
                            <span className="absolute bottom-2.5 left-2.5 text-[8px] font-extrabold tracking-widest bg-purple-950/85 backdrop-blur-sm text-purple-400 border border-purple-500/40 px-2 py-0.5 rounded-full inline-block z-10 shadow-sm font-mono uppercase">
                              ✧ AI Generated
                            </span>
                          )}
                        </div>

                        {/* Title and descriptions */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div className="space-y-1.5">
                            <h3 className={`text-sm font-black line-clamp-1 leading-snug transition-colors flex items-center gap-1.5 ${
                              game.featured 
                                ? 'text-[var(--text-primary)] group-hover:text-amber-400' 
                                : 'text-[var(--text-primary)] group-hover:text-[var(--accent-color)]'
                            }`}>
                              <span>{game.title}</span>
                              {game.isAiGenerated && (
                                <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30 whitespace-nowrap">
                                  AI
                                </span>
                              )}
                            </h3>
                            <p className="text-xs text-[var(--text-muted)] line-clamp-3 leading-relaxed">
                              {game.description}
                            </p>
                          </div>

                          {game.featured ? (
                            <button
                              onClick={() => { setSelectedGame(game); setZoom(1); }}
                              className="w-full mt-3 border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500 hover:text-black hover:font-bold hover:shadow-[0_0_12px_rgba(245,158,11,0.5)] text-[11px] font-semibold tracking-wider text-amber-400 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-250 self-end uppercase cursor-pointer"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>LAUNCH PORTAL</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => { setSelectedGame(game); setZoom(1); }}
                              className="w-full mt-3 border border-[var(--accent-color)] hover:bg-[var(--accent-color)] hover:text-black hover:font-bold hover:shadow-[0_0_12px_calc(var(--accent-color))] text-[11px] font-semibold tracking-wider text-[var(--accent-color)] py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-200 self-end"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Open Article</span>
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>
          ) : selectedGame.title === 'Bloons TD 5 Sandbox' ? (
          <div className="flex flex-col gap-4 animate-fade-in bg-[#0c0f16]/90 p-4 md:p-6 rounded-2xl border border-zinc-800 shadow-2xl">
            <div className="flex justify-start">
              <button
                onClick={() => setSelectedGame(null)}
                className="flex items-center gap-2 border border-[var(--card-border)] hover:border-[var(--accent-color)] text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-all font-mono py-1.5 px-3.5 rounded-lg text-xs font-bold bg-[var(--bg-secondary)] leading-normal cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Go back to game grid</span>
              </button>
            </div>
            <BloonsSandbox onClose={() => setSelectedGame(null)} />
          </div>
        ) : (
            /* ACTIVE GAME SCREEN */
            <div className={`flex flex-col gap-4 animate-fade-in ${windowFullscreen ? 'fixed inset-0 z-[9999] bg-[#0c0f16] p-4 w-screen h-screen overflow-hidden' : ''}`}>
              
              {/* Controls bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-[var(--card-border)] bg-[var(--bg-secondary)] rounded-xl py-3 px-4 gap-3 shadow-inner">
                
                <button
                  onClick={() => setSelectedGame(null)}
                  className="flex items-center gap-2 border border-[var(--card-border)] hover:border-[var(--accent-color)] text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-all font-mono py-1.5 px-3.5 rounded-lg text-xs font-bold leading-normal cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Go back</span>
                </button>

                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
                    {selectedGame.title}
                    <span className="text-[9px] uppercase tracking-wider font-mono px-2 py-0.5 rounded border border-[var(--card-border)] bg-[var(--bg-color)] text-[var(--accent-color)]">
                      {selectedGame.category}
                    </span>
                    {selectedGame.isAiGenerated && (
                      <span className="text-[9px] uppercase tracking-wider font-mono px-2 py-0.5 rounded border border-purple-500/30 bg-purple-500/10 text-purple-400">
                        ✧ AI Generated
                      </span>
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  
                  {/* Zoom controls */}
                  <div className="flex items-center bg-[var(--bg-color)] border border-[var(--card-border)] rounded-lg overflow-hidden p-0.5">
                    <button
                      onClick={() => setZoom(z => Math.max(0.4, z - 0.1))}
                      className="p-1 px-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--card-bg)] rounded transition-colors"
                      title="Zoom Out"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] px-2 font-mono text-[var(--text-primary)] font-bold select-none">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      onClick={() => setZoom(z => Math.min(1.8, z + 0.1))}
                      className="p-1 px-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--card-bg)] rounded transition-colors"
                      title="Zoom In"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setZoom(1)}
                      className="p-1 px-1.5 text-xs text-[var(--accent-color)] font-mono hover:bg-[var(--card-bg)] rounded transition-colors"
                      title="Reset Zoom"
                    >
                      Res
                    </button>
                  </div>

                  {/* Reload button */}
                  <button
                    onClick={() => {
                      const iframe = document.getElementById('game-frame');
                      if (iframe) iframe.src = iframe.src;
                    }}
                    className="p-1.5 border border-[var(--card-border)] hover:border-[var(--accent-color)] bg-[var(--bg-color)] rounded-lg text-[var(--text-primary)] transition-all cursor-pointer"
                    title="Reload game frame session"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  {/* Window Fullscreen button */}
                  <button
                    onClick={() => setWindowFullscreen(!windowFullscreen)}
                    className={`flex items-center gap-1.5 border py-1.5 px-3 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                      windowFullscreen
                        ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/10 text-[var(--accent-color)] font-bold shadow-[0_0_8px_rgba(0,229,176,0.15)]'
                        : 'border-[var(--card-border)] hover:border-[var(--accent-color)] bg-[var(--bg-color)] text-[var(--text-primary)] hover:text-[var(--accent-color)]'
                    }`}
                    title="Toggle Window Fullscreen"
                  >
                    {windowFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline text-[10px] font-bold">
                      {windowFullscreen ? 'EXIT WINDOW FS' : 'WINDOW FS'}
                    </span>
                  </button>

                  {/* Fullscreen button */}
                  <button
                    onClick={() => {
                      const container = document.getElementById('frame-viewport');
                      if (container) {
                        if (document.fullscreenElement) {
                          document.exitFullscreen();
                        } else {
                          container.requestFullscreen();
                        }
                      }
                    }}
                    className="flex items-center gap-1.5 border border-[var(--card-border)] hover:border-[var(--accent-color)] bg-[var(--bg-color)] py-1.5 px-3 rounded-lg text-xs font-mono text-[var(--text-primary)] font-medium transition-all cursor-pointer"
                    title="Toggle Fullscreen Arena"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[10px] font-bold">FULLSCREEN</span>
                  </button>

                  {/* Open in New Tab button */}
                  <button
                    onClick={() => {
                      const win = window.open("about:blank", "_blank");
                      if (!win) {
                        alert("Popup blocked. Allow popups for this site.");
                        return;
                      }

                      const bookSvgDataUri = "https://ssl.gstatic.com/classroom/favicon.png";
                      let tabTitle = selectedGame.title;
                      let tabFavicon = bookSvgDataUri;
                      if (decoyType === 'classroom') {
                        tabTitle = "Home - Classroom";
                        tabFavicon = "https://ssl.gstatic.com/classroom/favicon.png";
                      } else if (decoyType === 'clever') {
                        tabTitle = "Clever | Log in with Clever";
                        tabFavicon = "https://www.google.com/s2/favicons?sz=64&domain=clever.com";
                      } else if (decoyType === 'campus') {
                        tabTitle = "Campus Student";
                        tabFavicon = "https://jerseycitynj.infinitecampus.org/campus/favicon-32x32.png";
                      } else if (decoyType === 'docs') {
                        tabTitle = "Google Docs";
                        tabFavicon = "https://www.google.com/s2/favicons?sz=64&domain=docs.google.com";
                      } else if (decoyType === 'gmail') {
                        tabTitle = "Inbox - Jersey City Public Schools";
                        tabFavicon = "https://www.google.com/s2/favicons?sz=64&domain=mail.google.com";
                      }

                      win.document.write(`
                        <!DOCTYPE html>
                        <html>
                        <head>
                          <title>${tabTitle}</title>
                          <link rel="icon" href="${tabFavicon}">
                          <link rel="shortcut icon" href="${tabFavicon}">
                          <meta charset="utf-8">
                          <style>
                            html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #ffffff; }
                            iframe { width: 100vw; height: 100vh; border: none; display: block; }
                          </style>
                        </head>
                        <body>
                          <iframe src="${selectedGame.url}" allow="fullscreen" referrerpolicy="no-referrer"></iframe>
                        </body>
                        </html>
                      `);
                      win.document.close();
                    }}
                    className="flex items-center gap-1.5 border border-[var(--card-border)] hover:border-[var(--accent-color)] bg-[var(--bg-color)] py-1.5 px-3 rounded-lg text-xs font-mono text-[var(--text-primary)] font-medium transition-all cursor-pointer"
                    title="Open Game in New Tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[10px] font-bold">OPEN IN NEW TAB</span>
                  </button>

                  {/* Lobby Chat Toggle Button */}
                  <button
                    onClick={() => setDockedChatCollapsed(!dockedChatCollapsed)}
                    className={`flex items-center gap-1.5 border py-1.5 px-3 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                      !dockedChatCollapsed 
                        ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/10 text-[var(--accent-color)] font-bold shadow-[0_0_8px_rgba(0,229,176,0.15)]' 
                        : 'border-[var(--card-border)] hover:border-[var(--accent-color)] bg-[var(--bg-color)] text-[var(--text-primary)] hover:text-[var(--accent-color)]'
                    }`}
                    title="Toggle Live Lobby Chat inside Game Arena"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[10px] font-bold">
                      {dockedChatCollapsed ? 'OPEN CHAT' : 'CLOSE CHAT'}
                    </span>
                  </button>



                </div>

              </div>

              {/* Game Arena with Side-by-Side Docked Chat */}
              <div 
                id="game-arena-container"
                className={`flex flex-col lg:flex-row gap-0 w-full relative ${windowFullscreen ? 'flex-1 min-h-0' : 'h-[65vh] min-h-[500px]'}`}
              >
                {/* Game Viewport Container */}
                <div 
                  id="frame-viewport"
                  className="flex-1 h-full rounded-2xl border border-[var(--card-border)] bg-black overflow-hidden relative shadow-lg"
                >
                  <div 
                    className="w-full h-full duration-150 transition-transform origin-top-left"
                    style={{ 
                      transform: `scale(${zoom})`,
                      width: `${100 / zoom}%`,
                      height: `${100 / zoom}%`
                    }}
                  >
                    <iframe 
                      id="game-frame"
                      src={selectedGame.url} 
                      className="w-full h-full border-none"
                      title={selectedGame.title}
                      allowFullScreen
                      referrerPolicy="no-referrer"
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    />
                  </div>
                </div>

                {/* RESIZE HANDLE - only on desktop (lg) and when chat is NOT collapsed */}
                {!dockedChatCollapsed && (
                  <div 
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setIsDraggingDock(true);
                    }}
                    className={`hidden lg:block w-3 hover:w-3.5 self-stretch cursor-col-resize transition-all duration-150 relative z-30 shrink-0 select-none ${
                      isDraggingDock ? 'bg-[var(--accent-color)]/20' : 'bg-transparent hover:bg-white/5'
                    }`}
                    title="Drag to resize chat"
                  >
                    {/* Vertical line indicator */}
                    <div className={`absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-0.5 h-16 rounded-full transition-all ${
                      isDraggingDock ? 'bg-[var(--accent-color)] h-24 w-1' : 'bg-neutral-700'
                    }`} />
                  </div>
                )}

                {/* DOCKED LIVE LOBBY CHAT */}
                {!dockedChatCollapsed && (
                  <div 
                    style={{ width: window.innerWidth >= 1024 ? `${dockedChatWidth}px` : '100%' }}
                    className="w-full lg:h-full h-[320px] shrink-0 flex flex-col bg-[#070a11] border border-[var(--card-border)]/50 rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <div className="bg-[#0b0f19] px-2.5 py-1.5 border-b border-white/5 flex items-center justify-between shrink-0">
                      <span className="text-[9px] font-black text-[var(--accent-color)] uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Lobby Live Chat
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-bold text-neutral-400">Play & Chat!</span>
                        <button
                          onClick={() => setDockedChatCollapsed(true)}
                          className="p-1 hover:bg-white/10 text-neutral-400 hover:text-white rounded transition-all cursor-pointer flex items-center justify-center"
                          title="Collapse Chat"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 min-h-0">
                      <UserChat onClose={() => {}} isMini={true} />
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

        </main>
      </div>



    </div>
  );
}
