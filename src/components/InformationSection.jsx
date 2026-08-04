import { 
  Info, 
  ExternalLink, 
  ShieldCheck, 
  Globe, 
  HelpCircle, 
  FormInput,
  Sparkles,
  Play
} from 'lucide-react';

// ============================================================================
// EASY-TO-EDIT FAQ DATA
// To add, remove, or modify FAQ items, simply edit the list below.
// Each item needs a "question" and an "answer".
// ============================================================================
const FAQ_ITEMS = [
  {
    question: "How do I play games on this platform?",
    answer: "Simply navigate to the Games tab, click on any game card that catches your eye, and it will load instantly in your browser."
  },
  {
    question: "How do I add games to my Favorites?",
    answer: "You can click on the heart icon on any game card or during gameplay to save it to your Favorites for quick access later."
  },
  {
    question: "Is my gameplay data or score saved?",
    answer: "Yes, your favorites, settings, and local statistics are safely stored in your browser's local storage. Clearing your browser cache may reset this data."
  },
  {
    question: "Can I request new games to be added?",
    answer: "Yes! Click the button in the 'Request a Game' section right here in the Information Hub to access our official submission form."
  }
];

const InformationSection = ({ onClose, games = [], onPlayGame, onGoToFeatured }) => {
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfBl2zv9a0QLxSC9K_reAhdy0wfM61ecYeE8yqQhF7Cwh8CDA/viewform";

  const featuredGames = games.filter(g => g.featured);

  return (
    <div className="flex flex-col w-full h-full animate-fade-in bg-[var(--bg-secondary)] overflow-y-auto p-6 md:p-10">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[var(--accent-color)] text-[var(--bg-color)] shadow-lg shadow-[var(--accent-color)]/20">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tighter text-[var(--text-primary)]">Information Hub</h1>
              <p className="text-sm text-[var(--text-muted)] font-medium">Learn more about our platform and resources</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="relative px-5 py-2.5 rounded-xl bg-[var(--accent-color)] text-[var(--bg-color)] font-bold transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border border-transparent animate-pulse-glow"
          >
            <span className="relative text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              ← Back to Games
            </span>
          </button>
        </div>

        {/* FEATURED BANNER BUTTON */}
        {featuredGames && featuredGames.length > 0 && (
          <div className="bg-[var(--card-bg)] border border-amber-500/20 rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3.5 rounded-2xl bg-amber-500/15 text-amber-400">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-wider text-[var(--text-primary)]">Featured Showcases</h3>
                <p className="text-xs text-[var(--text-muted)]">Explore our handpicked, high-performance unblocked portals and resources.</p>
              </div>
            </div>

            <button
              onClick={onGoToFeatured}
              className="relative z-10 px-5 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-black text-xs font-black uppercase tracking-wider transition-all duration-250 flex items-center gap-2 border border-amber-500/30 cursor-pointer shadow-md shadow-amber-500/5 hover:shadow-amber-500/20 active:scale-95 whitespace-nowrap self-stretch sm:self-auto justify-center"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Go to Featured Section</span>
            </button>
          </div>
        )}

        {/* REQUEST A GAME / CONTACT US SECTION (Linking to Google Form & Discord) */}
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-color)]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
            <div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-wider">Contact us</h3>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-sm text-[var(--text-muted)] font-medium">
                Submit a game request or join our active community on Discord to chat with other players and staff!
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[var(--accent-color)] text-[var(--bg-color)] font-bold text-xs uppercase tracking-widest py-3.5 px-6 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-[var(--accent-color)]/10"
              >
                <FormInput className="w-4 h-4" />
                Request a game
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href="https://discord.gg/DjjX5A9uv"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#5865F2] text-white font-bold text-xs uppercase tracking-widest py-3.5 px-6 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-indigo-500/10"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 127.14 96.36" xmlns="http://www.w3.org/2000/svg">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.88-.65,1.72-1.34,2.51-2a75.58,75.58,0,0,0,73.1,0c.79.71,1.63,1.4,2.51,2a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31.06-18.83C129.82,49.26,123.63,26.4,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
                </svg>
                Join Discord
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>
        </div>

        {/* Grid Info Column (About and Privacy) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-[var(--accent-color)]" />
              <h3 className="text-lg font-bold text-[var(--text-primary)] uppercase tracking-wide">About Platform</h3>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Our platform is dedicated to providing high-quality, unblocked entertainment and educational resources. 
              We curate a wide range of content from arcades and simulators to interactive learning tools, 
              ensuring accessibility across various environments.
            </p>
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-[var(--accent-color)]" />
              <h3 className="text-lg font-bold text-[var(--text-primary)] uppercase tracking-wide">Privacy & Safety</h3>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              We prioritize user safety and privacy. Our platform uses local storage for personal preferences 
              and does not track sensitive information. All third-party resources are vetted for quality and 
              appropriateness within school and work settings.
            </p>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 md:p-8 mb-10">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
            <HelpCircle className="w-5 h-5 text-[var(--accent-color)]" />
            <h3 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-wider">Frequently Asked Questions</h3>
          </div>
          <div className="space-y-6">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx} className="group border-l-2 border-[var(--accent-color)]/30 hover:border-[var(--accent-color)] pl-4 transition-all duration-200">
                <h4 className="text-base font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-color)] transition-colors">
                  {item.question}
                </h4>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center py-10 opacity-30">
          {/* Version text P tag deleted as requested by the user */}
        </div>
      </div>
    </div>
  );
};

export default InformationSection;
