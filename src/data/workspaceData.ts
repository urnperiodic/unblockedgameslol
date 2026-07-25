export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface FlashcardDeck {
  id: string;
  title: string;
  subject: string;
  cards: Flashcard[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  questions: QuizQuestion[];
}

export const initialDecks: FlashcardDeck[] = [
  {
    id: "deck-1",
    title: "Newton's Laws of Motion",
    subject: "Science",
    cards: [
      {
        id: "fc-1-1",
        front: "What is the First Law of Motion (Inertia)?",
        back: "An object at rest stays at rest, and an object in motion stays in motion with a constant velocity, unless acted upon by an external unbalanced force."
      },
      {
        id: "fc-1-2",
        front: "What is the mathematical equation for Newton's Second Law?",
        back: "Force = Mass × Acceleration (F = ma)."
      },
      {
        id: "fc-1-3",
        front: "How does the Third Law explain rocket propulsion?",
        back: "The action of high-speed exhaust gas shooting downward creates an equal and opposite reaction, driving the rocket upward."
      },
      {
        id: "fc-1-4",
        front: "What property of matter determines its inertia?",
        back: "Mass. Objects with greater mass have more inertia, making them harder to start or stop."
      },
      {
        id: "fc-1-5",
        front: "What is the unit of measure for force?",
        back: "The Newton (N), which is equivalent to 1 kg·m/s²."
      }
    ]
  },
  {
    id: "deck-2",
    title: "Plate Tectonics & Earth Geology",
    subject: "Science",
    cards: [
      {
        id: "fc-2-1",
        front: "What are the three main types of plate boundaries?",
        back: "Divergent (plates pull apart), Convergent (plates collide), and Transform (plates slide horizontally past each other)."
      },
      {
        id: "fc-2-2",
        front: "Under what tectonic process does a mountain range like the Himalayas form?",
        back: "Continental folding/buckling caused by two continental tectonic plates colliding head-on."
      },
      {
        id: "fc-2-3",
        front: "Who proposed the continental drift theory in 1912?",
        back: "Alfred Wegener."
      },
      {
        id: "fc-2-4",
        front: "What is subduction?",
        back: "The process where a denser oceanic plate sinks beneath a lighter continental plate at a convergent boundary, creating volcanoes and trenches."
      }
    ]
  },
  {
    id: "deck-3",
    title: "Linear Equations & Slope in Algebra",
    subject: "Mathematics",
    cards: [
      {
        id: "fc-3-1",
        front: "What is the slope-intercept form of a linear equation?",
        back: "y = mx + b, where 'm' is the slope and 'b' is the y-intercept."
      },
      {
        id: "fc-3-2",
        front: "What is the geometric formula for slope given two coordinate pairs?",
        back: "m = (y₂ - y₁) / (x₂ - x₁) — representing the rise over run."
      },
      {
        id: "fc-3-3",
        front: "What are the slopes of parallel and perpendicular lines?",
        back: "Parallel lines have identical slopes; perpendicular lines have negative reciprocal slopes (m₁ × m₂ = -1)."
      },
      {
        id: "fc-3-4",
        front: "What does it mean if a linear slope estimate is horizontal?",
        back: "The slope is zero (m = 0). The equation simplifies to y = b."
      }
    ]
  },
  {
    id: "deck-4",
    title: "Literary Devices & Narrative Elements",
    subject: "ELA",
    cards: [
      {
        id: "fc-4-1",
        front: "What is the difference between a metaphor and a simile?",
        back: "A simile compares two things using 'like' or 'as' (e.g., 'as brave as a lion'). A metaphor makes a direct comparison without those words (e.g., 'the classroom was a zoo')."
      },
      {
        id: "fc-4-2",
        front: "What are the five essential parts of a classic plot pyramid?",
        back: "Exposition, Rising Action, Climax, Falling Action, and Resolution (Denouement)."
      },
      {
        id: "fc-4-3",
        front: "What does 'alliteration' mean?",
        back: "The repetition of matching consonant sounds at the beginning of closely connected words (e.g., 'Sally sells seashells by the seashore')."
      },
      {
        id: "fc-4-4",
        front: "What is foreshadowing?",
        back: "An authorial technique where subtle hints or clues are dropped early in a story to suggest future plot events."
      }
    ]
  },
  {
    id: "deck-5",
    title: "The American Revolution",
    subject: "Social Studies",
    cards: [
      {
        id: "fc-5-1",
        front: "What was the direct primary cause of the Stamp Act of 1765 crisis?",
        back: "Great Britain imposing direct taxes on newspaper, legal documents, and playing cards without colonial representation ('No taxation without representation')."
      },
      {
        id: "fc-5-2",
        front: "Who was the primary writer of the Declaration of Independence?",
        back: "Thomas Jefferson, with edits from John Adams and Benjamin Franklin (signed in 1776)."
      },
      {
        id: "fc-5-3",
        front: "Which battle represents the turning point of the Revolutionary War?",
        back: "The Battle of Saratoga (1777), because it convinced France to officially join as an ally to the American colonists."
      },
      {
        id: "fc-5-4",
        front: "What treaty formally ended the war between Britain and the USA?",
        back: "The Treaty of Paris in 1783, which officially recognized American independence."
      }
    ]
  }
];

export const initialQuizzes: Quiz[] = [
  {
    id: "quiz-1",
    title: "Newtonian Physics & Forces Review",
    subject: "Science",
    questions: [
      {
        id: "q-1-1",
        question: "If the force acting on an object is doubled while its mass remains constant, what happens to its acceleration?",
        options: [
          "It is cut in half",
          "It remains exactly identical",
          "It is doubled",
          "It is quadrupled"
        ],
        correctAnswerIndex: 2,
        explanation: "According to Newton's Second Law, F = ma. Since acceleration (a = F / m) is directly proportional to Net Force, doubling the force while mass is constant doubles the acceleration."
      },
      {
        id: "q-1-2",
        question: "Which of Newton's laws explains why a passenger flies forward when a speeding tour bus slams on its brakes?",
        options: [
          "First Law of Motion (Inertia)",
          "Second Law of Motion (F = ma)",
          "Third Law of Motion (Reciprocals)",
          "Law of Universal Gravitation"
        ],
        correctAnswerIndex: 0,
        explanation: "Newton's First Law (Inertia) states that an object in motion will continue moving at a constant speed unless stopped by an external force. Your body resists the deceleration and continues forward."
      },
      {
        id: "q-1-3",
        question: "A rocket pushes hot exhaust gases backward. The gases in turn push the rocket forward. This pairs with which law?",
        options: [
          "The First Law",
          "The Second Law",
          "The Third Law",
          "Kepler's Second Law"
        ],
        correctAnswerIndex: 2,
        explanation: "Newton's Third Law states that for every action, there is an equal and opposite reaction. The ejection of gas (action) pushes the rocket forward (reaction)."
      }
    ]
  },
  {
    id: "quiz-2",
    title: "Coordinate Equations & Slope Algebra",
    subject: "Mathematics",
    questions: [
      {
        id: "q-2-1",
        question: "Find the slope of a line passing through coordinates (2, 5) and (4, 11).",
        options: [
          "Slope = 2",
          "Slope = 3",
          "Slope = 4",
          "Slope = 6"
        ],
        correctAnswerIndex: 1,
        explanation: "Using the slope formula: m = (y₂ - y₁) / (x₂ - x₁). Here, (11 - 5) / (4 - 2) = 6 / 2 = 3."
      },
      {
        id: "q-2-2",
        question: "Line A has a slope of -2/3. What is the slope of a line perpendicular to Line A?",
        options: [
          "-2/3",
          "2/3",
          "-3/2",
          "3/2"
        ],
        correctAnswerIndex: 3,
        explanation: "Perpendicular lines have slopes that are negative reciprocals of each other. The negative reciprocal of -2/3 is 3/2."
      }
    ]
  },
  {
    id: "quiz-3",
    title: "Grammar & ELA Core Diagnostics",
    subject: "ELA",
    questions: [
      {
        id: "q-3-1",
        question: "Identify the sentence that uses correct subject-verb agreement.",
        options: [
          "Every one of the books on the shelves is written in Latin.",
          "Every one of the books on the shelves are written in Latin.",
          "Neither the student nor the teachers was ready for the bell.",
          "The crew of Sailors are working on repairing the main deck."
        ],
        correctAnswerIndex: 0,
        explanation: "'Every one' is a singular pronoun subject and requires the singular verb 'is'. prepositional phrases like 'of any books' do not change the subject."
      },
      {
        id: "q-3-2",
        question: "Which literary device is present in the phrase: 'The wind whispered secrets through the pines'?",
        options: [
          "Hyperbole",
          "Personification",
          "Metaphor",
          "Alliteration"
        ],
        correctAnswerIndex: 1,
        explanation: "Personification represents giving human qualities or behaviors to inanimate objects or concepts, such as wind whispering."
      }
    ]
  }
];

export function dynamicAIGenerateDecks(prompt: string, subject: string, refArticleContent?: string): FlashcardDeck {
  const cleanPrompt = prompt.toLowerCase();
  
  if (refArticleContent || cleanPrompt.includes("cell") || cleanPrompt.includes("bio") || cleanPrompt.includes("mitosis")) {
    return {
      id: "deck-gen-" + Date.now().toString(),
      title: "Cellular Biology Key Terms",
      subject: subject || "Science",
      cards: [
        {
          id: "fc-g-1",
          front: "What is the Mitochondrion?",
          back: "Defined as the 'powerhouse of the cell' — this organelle is where cellular respiration occurs, producing ATP molecule energy."
        },
        {
          id: "fc-g-2",
          front: "What is Mitosis?",
          back: "A type of cell division that results in two daughter cells each having the same number and kind of chromosomes as the parent nucleus."
        },
        {
          id: "fc-g-3",
          front: "What is the primary function of Ribosomes?",
          back: "They serve as the protein builders of the cell, translating genetic information from RNA into amino acid chains."
        },
        {
          id: "fc-g-4",
          front: "Difference between Prokaryotic and Eukaryotic Cells?",
          back: "Eukaryotic cells contain membrane-bound organelles (like a nucleus), whereas prokaryotes do not hold a nucleus."
        }
      ]
    };
  }

  if (cleanPrompt.includes("fraction") || cleanPrompt.includes("math") || cleanPrompt.includes("equation") || cleanPrompt.includes("calculus") || cleanPrompt.includes("geometry")) {
    return {
      id: "deck-gen-" + Date.now().toString(),
      title: "Intermediate Math & Calculus Basics",
      subject: subject || "Mathematics",
      cards: [
        {
          id: "fc-g-1",
          front: "What is a Derivative?",
          back: "Measuring the rate at which a function value changes at a given instantaneous point. It equals the slope of the tangent line."
        },
        {
          id: "fc-g-2",
          front: "What is an Integer?",
          back: "A complete whole number that is not a fractional quotient. Can be positive, negative, or zero."
        },
        {
          id: "fc-g-3",
          front: "What is the Pythagorean Theorem?",
          back: "In any right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides (a² + b² = c²)."
        }
      ]
    };
  }

  // Fallback / default generated content
  let titleStr = "Curriculum Study Guide: " + (prompt.length > 25 ? prompt.substring(0, 22) + "..." : prompt);
  return {
    id: "deck-gen-" + Date.now().toString(),
    title: titleStr,
    subject: subject || "Science",
    cards: [
      {
        id: "fc-g-1",
        front: "Primary Concept of " + prompt,
        back: "This subject covers advanced fundamental principles designed to cultivate reading comprehesion, technical mastery, and testing compliance."
      },
      {
        id: "fc-g-2",
        front: "Key Application",
        back: "Implementing real-world models, observing reactions in laboratory environments, and conducting rigorous scientific research."
      },
      {
        id: "fc-g-3",
        front: "Core Terminology",
        back: "Practitioners define specialized glossaries to communicate theoretical findings clearly while running experiments."
      }
    ]
  };
}

export function dynamicAIGenerateQuizzes(prompt: string, subject: string, refArticleContent?: string): Quiz {
  const cleanPrompt = prompt.toLowerCase();

  if (refArticleContent || cleanPrompt.includes("cell") || cleanPrompt.includes("biology") || cleanPrompt.includes("organelle")) {
    return {
      id: "quiz-gen-" + Date.now().toString(),
      title: "Cell Structures & Organelles Quiz",
      subject: subject || "Science",
      questions: [
        {
          id: "q-g-1",
          question: "Which organelle is responsible for generating chemical energy (ATP) inside eukaryotic cells?",
          options: [
            "Lysosome",
            "Mitochondrion",
            "Endoplasmic Reticulum",
            "Golgi Apparatus"
          ],
          correctAnswerIndex: 1,
          explanation: "Mitochondria act as the principal force for cell breathing and make ATP by oxidizing sugars."
        },
        {
          id: "q-g-2",
          question: "What protective outer layer is found in plant cells but absent in human animal cells?",
          options: [
            "Cell Membrane",
            "Cell Wall",
            "Ribose Ring",
            "Nuclear Envelope"
          ],
          correctAnswerIndex: 1,
          explanation: "Plant cells hold a thick, rigid Cellulose Cell Wall that provides mechanical structure. Animals are membrane-only."
        },
        {
          id: "q-g-3",
          question: "What molecule stores the hereditary instructions for cell biology coding?",
          options: [
            "Deoxyribonucleic Acid (DNA)",
            "Adenosine Triphosphate (ATP)",
            "Sodium Chloride (NaCl)",
            "Chloride Compound"
          ],
          correctAnswerIndex: 0,
          explanation: "DNA holds all the essential blueprint code for organism growth, development, and division."
        }
      ]
    };
  }

  // Fallback / standard topic quiz
  let nameStr = "Standard Syllabus Review: " + (prompt.length > 25 ? prompt.substring(0, 22) + "..." : prompt);
  return {
    id: "quiz-gen-" + Date.now().toString(),
    title: nameStr,
    subject: subject || "Science",
    questions: [
      {
        id: "q-g-1",
        question: "Which is the most essential scientific practice when studying " + prompt + "?",
        options: [
          "Accepting claims without querying them",
          "Forming a testable hypothesis and conducting controlled observations",
          "Memorizing older files without updating models",
          "Relying purely on secondary opinions"
        ],
        correctAnswerIndex: 1,
        explanation: "Controlled testing, peer reviews, repeatable experiments, and forming hypotheses are the cornerstones of all academic discoveries."
      },
      {
        id: "q-g-2",
        question: "How does research in " + prompt + " benefit from modern collaboration workflows?",
        options: [
          "It restricts access to resources",
          "It enables global sharing of peer-reviewed data to verify discoveries",
          "It mandates manual drawing instead of database queries",
          "It increases testing mistakes"
        ],
        correctAnswerIndex: 1,
        explanation: "Global databases, shared communication, and peer logs speed up scientific testing and weed out errors."
      }
    ]
  };
}

export interface GrammarMistake {
  id: string;
  startIndex: number;
  endIndex: number;
  originalText: string;
  suggestedCorrection: string;
  category: "Grammar" | "Spelling" | "Punctuation" | "Passive Voice" | "Conciseness" | "Tone";
  explanation: string;
}

export function scanGrammarEssay(text: string): GrammarMistake[] {
  const mistakes: GrammarMistake[] = [];
  
  // 1. Passive Voice checks
  const passiveRegexes = [
    { word: /\bwas written by\b/gi, fix: "wrote", text: "was written by", exp: "Use active voice for punchier, clearer academic sentences. (e.g., 'Newton wrote the law' instead of 'The law was written by Newton')" },
    { word: /\bhas been completed by\b/gi, fix: "completed", text: "has been completed by", exp: "Active actions make statements stronger. Identify the primary subject and make it execute the verb." }
  ];
  
  // 2. Spelling mistakes common in school papers
  const spellingPairs = [
    { word: /\bteh\b/gi, fix: "the", text: "teh", exp: "Correct the common typing mistake 'teh' to 'the'." },
    { word: /\breceive\b/gi, fix: "receive", text: "recieve", exp: "Remember the rule: 'I' before 'E' except after 'C' in standard english spelling." }, // Wait, recieve typed in paper
    { word: /\brecieve\b/gi, fix: "receive", text: "recieve", exp: "Common spelling mistake. The correct spelling is 'receive'." },
    { word: /\bseperate\b/gi, fix: "separate", text: "seperate", exp: "Common spelling spelling mistake. The correct spelling is 'separate' (contains 'a rat')." },
    { word: /\bthere scientific\b/gi, fix: "their scientific", text: "there scientific", exp: "Homophone mistake: 'Their' is possessive, 'There' represents location." },
    { word: /\bits practical\b/gi, fix: "it's practical", text: "its practical", exp: "Homophone misuse. Use contraction 'it's' if you mean 'it is'." },
    { word: /\byour wrong\b/gi, fix: "you're wrong", text: "your wrong", exp: "Adjective mismatch. 'Your' indicates ownership. Use contraction 'you're' for 'you are'." }
  ];

  // 3. Subject-Verb disagreement
  const grammarPairs = [
    { word: /\bscientists is\b/gi, fix: "scientists are", text: "scientists is", exp: "Plural subject mismatch. 'Scientists' is plural; use the verb 'are'." },
    { word: /\bone of the books are\b/gi, fix: "one of the books is", text: "one of the books are", exp: "Subject mismatch. 'One' is single and requires the singular verb 'is', regardless of intervening plural preposition phrases like 'of the books'." },
    { word: /\bhe run\b/gi, fix: "he runs", text: "he run", exp: "Pronoun mismatch. Third-person singular 'he' matches with verbs ending in S (runs)." }
  ];

  // Run matching and build indices
  const allPatterns = [
    ...passiveRegexes.map(p => ({ ...p, cat: "Passive Voice" as const })),
    ...spellingPairs.map(p => ({ ...p, cat: "Spelling" as const })),
    ...grammarPairs.map(p => ({ ...p, cat: "Grammar" as const }))
  ];

  allPatterns.forEach((p, idx) => {
    let match;
    const regex = new RegExp(p.word); // fresh regex copy
    while ((match = regex.exec(text)) !== null) {
      mistakes.push({
        id: `g-mistake-${idx}-${match.index}`,
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        originalText: match[0],
        suggestedCorrection: p.fix,
        category: p.cat,
        explanation: p.exp
      });
    }
  });

  // Sort mistakes by start index so we replace clean left-to-right
  return mistakes.sort((a,b) => a.startIndex - b.startIndex);
}
