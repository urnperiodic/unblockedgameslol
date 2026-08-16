import { Article } from '../types';

export const initialArticles: Article[] = [];

export const subjectOptions = [
  { value: 'Science', label: 'Science' },
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'ELA', label: 'English Language Arts' },
  { value: 'Social Studies', label: 'Social Studies' },
  { value: 'Italian', label: 'Italian Language' }
];

export const gameOptions = subjectOptions;

export const toneOptions = [
  { value: 'Informational', description: 'Clear, fact-based expository writing with headings and key terms' },
  { value: 'Narrative Nonfiction', description: 'Story-driven prose that puts a human face on real events or concepts' },
  { value: 'Persuasive / Argumentative', description: 'Claim, evidence, and reasoning structure with a clear position' },
  { value: 'Compare & Contrast', description: 'Side-by-side analysis of two topics, ideas, or historical events' }
];

export function generateMockAIArticle(subject: string, tone: string, customPrompt?: string): Article {
  const timestamp = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  const articleId = `art-custom-${Date.now()}`;

  let title = '';
  let content = '';
  let category = subject;

  const lowerPrompt = customPrompt ? customPrompt.toLowerCase() : '';
  const isTrulyCustom = customPrompt && customPrompt.trim().length > 0 && !lowerPrompt.startsWith('write an educational');

  if (isTrulyCustom) {
    const stopWords = new Set([
      'write', 'an', 'article', 'about', 'explain', 'how', 'works', 'focused', 'on', 
      'concepts', 'concept', 'suited', 'for', 'school', 'reading', 'educational', 'a', 
      'the', 'to', 'in', 'of', 'and', 'or', 'with', 'by', 'concerning', 'regarding',
      'discuss', 'create', 'generate', 'tutorial', 'guide', 'lesson', 'overview'
    ]);
    
    const words = customPrompt!
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .split(/\s+/)
      .filter(w => w && !stopWords.has(w));
      
    if (['science', 'cell', 'physics', 'planet', 'earth', 'chemical', 'biology', 'photosynthesis', 'gravity'].some(kw => lowerPrompt.includes(kw))) {
      category = 'Science';
    } else if (['math', 'calculator', 'algebra', 'geometry', 'number', 'integer', 'fraction'].some(kw => lowerPrompt.includes(kw))) {
      category = 'Mathematics';
    } else if (['reading', 'literature', 'poetry', 'writing', 'english', 'ela', 'classic', 'book'].some(kw => lowerPrompt.includes(kw))) {
      category = 'ELA';
    } else if (['studies', 'history', 'civics', 'government', 'social', 'rome', 'greece', 'ancient'].some(kw => lowerPrompt.includes(kw))) {
      category = 'Social Studies';
    }

    let coreTopic = words
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .slice(0, 5)
      .join(' ');
      
    if (!coreTopic || coreTopic.trim() === '') {
      coreTopic = `${category} Academic Focus`;
    }
    
    title = `${coreTopic}: An In-Depth Exploration`;
    
    content = `### Overview
This article provides an in-depth examination based on the custom user research prompt and curriculum guidelines. We explore the central ideas, academic significance, and key terminology associated with **${coreTopic}**, helping students build analytical depth in this topic.

### Core Principles and Mechanisms
Understanding the details of **${coreTopic}** is vital for modern educational development. Let us explore the primary pillars and characteristics of this field:
* **Systemic Interdependence:** All components of this topic function as part of a larger, integrated system. Changes in one factor produce cascading effects on others.
* **Evidence-Based Reasoning:** Modern classroom curricula emphasize that analyzing qualitative and quantitative evidence is essential to drawing correct conclusions about this domain.
* **Practical Application:** Connecting abstract formulas or narratives to real-world scenarios makes the study of this concept highly engaging and relevant.

### Detailed Analytical Breakdown
To fully grasp the scope of **${coreTopic}**, it is useful to dive into its main functional layers:
1. **Historical Context / Foundation:** Every conceptual framework develops from initial discoveries, critical events, or theoretical proposals.
2. **Key Variables:** Identifying the active forces, variables, or elements that shape this topic helps us formulate accurate explanations and predictions.
3. **Synthesis & Integration:** Combining individual facts or techniques guides students in building unified, comprehensive models of understanding.

### Discussion and Long-Term Value
As contemporary education shifts to prioritize critical analysis and rigorous standards, study resources like this serve as active guides. Exploring **${coreTopic}** promotes a deeper cognitive appreciation, enabling students to construct sound arguments and participate in constructive discussion about ${category.toLowerCase()}-related questions.`;
  } else if (tone === 'Informational') {
    if (subject === 'Science') {
      title = `Photosynthesis: How Plants Convert Sunlight into Food`;
      content = `### What Is Photosynthesis?
Photosynthesis is the process by which green plants, algae, and some bacteria use sunlight, water, and carbon dioxide to produce glucose (a sugar) and oxygen. It is the foundation of nearly all life on Earth because it creates the energy that flows through food chains.

The overall chemical equation is:
6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂

### Where Does It Happen?
Photosynthesis takes place inside chloroplasts—organelles found in plant cells that contain a green pigment called chlorophyll. Chlorophyll absorbs red and blue wavelengths of light most efficiently, reflecting green light back to our eyes (which is why plants appear green).

### The Two Stages
1. **Light-Dependent Reactions:** Occur in the thylakoid membranes. Sunlight splits water molecules, releasing oxygen as a byproduct and producing energy carriers (ATP and NADPH).
2. **Calvin Cycle (Light-Independent):** Occurs in the stroma. The plant uses ATP and NADPH to convert carbon dioxide into glucose through a series of enzyme-driven reactions.

### Why It Matters
* Photosynthesis produces the oxygen in Earth's atmosphere.
* It is the primary source of energy for almost all ecosystems.
* Understanding it helps scientists develop more efficient solar energy systems.`;
    } else if (subject === 'Mathematics') {
      title = `Understanding Integers and Absolute Value on the Number Line`;
      content = `### What Are Integers?
Integers are the set of whole numbers and their opposites: {..., -3, -2, -1, 0, 1, 2, 3, ...}. Unlike fractions or decimals, integers have no partial values. They appear on a number line extending infinitely in both directions from zero.

### Positive and Negative Integers
* **Positive integers** (greater than zero) appear to the right of zero on the number line.
* **Negative integers** (less than zero) appear to the left.
* **Zero** is neither positive nor negative.

Negative integers model real-world situations such as temperatures below freezing, depths below sea level, and financial debt.

### Absolute Value
The absolute value of an integer is its distance from zero on the number line, regardless of direction. Distance is always non-negative.

We write absolute value using vertical bars: |−7| = 7 and |7| = 7.

Key rules:
1. The absolute value of zero is zero: |0| = 0
2. The absolute value of any nonzero number is positive.
3. Opposites have the same absolute value: |−n| = |n|

### Comparing and Ordering Integers
On the number line, numbers increase from left to right. Therefore:
* −10 < −3 (farther left = smaller value)
* −1 > −100
* Always place integers on a number line before comparing to avoid errors.`;
    } else if (subject === 'ELA') {
      title = `Theme vs. Topic: Understanding the Central Message of a Text`;
      content = `### The Difference Between Topic and Theme
Beginning readers often confuse a story's topic with its theme. The topic is simply what a story is about—stated in one or two words (e.g., "friendship," "war," "growing up"). The theme is the deeper message the author conveys about that topic—a complete sentence that expresses a universal truth.

* **Topic:** Courage
* **Theme:** True courage means doing the right thing even when no one is watching.

### How Authors Develop Theme
Authors rarely state their theme directly. Instead, they develop it through:
1. **Character change:** What lesson does the main character learn? Their transformation often reveals the theme.
2. **Conflict and resolution:** How a conflict is resolved communicates what the author believes is right or true.
3. **Repeated symbols or motifs:** Objects, colors, or images that appear multiple times often carry thematic weight.
4. **Dialogue:** Key conversations between characters frequently hint at the central message.

### Distinguishing Multiple Themes
Complex literary works often carry more than one theme. A novel about a young immigrant might simultaneously explore themes of identity, belonging, and perseverance. A strong reader can identify which theme the author develops most fully.

### Writing a Theme Statement
A strong theme statement:
* Is a complete sentence (not just a word or phrase)
* Does not name specific characters or plot events
* Expresses a truth that applies to real life, not just the story
* Avoids clichés like "Be yourself" or "Never give up" without deeper context`;
    } else {
      title = `The Three Branches of U.S. Government: A System of Checks and Balances`;
      content = `### Why Three Branches?
When the Founders designed the United States government in 1787, they feared concentrated power above all else. Their solution was separation of powers—dividing authority among three distinct branches so that no single person or group could dominate the government.

### The Legislative Branch (Congress)
Congress is the lawmaking body of the federal government, split into two chambers:
* **Senate:** 100 senators, two from each state, serving six-year terms.
* **House of Representatives:** 435 members, apportioned by state population, serving two-year terms.

Congress writes and passes federal laws, controls the national budget, and can declare war.

### The Executive Branch (President)
The President of the United States is elected every four years and limited to two terms. The executive branch:
* Enforces federal laws
* Commands the military as Commander-in-Chief
* Appoints federal judges and Cabinet members
* Can veto (reject) bills passed by Congress

### The Judicial Branch (Federal Courts)
The Supreme Court—nine justices appointed for life—heads the judicial branch. Federal courts:
* Interpret whether laws follow the Constitution
* Can strike down laws as unconstitutional (judicial review)

### Checks and Balances in Action
Each branch limits the others:
1. Congress passes a law → President can veto it → Congress can override the veto with a two-thirds vote.
2. President appoints a Supreme Court justice → Senate must confirm the appointment.
3. Supreme Court can declare a presidential action unconstitutional.

This interlocking system ensures that power remains balanced and accountable to the American people.`;
    }
  } else if (tone === 'Narrative Nonfiction') {
    title = `A Day in the Life: ${subject === 'Social Studies' ? 'A Colonial American Child' : subject === 'Science' ? 'Inside a Rain Forest' : subject === 'Mathematics' ? 'How a Bridge Gets Built' : 'The Night Maya Found Her Voice'}`;
    content = `### A Story Rooted in Fact
${subject === 'ELA' || subject === 'Mathematics'
  ? `Maya had always been told she was a quiet girl. In her seventh-grade classroom, she sat in the third row by the window, watching other students raise their hands with the easy confidence she desperately wanted. Then one Tuesday morning, her teacher assigned something different: a spoken-word poetry performance.

For Maya, words had always lived safely on paper. Speaking them aloud—in front of people who would watch her face and hear her voice shake—felt impossible. But the assignment had a deadline, and the deadline was Friday.

### The Process of Finding a Voice
What Maya discovered that week mirrors what researchers in literacy development call the "revision-to-performance arc." Writers who read their work aloud process language differently than those who revise silently. The act of speaking forces attention to rhythm, pacing, and word choice in ways that quiet revision often misses.

By Thursday night, Maya had revised her poem eleven times. Not because the words were wrong, but because she was learning what they sounded like—and learning, slowly, that her voice was strong enough to carry them.`
  : `The rain forest does not sleep. At 4:47 in the morning, long before the first shaft of light reaches the forest floor, the first layer of sound begins: the low resonant call of a howler monkey, carrying through three miles of humid air to mark territorial boundaries.

By the time a scientist named Dr. Esperanza Cruz arrived at her research station at 5:15 a.m., the canopy above her was already alive with movement. Her team was studying the interdependence of species in the Peruvian Amazon—specifically, how the removal of a single keystone species could collapse an entire food web.

### What the Data Revealed
Over fourteen months, Dr. Cruz's team catalogued over 1,200 species interactions within a single 10-hectare study plot. The results confirmed what ecologists have long theorized but rarely measured at this resolution: the loss of just three fig tree species in this region would directly eliminate food sources for 47 vertebrate species—triggering a cascade that would ultimately affect over 200 species in the surrounding ecosystem.`}

### What This Teaches Us
Behind every piece of narrative nonfiction is documented research. The emotions are real, the characters are real, and the science or history they experience is accurate. This genre invites readers into lived experience while delivering factual content—because facts remembered through story tend to stay longer.`;
  } else if (tone === 'Persuasive / Argumentative') {
    title = `${subject === 'Science' ? 'Schools Should Teach Environmental Science Every Year' : subject === 'Mathematics' ? 'Financial Literacy Should Be a Required Math Course' : subject === 'ELA' ? 'Reading Classic Literature Still Matters in the Digital Age' : 'Students Should Learn a Second Language Starting in Elementary School'}`;
    content = `### The Claim
${subject === 'Mathematics'
  ? `Every high school student in the United States should be required to complete at least one semester of financial literacy as part of their mathematics curriculum. The ability to balance a budget, understand compound interest, and navigate taxes is not optional knowledge—it is survival knowledge. Yet most schools leave students completely unprepared.`
  : subject === 'ELA'
  ? `In an era of short-form video and algorithmic content, requiring students to read classic literature may seem outdated. It is not. The complex sentence structures, ambiguous characters, and layered themes found in enduring works of literature develop exactly the kind of critical thinking that modern digital life tends to erode.`
  : subject === 'Science'
  ? `Environmental science education should be embedded in every grade level from kindergarten through twelfth grade—not offered as a single elective. Climate change, resource depletion, and biodiversity loss are the defining challenges of this century. Students cannot address problems they were never taught to understand.`
  : `Research consistently shows that children who begin learning a second language before age ten achieve higher fluency and retain the language for life. Despite this evidence, most American school districts do not introduce foreign language instruction until middle school—a delay with real and measurable consequences.`}

### Evidence
* Studies published in peer-reviewed journals show that early exposure to a subject dramatically increases long-term retention and application.
* Countries that prioritize this subject area consistently outperform the United States on international assessments.
* Surveys of adults overwhelmingly report wishing they had received more instruction in this area during their school years.

### Addressing the Counterargument
Critics argue that the curriculum is already overcrowded and that adding requirements displaces other essential subjects. This argument mistakes breadth for quality. Integration—not addition—is the answer. ${subject} concepts can be woven into existing coursework without displacing it.

### Conclusion
The evidence is clear. Expanding ${subject} education is not an idealistic goal—it is a practical investment in students who will face a world that demands these skills. Schools that fail to adapt are failing their students.`;
  } else {
    // Compare & Contrast
    title = `${subject === 'Science' ? 'Photosynthesis vs. Cellular Respiration: Two Sides of the Same Coin' : subject === 'Mathematics' ? 'Mean, Median, and Mode: Choosing the Right Measure of Center' : subject === 'ELA' ? 'Fiction vs. Nonfiction: How Form Shapes Meaning' : 'Ancient Greece vs. Ancient Rome: Foundations of Western Civilization'}`;
    content = `### Introduction
Understanding concepts in isolation is useful. Understanding how they relate to—and differ from—each other is more powerful. This article compares two closely related ${subject.toLowerCase()} ideas that students frequently confuse.

### Similarities
Both share a common foundation:
* They emerge from the same broader system or historical context.
* Each plays an essential and complementary role in how the subject area functions.
* Students who master one concept are significantly better positioned to understand the other.

### Key Differences
${subject === 'Science'
  ? `**Photosynthesis** converts light energy into chemical energy stored as glucose (C₆H₁₂O₆), releasing oxygen as a byproduct. It occurs in plant chloroplasts and requires sunlight.

**Cellular respiration** breaks down glucose to release usable energy (ATP), consuming oxygen and releasing carbon dioxide. It occurs in the mitochondria of nearly all living cells, including plants and animals.

In short: photosynthesis stores energy; cellular respiration releases it. One builds; the other burns.`
  : subject === 'Mathematics'
  ? `The **mean** (average) is sensitive to outliers. A single extreme value can pull the mean far from where most data actually clusters.

The **median** (middle value when data is ordered) is resistant to outliers. It better represents the center when data is skewed.

The **mode** (most frequent value) is most useful for categorical data or when identifying the most common response.

Rule of thumb: use the median for income data, housing prices, or any distribution with outliers. Use the mean for symmetric distributions without extreme values.`
  : subject === 'ELA'
  ? `**Fiction** uses invented characters, settings, and events to explore emotional truths. The author is not constrained by what happened—only by what rings true. Its purpose is often to generate empathy and insight through story.

**Nonfiction** is bound to documented facts, real people, and verifiable events. The author's interpretation matters, but the record cannot be invented. Its purpose is to inform, analyze, or persuade using evidence.

Both forms can be equally sophisticated and literary. The difference lies in their relationship to fact—not in their quality or complexity.`
  : `**Ancient Greece** (c. 800–146 BCE) pioneered democracy, philosophy, and scientific inquiry. Greek city-states like Athens and Sparta operated independently and often competed. Greek culture emphasized individual intellectual achievement.

**Ancient Rome** (c. 753 BCE–476 CE) built upon Greek foundations while adding engineering, law, and large-scale governance. Rome unified vast territories under a single political system—first a republic, then an empire—prioritizing order, military strength, and civic infrastructure.

Greece gave the Western world its ideas. Rome gave it the institutions to spread and sustain them.`}

### Which Is More Important?
This is a false choice. Both are essential. The deeper lesson is that most important concepts exist in relationship to each other—and genuine understanding requires knowing not just what something is, but how it compares to what it is not.`;
  }

  return {
    id: articleId,
    title,
    subtitle: `AI-Generated • ${tone} • ${subject}`,
    content,
    date: timestamp,
    category,
    readTime: '3 min read',
    isCustomGenerated: true
  };
}
