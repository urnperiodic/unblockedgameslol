import { useState } from 'react';
import { 
  ExternalLink, 
  RotateCw
} from 'lucide-react';

export default function QuizWorkspace() {
  const [iframeKey, setIframeKey] = useState(0);

  const handleRefresh = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <div id="quiz-workspace" className="absolute inset-0 w-full h-full bg-white overflow-hidden">
      
      {/* Absolute full-bleed iframe for QuizForge */}
      <iframe
        key={iframeKey}
        src="/quizforge.html"
        className="w-full h-full border-none bg-white"
        title="QuizForge Dashboard"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        referrerPolicy="no-referrer"
      />

      {/* Floating minimal action bar in bottom-right corner */}
      <div className="absolute bottom-4 right-4 z-50 flex items-center gap-1.5 bg-white/85 dark:bg-neutral-900/85 backdrop-blur-md border border-neutral-200/50 dark:border-neutral-800/50 rounded-full p-1 shadow-lg opacity-30 hover:opacity-100 transition-opacity duration-200 select-none">
        <button
          onClick={handleRefresh}
          className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-[#6366f1] hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
          title="Reload QuizForge"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>
        <div className="w-px h-3 bg-neutral-200 dark:bg-neutral-700" />
        <a
          href="/quizforge.html"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-[#6366f1] hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
          title="Open in New Tab"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
}
