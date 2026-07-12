import { useState } from 'react';
import { 
  initialDecks, 
  dynamicAIGenerateDecks 
} from '../data/workspaceData';
import { 
  Layers, 
  Plus, 
  RotateCw, 
  Check, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  BookOpen, 
  Trash2,
  BookmarkCheck,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export default function FlashcardsWorkspace({ refArticle, onGeneratedSuccess }) {
  const [decks, setDecks] = useState(() => {
    try {
      const saved = localStorage.getItem('school-decks');
      return saved ? JSON.parse(saved) : initialDecks;
    } catch {
      return initialDecks;
    }
  });

  const [activeDeckId, setActiveDeckId] = useState(() => decks[0]?.id || null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Custom Deck creation state
  const [showCreateDeckModal, setShowCreateDeckModal] = useState(false);
  const [newDeckTitle, setNewDeckTitle] = useState('');
  const [newDeckSubject, setNewDeckSubject] = useState('Science');
  
  // Track mastery status of cards in current active deck
  // cardId -> 'learned' | 'review' | null
  const [cardMastery, setCardMastery] = useState({});

  // Handlers to save to localStorage
  const saveDecks = (updated) => {
    setDecks(updated);
    try {
      localStorage.setItem('school-decks', JSON.stringify(updated));
    } catch (e) {
      // safe fallthrough
    }
  };

  // AI prompt input state
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const activeDeck = decks.find(d => d.id === activeDeckId) || decks[0];

  const handleNext = () => {
    if (!activeDeck) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % activeDeck.cards.length);
    }, 150);
  };

  const handlePrev = () => {
    if (!activeDeck) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev - 1 + activeDeck.cards.length) % activeDeck.cards.length);
    }, 150);
  };

  const markLearned = (cardId, status) => {
    setCardMastery(prev => ({
      ...prev,
      [cardId]: status
    }));
    handleNext();
  };

  // Add card to current active deck
  const [customFront, setCustomFront] = useState('');
  const [customBack, setCustomBack] = useState('');
  const [showAddCard, setShowAddCard] = useState(false);

  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    if (!customFront.trim() || !customBack.trim() || !activeDeck) return;

    const newCard = {
      id: `fc-custom-${Date.now()}`,
      front: customFront.trim(),
      back: customBack.trim()
    };

    const updatedDecks = decks.map(d => {
      if (d.id === activeDeck.id) {
        return {
          ...d,
          cards: [...d.cards, newCard]
        };
      }
      return d;
    });

    saveDecks(updatedDecks);
    setCustomFront('');
    setCustomBack('');
    setShowAddCard(false);
  };

  const handleCreateDeckSubmit = (e) => {
    e.preventDefault();
    if (!newDeckTitle.trim()) return;

    const newDeck = {
      id: `deck-custom-${Date.now()}`,
      title: newDeckTitle.trim(),
      subject: newDeckSubject,
      cards: [
        {
          id: `fc-${Date.now()}-1`,
          front: "Front of Card 1 (Sample)",
          back: "Back of Card 1 (Click to reveal)"
        }
      ]
    };

    const updated = [newDeck, ...decks];
    saveDecks(updated);
    setActiveDeckId(newDeck.id);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setCardMastery({});
    setNewDeckTitle('');
    setShowCreateDeckModal(false);
  };

  const handleDeleteDeck = (deckId, e) => {
    e.stopPropagation();
    if (decks.length <= 1) {
      alert("You must keep at least one study deck.");
      return;
    }
    const updated = decks.filter(d => d.id !== deckId);
    saveDecks(updated);
    if (activeDeckId === deckId) {
      setActiveDeckId(updated[0]?.id || null);
      setCurrentCardIndex(0);
      setIsFlipped(false);
      setCardMastery({});
    }
  };

  const triggerAIGenerator = (promptText, subjectText = "Science") => {
    if (!promptText.trim()) return;
    setIsAiGenerating(true);
    let progress = 0;

    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(interval);
        const generated = dynamicAIGenerateDecks(promptText, subjectText);
        const updated = [generated, ...decks];
        saveDecks(updated);
        setActiveDeckId(generated.id);
        setCurrentCardIndex(0);
        setIsFlipped(false);
        setCardMastery({});
        setIsAiGenerating(false);
        setAiPrompt('');
        if (onGeneratedSuccess) {
          onGeneratedSuccess("flashcards");
        }
      }
    }, 80);
  };

  // Generate directly from matching the active reading article
  const handleArticleQuickBuild = () => {
    if (!refArticle) return;
    triggerAIGenerator(`Generate flashcard based on standard article: ${refArticle.title}`, refArticle.category);
  };

  // Card stats
  const cardsInDeck = activeDeck ? activeDeck.cards : [];
  const learnedCount = cardsInDeck.filter(c => cardMastery[c.id] === 'learned').length;
  const reviewCount = cardsInDeck.filter(c => cardMastery[c.id] === 'review').length;
  const masteredPercentage = cardsInDeck.length > 0 ? Math.round((learnedCount / cardsInDeck.length) * 100) : 0;

  return (
    <div className="flex flex-col gap-6 h-full select-text max-h-[85vh] overflow-y-auto pr-1">
      
      {/* Subject Preset Flags & quick creator row */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-[var(--card-border)] pb-4">
        <div>
          <h3 className="text-base font-extrabold flex items-center gap-2 text-[var(--text-primary)]">
            <Layers className="text-[var(--accent-color)] w-5 h-5" />
            Study Flashcards Hub
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Memorize core school theories, play self-test modes, or generate custom smart-cards.
          </p>
        </div>

        {/* Quick creator row */}
        <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto">
          <button
            onClick={() => setShowCreateDeckModal(true)}
            className="text-[10px] bg-[var(--bg-secondary)] border border-[var(--card-border)] hover:border-[var(--text-muted)]/50 text-[var(--text-primary)] px-3 py-1.5 rounded-xl font-bold font-mono transition-all flex items-center gap-1 cursor-pointer ml-auto lg:ml-0"
          >
            <Plus className="w-3.5 h-3.5 text-[var(--accent-color)]" />
            <span>CREATE EMPTY DECK</span>
          </button>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        
        {/* Sidebar Left: Decks feed (col index 2) */}
        <div className="md:col-span-2 flex flex-col gap-3 max-h-[500px] overflow-y-auto">
          <span className="text-[10px] font-mono tracking-wider text-[var(--text-muted)] uppercase select-none font-bold">
            Select Study Deck
          </span>

          <div className="flex flex-col gap-2">
            {decks.map((deck) => {
              const isActive = deck.id === activeDeckId;
              return (
                <div
                  key={deck.id}
                  onClick={() => {
                    setActiveDeckId(deck.id);
                    setCurrentCardIndex(0);
                    setIsFlipped(false);
                    setCardMastery({});
                  }}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex justify-between items-center ${
                    isActive
                      ? 'bg-[var(--accent-color)]/10 border-[var(--accent-color)] shadow-sm'
                      : 'bg-[var(--bg-secondary)] border-[var(--card-border)] hover:border-[var(--text-muted)]/40'
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[8px] font-bold font-mono px-1.5 py-0.5 rounded bg-[var(--input-fill)] text-[var(--accent-color)] uppercase">
                        {deck.subject}
                      </span>
                      <span className="text-[9px] text-[var(--text-muted)] font-mono">
                        {deck.cards.length} cards
                      </span>
                    </div>
                    <h4 className="text-[11px] font-bold text-[var(--text-primary)] line-clamp-1 leading-snug">
                      {deck.title}
                    </h4>
                  </div>

                  <button
                    onClick={(e) => handleDeleteDeck(deck.id, e)}
                    className="p-1 rounded text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 cursor-pointer"
                    title="Delete Deck"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

        </div>

        {/* Study Arena (col index 3) */}
        {activeDeck ? (
          <div className="md:col-span-3 flex flex-col gap-4">
            
            {/* Card Viewer Panel */}
            <div className="flex flex-col gap-3 bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-2xl p-5 relative min-h-[340px] justify-between">
              
              {/* Card Meta Row */}
              <div className="flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)] select-none">
                <span>DECK: {activeDeck.title}</span>
                <span>
                  Card {currentCardIndex + 1} of {cardsInDeck.length}
                </span>
              </div>

              {/* INTERACTIVE 3D FLIP CARD CONTAINER */}
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full h-48 cursor-pointer relative select-none [perspective:1000px] my-3 group"
              >
                <div 
                  className={`w-full h-full relative transition-all duration-500 [transform-style:preserve-3d] ${
                    isFlipped ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  
                  {/* Front Face */}
                  <div className="absolute inset-0 bg-[var(--card-bg)] border border-[var(--card-border)] group-hover:border-[var(--accent-color)]/50 rounded-xl p-5 flex flex-col justify-between items-center text-center [backface-visibility:hidden] transition-colors">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-color)] font-semibold mb-2">
                      Front of Card
                    </span>
                    <h4 className="text-sm font-extrabold text-[var(--text-primary)] select-text flex-1 flex items-center justify-center max-w-sm">
                      {cardsInDeck[currentCardIndex]?.front || "Add cards to start"}
                    </h4>
                    <span className="text-[9px] font-mono text-[var(--text-muted)] flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity mt-2">
                      <RotateCw className="w-3 h-3 text-[var(--accent-color)] animate-pulse" />
                      <span>CLICK CARD TO FLIP</span>
                    </span>
                  </div>

                  {/* Back Face */}
                  <div className="absolute inset-0 bg-[var(--bg-color)] border border-[var(--accent-color)]/40 rounded-xl p-5 flex flex-col justify-between items-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] select-text">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-color)] font-semibold mb-2">
                      Correct Answer / Definition
                    </span>
                    <p className="text-xs leading-relaxed text-[var(--text-primary)] font-medium flex-1 flex items-center justify-center max-w-sm select-text">
                      {cardsInDeck[currentCardIndex]?.back || ""}
                    </p>
                    <span className="text-[9px] font-mono text-[var(--text-muted)] flex items-center gap-1 opacity-70">
                      <RotateCw className="w-3 h-3" />
                      <span>CLICK TO FLIP REVERSE</span>
                    </span>
                  </div>

                </div>
              </div>

              {/* Slider / Actions Bottom Row */}
              {cardsInDeck.length > 0 ? (
                <div className="flex flex-col gap-3 select-none">
                  
                  {/* Flip Actions: Learned vs Review */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => markLearned(cardsInDeck[currentCardIndex].id, 'review')}
                      className={`text-[10.5px] font-bold font-mono py-2 rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all border ${
                        cardMastery[cardsInDeck[currentCardIndex].id] === 'review'
                          ? 'bg-amber-500/20 text-amber-500 border-amber-500'
                          : 'bg-[var(--card-bg)] border-[var(--card-border)] hover:border-amber-500/40 text-[var(--text-primary)]'
                      }`}
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>NEEDS REVIEW</span>
                    </button>
                    <button
                      onClick={() => markLearned(cardsInDeck[currentCardIndex].id, 'learned')}
                      className={`text-[10.5px] font-bold font-mono py-2 rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all border ${
                        cardMastery[cardsInDeck[currentCardIndex].id] === 'learned'
                          ? 'bg-green-500/20 text-green-500 border-green-500'
                          : 'bg-[var(--card-bg)] border-[var(--card-border)] hover:border-green-500/40 text-[var(--text-primary)]'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>GOT IT! (LEARNED)</span>
                    </button>
                  </div>

                  {/* Slide navigator */}
                  <div className="flex justify-between items-center pt-2 border-t border-[var(--card-border)]">
                    <button
                      onClick={handlePrev}
                      className="p-1 px-2.5 bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--accent-color)] text-[var(--text-primary)] rounded-lg text-xs font-mono flex items-center gap-0.5 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>PREV</span>
                    </button>

                    {/* Quick progress bullet indicator */}
                    <div className="flex gap-1">
                      {cardsInDeck.map((c, idx) => {
                        const status = cardMastery[c.id];
                        let statusColor = "bg-[var(--card-border)]";
                        if (idx === currentCardIndex) {
                          statusColor = "bg-[var(--accent-color)] ring-2 ring-offset-2 ring-[var(--accent-color)]/25";
                        } else if (status === 'learned') {
                          statusColor = "bg-green-500";
                        } else if (status === 'review') {
                          statusColor = "bg-amber-500";
                        }
                        return (
                          <div 
                            key={c.id} 
                            className={`w-2 h-2 rounded-full transition-all ${statusColor}`}
                          />
                        );
                      })}
                    </div>

                    <button
                      onClick={handleNext}
                      className="p-1 px-2.5 bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--accent-color)] text-[var(--text-primary)] rounded-lg text-xs font-mono flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>NEXT</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ) : (
                <div className="text-center py-6 text-xs text-[var(--text-muted)] font-mono">
                  This deck is empty. Add cards below!
                </div>
              )}

            </div>

            {/* Deck Stats & Custom Card Creator Row */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              
              {/* Left Stats card */}
              <div className="sm:col-span-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-mono uppercase text-[var(--text-muted)] tracking-wider">
                    Deck Study Progress
                  </span>
                  <div className="text-2xl font-black text-[var(--accent-color)] mt-1">
                    {masteredPercentage}%
                  </div>
                </div>

                <div className="flex flex-col gap-1 mt-3 text-[10px] font-mono leading-normal">
                  <div className="flex justify-between">
                    <span className="text-green-500 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-green-500" /> Learned
                    </span>
                    <span className="text-[var(--text-primary)] font-bold">{learnedCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-500 font-bold flex items-center gap-1">
                      <BookmarkCheck className="w-3 h-3 text-amber-500" /> Review
                    </span>
                    <span className="text-[var(--text-primary)] font-bold">{reviewCount}</span>
                  </div>
                </div>
              </div>

              {/* Right Manual Card Adder */}
              <div className="sm:col-span-3 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-3">
                {!showAddCard ? (
                  <div className="flex flex-col items-center justify-center h-full py-4 text-center">
                    <button
                      onClick={() => setShowAddCard(true)}
                      className="text-xs font-mono bg-[var(--bg-secondary)] border border-[var(--card-border)] hover:border-[var(--accent-color)] text-[var(--text-primary)] hover:text-[var(--accent-color)] py-2 px-4 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>ADD CARD MANUALLY</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleAddCardSubmit} className="flex flex-col gap-2">
                    <span className="text-[9px] font-mono uppercase text-[var(--accent-color)] tracking-wider font-bold">
                      Add Card to This Deck
                    </span>
                    
                    <input
                      type="text"
                      placeholder="Front (Question/Term)..."
                      value={customFront}
                      onChange={(e) => setCustomFront(e.target.value)}
                      className="w-full text-[11px] rounded-lg p-1.5 border border-[var(--card-border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none"
                    />

                    <input
                      type="text"
                      placeholder="Back (Answer/Explanation)..."
                      value={customBack}
                      onChange={(e) => setCustomBack(e.target.value)}
                      className="w-full text-[11px] rounded-lg p-1.5 border border-[var(--card-border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none"
                    />

                    <div className="flex justify-end gap-1.5 mt-1.5">
                      <button
                        type="button"
                        onClick={() => setShowAddCard(false)}
                        className="text-[9px] font-mono bg-transparent hover:underline text-[var(--text-muted)] cursor-pointer px-2 py-1"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!customFront.trim() || !customBack.trim()}
                        className="bg-[var(--accent-color)] text-[var(--bg-color)] font-mono text-[9px] font-bold px-3 py-1 rounded-lg hover:opacity-90 disabled:opacity-50 cursor-pointer"
                      >
                        SAVE CARD
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>

          </div>
        ) : (
          <div className="md:col-span-3 flex items-center justify-center p-12 text-xs text-[var(--text-muted)] font-mono border border-dashed border-[var(--card-border)] rounded-2xl">
            Select a deck from the list to start studying
          </div>
        )}

      </div>

      {/* CREATE NEW DECK MODAL */}
      {showCreateDeckModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--bg-primary)] border border-[var(--card-border)] rounded-2xl max-w-sm w-full p-5 shadow-2xl text-left">
            <h4 className="text-sm font-extrabold tracking-tight text-[var(--text-primary)] mb-1">
              Create Custom Study Deck
            </h4>
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed mb-4">
              Enter a subject tag and a custom name to begin organizing your own learning flashcards.
            </p>

            <form onSubmit={handleCreateDeckSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider">Deck Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. World War II Key Battles..."
                  value={newDeckTitle}
                  onChange={(e) => setNewDeckTitle(e.target.value)}
                  className="text-xs rounded-xl p-2.5 border border-[var(--card-border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-color)] w-full font-mono"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider">Subject Category</label>
                <select
                  value={newDeckSubject}
                  onChange={(e) => setNewDeckSubject(e.target.value)}
                  className="text-xs bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-xl p-2.5 text-[var(--text-primary)] cursor-pointer focus:outline-none font-mono"
                >
                  <option value="Science">Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="ELA">ELA</option>
                  <option value="Social Studies">Social Studies</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateDeckModal(false)}
                  className="text-xs font-semibold px-3 py-1.5 border border-[var(--card-border)] hover:bg-[var(--bg-secondary)] rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-xs font-extrabold px-4 py-1.5 bg-[var(--accent-color)] text-[var(--bg-color)] rounded-xl hover:opacity-90 transition-all cursor-pointer shadow-[0_2px_8px_var(--accent-shadow)]"
                >
                  CREATE DECK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
