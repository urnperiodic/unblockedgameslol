import { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Home, 
  Search, 
  Globe, 
  ExternalLink, 
  Info, 
  X,
  Compass,
  BookOpen,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export default function BrowserWorkspace({ onClose }) {
  const [urlInput, setUrlInput] = useState('');
  const [currentUrl, setCurrentUrl] = useState('home');
  const [history, setHistory] = useState(['home']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [iframeKey, setIframeKey] = useState(0);
  const [siteLock, setSiteLock] = useState('');
  const [cleanMode, setCleanMode] = useState(true);
  const iframeRef = useRef(null);

  // Popular and useful learning & utility sites that allow iframing
  const quickLinks = [
    { title: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Main_Page', icon: BookOpen, desc: 'The Free Encyclopedia', category: 'Reference' },
    { title: 'DuckDuckGo Search', url: 'https://html.duckduckgo.com/html/', icon: Search, desc: 'Privacy-focused HTML Search', category: 'Search' },
    { title: 'Internet Archive', url: 'https://archive.org/', icon: Compass, desc: 'Digital library of books & movies', category: 'Reference' },
    { title: 'Open Library', url: 'https://openlibrary.org/', icon: BookOpen, desc: 'Millions of free digital books', category: 'Reading' },
    { title: 'PhET Science Simulations', url: 'https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_all.html', icon: Sparkles, desc: 'Interactive physics & math sims', category: 'Science' },
    { title: 'GeoGebra Math', url: 'https://www.geogebra.org/m/xqfzyfsh', icon: HelpCircle, desc: 'Interactive math tools', category: 'Mathematics' }
  ];

  const navigateTo = (url, customSiteLock, customCleanMode) => {
    let targetUrl = url;
    const activeSiteLock = customSiteLock !== undefined ? customSiteLock : siteLock;
    const activeCleanMode = customCleanMode !== undefined ? customCleanMode : cleanMode;
    
    // Check if it's a search query or a website URL
    if (url !== 'home') {
      const isUrlPattern = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/.*)?$/i.test(url.trim());
      if (isUrlPattern) {
        if (!/^https?:\/\//i.test(url)) {
          targetUrl = 'https://' + url.trim();
        } else {
          targetUrl = url.trim();
        }
      } else {
        // Run DuckDuckGo search query with optional site lock and clean mode parameters
        let searchQuery = url.trim();
        if (activeSiteLock.trim()) {
          const domain = activeSiteLock.replace(/^(https?:\/\/)?(www\.)?/, '').trim();
          if (domain) {
            searchQuery = `${searchQuery} site:${domain}`;
          }
        }
        
        targetUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(searchQuery)}`;
        
        if (activeCleanMode) {
          targetUrl += `&k0=-2&k1=-1`;
        }
      }
    }

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(targetUrl);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentUrl(targetUrl);
    if (targetUrl !== 'home') {
      setUrlInput(targetUrl);
    } else {
      setUrlInput('');
    }
  };

  const handleGoBack = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      setHistoryIndex(prevIdx);
      const url = history[prevIdx];
      setCurrentUrl(url);
      setUrlInput(url === 'home' ? '' : url);
    }
  };

  const handleGoForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      const url = history[nextIdx];
      setCurrentUrl(url);
      setUrlInput(url === 'home' ? '' : url);
    }
  };

  const handleReload = () => {
    setIframeKey(prev => prev + 1);
  };

  const handleGoHome = () => {
    navigateTo('home');
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (urlInput.trim()) {
      navigateTo(urlInput);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-neutral-950 text-neutral-200 font-sans select-none overflow-hidden rounded-2xl border border-neutral-800">
      {/* Top Browser URL Bar / Controls */}
      <div className="flex items-center gap-2 p-2.5 bg-neutral-900 border-b border-neutral-800 flex-wrap sm:flex-nowrap">
        
        {/* Navigation Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleGoBack}
            disabled={historyIndex === 0}
            className="p-1.5 rounded-lg hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent text-neutral-300 transition-colors cursor-pointer"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleGoForward}
            disabled={historyIndex === history.length - 1}
            className="p-1.5 rounded-lg hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent text-neutral-300 transition-colors cursor-pointer"
            title="Forward"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleReload}
            disabled={currentUrl === 'home'}
            className="p-1.5 rounded-lg hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent text-neutral-300 transition-colors cursor-pointer"
            title="Reload Frame"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleGoHome}
            className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-300 transition-colors cursor-pointer"
            title="Browser Home"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>

        {/* Address / Search Input Form */}
        <form onSubmit={handleInputSubmit} className="flex-1 min-w-[200px] flex items-center relative">
          <div className="absolute left-3 text-neutral-500 flex items-center pointer-events-none">
            {currentUrl === 'home' ? <Search className="w-4 h-4" /> : <Globe className="w-4 h-4 text-emerald-400" />}
          </div>
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Type website URL or enter search query..."
            className="w-full pl-9 pr-10 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-mono text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors focus:ring-1 focus:ring-neutral-700 placeholder:text-neutral-600"
          />
          {urlInput && (
            <button
              type="button"
              onClick={() => setUrlInput('')}
              className="absolute right-3.5 text-neutral-500 hover:text-neutral-300 text-xs font-bold"
              title="Clear text"
            >
              ✕
            </button>
          )}
        </form>

        {/* Browser Quick External Open */}
        <div className="flex items-center gap-1.5 ml-auto">
          {currentUrl !== 'home' && (
            <a
              href={currentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-950 hover:bg-neutral-800 text-neutral-300 transition-colors text-[10px] font-mono font-bold flex items-center gap-1.5"
              title="Open active page in a real external window"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">EXTERNAL</span>
            </a>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
              title="Exit Browser"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Sandbox Frame viewport */}
      <div className="flex-1 w-full bg-neutral-950 relative overflow-hidden">
        {currentUrl === 'home' ? (
          /* Secure Browser Starting Page */
          <div className="w-full h-full overflow-y-auto flex flex-col items-center justify-start p-6 md:p-10 select-text max-w-4xl mx-auto scrollbar-thin">
            
            {/* Branding / Greeting */}
            <div className="text-center mb-8 mt-4 animate-fade-in">
              <div className="inline-flex p-3 bg-neutral-900 border border-neutral-800 rounded-2xl mb-3 text-neutral-100">
                <Globe className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-wider text-white">StudyTools Secure Browser</h2>
              <p className="text-xs text-neutral-400 mt-1.5 max-w-md mx-auto">
                Search educational articles and display frame-friendly learning platforms safely under a single, fully-cloaked environment.
              </p>
            </div>

            {/* In-Home Custom DuckDuckGo Search Form */}
            <div className="w-full max-w-xl bg-neutral-900 border border-neutral-800 p-5 rounded-2xl shadow-xl mb-8">
              <h3 className="text-xs font-black text-white mb-3.5 uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-4 h-4 text-emerald-400" />
                <span>Custom DuckDuckGo Engine</span>
              </h3>
              
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target;
                  const query = form.elements.query.value;
                  if (query.trim()) navigateTo(query);
                }}
                className="flex flex-col gap-3"
              >
                {/* Clean Mode & Site Lock Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-neutral-800">
                  {/* Site Lock Setting */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      Target Website Lock (Optional)
                    </label>
                    <input
                      type="text"
                      value={siteLock}
                      onChange={(e) => setSiteLock(e.target.value)}
                      placeholder="e.g. wikipedia.org"
                      className="bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-[10px] text-neutral-300 placeholder:text-neutral-700 focus:outline-none focus:border-neutral-600 font-mono"
                    />
                  </div>

                  {/* Clean Mode Toggler */}
                  <div className="flex flex-col justify-end">
                    <button
                      type="button"
                      onClick={() => setCleanMode(!cleanMode)}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-lg border text-[10px] font-mono font-bold transition-all ${
                        cleanMode 
                          ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400 hover:bg-emerald-950/60' 
                          : 'bg-neutral-950 border-neutral-800 text-neutral-500 hover:text-neutral-400'
                      }`}
                    >
                      <span>CLEAN DDG (NO ADS)</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${cleanMode ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-600'}`} />
                    </button>
                  </div>
                </div>

                {/* The main search query row */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="query"
                    placeholder={siteLock ? `Search within ${siteLock}...` : "Ask anything (e.g. quantum physics, calculus derivatives)..."}
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 font-medium"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600 text-neutral-950 px-5 py-2.5 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5 shrink-0" />
                    <span>SEARCH</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Links Bookmarks */}
            <div className="w-full mb-8">
              <h3 className="text-xs font-black text-neutral-400 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>Frame-Friendly Learning Resources</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {quickLinks.map((link, idx) => {
                  const LinkIcon = link.icon;
                  return (
                    <div 
                      key={idx}
                      onClick={() => navigateTo(link.url)}
                      className="group bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/80 p-3 rounded-xl cursor-pointer transition-all flex items-start gap-3 select-none"
                    >
                      <div className="p-2 bg-neutral-950 rounded-lg group-hover:bg-neutral-800 transition-colors text-white mt-0.5">
                        <LinkIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white leading-tight group-hover:text-emerald-400 transition-colors truncate">
                            {link.title}
                          </h4>
                          <span className="text-[8px] font-mono uppercase bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded border border-neutral-700">
                            {link.category}
                          </span>
                        </div>
                        <p className="text-[10px] text-neutral-400 leading-snug mt-0.5">
                          {link.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Framability Policy Warning/Disclaimer */}
            <div className="w-full bg-neutral-900/40 border border-neutral-800/60 rounded-xl p-3.5 flex gap-3 text-left">
              <Info className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-neutral-300">About Website Embedded Frames</h4>
                <p className="text-[10px] text-neutral-500 leading-relaxed mt-1">
                  Many massive websites (such as Google, YouTube, Instagram, or Wikipedia under certain configurations) actively request web browsers to block embedding inside an iframe (via <code>X-Frame-Options: SAMEORIGIN</code>). If you encounter a blank page or a connection refusal, click the <strong>"EXTERNAL"</strong> action button in the URL bar above to open the exact destination in a real standalone tab.
                </p>
              </div>
            </div>

          </div>
        ) : (
          /* Active URL Iframe */
          <iframe
            key={iframeKey}
            ref={iframeRef}
            src={currentUrl}
            className="w-full h-full border-none bg-black"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            referrerPolicy="no-referrer"
          />
        )}
      </div>
    </div>
  );
}
