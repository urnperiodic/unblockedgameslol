import { useState, useRef, useEffect } from 'react';
import { 
  scanGrammarEssay
} from '../data/workspaceData';
import { 
  FileText, 
  Sparkles, 
  Check, 
  Copy, 
  RefreshCw, 
  AlertCircle, 
  Info, 
  ExternalLink,
  ChevronRight,
  BookOpen,
  ArrowRight
} from 'lucide-react';

const sampleEssay = `Newtons Laws of Motion has been completed by sir Isaac Newton who was one of the legendary physicists in history. His core papers was written by him around 1687.

For a long time, scientists is trying to formulate teh universal rules of standard mechanical physics. However, recieveing correct measurements from seperate objects was very difficult because of its practical challenges. If you run a custom experiment, your wrong assumptions will recieve several errors.`;

export default function GrammarCheckerWorkspace() {
  const [essayText, setEssayText] = useState(sampleEssay);
  const [mistakes, setMistakes] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedMistakeId, setSelectedMistakeId] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [scanExecuted, setScanExecuted] = useState(false);

  // Quick scan trigger with a progress visualization
  const handleScanEssay = () => {
    setIsScanning(true);
    setScanExecuted(false);
    setSelectedMistakeId(null);

    setTimeout(() => {
      const results = scanGrammarEssay(essayText);
      setMistakes(results);
      setIsScanning(false);
      setScanExecuted(true);
    }, 700);
  };

  const applyCorrection = (mistake) => {
    // Replace the originalText mismatch with suggestedCorrection.
    // To handle accurate substring replacement, we replace the precise originalText.
    const newText = essayText.replace(mistake.originalText, mistake.suggestedCorrection);
    setEssayText(newText);
    
    // Clear selected mistake and filtered checklists
    setSelectedMistakeId(null);

    // Re-run scan on newly amended text
    const recalculated = scanGrammarEssay(newText);
    setMistakes(recalculated);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(essayText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const activeMistake = mistakes.find(m => m.id === selectedMistakeId);

  // Render text with spans that are styled with highlighted lines
  // To avoid complex parsing of interleaving overlaps, since we sort mistakes, 
  // we can reconstruct segmented parts.
  const renderHighlightedEssay = () => {
    if (mistakes.length === 0) {
      return <p className="whitespace-pre-wrap select-text text-xs leading-relaxed text-[var(--text-primary)]">{essayText}</p>;
    }

    const elements = [];
    let currentIndex = 0;
    
    // Sort mistakes chronologically
    const sorted = [...mistakes].sort((a,b) => a.startIndex - b.startIndex);

    for (let i = 0; i < sorted.length; i++) {
      const m = sorted[i];
      
      // Is there text before this mistake?
      if (m.startIndex > currentIndex) {
        elements.push(
          <span key={`txt-${currentIndex}`} className="select-text">
            {essayText.substring(currentIndex, m.startIndex)}
          </span>
        );
      }

      // Add highlighted mistake trigger
      const isSelected = m.id === selectedMistakeId;
      let underlineColor = "decoration-rose-500 bg-rose-500/10 text-rose-500 hover:bg-rose-500/25";
      if (m.category === "Passive Voice") {
        underlineColor = "decoration-purple-500 bg-purple-500/10 text-purple-500 hover:bg-purple-500/25";
      } else if (m.category === "Grammar") {
        underlineColor = "decoration-amber-500 bg-amber-500/10 text-amber-500 hover:bg-amber-500/25";
      }

      elements.push(
        <button
          key={`m-${m.id}`}
          type="button"
          onClick={() => setSelectedMistakeId(m.id === selectedMistakeId ? null : m.id)}
          className={`underline decoration-2 underline-offset-2 font-bold select-text rounded cursor-pointer transition-all px-0.5 inline-block mx-0.5 ${underlineColor} ${
            isSelected ? 'ring-2 ring-[var(--accent-color)] ring-offset-1 scale-102' : ''
          }`}
          title={`Click to review ${m.category}`}
        >
          {m.originalText}
        </button>
      );

      currentIndex = m.endIndex;
    }

    // Append remaining string
    if (currentIndex < essayText.length) {
      elements.push(
        <span key={`txt-${currentIndex}`} className="select-text">
          {essayText.substring(currentIndex)}
        </span>
      );
    }

    return (
      <div className="whitespace-pre-wrap leading-relaxed text-xs text-[var(--text-primary)] font-sans select-text">
        {elements}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 h-full select-text max-h-[85vh] overflow-y-auto pr-1">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[var(--card-border)] pb-4">
        <div>
          <h3 className="text-base font-extrabold flex items-center gap-2 text-[var(--text-primary)]">
            <FileText className="text-[var(--accent-color)] w-5 h-5 animate-pulse" />
            Proofreading & Grammar Scanner
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Check your school papers for spelling, subject-verb compliance, and sentence voice improvements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setEssayText(sampleEssay)}
            className="text-[10px] bg-[var(--bg-secondary)] border border-[var(--card-border)] hover:border-[var(--text-muted)]/50 text-[var(--text-primary)] px-3 py-1.5 rounded-xl font-bold font-mono transition-all cursor-pointer"
            title="Load a generic student draft with intentional mistakes"
          >
            LOAD SAMPLE DRAFT
          </button>
        </div>
      </div>

      {/* Main split: Input/Interactive highlight vs Side assistance panel */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Editor Screen (Col index 3) */}
        <div className="lg:col-span-3 flex flex-col bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-2xl p-5 gap-4 relative min-h-[400px]">
          
          <div className="flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)]">
            <span>DRAFT EDITOR</span>
            <span>{essayText.split(/\s+/).filter(Boolean).length} words</span>
          </div>

          <div className="flex-1 flex flex-col gap-3 min-h-[250px]">
            {!scanExecuted ? (
              <textarea
                value={essayText}
                onChange={(e) => {
                  setEssayText(e.target.value);
                  setScanExecuted(false);
                  setMistakes([]);
                }}
                placeholder="Type or paste your academic essay, project summaries, or notes here..."
                rows={12}
                className="w-full h-full bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--card-border)] rounded-xl p-4 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-[var(--accent-color)] leading-relaxed resize-none scrollbar-thin"
              />
            ) : (
              <div className="w-full h-full min-h-[250px] bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--accent-color)]/30 rounded-xl p-4 text-xs leading-relaxed overflow-y-auto scrollbar-thin text-left">
                {renderHighlightedEssay()}
              </div>
            )}
          </div>

          <div className="border-t border-[var(--card-border)] pt-4 flex justify-between items-center select-none flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleScanEssay}
                disabled={isScanning || !essayText.trim()}
                className="px-5 py-2.5 bg-[var(--accent-color)] text-[var(--bg-color)] rounded-xl font-mono text-xs font-bold leading-normal active:scale-98 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>SCANNING DRAFT...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-300" />
                    <span>RUN GRAMMAR CHECK</span>
                  </>
                )}
              </button>

              {scanExecuted && (
                <button
                  onClick={() => {
                    setScanExecuted(false);
                    setMistakes([]);
                  }}
                  className="px-3.5 py-2 hover:bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-primary)] font-mono text-xs font-bold rounded-xl active:scale-98 transition-all cursor-pointer"
                >
                  Edit draft
                </button>
              )}
            </div>

            <button
              onClick={handleCopyText}
              disabled={!essayText}
              className="p-2 px-3 hover:bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-primary)] rounded-xl text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors"
              title="Copy plain essay text to clipboard"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-[var(--accent-color)]" />}
              <span>{isCopied ? 'COPIED!' : 'COPY'}</span>
            </button>
          </div>

        </div>

        {/* Audit Details Panel (Col index 2) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          
          <span className="text-[10px] font-mono tracking-wider text-[var(--text-muted)] uppercase select-none font-bold text-left">
            Assistance Diagnostics
          </span>

          {!scanExecuted && !isScanning ? (
            <div className="bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-2xl p-5 text-center flex flex-col items-center justify-center py-10 gap-3">
              <Info className="w-10 h-10 stroke-1 text-[var(--text-muted)]/50" />
              <div>
                <h4 className="text-xs font-bold text-[var(--text-primary)]">Ready to Proofread</h4>
                <p className="text-[10px] text-[var(--text-muted)] leading-relaxed mt-1 max-w-xs">
                  Type your text or click Load Sample Draft, then press 'Run Grammar Check' to identify corrections.
                </p>
              </div>
            </div>
          ) : isScanning ? (
            <div className="bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-2xl p-5 text-center flex flex-col items-center justify-center py-10 gap-3">
              <RefreshCw className="w-8 h-8 text-[var(--accent-color)] animate-spin" />
              <div>
                <h4 className="text-xs font-bold text-[var(--text-primary)]">Analyzing syntax metrics...</h4>
                <p className="text-[10.5px] text-[var(--text-muted)] leading-relaxed mt-0.5">
                  Scanning vocabulary structure, checking spelling tags, and rewriting passive formulations.
                </p>
              </div>
            </div>
          ) : (
            /* SCAN COMPLETED DISPLAY */
            <div className="flex flex-col gap-3">
              
              {/* Overall summary stats */}
              <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-3.5 text-left flex justify-between items-center">
                <div>
                  <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider">Identified Warnings</span>
                  <div className="text-3xl font-black text-[var(--text-primary)] mt-0.5">
                    {mistakes.length}
                  </div>
                </div>

                <div className="text-right text-[10px] font-mono shrink-0">
                  <div className="text-green-500 font-bold">
                    {mistakes.length === 0 ? "Perfect Score! ✨" : "Proofreading Required"}
                  </div>
                </div>
              </div>

              {/* Core Active Selected Error card */}
              {activeMistake ? (
                <div className="bg-[var(--bg-secondary)] border border-[var(--accent-color)]/30 rounded-xl p-4 text-left flex flex-col gap-3 shadow-md animate-fade-in">
                  
                  <div className="flex justify-between items-center border-b border-[var(--card-border)] pb-2">
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded uppercase bg-[var(--input-fill)] text-[var(--accent-color)]">
                      {activeMistake.category}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono">
                      Error Highlight
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 items-center text-xs mt-1">
                    <span className="line-through text-red-500 font-bold bg-red-500/10 px-2 py-1 rounded">
                      {activeMistake.originalText}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    <span className="text-green-500 font-bold bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                      {activeMistake.suggestedCorrection}
                    </span>
                  </div>

                  <p className="text-[11px] leading-relaxed text-[var(--text-muted)] mt-1.5">
                    {activeMistake.explanation}
                  </p>

                  <button
                    onClick={() => applyCorrection(activeMistake)}
                    className="w-full mt-2 bg-[var(--accent-color)] text-[var(--bg-color)] font-mono text-[10px] font-black py-2 rounded-lg hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>APPLY QUICK CORRECTION</span>
                  </button>

                </div>
              ) : (
                /* LIST OF ALL MISSED ERRORS */
                <div className="flex flex-col gap-2 max-h-[350px] overflow-y-auto">
                  {mistakes.length === 0 ? (
                    <div className="bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-xl p-5 text-center py-8">
                      <p className="text-xs text-[var(--text-primary)] font-bold">Excellent Academic Document! 🎉</p>
                      <p className="text-[10.5px] text-[var(--text-muted)] mt-1 max-w-xs mx-auto leading-relaxed">
                        No spelling mistakes, singular/plural grammar disagreements, or passive sentences have been flagged.
                      </p>
                    </div>
                  ) : (
                    mistakes.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => setSelectedMistakeId(m.id)}
                        className="p-3 bg-[var(--bg-secondary)] border border-[var(--card-border)] hover:border-[var(--accent-color)] rounded-xl cursor-pointer transition-all text-left flex justify-between items-start gap-3"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="text-[8px] font-bold font-mono px-1.5 py-0.5 rounded bg-[var(--input-fill)] text-[var(--accent-color)] uppercase">
                              {m.category}
                            </span>
                          </div>
                          
                          <p className="text-[10.5px] font-bold text-[var(--text-primary)] leading-snug">
                            Suggesting: <span className="text-green-500">"{m.suggestedCorrection}"</span> instead of <span className="line-through text-red-500">"{m.originalText}"</span>
                          </p>
                          
                          <p className="text-[9px] text-[var(--text-muted)] line-clamp-1 mt-1 leading-normal font-sans">
                            {m.explanation}
                          </p>
                        </div>
                        
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            applyCorrection(m);
                          }}
                          className="bg-[var(--accent-color)] text-[var(--bg-color)] p-1 rounded hover:opacity-90 transition-opacity whitespace-nowrap text-[9px] font-mono shrink-0 font-bold"
                          title="Apply correction instantly"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
