import { useState } from 'react';
import { 
  initialQuizzes, 
  dynamicAIGenerateQuizzes 
} from '../data/workspaceData';
import { 
  Gamepad2, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  ChevronRight, 
  Trophy, 
  FileText, 
  AlertCircle,
  HelpCircle,
  Check
} from 'lucide-react';

export default function QuizWorkspace({ refArticle, onGeneratedSuccess }) {
  const [quizzes, setQuizzes] = useState(() => {
    try {
      const saved = localStorage.getItem('school-quizzes');
      return saved ? JSON.parse(saved) : initialQuizzes;
    } catch {
      return initialQuizzes;
    }
  });

  const [activeQuizId, setActiveQuizId] = useState(() => quizzes[0]?.id || null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Custom AI topic input state
  const [aiTopic, setAiTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Manual Custom Question builder state
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [customQuestionText, setCustomQuestionText] = useState('');
  const [customOption0, setCustomOption0] = useState('');
  const [customOption1, setCustomOption1] = useState('');
  const [customOption2, setCustomOption2] = useState('');
  const [customOption3, setCustomOption3] = useState('');
  const [customCorrectIndex, setCustomCorrectIndex] = useState(0);
  const [customExplanationText, setCustomExplanationText] = useState('');

  const saveQuizzes = (updated) => {
    setQuizzes(updated);
    try {
      localStorage.setItem('school-quizzes', JSON.stringify(updated));
    } catch {
      // safe fallthrough
    }
  };

  const activeQuiz = quizzes.find(q => q.id === activeQuizId) || quizzes[0];
  const questionsList = activeQuiz ? activeQuiz.questions : [];
  const currentQuestion = questionsList[currentQuestionIndex];

  const handleOptionSelect = (idx) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionIndex(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    if (selectedOptionIndex === currentQuestion.correctAnswerIndex) {
      setCorrectAnswersCount(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    if (currentQuestionIndex + 1 < questionsList.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setCorrectAnswersCount(0);
    setQuizFinished(false);
  };

  const handleAddQuestionSubmit = (e) => {
    e.preventDefault();
    if (!customQuestionText.trim() || !customOption0.trim() || !customOption1.trim() || !customOption2.trim() || !customOption3.trim() || !activeQuiz) return;

    const newQ = {
      id: `q-custom-${Date.now()}`,
      question: customQuestionText.trim(),
      options: [customOption0.trim(), customOption1.trim(), customOption2.trim(), customOption3.trim()],
      correctAnswerIndex: Number(customCorrectIndex),
      explanation: customExplanationText.trim() || "Correct! That is the verified textbook explanation."
    };

    const updated = quizzes.map(q => {
      if (q.id === activeQuiz.id) {
        return {
          ...q,
          questions: [...q.questions, newQ]
        };
      }
      return q;
    });

    saveQuizzes(updated);
    setCustomQuestionText('');
    setCustomOption0('');
    setCustomOption1('');
    setCustomOption2('');
    setCustomOption3('');
    setCustomExplanationText('');
    setShowAddQuestion(false);
    handleResetQuiz();
  };

  const triggerAIQuizGen = (topicText, subjectText = "Science") => {
    if (!topicText.trim()) return;
    setIsGenerating(true);
    let progress = 0;

    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(interval);
        const generatedQuiz = dynamicAIGenerateQuizzes(topicText, subjectText);
        const updated = [generatedQuiz, ...quizzes];
        saveQuizzes(updated);
        setActiveQuizId(generatedQuiz.id);
        setCurrentQuestionIndex(0);
        setSelectedOptionIndex(null);
        setIsAnswerSubmitted(false);
        setCorrectAnswersCount(0);
        setQuizFinished(false);
        setIsGenerating(false);
        setAiTopic('');
        if (onGeneratedSuccess) {
          onGeneratedSuccess("quiz");
        }
      }
    }, 80);
  };

  const handleArticleQuickBuild = () => {
    if (!refArticle) return;
    triggerAIQuizGen(`Practice test on ${refArticle.title}`, refArticle.category, refArticle.content);
  };

  return (
    <div className="flex flex-col gap-6 h-full select-text max-h-[85vh] overflow-y-auto pr-1">
      
      {/* Top action row */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-[var(--card-border)] pb-4">
        <div>
          <h3 className="text-base font-extrabold flex items-center gap-2 text-[var(--text-primary)]">
            <Gamepad2 className="text-[var(--accent-color)] w-5 h-5 animate-pulse" />
            Interactive Quiz Area
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Measure your comprehension by taking tests, grading your inputs, and reviewing errors.
          </p>
        </div>

        {/* Action triggers */}
        <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto text-left">
          <button
            onClick={() => {
              const quizName = prompt("Enter Quiz Name (Syllabus/Curriculum topic):");
              if (!quizName) return;
              const newQuiz = {
                id: `quiz-custom-${Date.now()}`,
                title: quizName,
                subject: "Science",
                questions: [
                  {
                    id: `q-${Date.now()}-1`,
                    question: "First Question: Click manually edit custom questions below to modify options.",
                    options: ["Option A", "Option B", "Option C (Correct)", "Option D"],
                    correctAnswerIndex: 2,
                    explanation: "This is a custom-built quiz explanation."
                  }
                ]
              };
              const updated = [newQuiz, ...quizzes];
              saveQuizzes(updated);
              setActiveQuizId(newQuiz.id);
              handleResetQuiz();
            }}
            className="text-[10px] bg-[var(--bg-secondary)] border border-[var(--card-border)] hover:border-[var(--text-muted)]/50 text-[var(--text-primary)] px-3 py-1.5 rounded-xl font-bold font-mono transition-all flex items-center gap-1 cursor-pointer ml-auto lg:ml-0"
          >
            <Plus className="w-3.5 h-3.5 text-[var(--accent-color)]" />
            <span>NEW DECOY QUIZ</span>
          </button>
        </div>
      </div>

      {/* Main Grid split */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        
        {/* Left Side: Select Quiz & AI quiz bar */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <span className="text-[10px] font-mono tracking-wider text-[var(--text-muted)] uppercase select-none font-bold">
            Select Live Practice Test
          </span>

          <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            {quizzes.map((quiz) => {
              const isActive = quiz.id === activeQuizId;
              return (
                <div
                  key={quiz.id}
                  onClick={() => {
                    setActiveQuizId(quiz.id);
                    setCurrentQuestionIndex(0);
                    setSelectedOptionIndex(null);
                    setIsAnswerSubmitted(false);
                    setCorrectAnswersCount(0);
                    setQuizFinished(false);
                  }}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex-shrink-0 ${
                    isActive
                      ? 'bg-[var(--accent-color)]/10 border-[var(--accent-color)] shadow-sm scale-[1.01]'
                      : 'bg-[var(--bg-secondary)] border-[var(--card-border)] hover:border-[var(--text-muted)]/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[8px] font-bold font-mono px-1.5 py-0.5 rounded bg-[var(--input-fill)] text-[var(--accent-color)] uppercase">
                      {quiz.subject}
                    </span>
                    <span className="text-[9px] text-[var(--text-muted)] font-mono">
                      {quiz.questions.length} questions
                    </span>
                  </div>
                  <h4 className="text-[11px] font-bold text-[var(--text-primary)] line-clamp-1 leading-snug">
                    {quiz.title}
                  </h4>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Side: Quiz taking arena (co-index 3) */}
        {activeQuiz ? (
          <div className="md:col-span-3 flex flex-col bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-2xl p-5 md:p-6 min-h-[380px] justify-between">
            
            {!quizFinished ? (
              currentQuestion ? (
                <div className="flex flex-col gap-4 text-left">
                  
                  {/* Progress Header */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)] border-b border-[var(--card-border)] pb-2.5">
                    <span>QUIZ: {activeQuiz.title}</span>
                    <span>
                      Question {currentQuestionIndex + 1} of {questionsList.length}
                    </span>
                  </div>

                  {/* Question Title */}
                  <h4 className="text-sm font-extrabold text-[var(--text-primary)] leading-snug">
                    {currentQuestion.question}
                  </h4>

                  {/* Options List */}
                  <div className="flex flex-col gap-2.5 mt-2">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelected = selectedOptionIndex === idx;
                      const isCorrect = idx === currentQuestion.correctAnswerIndex;
                      
                      let optionStyles = "bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--text-primary)] hover:border-[var(--text-muted)]/30 hover:bg-[var(--bg-secondary)]";

                      if (isAnswerSubmitted) {
                        if (isCorrect) {
                          optionStyles = "bg-green-500/10 border-green-500 text-green-500 font-extrabold";
                        } else if (isSelected) {
                          optionStyles = "bg-red-500/10 border-red-500 text-red-500 font-extrabold";
                        } else {
                          optionStyles = "bg-transparent border-[var(--card-border)] text-[var(--text-muted)] opacity-60";
                        }
                      } else if (isSelected) {
                        optionStyles = "bg-[var(--accent-color)]/15 border-[var(--accent-color)] text-[var(--accent-color)] ring-1 ring-[var(--accent-color)] font-bold";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(idx)}
                          disabled={isAnswerSubmitted}
                          className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center gap-3 cursor-pointer ${optionStyles}`}
                        >
                          <span className="w-5 h-5 rounded-full bg-[var(--input-fill)] border border-[var(--card-border)] flex items-center justify-center text-[10px] font-mono font-bold font-semibold shrink-0 text-[var(--text-muted)]">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="flex-1">{option}</span>
                          
                          {/* Checked indicators */}
                          {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
                          {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Submit / Explanations drawer */}
                  <div className="mt-4 pt-4 border-t border-[var(--card-border)] flex flex-col gap-3">
                    {!isAnswerSubmitted ? (
                      <button
                        onClick={handleSubmitAnswer}
                        disabled={selectedOptionIndex === null}
                        className="w-full sm:w-auto px-5 py-2.5 bg-[var(--accent-color)] text-[var(--bg-color)] rounded-xl font-mono text-xs font-bold leading-normal active:scale-98 transition-all disabled:opacity-50 disabled:pointer-events-none self-end flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>SUBMIT ANSWER</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <div className="bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-xl p-3 flex gap-2 w-full text-xs">
                          <AlertCircle className="w-4 h-4 text-[var(--accent-color)] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-[var(--text-primary)] block font-mono">TEXTBOOK EXPLANATION</span>
                            <span className="text-[11px] text-[var(--text-muted)] leading-relaxed mt-0.5 block">{currentQuestion.explanation}</span>
                          </div>
                        </div>

                        <button
                          onClick={handleNextQuestion}
                          className="w-full sm:w-auto px-5 py-2.5 bg-[var(--accent-color)] text-[var(--bg-color)] rounded-xl font-mono text-xs font-bold leading-normal active:scale-98 transition-all self-end flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>{currentQuestionIndex + 1 < questionsList.length ? 'NEXT QUESTION' : 'VIEW FINAL REPORT'}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center gap-2">
                  <span className="text-xs text-[var(--text-muted)]">No questions are programmed inside this deck.</span>
                  <button onClick={() => setShowAddQuestion(true)} className="text-xs text-[var(--accent-color)] font-mono font-bold hover:underline flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> Program first question
                  </button>
                </div>
              )
            ) : (
              /* QUIZ FINISHED REPORT CARD */
              <div className="flex flex-col justify-center items-center text-center p-4 py-8 gap-5 flex-1">
                <div className="p-4 bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/20 rounded-full">
                  <Trophy className="w-12 h-12 text-yellow-400 animate-bounce" />
                </div>
                
                <div>
                  <h4 className="text-base font-extrabold text-[var(--text-primary)]">Practice Test Completed!</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-1 font-mono">You successfully scored:</p>
                </div>

                <div className="flex items-baseline gap-1 bg-[var(--bg-secondary)] border border-[var(--card-border)] px-6 py-3 rounded-2xl shadow-inner mt-1">
                  <span className="text-4xl font-black text-[var(--accent-color)]">{correctAnswersCount}</span>
                  <span className="text-sm text-[var(--text-muted)] font-mono font-bold">/</span>
                  <span className="text-sm text-[var(--text-muted)] font-mono font-bold">{questionsList.length}</span>
                </div>

                <p className="text-[11px] text-[var(--text-muted)] max-w-sm leading-relaxed">
                  {correctAnswersCount === questionsList.length
                    ? "Exceptional! 100% textbook proficiency. You understand these concepts thoroughly."
                    : correctAnswersCount >= questionsList.length / 2
                    ? "Great attempt! Review the explanations details card for the ones you missed to improve your grade."
                    : "Consistent study is key! Try generating a customized flashcard review session of these terms first."}
                </p>

                <div className="flex gap-2 w-full max-w-xs mt-3 flex-wrap">
                  <button
                    onClick={handleResetQuiz}
                    className="flex-1 text-xs font-mono font-bold py-2 border border-[var(--card-border)] text-[var(--text-primary)] hover:border-[var(--accent-color)] rounded-xl inline-flex justify-center items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>RETRY TEST</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveQuizId(quizzes[0]?.id || null);
                      handleResetQuiz();
                    }}
                    className="flex-1 text-xs font-mono font-bold py-2 bg-[var(--accent-color)] text-[var(--bg-color)] hover:opacity-90 rounded-xl inline-flex justify-center items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>OTHER TESTS</span>
                  </button>
                </div>
              </div>
            )}

            {/* Manual Question builder Form drawer toggle */}
            {!quizFinished && !showAddQuestion && (
              <div className="border-t border-[var(--card-border)] pt-3 text-right">
                <button
                  onClick={() => setShowAddQuestion(true)}
                  className="text-[10px] font-mono text-[var(--accent-color)] font-bold hover:underline flex items-center justify-end gap-1 cursor-pointer bg-transparent border-none ml-auto"
                >
                  <Plus className="w-3 h-3" />
                  <span>ADD QUESTIONS TO THIS EXAM</span>
                </button>
              </div>
            )}

            {/* MANUAL QUESTION ADDER OVERLAY */}
            {!quizFinished && showAddQuestion && (
              <form onSubmit={handleAddQuestionSubmit} className="border-t border-[var(--card-border)] pt-4 mt-2 text-left flex flex-col gap-2.5">
                <span className="text-[10px] font-mono uppercase text-[var(--accent-color)] tracking-wider font-bold">
                  Write Multiple-Choice Question to add:
                </span>

                <input
                  type="text"
                  required
                  placeholder="Type the question title clearly..."
                  value={customQuestionText}
                  onChange={(e) => setCustomQuestionText(e.target.value)}
                  className="w-full text-xs rounded-lg p-2 border border-[var(--card-border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center gap-1 bg-[var(--bg-secondary)] rounded-lg p-1 border border-[var(--card-border)]">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[var(--card-bg)] text-[var(--accent-color)]">A</span>
                    <input
                      type="text" required placeholder="Option A" value={customOption0} onChange={(e) => setCustomOption0(e.target.value)}
                      className="bg-transparent border-none outline-none text-xs w-full text-[var(--text-primary)]"
                    />
                  </div>
                  <div className="flex items-center gap-1 bg-[var(--bg-secondary)] rounded-lg p-1 border border-[var(--card-border)]">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[var(--card-bg)] text-[var(--accent-color)]">B</span>
                    <input
                      type="text" required placeholder="Option B" value={customOption1} onChange={(e) => setCustomOption1(e.target.value)}
                      className="bg-transparent border-none outline-none text-xs w-full text-[var(--text-primary)]"
                    />
                  </div>
                  <div className="flex items-center gap-1 bg-[var(--bg-secondary)] rounded-lg p-1 border border-[var(--card-border)]">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[var(--card-bg)] text-[var(--accent-color)]">C</span>
                    <input
                      type="text" required placeholder="Option C" value={customOption2} onChange={(e) => setCustomOption2(e.target.value)}
                      className="bg-transparent border-none outline-none text-xs w-full text-[var(--text-primary)]"
                    />
                  </div>
                  <div className="flex items-center gap-1 bg-[var(--bg-secondary)] rounded-lg p-1 border border-[var(--card-border)]">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[var(--card-bg)] text-[var(--accent-color)]">D</span>
                    <input
                      type="text" required placeholder="Option D" value={customOption3} onChange={(e) => setCustomOption3(e.target.value)}
                      className="bg-transparent border-none outline-none text-xs w-full text-[var(--text-primary)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider">Correct Index</label>
                    <select
                      value={customCorrectIndex}
                      onChange={(e) => setCustomCorrectIndex(e.target.value)}
                      className="text-[11px] bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-md p-1.5 text-[var(--text-primary)] focus:outline-none"
                    >
                      <option value="0">Option A is correct</option>
                      <option value="1">Option B is correct</option>
                      <option value="2">Option C is correct</option>
                      <option value="3">Option D is correct</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider">Explanation</label>
                    <input
                      type="text"
                      placeholder="Why is it correct? (scientific explanation)..."
                      value={customExplanationText}
                      onChange={(e) => setCustomExplanationText(e.target.value)}
                      className="text-[11px] rounded-md p-1.5 border border-[var(--card-border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-1.5 mt-1 select-none">
                  <button
                    type="button"
                    onClick={() => setShowAddQuestion(false)}
                    className="text-[10px] font-mono hover:underline px-3 py-1 bg-transparent border-none text-[var(--text-muted)] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[var(--accent-color)] text-[var(--bg-color)] font-mono text-[10px] font-black px-4 py-1.5 rounded-lg hover:opacity-90 cursor-pointer shadow-sm"
                  >
                    SAVE & RESET TESTING APPARATUS
                  </button>
                </div>
              </form>
            )}

          </div>
        ) : (
          <div className="md:col-span-3 flex items-center justify-center p-12 text-xs text-[var(--text-muted)] font-mono border border-dashed border-[var(--card-border)] rounded-2xl">
            Select an active quiz to begin evaluation
          </div>
        )}

      </div>

    </div>
  );
}
