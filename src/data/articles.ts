import { Article } from '../types';

export const initialArticles: Article[] = [
  // ==================== NEW ADDITION ====================
  {
    id: 'ela-paywall-1',
    title: 'Ways to Remove Paywalls: Overcoming Barriers to Academic Research',
    subtitle: 'Research Skills • Information Literacy • Bypassing Barriers',
    content: `### Overview
When conducting academic research or reading journalism, we frequently encounter paywalls, which is really frustrating. Publishers charge to sustain there work, but these barriers recieve criticism because they restrict access to information, especially for students and self-guided learners. This guide details practical, simple methods to bypass and remove paywalls, enabling open access to public knowledge.

### 1. Web Archiving Platforms
Archiving services take snapshots of web pages before they are put behind paywalls or preserve the full versions as crawled by non-paywalled bots.
* **Wayback Machine (Archive.org):** A digital library of the World Wide Web. By pasting the article URL, you can check if a previous, fully accessible snapshot exists.
* **Archive.today (Archive.ph / Archive.is):** A robust tool that bypasses paywall scripts by loading and rendering teh target page from a clean server, saving a complete public snapshot.

### 2. Disabling JavaScript
Many modern website implements 'soft paywalls' which loads the complete article content to the browser, then overlay a modal or block script via JavaScript.
* **How to do it:** Navigate to your browser's site settings, find JavaScript, and select 'Block.'
* **Alternative:** Use specialized browser extensions that toggle JavaScript execution on and off with a single click.

### 3. Native Reader Mode
Most browsers (such as Chrome, Safari, and Firefox) feature a built-in 'Reader Mode' or 'Reader View.'
* **Mechanism:** Reader Mode strips away all CSS stylesheets, ads, and interactive scripts, loading only the plain text and media elements.
* **Usage:** Often, toggling Reader Mode as the page are loading will recieve the article content before the paywall scripts have a chance to execute.

### 4. Search Engine Cache
Search engines like Google index paid websites by running crawlers that are granted full access to bypass paywalls. These crawled pages are stored in a public cache database.
* **How to do it:** In Google Search results, click the three vertical dots next to the result URL and select 'Cached'.
* **Direct access:** Prepend 'cache:' to the start of the URL in your address bar (e.g., cache:https://example.com/article).

### 5. RemovePaywall.com and Bypass Tools
There are dedicated, zero-configuration platforms designed to automate paywall removal for research.
* **RemovePaywall.com:** By visiting https://www.removepaywall.com and entering any article URL, the tool automatically retrieves clean, unblocked versions from archival indexes, search engine caches, or open repositories.
* **Alternative aggregators:** Similar tools like 12ft.io use custom user-agents to pretend to be search engine crawlers, pulling the un-paywalled version of the text.

### 6. Finding Open-Access Preprints
Many academic journals charge subscriptions, but researchers are often permitted to upload 'preprints' or draft versions to public universities or repositories.
* **Unpaywall Extension:** A legal, free browser extension that searches millions of open-access databases for the exact article you are reading.
* **Google Scholar:** Searching for the title on Google Scholar often reveals PDF versions hosted on university websites.`,
    date: 'Jul 18, 2026',
    category: 'ELA',
    readTime: '4 min read'
  },

  // ==================== SCIENCE ARTICLES (10) ====================
  {
    id: 'sci-1',
    title: 'Newton\'s Laws of Motion: The Physics of Movement',
    subtitle: 'Grade 8 • Physical Science • Forces and Motion',
    content: `### Overview
Three centuries ago, Isaac Newton formulated three laws of physics. They explain how objects move and why they change direction. Basically, these principles govern everything from kicking soccer balls to orbiting spacecrafts.

### The First Law: Inertia
The first law say that an object at rest stays at rest, and an object in motion stays in motion with constant speed, unless some outside force acts on it.
* Inertia is the tendency of matter to resist any change in state of motion.
* For example, when a car stops sudden, your body keeps moving forward—which is why seatbelts is so important.
* Massive objects have greater inertia, making them harder to start or stop.

### The Second Law: Force and Acceleration
The second law establish a direct math relationship between force, mass, and acceleration.
* Mathematically written as: Force = Mass × Acceleration (F = ma)
* If you apply the same force to a tennis ball and a bowling ball, teh tennis ball will accelerate much more faster because its got less mass.
* Acceleration is measured in meters per second squared (m/s²).

### The Third Law: Action and Reaction
The third law says that for every action, there is a equal and opposite reaction.
* Forces always exist in pairs.
* When you take a step forward, your foot push backward on the ground, and the ground push forward with equal force.
* Rockets launch by burning fuel and shooting gas downward. This action creates an equal and opposite upward reaction on the rocket.`,
    date: 'Jun 04, 2026',
    category: 'Science',
    readTime: '4 min read'
  },
  {
    id: 'sci-2',
    title: 'Plate Tectonics: Earth\'s Restless Outer Shell',
    subtitle: 'Grade 8 • Earth Science • Geology',
    content: `### Earth\'s Layers and Plates
Earth's outer crust—the lithosphere—is not one single piece. Instead, it is broken into giant, interlocking slabs called tectonic plates. These plates float and drag atop a hot, semi-fluid mantle layer called the asthenosphere.

### Types of Plate Boundaries
Plates interact at three main types of boundaries, producing dramatic geological features:
1. **Divergent Boundaries:** Plates pull apart. Magma rises from the mantle to fill the gap, cooling to form new crust. This occurs at mid-ocean ridges and deep rift valleys.
2. **Convergent Boundaries:** Plates collide. If an oceanic plate strikes a continental plate, the heavier oceanic plate sinks beneath in a process called subduction, creating volcanoes and trenches. If two continental plates collide, they buckle upward to form towering mountain ranges like the Himalayas.
3. **Transform Boundaries:** Plates slide horizontally past each other. Friction binds the rocks, storing energy. When the plates suddenly slip, they release this stored energy as a major earthquake, such as along California's San Andreas Fault.

### Continental Drift Evidence
Alfred Wegener proposed the theory of continental drift in 1912. His key lines of evidence included:
* The jigsaw-like fit of South America and Africa.
* Matching fossils of ancient reptiles found on continents separated by wide oceans.
* Identical mountain ranges of matching rock types spanning oceans.`,
    date: 'Jun 03, 2026',
    category: 'Science',
    readTime: '5 min read'
  },
  {
    id: 'sci-3',
    title: 'The Periodic Table: Nature\'s Building Blocks',
    subtitle: 'Grade 8 • Chemical Science • Chemistry Principles',
    content: `### Dmitry Mendeleev\'s Masterpiece
In 1869, Russian chemist Dmitry Mendeleev organized the known chemical elements according to their atomic masses and properties. He created the Periodic Table, which successfully predicted the existence of elements that had not yet been discovered.

### Understanding Atomic Anatomy
Every box on the periodic table represents a unique type of atom. An element's properties are dictated by its atomic structure:
* **Atomic Number:** The number of protons inside the atom's nucleus. This serves as the element's unique chemical signature.
* **Atomic Mass:** The weighted average mass of the protons and neutrons inside the nucleus.
* **Valence Electrons:** The electrons orbiting the outermost ring. These determine how reactive an element is with other elements.

### Families of Elements
The vertical columns are called groups, while horizontal rows are called periods. Groups share similar chemical attributes:
* **Group 1 (Alkali Metals):** Highly reactive metals that will explode when placed in water (e.g., Sodium).
* **Group 17 (Halogens):** Extremely reactive nonmetals that readily bond with alkali metals (e.g., Chlorine to make NaCl salt).
* **Group 18 (Noble Gases):** Complete outer electron shells make these gases entirely stable, nonreactive, and inert (e.g., Helium, Neon).`,
    date: 'Jun 02, 2026',
    category: 'Science',
    readTime: '4 min read'
  },
  {
    id: 'sci-4',
    title: 'The Electromagnetic Spectrum: Light Beyond Our Eyes',
    subtitle: 'Grade 8 • Physical Science • Waves and Radiation',
    content: `### Wave Energy and Dual Nature
Electromagnetic radiation travels through space as wave energy. All electromagnetic waves move at the universal speed of light, but they vary in wavelength and frequency.

### The Spectrum Breakdown
From longest wavelength (lowest energy) to shortest wavelength (highest energy), the spectrum includes:
* **Radio Waves:** Carry communication signals for radios, TVs, and cellphones.
* **Microwaves:** Heat water molecules in food and transmit satellite data.
* **Infrared:** Felt as heat radiating off warm bodies; used inside thermal vision equipment.
* **Visible Light:** The tiny band of wavelengths detectable by human eyes, spanning from red to violet.
* **Ultraviolet (UV):** Invisible rays from the sun that can cause sunburns or feed solar energy.
* **X-Rays:** High-energy rays that pass through muscle tissue but bounce off dense bones, aiding medicine.
* **Gamma Rays:** Shortest waves with maximum energy, produced by supernovas and radioactive decay.

### High Frequency vs. Low Frequency
Wave frequency is inversely proportional to wavelength. Short waves have high frequencies that carry substantial energy. High-frequency waves (like UV, X-rays, and gamma) contain enough energy to strip electrons from atoms—a process called ionization that can damage biological tissue.`,
    date: 'Jun 01, 2026',
    category: 'Science',
    readTime: '4 min read'
  },
  {
    id: 'sci-5',
    title: 'Mitosis vs. Meiosis: Understanding Cell Division',
    subtitle: 'Grade 8 • Life Science • Cellular Reproduction',
    content: `### Why Cells Divide
Cell division represents the primary mechanism for survival, growth, tissue repair, and the reproduction of all living organisms. Living structures organize this process through two distinct methods depending on the cell's ultimate role.

### Mitosis: Cloning for Growth
Mitosis divides a single body cell (somatic cell) into two genetically identical daughter cells.
* Occurs for growth (like healing a cut) and tissue replacement.
* The starting cell is diploid (having two sets of chromosomes).
* Steps: Prophase, Metaphase, Anaphase, Telophase (PMAT).
* Results in two exact genetic replicas of the original parent cell.

### Meiosis: Creating Genetic Diversity
Meiosis divides a specialized cell twice to create four genetically unique gametes (sex cells: sperm and eggs).
* Meiosis reduces the chromosome count by half to create haploid cells.
* This reduction guarantees that when fertilization occurs, the offspring has the correct number of chromosomes.
* During Prophase I, homologous chromosomes exchange segments—a critical step called 'crossing over'.
* This genetic recombination produces unique offspring, driving natural selection and evolution.`,
    date: 'May 30, 2026',
    category: 'Science',
    readTime: '5 min read'
  },
  {
    id: 'sci-6',
    title: 'Chemical Changes: Equations and Conservation of Mass',
    subtitle: 'Grade 8 • Chemical Science • Reactions and Equations',
    content: `### Physical vs. Chemical Changes
A physical change alters form or state (like freezing water into ice) but leaves chemical identity intact. A chemical change rearranges atoms, forming entirely new molecules with unique properties (like burning wood).

### Indicators of a Chemical Reaction
Several observable indicators suggest a chemical reaction has taken place:
1. Significant bubble production (gas release).
2. Unexpected temperature change (exothermic or endothermic).
3. The formation of a solid precipitate in a liquid solution.
4. An unexpected color change (like rusting iron).

### Law of Conservation of Mass
The Law of Conservation of Mass states that mass cannot be created or destroyed in a chemical reaction.
* Every atom present in the initial reactants must exist in the final products.
* To satisfy this law, scientists balance chemical equations using coefficients.
* In the equation: 2H₂ + O₂ → 2H₂O, notice how there are exactly 4 hydrogen atoms and 2 oxygen atoms on both sides of the reaction arrow.`,
    date: 'May 28, 2026',
    category: 'Science',
    readTime: '4 min read'
  },
  {
    id: 'sci-7',
    title: 'Gravity and Orbit: Force That Shapes the Universe',
    subtitle: 'Grade 8 • Physical Science • Astronomy',
    content: `### Ultimate Gravitational Attraction
Gravity is an attractive force that pulls any two objects with mass toward each other. In our solar system, gravity is the cosmic glue that keeps planets orbiting the sun and moons orbiting their parent planets.

### Mass vs. Distance Factors
Isaac Newton's Universal Law of Gravitation details that gravitational force relies on two primary factors:
1. **Mass:** More massive objects exert a exponentially stronger gravitational pull. Because the sun contains 99.8% of our solar system's mass, its massive gravity dominates local space.
2. **Distance:** As the distance between two objects increases, their gravitational attraction drops off sharply.

### The Mechanics of Orbit
An orbit represents a delicate balance between forward motion (inertia) and the downward pull of gravity.
* If a planet moved too slowly, solar gravity would pull it into a collision with the sun.
* If a planet moved too quickly, its inertia would slide it out of orbit and shoot it into deep space.
* Space stations orbit Earth in a constant state of freefall, gliding continuously horizontal to the planet's curve.`,
    date: 'May 26, 2026',
    category: 'Science',
    readTime: '4 min read'
  },
  {
    id: 'sci-8',
    title: 'The Hydrological Water Cycle and Earth\'s Ecosystems',
    subtitle: 'Grade 8 • Earth Science • Hydrology',
    content: `### Earth\'s Master Water Cycle
Every water drop we drink has cycled Earth over millions of years. This hydrological water cycle keeps Earth's fresh water moving between land, rivers, oceans, and our atmospheric layers.

### Stages of Cycle Transport
* **Evaporation:** High heat from the sun energizes surface water, letting molecules rise as vapor.
* **Transpiration:** Living plants dump water vapor into air through tiny leaf pores called stomata.
* **Condensation:** Rising vapor cools off in upper altitudes and clumps onto microscopic dust particles, creating clouds.
* **Precipitation:** As clouds saturate, gravity draws moisture back to the surface as rain, sleet, or snow.

### Ecosystem Balance Impact
Runoff fills local fresh rivers and aquifers while weathering soils, shifting minerals down to oceans. Climate disruptions alter the cycle's balance, producing severe drought patterns in some zones while triggering major flood cycles in other regions.`,
    date: 'May 24, 2026',
    category: 'Science',
    readTime: '4 min read'
  },
  {
    id: 'sci-9',
    title: 'Cellular Respiration: How Organisms Release Energy',
    subtitle: 'Grade 8 • Life Science • Cellular Metabolism',
    content: `### Powering the Living Cell
Plants store solar energy as glucose, but cells cannot use glucose directly as fuel. Organisms must break down those sugars into a molecular battery called ATP (Adenosine Triphosphate). This critical extraction process is cellular respiration.

### Mitochondria: Cellular Powerhouses
In eukaryotic organisms, respiration takes place inside double-memmbrane organelles called mitochondria.
* The overall process is summarized by the reaction: Glucose + Oxygen → Carbon Dioxide + Water + ATP energy.
* Organisms breathe in Oxygen and exhale Carbon Dioxide as a direct metabolic waste product of this process.

### Aerobic vs. Anaerobic Respiration
* **Aerobic Respiration:** Requires oxygen. Highly efficient, yielding approximately 36 ATP molecules per glucose sugar.
* **Anaerobic Respiration (Fermentation):** Occurs when oxygen is absent (like working sprint muscles hard). It yields only 2 ATP molecules and releases lactic acid, creating muscle fatigue.`,
    date: 'May 22, 2026',
    category: 'Science',
    readTime: '4 min read'
  },
  {
    id: 'sci-10',
    title: 'Mendelian Genetics: Deciphering Punnett Squares',
    subtitle: 'Grade 8 • Life Science • Heredity and Genetics',
    content: `### Gregor Mendel\'s Pea Experiments
In the 1850s, an Austrian monk named Gregor Mendel cross-pollinated pea plants, revealing the fundamental laws of inheritance. He discovered that offspring inherit traits as discrete packages of genetic code called genes.

### Understanding Alleles
Genes exist in variations called alleles:
* **Dominant Allele:** A strong allele that overrides other versions (written as a capital letter: T).
* **Recessive Allele:** A weaker allele masked by a dominant partner (written as a lowercase letter: t).
* **Genotype:** The specific combination of alleles (e.g., TT, Tt, or tt).
* **Phenotype:** The observable physical trait (e.g., tall or short height).

### Drawing a Punnett Square
A Punnett Square is a predictive 2x2 grid representing possible allele combinations in offspring.
* Parents pass one of their two alleles to each child.
* If two heterozygous tall parents (Tt) breed, the square shows genotypes: 25% TT, 50% Tt, and 25% tt.
* This results in a phenotype ratio of 3:1—three tall children to one short child.`,
    date: 'May 20, 2026',
    category: 'Science',
    readTime: '5 min read'
  },

  // ==================== MATHEMATICS ARTICLES (10) ====================
  {
    id: 'math-1',
    title: 'The Pythagorean Theorem: Geometry\'s Ancient Equation',
    subtitle: 'Grade 8 • Mathematics • Geometry & Triangles',
    content: `### Right Triangle Fundamentals
The Pythagorean Theorem is one of geometry's most famous and practical mathematical rules. It applies strictly and exclusively to right triangles—triangles that contain exactly one 90-degree right angle.

### The Famous Formula
In a right triangle, the side opposite the 90-degree angle is the longest side, called the **hypotenuse** (labeled c). The other two shorter sides are called **legs** (labeled a and b).
The theorem relates these sides mathematically:
* Formula: a² + b² = c²
* In plain terms: if you draw squares on the legs of a right triangle, the combined area of those two squares matches the area of the square on the hypotenuse.

### Finding a Missing Side
You can use the theorem to determine a missing length:
1. Finding hypotenuse: if legs are 3 and 4, then 3² + 4² = 9 + 16 = 25. Thus c = √25 = 5.
2. Finding a leg: if leg is 8 and hypotenuse is 10, then 8² + b² = 10² → 64 + b² = 100 → b² = 36. Thus b = 6.

### Pythagorean Triples
Sets of three whole numbers that perfectly satisfy the formula are called Pythagorean Triples.
* Common examples: (3, 4, 5), (5, 12, 13), (8, 15, 17).
* Multiples of triples are also triples: doubling (3, 4, 5) creates the triple (6, 8, 10).`,
    date: 'Jun 04, 2026',
    category: 'Mathematics',
    readTime: '5 min read'
  },
  {
    id: 'math-2',
    title: 'Linear Functions: Graphing Slopes and Intercepts',
    subtitle: 'Grade 8 • Mathematics • Functions and Algebra',
    content: `### What Is a Linear Function?
A function represents a mathematical rule that takes an input (x) and gives a single output (y). When plotted on a coordinate grid, a linear function creates a perfectly straight line, showing a constant rate of change.

### Slope-Intercept Equation Model
To work with linear equations, mathematicians use slope-intercept form:
* Equation format: y = mx + b
* **x:** The independent input value.
* **y:** The dependent output value.
* **m:** The slope—or rate of change. This determines the line's steepness.
* **b:** The y-intercept. This is where the line crosses the vertical y-axis (where x = 0).

### Calculating the Slope (m)
Slope measures steepness as ratio of vertical change (rise) to horizontal change (run).
* m = (Change in y) / (Change in x)
* Between coordinates (1, 3) and (3, 7): the y values change by +4, and the x values by +2.
* Slope m = 4 / 2 = 2.

### Types of Slopes
1. **Positive Slope:** The line rises from left to right.
2. **Negative Slope:** The line drops from left to right.
3. **Zero Slope:** Perfectly horizontal line (where y = constant).
4. **Undefined Slope:** Perfectly vertical line (where x = constant).`,
    date: 'Jun 03, 2026',
    category: 'Mathematics',
    readTime: '4 min read'
  },
  {
    id: 'math-3',
    title: 'Systems of Linear Equations: Intersecting Possibilities',
    subtitle: 'Grade 8 • Mathematics • Simultaneous Equations',
    content: `### Real-World Scenarios
A system of equations consists of two or more equations sharing the same variables. Systems model common real-world choices: which cell phone plan is cheaper, or how long it takes a faster runner to catch up to a slower runner.

### Three Types of Solutions
When you graph two linear equations on a single coordinate plane, three geometric outcomes can occur:
1. **One Unique Solution (Lines Intersect):** The lines meet at exactly one coordinate point (x, y). This coordinate is the only set of values satisfying both equations simultaneously.
2. **No Solution (Parallel Lines):** The lines have identical slopes but different intercepts. Because they never touch, no coordinate can satisfy both.
3. **Infinite Solutions (Same Line):** The equations describe the exact same line. Every single point on the line is a solution.

### Methods for Solving
Algebra offers multiple ways to solve a system of equations:
* **Substitution Method:** Solve one equation for a variable, then plug that value into the other equation.
* **Elimination Method:** Add or subtract the two equations to cancel one variable entirely, making it easy to solve for the remaining variable.`,
    date: 'Jun 02, 2026',
    category: 'Mathematics',
    readTime: '4 min read'
  },
  {
    id: 'math-4',
    title: 'Scientific Notation: Expressing Cosmic and Microscopic Scale',
    subtitle: 'Grade 8 • Mathematics • Number Systems',
    content: `### Reading Extreme Dimensions
In science, we deal with extreme sizes. The mass of the Earth is 5,970,000,000,000,000,000,000,000 kilograms, and the width of a human strand of DNA is 0.0000000025 meters. Writing these out wastes space. Scientific notation offers a elegant, standardized solution.

### Standard Form Guidelines
Scientific notation writes extremely large or small numbers in a standard format:
* Format: a × 10ⁿ
* **a:** Represents a coefficient greater than or equal to 1, but strictly less than 10.
* **n:** An integer exponent representing the power of ten.

### Positive and Negative Exponents
* **Positive Exponent (Large Numbers):** The exponent shows how many times you multiply by 10 (or how many times to slide the decimal to the right). E.g., 4.5 × 10⁵ = 450,000.
* **Negative Exponent (Small Numbers):** The exponent shows division by 10 (moving the decimal to the left). E.g., 3.8 × 10⁻⁴ = 0.00038.

### Multiplying and Dividing in Notation
* **Multiplication Rule:** Multiply the coefficients, then add the exponents: (2 × 10⁴) × (3 × 10⁶) = 6 × 10¹⁰.
* **Division Rule:** Divide the coefficients, then subtract the exponents: (8 × 10⁸) / (2 × 10³) = 4 × 10⁵.`,
    date: 'Jun 01, 2026',
    category: 'Mathematics',
    readTime: '4 min read'
  },
  {
    id: 'math-5',
    title: 'Irrational Numbers: Exploring Square Roots',
    subtitle: 'Grade 8 • Mathematics • Real Numbers',
    content: `### The Real Number System
The real number system divides into two separate families: rational numbers and irrational numbers. Understanding what lies in between is essential to algebraic geometry.

### Rational Numbers
Rational numbers are those that can be written as a clean fraction: a/b (where a and b are integers, and b is not 0).
* Decimals of rational numbers either terminate (like 1/4 = 0.25) or repeat infinitely in a clear pattern (like 1/3 = 0.333...).

### Irrational Numbers
Irrational numbers cannot be written as fractions. When expressed as decimals, they continue infinitely without any repeating pattern.
* The most famous irrational number is Pi (π ≈ 3.14159...).
* Square roots of non-perfect squares are also irrational. For example, √2 is irrational (1.41421356...).

### Estimating Irrational Roots
We can estimate the value of an irrational square root by finding the closest perfect squares.
* Consider √20. The closest perfect squares are 16 (4²) and 25 (5²).
* Therefore, √20 lies between 4 and 5.
* Because 20 is mid-way between 16 and 25, √20 is approximately 4.5.`,
    date: 'May 30, 2026',
    category: 'Mathematics',
    readTime: '4 min read'
  },
  {
    id: 'math-6',
    title: 'Congruent and Similar Figures: Scale and Proportions',
    subtitle: 'Grade 8 • Mathematics • Geometry',
    content: `### Geometric Transformations
In geometry, we perform transformations that turn, slide, flip, or resize physical figures on a coordinate plane. These changes dictate whether resulting shapes are congruent or similar.

### Congruency: Identical Math Duplicates
Two shapes are **congruent** if they share the exact same size and shape. You can rotate or slide a figure, but its angles and side lengths remain unchanged.
* Congruent transformations include translations (slides), rotations (turns), and reflections (flips).
* Corresponding side lengths are equal, and corresponding angles are equal.

### Similarity: Scaled Ratios
Two shapes are **similar** if they share the same shape, but have different sizes.
* Similarity transformations involve dilations—scaling a figure up or down using a scale factor.
* In similar figures, corresponding angles remain congruent.
* Corresponding side lengths are proportional: they all scale by the same ratio (for example, doubling every side).

### Calculating Scale Factor
The scale factor (k) is the ratio of a side in the new figure to the corresponding side in the original figure: k = New / Original. If k > 1, the shape enlarges; if 0 < k < 1, the shape shrinks.`,
    date: 'May 28, 2026',
    category: 'Mathematics',
    readTime: '5 min read'
  },
  {
    id: 'math-7',
    title: 'Volume Formulas: Cylinders, Cones, and Spheres',
    subtitle: 'Grade 8 • Mathematics • Geometry-Three Dimensions',
    content: `### Calculating 3D Space
Volume is a measure of the three-dimensional space enclosed inside a solid boundary. In 8th-grade geometry, students transition from simple boxes to curved figures: cylinders, cones, and spheres.

### Cylinder Volume
A cylinder is shaped like an aluminum can. It has a flat circular base and vertical walls.
* V = πr²h
* **r:** The radius of the circular base.
* **h:** The total height of the cylinder.

### Cone Volume
A cone is shaped like a party hat. It has a circular footprint that tapers up to a single top apex.
* V = (1/3)πr²h
* If a cone and a cylinder share the same height and radius, the cone's volume is exactly one-third of the cylinder's volume. It takes three cones of water to fill one matching cylinder.

### Sphere Volume
A sphere is shaped like a basketball. It is perfectly symmetrical around its center point.
* V = (4/3)πr³
* Notice how spheres only require the radius (r) to calculate volume, as they have no height or distinct bases. Always compute using order of operations (cubing the radius first).`,
    date: 'May 26, 2026',
    category: 'Mathematics',
    readTime: '4 min read'
  },
  {
    id: 'math-8',
    title: 'Bivariate Data: Reading Scatter Plots',
    subtitle: 'Grade 8 • Mathematics • Probability & Statistics',
    content: `### Univariate vs. Bivariate
While univariate data describes a single variable (like height), bivariate data measures two separate variables for each subject (like height vs shoe size) to see if they relate.

### Reading Scatter Plots
Scatter plots map bivariate data as independent coordinate points on a grid, letting statisticians eyeball trends:
1. **Positive Association:** As the independent variable (x) increases, the dependent variable (y) also increases. Points rise diagonally. E.g., time spent studying vs test scores.
2. **Negative Association:** As x increases, y decreases. Points drop diagonally. E.g., speed of a car vs drive travel time.
3. **No Association:** Points are scattered randomly like paint splatters. Knowing x tells you nothing about y.

### Line of Best Fit
A line of best fit is a straight line drawn through the center of clustered points in a scatter plot. It allows you to write a y = mx + b model to make predictions for values outside the studied data points.

### Outliers
An outlier is an odd data point that sits far away from the main cluster of points, indicating an unusual case that warrants investigation.`,
    date: 'May 24, 2026',
    category: 'Mathematics',
    readTime: '4 min read'
  },
  {
    id: 'math-9',
    title: 'The Constant of Proportionality: Everyday Rates',
    subtitle: 'Grade 8 • Mathematics • Algebra',
    content: `### Ratios and Constant Proportions
Ratios compare two values using division. When the ratio of two related quantities stays completely constant, we describe the relationship as proportional.

### Constant value of Proportionality (k)
* A relationship represents k = y / x.
* This is written as: y = kx.
* The number 'k' represents the unit rate or scale constant. On a cartesian coordinate graph, this relationship always draws a straight line that intersects the center coordinates (0, 0).

### Finding the Value in Life Scale
If you purchase 5 textbooks for $45, the mathematical constant remains 45 / 5 = 9.
* Therefore, the unit cost k = 9.
* We write the general equation as: y = 9x.
* This constant factor lets architects draw scales for models or lets food developers multiply recipes for large-scale operations.`,
    date: 'May 22, 2026',
    category: 'Mathematics',
    readTime: '4 min read'
  },
  {
    id: 'math-10',
    title: 'Algebraic Inequalities: Solving Multi-Step Expressions',
    subtitle: 'Grade 8 • Mathematics • Algebra Equations',
    content: `### Equations vs. Inequalities
An equation states that two expressions are mathematically equal. An inequality states that one expression is greater than, less than, or equal to another, yielding a range of possible answers.

### Key Inequality Symbols
* **<:** Strictly less than (drawn as open circle on a number line).
* **>:** Strictly greater than (open circle).
* **≤:** Less than or equal to (solid filled circle).
* **≥:** Greater than or equal to (solid filled circle).

### The Golden Rule of Inequalities
Solving inequalities follows identical habits to solving standard equations, with one critical warning:
* **The Negative Rule:** When multiplying or dividing both sides of an inequality by a negative number, you **MUST** flip the direction of the inequality sign.
* Solving: −2x + 5 > 13 → −2x > 8. Dividing both sides by −2 yields x < −4 (reversing the sign!).

### Graphing the Solution Set
A solution set like x < −4 represents an infinite number of decimal values. To visualize this on a number line, you draw an open circle at −4, then shade a glowing arrow pointing left.`,
    date: 'May 20, 2026',
    category: 'Mathematics',
    readTime: '5 min read'
  },

  // ==================== ELA ARTICLES (10) ====================
  {
    id: 'ela-1',
    title: 'The Rhetoric of Persuasion: Ethos, Pathos, and Logos',
    subtitle: 'Grade 8 • ELA • Writing & Argumentation',
    content: `### The Ancient Art of Argument
More than 2,000 years ago, Greek philosopher Aristotle analyzed art of rhetoric—the method of using language to persuade an audience. He identified three pathways of persuasion: ethos, pathos, and logos. Successful writers blend all three to build compelling claims.

### Ethos: Credibility and Trust
Ethos relies on the character, credentials, or moral authority of the writer or speaker.
* An audience is far more likely to believe an argument if they respect the person making it.
* E.g., "As a medical doctor with twenty years of practice, I advise taking this vaccine."
* Writers establish ethos by using professional grammar, referencing reliable sources, and acknowledging opposing arguments fairly.

### Pathos: Emotional Connection
Pathos targets the audience's emotions—their fears, values, hopes, or empathy.
* This tactic bypasses logic to stir the heart and inspire immediate action.
* E.g., classical charity flyers showing shivering, hungry puppies in cages to encourage small donations.
* While highly effective, excessive reliance on pathos can make an argument feel cheap or manipulative.

### Logos: Logic and Evidence
Logos appeals to the intellect, relying on hard data, statistics, rational structure, and fact-based logic.
* E.g., "Enacting this law will lower street emissions by 34%, as demonstrated in the climate study's data."
* Logos forms the absolute backbone of academic research and forensic science.`,
    date: 'Jun 04, 2026',
    category: 'ELA',
    readTime: '4 min read'
  },
  {
    id: 'ela-2',
    title: 'Unlocking Literary Tone, Mood, and Atmosphere',
    subtitle: 'Grade 8 • ELA • Literary Analysis',
    content: `### A Common Source of Confusion
Beginning readers frequently swap the terms **tone** and **mood**. While both elements describe the emotional ecosystem of a story, they originate from different angles of composition.

### Tone: The Author\'s Attitude
Tone represents the author's specific attitude toward their subject, characters, or audience.
* The tone is calculated and controlled by the author's vocabulary choices and sentence constructions.
* Adjectives describing tone: satirical, objective, nostalgic, cynical, solemn, or playful.
* If a writer describes a character's achievement as a "lucky break," their tone leans skeptical. If they label it a "hard-won victory," their tone is admiring.

### Mood: The Reader\'s Feelings
Mood describes the emotional atmosphere that the reader feels while reading a passage.
* The mood is the emotional footprint left on the reader's imagination, crafted by descriptions of settings and background sounds.
* Adjectives describing mood: eerie, tense, peaceful, gloomy, suspenseful, or whimsical.
* Consider a setting description: "Rain clawed at the rotting window frame as shadows expanded across the hallway." This choice generates a tense and eerie mood.

### The Interplay
An author uses a specific tone to construct the overall mood. For example, a cynical and sarcastic author tone can create an amusing and lighthearted mood for the reader. When analyzing literature, always ask: who is talking, what language are they selecting, and how does it make me feel?`,
    date: 'Jun 03, 2026',
    category: 'ELA',
    readTime: '4 min read'
  },
  {
    id: 'ela-3',
    title: 'The Art of Symbolism: Writing Beyond the Literal',
    subtitle: 'Grade 8 • ELA • Literary Devices',
    content: `### Defining the Symbol
Literary symbolism occurs when an author uses a concrete object, character, or action to represent an abstract idea. Symbolism allows writers to inject multilayered meanings into their stories without explicitly lecturing the reader.

### Classical Literary Symbols
Many elements carry common, deeply recognized symbolic weight across literature:
* **The Owl:** Represents wisdom and scholarly observation.
* **Spring:** Symbolizes birth, renewal, youth, and fresh beginnings.
* **Winter:** Symbolizes aging, cold isolation, and death.
* **Running Water:** Often signifies spiritual cleansing, rebirth, or the unstoppable passage of time.

### Contextual Symbols
Some symbols are unique to a specific novel, gaining meaning slowly through the plot:
* In F. Scott Fitzgerald's *The Great Gatsby*, the glowing green light at the end of the dock stands for Jay Gatsby's distant, unreachable hopes and dreams.
* In William Golding's *Lord of the Flies*, a simple conch shell starts as a symbol of civilization and order, but its eventual destruction represents the collapse of law.

### Analyzing Symbolic Elements
When analyzing symbols, look for objects that:
1. Reoccur multiple times at pivotal moments of the plot.
2. Receive highly detailed descriptions out of proportion to their practical function.
3. Are associated with strong emotional reactions from the characters.`,
    date: 'Jun 02, 2026',
    category: 'ELA',
    readTime: '4 min read'
  },
  {
    id: 'ela-4',
    title: 'The Hero\'s Journey: Analyzing Character Arcs',
    subtitle: 'Grade 8 • ELA • Literary Structures',
    content: `### Joseph Campbell\'s Monomyth
In 1949, mythologist Joseph Campbell identified a universal pattern that forms the backbone of countless legends and epics across human history, from ancient Greek myths to modern films like *Star Wars* or *The Hobbit*. He called this structural archetype the **Hero's Journey** (or Monomyth).

### The Three Operational Phases
The journey divides into three core phases:
1. **Departure (The Call to Adventure):** The hero starts in a mundane, comfortable world. An unexpected crisis or messenger issues a call to action. Initially, the hero hesitates, but after receiving guidance from a mentor, they cross the threshold into the unknown.
2. **Initiation (The Abyss & Transformation):** The hero faces distinct trials, encountering allies and enemies. They escalate toward a supreme ordeal—their lowest point of confrontation. Here, they undergo a symbolic death and rebirth, gaining deep wisdom or power.
3. **Return (The Road Back):** The hero returns to their original community, bearing a gift, cure, or boon. They are transformed, using their journey to protect or elevate their home.

### Why the Pattern Perseveres
The Hero's Journey is not just a layout for adventure. It operates as a psychological metaphor for growing up. Facing trials, confronting fears, undergoing internal change, and returning stronger mirrors the transition from childhood to adulthood.`,
    date: 'Jun 01, 2026',
    category: 'ELA',
    readTime: '5 min read'
  },
  {
    id: 'ela-5',
    title: 'Active vs. Passive Voice: Sentence Structure Mastery',
    subtitle: 'Grade 8 • ELA • Grammar & Composition',
    content: `### Sentences as Action Delivery
Every complete sentence contains a subject performing or receiving an action. The active or passive voice determines whether the subject is the "doer" of the action or the "receiver."

### Active Voice: Direct and Energetic
In the active voice, the subject of the sentence performs the action.
* Structure: Subject → Verb → Object
* E.g., "The wildfire destroyed the historic town."
* Active voice makes your writing direct, active, concise, and energetic.

### Passive Voice: indirect and Object-Focused
In the passive voice, the subject receives the action. The actor is either tacked onto the end of the sentence or omitted entirely.
* Structure: Object → helping verb + past participle → by Subject
* E.g., "The historic town was destroyed by the wildfire."
* E.g., "The window was shattered." (actor is completely unknown).

### When to Select Passive Voice
Though teachers tell writers to avoid passive voice, it has legitimate uses:
1. When the actor is unknown: "My car keys were stolen yesterday."
2. In scientific reports to emphasize the experiment, not the researcher: "The chemical compound was heated to 100 degrees."
3. To shift focus or deflect accountability: "Mistakes were made."`,
    date: 'May 30, 2026',
    category: 'ELA',
    readTime: '4 min read'
  },
  {
    id: 'ela-6',
    title: 'Context Clues: Deciphering Complex Sentences',
    subtitle: 'Grade 8 • ELA • Vocabulary Strategies',
    content: `### Reading Unfamiliar Language
When you stumble across an unfamiliar word in a text, pulling out a dictionary can disrupt your reading flow. Skilled readers use context clues—the surrounding words, sentences, and hints—to estimate the word's meaning.

### Types of Context Clues
1. **Definition/Explanation:** The author defines the word right after using it. "The explorer encountered a *chasm*, which is a deep, gaping dropoff in the rock face."
2. **Synonym/Restatement:** The author uses a simpler word with a similar meaning close by. "Clarissa was *resolute*; she remained firm and unyielding despite the setbacks."
3. **Antonym/Contrast:** The author provides a word with the opposite meaning, signaling it with transition words like *however*, *but*, or *contrarily*. "Unlike his talkative and outgoing sister, Arthur was *laconic*."
4. **Example/Illustration:** The author lists specific instances. "The marsh was filled with *noxious* compounds, such as sulfur dioxide, sulfuric acid, and decaying organic sludge."
5. **Inference/General Context:** The reader combines prior knowledge with general clues. "With zero rain for six months, the fields became completely *arid*, crackling under the heat."`,
    date: 'May 28, 2026',
    category: 'ELA',
    readTime: '4 min read'
  },
  {
    id: 'ela-7',
    title: 'Understanding Allegories: Metaphorical Masterpieces',
    subtitle: 'Grade 8 • ELA • Advanced Literary Devices',
    content: `### Double-Layered Storytelling
An allegory is a story, poem, or picture that can be interpreted to reveal a hidden, second layer of meaning—typically a moral, political, or historical message. While the surface characters are engaging, they serve as symbols for real-world historical figures, concepts, or events.

### Famous Literary Allegories
* **George Orwell\'s *Animal Farm*:** On the surface, a group of barnyard animals rebels against a farmer. Allegorically, the plot retells the events of the Russian Revolution of 1917 and the rise of totalitarianism under Joseph Stalin.
* **Arthur Miller\'s *The Crucible*:** A play dramatizing the Salem witch trials of 1692. Metaphorically, Miller wrote it to criticize the anti-communist "Red Scare" and McCarthyism happening in the United States during the 1950s.

### Analyzing an Allegorical Text
To decrypt an allegory, pay attention to:
1. Historical parallels in dates, timelines, or battles.
2. Highly exaggerated or flat characters representing ideological viewpoints (e.g., greed, hard labor, or blind loyalty).
3. The moral resolution. What lesson does the struggle deliver about humanity?`,
    date: 'May 26, 2026',
    category: 'ELA',
    readTime: '5 min read'
  },
  {
    id: 'ela-8',
    title: 'Central Message: Dissecting Theme vs. Topic',
    subtitle: 'Grade 8 • ELA • Reading Strategies',
    content: `### Decoding Underlying Meanings
A recurring mistake in ELA homework is confusing a book\'s topic with its theme. Master analytical readers understand that identifying a topic is just the starting point—finding the theme reveals why the story was written.

### The Breakdown Differences
* **Topic:** The literal subject. Stated in a single word or simple phrase. E.g., "Love," "Betrayal," or "Revenge."
* **Theme:** The thesis or universal statement the author creates about that topic. Must be structured as a complete, independent sentence. E.g., "Blind desire for revenge can destroy a person\'s own values and community."

### Formulating the Statement
A clean theme statement should never name specific characters, dates, or plot events. It must contain a universal insight that applies cleanly to the broad human condition outside the boundary of the fictional text. Avoid cheesy clichés like "Always be honest" and instead elaborate on the realistic consequences of human choices.`,
    date: 'May 24, 2026',
    category: 'ELA',
    readTime: '4 min read'
  },
  {
    id: 'ela-9',
    title: 'Dramatic Irony: When the Audience Knows Best',
    subtitle: 'Grade 8 • ELA • Theater and Literature',
    content: `### Three Varieties of Irony
Irony is a literary tool that plays with expectations. It exists in three main varieties:
1. **Verbal Irony:** Saying the opposite of what you mean (sarcasm).
2. **Situational Irony:** An event occurs that directly contradicts expectations (a fire station burning down).
3. **Dramatic Irony:** Occurs when the reader or audience knows a critical piece of information that the characters do not.

### The Mechanics of Suspense
Dramatic irony is a masterclass in building suspense. When the audience knows a killer is hiding in the closet, a character simply reaching for the doorknob makes the audience gasp. The character behaves normally, unaware of the trap, while the viewer suffers in anticipation.

### Classical Examples in Literature
* In Shakespeare's *Romeo and Juliet*, the audience knows Juliet has only taken a sleeping potion, but Romeo genuinely believes she is dead. His tragic choice to drink poison stems directly from this gap in knowledge.
* In Sophocles' *Oedipus Rex*, the main character is searching for a murderer, unaware to himself—though highly obvious to the audience—that he is the killer.`,
    date: 'May 22, 2026',
    category: 'ELA',
    readTime: '4 min read'
  },
  {
    id: 'ela-10',
    title: 'Analyzing Poetry: Rhythm, Meter, and Rhyme Scheme',
    subtitle: 'Grade 8 • ELA • Poetry and Poetic Devices',
    content: `### Poetry: Language in Motion
While prose follows standard sentence and paragraph layouts, poetry compresses language into intentional structures of rhythm, sound, and visual space. Reading poetry requires examining its structural mechanics.

### Rhyme Scheme patterns
A rhyme scheme is the ordered pattern of end rhymes in a poem.
* It is mapped using capital letters (A, B, C...).
* For example, an **ABAB** scheme means the first and third lines rhyme (A), while the second and fourth lines rhyme (B).
* Common patterns include rhyming couplets (AABB) and alternating stanzas (ABAB).

### Understanding Meter and Rhythm
Meter is the structural pattern of stressed and unstressed syllables inside a line of poetry, creating its musical beat.
* **The Iamb:** An unstressed syllable followed by a stressed syllable (da-DUM).
* **Iambic Pentameter:** A line containing five iambic feet (ten syllables total: da-DUM da-DUM da-DUM da-DUM da-DUM).
* This classic meter mimics the rhythm of a beating heart and is the primary structure of Shakespeare's sonnets.`,
    date: 'May 20, 2026',
    category: 'ELA',
    readTime: '5 min read'
  },

  // ==================== SOCIAL STUDIES ARTICLES (10) ====================
  {
    id: 'soc-1',
    title: 'The U.S. Constitution: Framing a Balanced Union',
    subtitle: 'Grade 8 • Social Studies • American Civics',
    content: `### The Philadelphia convention
In May 1787, fifty-five delegates gathered in Philadelphia, Pennsylvania. Initially, their mission was to repair the weak Articles of Confederation. Instead, they spent four months debating, compromising, and drafting an entirely new document: the United States Constitution.

### Crucial Compromises
Crafting the Constitution required settling massive disagreements between states:
* **The Great Compromise:** Addressed legislative representation. Small states wanted equal representation, while large states wanted representation based on population. The compromise created a bicameral (two-house) Congress with a Senate (equal representation) and a House of Representatives (based on population).
* **Three-Fifths Compromise:** A deeply controversial debate over slavery. Southern states wanted enslaved people counted for population representation but not taxation. The compromise calculated five enslaved individuals as matching three free citizens—a calculation that heavily boosted southern political power until the Civil War.

### Core Democratic Principles
1. **Separation of Powers:** Division of federal authority among three branches (Executive, Legislative, Judicial).
2. **Checks and Balances:** Interlocking vetoes and reviews that protect against single-branch tyranny.
3. **Federalism:** The sharing of political power between the national federal government and individual state governments.`,
    date: 'Jun 04, 2026',
    category: 'Social Studies',
    readTime: '5 min read'
  },
  {
    id: 'soc-2',
    title: 'The Industrial Revolution: Iron, Steam, and Society',
    subtitle: 'Grade 8 • Social Studies • World History',
    content: `### The Transition from Farm to Factory
Beginning in Great Britain in the mid-1700s, the Industrial Revolution was a massive shift from cottage industries and hand tools to steam-powered machinery and factory mass-production. This transformation fundamentally changed where and how people lived.

### The Steam Engine Catalyst
James Watt's steam engine was the engine of industrialization:
* Powered by coal, steam engines ran looms, spun cotton, and pumped iron mines.
* Steam power soon revolutionized transport, leading to steamships and steam locomotives.
* Railroads knit continents together, slashing the time and cost of moving raw goods.

### The Rise of Cities (Urbanization)
Industrialization triggered rapid urbanization as millions of farmworkers relocated to find work in urban factories.
* Cities grew too quickly, lacking basic sanitation, clean sewers, or zoning codes.
* Working-class families huddled into crowded, disease-prone tenement buildings.
* Early factories were dark and dangerous, with shifts lasting 14 hours and relying on child labor.
* Over decades, worker unions and reform movements fought for safety codes, 8-hour workdays, and child labor laws.`,
    date: 'Jun 03, 2026',
    category: 'Social Studies',
    readTime: '5 min read'
  },
  {
    id: 'soc-3',
    title: 'The Silk Road: Connecting the Ancient World',
    subtitle: 'Grade 8 • Social Studies • Ancient History',
    content: `### Ancient Globalization Network
The Silk Road was not a single paved road. Instead, it was an interlocking network of land and sea trade routes extending over 4,000 miles, connecting China and East Asia to India, Persia, the Middle East, and the Roman Empire.

### Valuable Traded Commodities
Due to the long, dangerous journey across deserts and mountain passes, merchants dealt primarily in luxury items of high value-to-weight ratios:
* **China:** Guarded the secret of silk production, exchanging it for gold, silver, and warhorses. They also traded paper and gunpowder.
* **India:** Exported valuable spices, precious gems, and cotton textiles.
* **Rome:** Sent glassware, fine wines, and olive oil eastward.

### The Diffusion of Ideas and Religion
The greatest legacy of the Silk Road was not the silk, but the transfer of culture, ideas, and technology:
* **Buddhism:** Traveled from India along trade routes to become a major religion in China and Japan.
* **Paper-making:** Developed in China, this technology moved westward, paving the way for the European Renaissance.
* **Pathogens:** Trade routes also acted as superhighways for disease, letting the Black Death travel from Asia to devastate Europe in the 1300s.`,
    date: 'Jun 02, 2026',
    category: 'Social Studies',
    readTime: '4 min read'
  },
  {
    id: 'soc-4',
    title: 'The Fall of the Roman Republic: Julius Caesar\'s Rise',
    subtitle: 'Grade 8 • Social Studies • World History',
    content: `### The Virtues of Republican Rome
For nearly five centuries, Rome governed itself as a republic. Power was divided between the Senate (ruling elite), magistrates, and assemblies. Citizens prized their constitution, which sought to block any single man from gaining supreme power.

### Sowing the Seeds of Collapse
As Rome conquered the Mediterranean, its internal balance began to fracture:
1. Massive wealth flooded in, but it centralized in the hands of elite senators, driving poor farmers out of business.
2. Ambitious generals (like Marius and Sulla) began offering land to poor recruits, creating private armies loyal to their general rather than to the Roman state.

### Julius Caesar and the Rubicon Crossing
In 49 BCE, general Julius Caesar commanded a massive, battle-hardened army in Gaul. The Senate, fearing his power, ordered him to disband his legion and return to Rome. Instead, Caesar marched his troops to the Rubicon River—the symbolic northern boundary of Italy.
* Crossing the Rubicon with an active army was an act of treason that launched a massive civil war.
* Caesar emerged victorious, declaring himself "Dictator for Life" in 44 BCE.
* Fearing the absolute death of democracy, a conspieracy of senators assassinated Caesar. However, rather than saving the republic, the assassination triggered a fresh round of civil wars that culminated in Caesar's adopted son, Augustus, becoming Rome's first absolute Emperor.`,
    date: 'Jun 01, 2026',
    category: 'Social Studies',
    readTime: '5 min read'
  },
  {
    id: 'soc-5',
    title: 'Allianced Escalation: The Outbreak of World War I',
    subtitle: 'Grade 8 • Social Studies • Modern World History',
    content: `### The MAGNITUDE of European Tension
By 1914, Europe was a powder keg waiting for a spark. Hostilities had mounted for decades, driven by four underlying factors (often summarized as M-A-I-N):
* **Militarism:** Countries raced to build massive standing armies and modern steel navies.
* **Alliances:** Countries signed secret mutual-defense treaties, promising to fight if an ally was attacked.
* **Imperialism:** European powers competed globally for colonies and resource wealth in Africa and Asia.
* **Nationalism:** Intense, aggressive pride fueled rivalries between world powers.

### The Spark: Assassination in Sarajevo
On June 28, 1914, Archduke Franz Ferdinand, heir to the Austro-Hungarian throne, was assassinated in Sarajevo by a Serbian nationalist named Gavrilo Princip.

### The Alliance Dominoes Fall
Rather than a localized conflict, the interlocking treaties triggered a massive chain reaction:
1. July 28: Austria-Hungary declares war on Serbia.
2. July 30: Russia mobilizes its army to defend its ally Serbia.
3. August 1: Germany (Austria-Hungary's ally) declares war on Russia.
4. August 3: Germany invades Belgium to strike France (Russia's ally), forcing Great Britain to enter the war.
Within a single week, the world's most powerful nations had plunged into a global war that would cost over twenty million lives.`,
    date: 'May 30, 2026',
    category: 'Social Studies',
    readTime: '5 min read'
  },
  {
    id: 'soc-6',
    title: 'Westward Movement: Manifest Destiny and Native Lands',
    subtitle: 'Grade 8 • Social Studies • American History',
    content: `### Manifest Destiny Concept
In the 1800s, American expansion was driven by the ideology of Manifest Destiny—the belief that the United States was divinely ordained to expand across the North American continent, from the Atlantic to the Pacific.

### Key Expansion Acquisitions
The U.S. added vast territories through various methods:
* **The Louisiana Purchase (1803):** Bought from France for $15 million, doubling the country's size.
* **Annexation of Texas (1845):** Sparked tensions that led directly to the Mexican-American War.
* **Oregon Treaty (1846):** Settled boundaries with Great Britain.

### The Cost to Native Populations
This expansion came at a tragic, devastating cost to Native American nations:
* **The Indian Removal Act (1830):** President Andrew Jackson authorized the forced relocation of southeastern tribes to lands west of the Mississippi River.
* **The Trail of Tears:** The Cherokee Nation was marched at gunpoint over 1,000 miles. Over 4,000 Cherokee died from starvation, exposure, and disease.
* **The Plains Indian Wars:** As homesteaders and railroads carved up the West, the U.S. military engaged in decades of warfare with Plains tribes, eventually forcing them onto restricted reservations.`,
    date: 'May 28, 2026',
    category: 'Social Studies',
    readTime: '4 min read'
  },
  {
    id: 'soc-7',
    title: 'The Magna Carta: Laying the Foundations of Law',
    subtitle: 'Grade 8 • Social Studies • Civic Foundations',
    content: `### King John\'s Absolute Abuse
By 1215, England was ruled by King John, an autocrat who raised taxes arbitrarily, confiscated noble estates, and imprisoned rivals without trial. Fed up with his abuses, a group of powerful English barons rebelled.

### The Confrontation at Runnymede
In June 1215, the barons trapped King John at Runnymede and forced him to sign a document called the **Magna Carta** (Latin for "Great Charter").

### Core Legal Legacy
Though initially intended to protect only the elite nobility, the charter established critical legal concepts that form the basis of modern democracies:
1. **Rule of Law:** No citizen—not even a ruling king—is above the law. Everyone must follow the same rules.
2. **Due Process:** The government cannot seize property or imprison citizens without following established legal steps.
3. **Trial by Jury:** Enshrined in Clause 39, which states that no free man shall be imprisoned except by the lawful judgment of his peers.
* Centuries later, the drafts of the U.S. Bill of Rights borrowed directly from these foundational guidelines.`,
    date: 'May 26, 2026',
    category: 'Social Studies',
    readTime: '4 min read'
  },
  {
    id: 'soc-8',
    title: 'Medieval Feudalism: The Social Scale of Europe',
    subtitle: 'Grade 8 • Social Studies • Medieval European Civics',
    content: `### Decentralized Protection System
Following the fall of the Western Roman Empire in 476 CE, Europe lacked a strong central government or military. To protect against pillaging invaders (like Vikings), a political and social system called **feudalism** emerged.

### The Feudal Pyramid Structure
Feudalism operated on an hierarchy of mutual obligations:
* **The King:** Claimed ownership of all land in the kingdom, dividing and gifting large chunks (fiefs) to trusted lords in exchange for loyalty and tax revenue.
* **Lords/Nobles:** Ruled their fiefs, serving as local judges and tax collectors. They pledged knights to defend the king.
* **Knights:** Highly trained mounted soldiers who received small parcels of land from lords in exchange for military service. They followed a strict code of conduct called chivalry.
* **Serfs/Peasants:** The vast majority of the population (over 90%). They were legally bound to work the land on a lord's manor. Serfs could not leave without permission, laboring to feed the kingdom in exchange for safety behind the manor walls.`,
    date: 'May 24, 2026',
    category: 'Social Studies',
    readTime: '4 min read'
  },
  {
    id: 'soc-9',
    title: 'The Road to Revolution: Taxation without Voice',
    subtitle: 'Grade 8 • Social Studies • American History',
    content: `### The Cost of Empire Security
Following the French and Indian War in 1763, Great Britain emerged victorious but deeply in debt. British Parliament believed the North American colonists—who had benefited from British protection—should pay their fair share.

### Hostile Tax Legislation
Parliament passed a series of highly controversial tax acts:
* **The Stamp Act (1765):** Taxed all paper goods, from ship documents to playing cards.
* **The Townshend Acts (1767):** Taxed key imported necessities including glass, painters\' lead, and paper.
* **The Tea Act (1773):** Monopolized low-cost British tea sales, undercutting local colonial merchants.

### "No Taxation Without Representation"
Colonists rebelled, not because of the tax cost, but because of the constitutional principle. They argued that because colonists had no elected representatives in the distant British Parliament, any tax passed there was unconstitutional. Protest exploded, prompting violent clashes and boycotts that culminated in the outbreak of the Revolutionary War.`,
    date: 'May 22, 2026',
    category: 'Social Studies',
    readTime: '4 min read'
  },
  {
    id: 'soc-10',
    title: 'The Great Depression: Economic Crash and Recovery',
    subtitle: 'Grade 8 • Social Studies • Modern U.S. History',
    content: `### The End of the Roaring Twenties
During the 1920s, the U.S. economy boomed. People bought cars, radios, and homes on credit. Stock prices climbed to astronomical levels, fueled by risky speculation and buying stock on margin (using borrowed money).

### The Market Crash of 1929
On October 29, 1929—known as "Black Tuesday"—the stock market bubble burst. Stock prices collapsed, wiping out fortunes in a single day and triggering a massive economic downturn:
* Fearing bankruptcy, people rushed to banks to withdraw cash. This caused widespread bank runs. Over 9,000 banks failed, losing millions of dollars of life savings.
* Factories closed, causing unemployment to skyrocket to an unprecedented 25% by 1933.

### FDR and the New Deal Reform
In 1932, Franklin D. Roosevelt was elected president, promising a "New Deal" for the American people based on three Rs:
1. **Relief:** Providing immediate aid and food to starving, out-of-work citizens.
2. **Recovery:** Creating massive federal jobs programs (like the Civilian Conservation Corps) to build schools, parks, and dams.
3. **Reform:** Passing hard regulations (like the FDIC to guarantee bank deposits) to prevent future economic crashes.`,
    date: 'May 20, 2026',
    category: 'Social Studies',
    readTime: '5 min read'
  },
  {
    id: 'sci-final-guide',
    title: 'Final Study Guide for Science',
    subtitle: 'Grade 8 • Science • Comprehensive Review',
    content: `### 1. Classification of Living and Non-Living Entities
Understanding the differences between bacteria, viruses, protists, fungi, plants, and animals is fundamental to biology.

| Feature / Group | Cell Type | Cellularity | Cell Wall | Nutrition | Examples | Other Key Details |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Bacteria** | Prokaryotic | Unicellular | Yes (peptidoglycan) | Autotrophic / Heterotrophic | *E. coli*, Streptococcus | Lack a nucleus or membrane-bound organelles. Contain single circular DNA. |
| **Viruses** | *Non-living* | Acellular | No cell wall | None | Influenza, COVID-19, Bacteriophage | Cannot replicate independently; require host machinery. Consist of a genome (DNA/RNA) in a protein capsid. |
| **Protists** | Eukaryotic | Mostly Unicellular | Varies | Photosynthetic / Heterotrophic | Amoeba, Paramecium, Euglena | "Grab-bag" kingdom for organisms that do not fit into plants, animals, or fungi. |
| **Fungi** | Eukaryotic | Mostly Multicellular | Yes (chitin) | Heterotrophic (by absorption) | Mushrooms, Yeast (unicellular), Mold | Act as key decomposers in systems. Store energy as glycogen. |
| **Plants** | Eukaryotic | Multicellular | Yes (cellulose) | Autotrophic (photosynthetic) | Mosses, Ferns, Maple trees | Contain chloroplasts and large central vacuoles. Perform photosynthesis. |
| **Animals** | Eukaryotic | Multicellular | No | Heterotrophic (by ingestion) | Insects, Fish, Humans | Exhibit mobility at some life stage. Have specialized sensory systems. |

---

### 2. The Characteristics of Life
To be considered alive, an organism must possess all of the following core qualities:
1. **Cellular Organization:** Made of one or more specialized cells.
2. **Reproduction:** Possesses the capacity to produce offspring (sexually or asexually).
3. **Metabolism:** Obtains and utilizes raw chemical energy and materials to maintain processes.
4. **Homeostasis:** Actively maintains a stable internally regulated environment (e.g., body temperature).
5. **Heredity:** Contains a genetic blueprint (DNA) inherited from parents.
6. **Response to Stimuli:** Detects and reacts to changes in outer surroundings.
7. **Growth and Development:** Increases in physical size and matures structurally over time.
8. **Adaptation through Evolution:** Populations adapt over generations via natural selection.

---

### 3. The Statements of Cell Theory
Developed by Schleiden, Schwann, and Virchow, the cell theory states:
1. **All living things are composed of one or more cells.**
2. **The cell is the basic structural and functional unit of life.**
3. **All cells arise solely from pre-existing, living cells.**

---

### 4. Cell Organelles and Their Functions
Organelles act as specialized "organs" within eukaryotic cells.

* **Cell Membrane:** A semi-permeable phospholipid bilayer that selectively controls which substances enter or exit the cell.
* **Ribosomes:** Sites of protein synthesis, assembling amino acid chains based on mRNA directions.
* **Nucleus:** Stores safe genetic blueprints (DNA) and directs cellular activity (the "Control Center").
* **Mitochondria:** Generates chemical energy (ATP) through cellular respiration (the cellular "Powerhouse").
* **Vacuole:** Storage spaces for water, cellular wastes, and nutrients.
  * Plant cells have a **Large Central Vacuole** that maintains turgor pressure; animal cells have multiple small vacuoles.
* **Vesicles:** Tiny membrane sacs that isolate and transport molecules within the cell or expel them outward.
* **Chloroplast:** Green organelles containing chlorophyll; the site where light is converted into glucose via photosynthesis.
* **Cell Wall:** A rigid outer layer composed of cellulose (in plants) that provides structured support, shape, and physical protection.
* **Rough Endoplasmic Reticulum (RER):** Covered in ribosomes; synthesizes and processes proteins meant for membranes or export.
* **Smooth Endoplasmic Reticulum (SER):** Lacks ribosomes; synthesizes lipids, metabolizes carbohydrates, and detoxifies chemicals or poisons.

---

### 5. Plant vs. Animal Cells
While both are eukaryotic, they contain key differences:

* **Plant Cells only (or rarely in animals):** Cell wall, Chloroplasts, and a single Large Central Vacuole. They typically have a rigid, rectangular shape.
* **Animal Cells only (or rarely in plants):** Centrioles/Centrosomes (used for cell division) and Lysosomes (containing digestive enzymes for waste breakdown). They are typically rounder and have irregular shapes.

---

### 6. The Reaction of Photosynthesis
Photosynthesis is how autotrophs transform solar radiation into chemical carbohydrates (glucose):

$$\\text{Carbon Dioxide (6CO}_2) + \\text{Water (6H}_2\\text{O)} + \\text{Solar Light} \\longrightarrow \\text{Glucose (C}_6\\text{H}_{12}\\text{O}_6) + \\text{Oxygen (6O}_2)$$

* **Reactants:** Carbon Dioxide, Water, Sunlight.
* **Products:** Glucose (stored sugar), Oxygen (byproduct).
* **Location:** Chloroplast.

---

### 7. The Reaction of Cellular Respiration
Respiration is how living cells combust sugars to generate usable biological batteries (ATP):

$$\\text{Glucose (C}_6\\text{H}_{12}\\text{O}_6) + \\text{Oxygen (6O}_2) \\longrightarrow \\text{Carbon Dioxide (6CO}_2) + \\text{Water (6H}_2\\text{O)} + \\text{ATP Chemical Energy}$$

* **Reactants:** Glucose, Oxygen.
* **Products:** Carbon Dioxide, Water, ATP (approx. 36-38 ATP under aerobic conditions).
* **Location:** Cytoplasm (glycolysis) and Mitochondria (Krebs cycle & Electron Transport Chain).

---

### 8. Levels of Biological Organization
The complexity of multicellular organisms is organized hierarchically:

$$\\text{Atom} \\longrightarrow \\text{Molecule} \\longrightarrow \\text{Organelle} \\longrightarrow \\text{Cell} \\longrightarrow \\text{Tissue} \\longrightarrow \\text{Organ} \\longrightarrow \\text{Organ System} \\longrightarrow \\text{Organism}$$

* **Cell:** Basic unit of life (e.g., cardiac muscle cell).
* **Tissue:** Group of similar cells working together (e.g., cardiac muscle tissue).
* **Organ:** Structures composed of multiple tissue types working for a unified goal (e.g., Heart).
* **Organ System:** Group of cooperating organs (e.g., Cardiovascular System).
* **Organism:** The complete individual (e.g., Human block).

---

### 9. Main Human Body Systems
Our body coordinates functions through several organ systems:

* **Nervous: Controls and coordinates body movements and responses.** Composed of the brain, spinal cord, and sensory nerves. It transmits rapid electrochemical signals.
* **Integumentary: Acts as a physical barrier against invaders and prevents fluid loss.** Composed of skin, hair, and nails. Helps regulate body temperature.
* **Endocrine: Regulates long-term processes via blood chemical messengers (hormones).** Made of glands (thyroid, pituitary, adrenal, pancreas) that govern growth, metabolism, and reproduction.
* **Muscular: Enables voluntary and involuntary physical movement.** Composed of skeletal, smooth, and cardiac muscles. Generates body heat as a byproduct.
* **Excretory: Filters and removes metabolic waste materials from blood.** Composed of kidneys, ureters, urinary bladder, and skin/lungs. Regulates water and pH levels.
* **Skeletal: Provides structure and protects critical inner organs.** Composed of 206 bones, cartilage, joints, and ligaments. Acts as a site of blood cell production (bone marrow) and calcium storage.

---

### 10. Energy Pyramids and the 10% Rule
An energy pyramid tracks how chemical calories travel through trophic layers in an ecosystem:

1. **Producers (Base):** Capture solar energy directly (e.g., plants, kelp).
2. **Primary Consumers:** Herbivores eating plants (e.g., grasshoppers, deer).
3. **Secondary Consumers:** Carnivores eating herbivores (e.g., frogs, snakes).
4. **Tertiary Consumers:** Apex predators (e.g., eagles, wolves).

**The 10% Rule:**
Only about **10%** of the energy stored at one trophic level is passed onto the next level.
* The other **90%** of the energy is lost to the environment as metabolic heat, biological efforts of finding food, or exits the system as indigestible waste.
* For example, if producers store 10,000 kJ of energy, primary consumers acquire 1,000 kJ, secondary consumers get 100 kJ, and tertiary consumers gain only 10 kJ.

---

### 11. Steps of the Water Cycle
The hydrological cycle recirculates water:

1. **Evaporation:** The sun heats surface water (oceans, lakes), vaporizing it into atmospheric gas.
2. **Transpiration:** Water evaporates off green plant leaves through stomata pores.
3. **Condensation:** Hot rise-vapor cools down, clumping into visible cloud droplets.
4. **Precipitation:** Condensed droplets fall back to land as rain, snow, hail, or sleet.
5. **Runoff / Collection:** Precipitation flows over ground into local streams, rivers, and oceans.
6. **Infiltration / Percolation:** Water seeps down into layers of soil, refilling deep groundwater aquifers.

---

### 12. Types of Symbiosis and Examples
Symbiosis describes long-term close interactions between different species:

* **Mutualism ($+/+$):** Both organisms benefit.
  * *Example:* Bees gather sweet food from flowers while pollinating them; Clownfish finding anemone shelter while fending off predators.
* **Commensalism ($+/0$):** One benefits, other is unaffected.
  * *Example:* Barnacles attaching to whale skin to get a free ride through nutrient-rich waters; Cattle egrets eating flushed insects near grazing cattle.
* **Parasitism ($+/-$):** One benefits (parasite), other is harmed (host).
  * *Example:* Ticks sucking blood from a dog; Tapeworms feeding off host nutrients inside mammalian intestines.

---

### 13. Predation vs. Symbiosis
* **Why Predation is Different:** Symbiosis is defined as a sustained, long-term living arrangement where two species reside close together over an extended period. Predation ($+/-$) is a rapid, immediate encounter where a predator hunts, kills, and consumes its prey. It is not an ongoing, cooperative or close life structural symbiotic relationship.

---

### 14. Keystone Species
A **keystone species** is an organism that has an exceptionally large, critical impact on its ecosystem relative to its abundance.
* If a keystone species is removed, the entire ecosystem undergoes a catastrophic shift or collapse, drastically lowering local biodiversity.
* *Classic Example:* **Sea Otters** eat abundant sea urchins. If sea otters are removed, urchins overpopulate and clear entire kelp forests, destroying are-shelter for hundreds of local marine species.

---

### 15. The Carbon Cycle
Carbon cycles through biological and geological reservoirs:

1. **Photosynthesis:** Plants pull $\\text{CO}_2$ out of the air to build glucose.
2. **Respiration:** Animals/plants burn sugar and exhale $\\text{CO}_2$ into the atmosphere.
3. **Decomposition:** Fungi and bacteria break down dead tissue, returning carbon to soil or releasing gaseous $\\text{CO}_2$.
4. **Combustion:** Burning old fossil fuels or forests releases stored carbon as atmospheric gases.
5. **Geological Storage:** Dead organic matter buried under heat/pressure becomes coal/oil over millions of years.

---

### 16. Natural Selection and Its Conditions
Natural selection is the driver of evolution. It states that individuals with advantageous traits suited for an environment are more likely to survive and reproduce.

Four absolute conditions must exist for Natural Selection to occur:
1. **Variation:** Different individuals in a population must have varying traits (e.g., some beetles are green, others brown).
2. **Inheritance:** The traits must be genetic and transferable via DNA from parents to offspring.
3. **Overproduction:** Species must generate more offspring than local resources can support, creating competition.
4. **Differential Survival and Reproduction:** Individuals with advantageous traits survive competition (Selection) and pass their favorable alleles to the next generation.

---

### 17. Reading Genetics: Punnett Squares and Pedigrees

#### Reading Punnett Squares:
A Punnett square predicts offspring genotypes using parental alleles (Capital = Dominant, Lowercase = Recessive).
* **Homozygous:** Having two of the same allele (e.g., *TT* or *tt*).
* **Heterozygous:** Having mixed alleles (e.g., *Tt*).
* For parents *Tt* and *Tt*:
  * 25% homozygous dominant (*TT*), 50% heterozygous (*Tt*), 25% homozygous recessive (*tt*).
  * 3:1 phenotype distribution ratio (75% dominant, 25% recessive trait expressed).

#### Reading Pedigrees:
A pedigree chart tracks a genetic trait across multiple family generations:
* **Squares:** Represent males.
* **Circles:** Represent females.
* **Shaded Shape:** Indicates the individual displays the traced trait (affected).
* **Unshaded Shape:** Represents a normal individual without the trait.
* **Horizontal Lines:** Connect biological parents.
* **Vertical Lines:** Lead to offspring listed from left to right in birth order.
* **Autosomal Recessive Indicator:** If the trait skips generations (unaffected parents have an affected child), the trait is recessive.`,
    date: 'Jun 08, 2026',
    category: 'Science',
    readTime: '10 min read'
  },
  {
    id: 'it-final-guide',
    title: 'Italian Final Study Guide',
    subtitle: 'Units 1–7 • Comprehensive Italian Course Review',
    content: `### Benvenuti! Italian Language Review
This study guide compiles vocabularies, grammar architectures, and structured remediation files for Units 1 to 7. 

---

### Unit 1: Primo Giorno di Scuola (First Day of School)

#### 1. Countries and Nationalities (Paesi e Nazionalità)
In Italian, nationalities function as adjectives and adjust their endings to match the gender and number of the noun.

* **Italia** $\\longrightarrow$ italiano/italiana
* **Svizzera** $\\longrightarrow$ svizzero/svizzera
* **Brasile** $\\longrightarrow$ brasiliano/brasiliana
* **Spagna** $\\longrightarrow$ spagnolo/spagnola
* **Germania** $\\longrightarrow$ tedesco/tedesca
* **Francia** $\\longrightarrow$ francese (same for masculine/feminine)
* **Argentina** $\\longrightarrow$ argentino/argentina
* **Giappone** $\\longrightarrow$ giapponese
* **Cina** $\\longrightarrow$ cinese
* **India** $\\longrightarrow$ indiano/indiana
* **Nigeria** $\\longrightarrow$ nigeriano/nigeriana
* **Egitto** $\\longrightarrow$ egiziano/egiziana
* **Marocco** $\\longrightarrow$ marocchino/marocchina
* **Canada** $\\longrightarrow$ canadese
* **Senegal** $\\longrightarrow$ senegalese
* **Belgio** $\\longrightarrow$ belga (plural: belghi/belghe)
* **Kenia** $\\longrightarrow$ keniota
* **Vietnam** $\\longrightarrow$ vietnamita (plural: vietnamiti/vietnamite)

#### 2. Greeting Phrases and Introductions
* **Buongiorno, mi chiamo [Name]. Come ti chiami?** (Good day, I call myself... What is your name?)
* **Ciao! Mi chiamo [Name]. Come stai?** (Hi! I call myself... How are you?)
* **Come si chiama? / Si chiama [Name].** (What is their name? / They are called...)
* **Questo è [Name].** (This is... [for males])
* **Questa è [Name].** (This is... [for females])
* **Lui è [Name] / Lei è [Name].** (He is... / She is...)
* **Di dov'è? OR Di dove sei?** (Where are you from? - Formal/Informal)
* **Sono di [City], di [Country]. Sono [Nationality].** (I am from...)

#### 3. Present Indicative of the Verb **Essere** (To Be)
Used to describe inherent traits, nationality, origin, state, and hours:

* **Io sono** (I am)
* **Tu sei** (You are [informal])
* **Lui/Lei/Lei è** (He/She is, You are [formal])
* **Noi siamo** (We are)
* **Voi siete** (You all are)
* **Loro sono** (They are)

#### 4. Adjectives Describing People
* **Felice** (Happy)
* **Triste** (Sad)
* **Alto** (Tall)
* **Basso** (Short)
* **Stanco** (Tired)
* **Simpatico** (Charming/Nice)

#### 5. Present Indicative of \`-are\` Verbs (conjugation)
Using **amare** (to love) as the base paradigm:
* **Io** amo
* **Tu** ami
* **Lui/Lei** ama
* **Noi** amiamo
* **Voi** amate
* **Loro** amano

#### 6. Spelling Words
* **Come si scrive [parola]?** (How do you write [word]?)

---

### Unit 2: Tanti Auguri (Happy Birthday)

#### 1. Numbers 0 - 100
* **0–10:** zero, uno, due, tre, quattro, cinque, sei, sette, otto, nove, dieci
* **11–20:** undici, dodici, tredici, quattordici, quindici, sedici, diciassette, diciotto, diciannove, venti
* **21–100 rules:**
  * When joining *uno* (one) or *otto* (eight), drop the final vowel of the tens prefix: *ventuno*, *ventotto*, *trentuno*, *trentotto*.
  * When joining *tre* (three) to numbers above 20, add an acute accent to the final **é**: *ventitré*, *trentatré*.
  * **Tens:** venti (20), trenta (30), quaranta (40), cinquanta (50), sessanta (60), settanta (70), ottanta (80), novanta (90), cento (100).

#### 2. Months of the Year (Mesi dell'anno)
Months are **never capitalized** in Italian unless starting a sentence. State the day before the month (e.g., *il diciannove febbraio*):
* *gennaio, febbraio, marzo, aprile, maggio, giugno, luglio, agosto, settembre, ottobre, novembre, dicembre.*

#### 3. How to Structure a Birthday Card (Un Biglietto d'Auguri)
\`\`\`text
(Il tuo nome e cognome)                           (Regione d'Italia), (La data)
Via dei [Nome Via]
[Regione scelta]

Cara/Caro [Nome],
Buon compleanno, tanti auguri! Tu hai [Età dell'interlocutore] anni, vero? 
Io ho tredici anni! Quando festeggi il compleanno?
Ciao, la tua amica / il tuo amico!
Con affetto, 
[Il tuo nome]
\`\`\`

#### 4. Body Parts (Parti del Corpo)
* **Testa** (Head)
* **Denti** (Teeth)
* **Gola** (Throat)
* **Stomaco** (Stomach)
* **Pancia** (Belly/Pudge)
* **Piedi** (Feet) $\\rightarrow$ *Cammina* (Walks)

#### 5. Age, Birthdays, and Well-Being
* **Age:** *Quanti anni hai? / Ho [età] anni.*
* **Birthday:** *Quando è il tuo compleanno? / Il mio compleanno è il [giorno] [mese].*
* **Well-being:** *Ciao, come stai? / Io sto male / ho mal di [parte]. Non sto tanto bene. Io sto molto bene.*

#### 6. Present indicative of **Avere** (To Have) and **Stare** (To Be/Stay)
* **Avere:** Io ho, Tu hai, Lui/Lei ha, Noi abbiamo, Voi avete, Loro hanno
* **Stare:** Io sto, Tu stai, Lui/Lei sta, Noi stiamo, Voi state, Loro stanno

#### 7. Plurals and Endings Rules
* Single vowel accented nouns don't change: *una università* $\\rightarrow$ *due università*.
* Ending changes: **-io** $\\rightarrow$ **-i** (*esercizio* $\\rightarrow$ *esercizi*) | **-ca/-ga** $\\rightarrow$ **-che/-ghe** (*stanca* $\\rightarrow$ *stanche*) | **-co/-go** $\\rightarrow$ **-chi/-ghi** (*banco* $\\rightarrow$ *banchi*). Exception: *stomaco* $\\rightarrow$ *stomaci*.
* *Memory Rule:* "Old Italian Aunts Eat Everything Italian" (**-o** $\\rightarrow$ **-i** | **-a** $\\rightarrow$ **-e** | **-e** $\\rightarrow$ **-i**).

#### 8. Definite Articles (Articoli Determinativi)
Definite articles must align in gender and number:

| Gender / Group | Singular | Plural | Usage Rule |
| :--- | :--- | :--- | :--- |
| **Maschile** | **il** (*il libro*) | **i** (*i libri*) | Before consonants. |
| | **lo** (*lo studente*) | **gli** (*gli studenti*) | Before s+consonant, z, ps, gn, x, y, pn. |
| | **l'** (*l'albero*) | **gli** (*gli alberi*) | Before vowels. |
| **Femminile** | **la** (*la casa*) | **le** (*le case*) | Before consonants. |
| | **l'** (*l'ora*) | **le** (*le ore*) | Before vowels. |

---

### Unit 3: Foto di Classe (Classroom Photo)

#### 1. Numbers up to 9,999,999
* **100–900:** cento (100), duecento (200), trecento (300), quattrocento (400), cinquecento (500), seicento (600), settecento (700), ottocento (800), novecento (900).
* **Thousands:** mille (1,000), duemila (2,000), tremila (3,000)... diecimila (10,000), centomila (100,000).
* **Millions:** un milione (1,000,000), due milioni (2,000,000), un miliardo (1,000,000,000).

#### 2. Classroom Objects (Oggetti della Classe)
* **Matita** (pencil), **Gomma** (eraser), **Libro** (book), **Forbici** (scissors), **Spillatrice** (stapler), **Quaderno** (notebook), **Astuccio** (pencil case), **Banco** (desk), **Cartina** (map), **Temperamatite** (pencil sharpener), **Zaino** (backpack), **Computer** (computer), **Lavagna** (board), **Righello** (ruler), **Foglio** (folder/sheet), **Finestra** (window), **Cestino** (trash can).

#### 3. School Subjects
* *Geografia, Educazione fisica, Educazione musicale, Educazione artistica, Educazione tecnica, Matematica, Scienze, Storia, Letteratura, Italiano, Biologia, Chimica.*
* Question: *Cosa studi?* (What do you study?) $\\rightarrow$ *Studio scienze e matematica.*

#### 4. Present of -ere (Group 2) and -ire (Group 3) Verbs
* **Scrivere (-ere):** scrivo, scrivi, scrive, scriviamo, scrivete, scrivono.
* **Dormire (-ire):** dormo, dormi, dorme, dormiamo, dormite, dormono.

#### 5. There Is / There Are
* **C'è** $\\rightarrow$ followed by a singular noun (e.g., *C'è un banco nella classe*).
* **Ci sono** $\\rightarrow$ followed by plural nouns (e.g., *Ci sono molti libri*).

#### 6. Demonstrative Adjectives (Questo and Quello)
* **Questo/Questa/Questi/Queste** (This/These - near the speaker).
* **Quello** (That - far away) changes forms like definite articles: *quel* (like *il*), *quello* (like *lo*), *quell'* (like *l'*), *quella* (like *la*), *quei* (plural *i*), *quegli* (plural *gli*), *quelle* (plural *le*).

#### 7. Classroom Actions
* **Parlare** (to speak), **Leggere** (to read), **Scrivere** (to write), **Ascoltare** (to listen), **Studiare** (to study), **Rispondere** (to respond), **Prendere appunti** (to take notes).

---

### Unit 4: Il Carattere e L'aspetto Fisico (Character and Physical Appearance)

#### 1. Character Qualities and Antonyms
* **Chiacchierone** (Chatty/Talkative)
* **Goloso** (Gluttonous)
* **Intelligente** (Intelligent)
* **Studioso** (Studious)
* **Timido** (Shy)
* **Disordinato** (Messy) $\\leftrightarrow$ **Ordinato** (Organized)
* **Divertente** (Fun) $\\leftrightarrow$ **Noioso** (Boring)
* **Generoso** (Generous) $\\leftrightarrow$ **Avaro** (Stingy)
* **Simpatico** (Nice) $\\leftrightarrow$ **Antipatico** (Unfriendly)
* **Pigro** (Lazy) $\\leftrightarrow$ **Attivo** (Active)
* **Attento** (Attentive) $\\leftrightarrow$ **Distratto** (Distracted)
* **Scherzoso** (Playful) $\\leftrightarrow$ **Serio** (Serious)
* **Allegro** (Cheerful) $\\leftrightarrow$ **Triste** (Sad)
* **Pauroso** (Fearful) $\\leftrightarrow$ **Coraggioso** (Brave)
* **Chiuso** (Reserved) $\\leftrightarrow$ **Aperto** (Outgoing)
* **Cattivo** (Bad/Mean) $\\leftrightarrow$ **Buono** (Good)

#### 2. Physical Characteristics (Aspecto Fisico)
* **Capelli (Hair):** lunghi (long), corti (short), ricci (curly), lisci (straight). Colors: rossi (red), neri (black), biondi (blonde), castani (brown).
* **Occhi (Eyes):** neri, azzurri (blue), verdi (green), marroni/castani (brown).
* **Stature:** alto (tall), basso (short), robusto (strong/built), magro (skinny), grasso (fat).

#### 3. Places in the School (La Scuola)
* *Aula (Class), Aula Magna (Auditorium), Campo Sportivo (Field), Palestra (Gym), Sala Professori (Teacher Lounge), Segreteria (Main Office), Cortile (Courtyard), Laboratorio di Scienze (Science Lab), Corridoio (Hallway).*

#### 4. Possessive Adjectives and Pronouns
In Italian, possessive adjectives generally require definite articles:

| Person | Maschile Singolo | Maschile Plurale | Femminile Singolo | Femminile Plurale |
| :--- | :--- | :--- | :--- | :--- |
| **My** | il mio | i miei | la mia | le mie |
| **Your (sing.)** | il tuo | i tuoi | la tua | le tue |
| **His/Her** | il suo | i suoi | la sua | le sue |
| **Our** | il nostro | i nostri | la nostra | le nostre |
| **Your (plur.)** | il vostro | i vostri | la vostra | le vostre |
| **Their** | il loro | i loro | la loro | le loro |

* **Drop the article** before singular, unmodified family relatives (e.g., *mia sorella*, *mio fratello*). BUT keep it with *loro*: *la loro madre*.

#### 5. Verbs in \`-care\` and \`-gare\`
Verbs ending in **-care** (*dimenticare*) and **-gare** (*pagare*) add an **"h"** in the 2nd person singular (*tu*) and 1st person plural (*noi*) to preserve the hard sound:
* **Tu:** *dimentichi*, *paghi*
* **Noi:** *dimentichiamo*, *paghiamo*

#### 6. The \`-isc\` Verbs (Capire paradigm)
* **Capire (to understand):** capisco, capisci, capisce, capiamo, capite, capiscono.
* Other -isc verbs: *arrossire* (blush), *dimagrire* (lose weight), *finire* (finish), *preferire* (prefer), *pulire* (clean), *spedire* (send), *tossire* (cough), *ubbidire* (obey).

#### 7. Present indicative of the irregular verb **Fare** (to do/make)
* **Fare:** Io faccio, Tu fai, Lui/Lei fa, Noi facciamo, Voi fate, Loro fanno

---

### Unit 5: Giorni, Routine, e Orari (Days, Routine, Time)

#### 1. Days of the Week (Giorni della Settimana)
Add an accent on the **ì** for Monday-Friday:
* *lunedì, martedì, mercoledì, giovedì, venerdì, sabato, domenica.*

#### 2. Daily Routine (Routine Quotidiana)
Main reflexive verbs & routine idioms:
* *svegliarsi (wake up), lavarsi i denti (brush teeth), fare la doccia / lavarsi (take a shower/wash), pettinarsi (comb hair), fare colazione (have breakfast), andare a scuola (go to school), pranzare (have lunch), fare i compiti (do homework), cenare (have dinner), andare a letto (go to bed), dormire (sleep).*

#### 3. Telling Time (Telling Time and Adverbs)
* **Adverbs of Time:** *in ritardo* (late), *tardi* (at a late hour), *in anticipo* (early/ahead of schedule), *presto* (soon/early).
* **Parts of the Day:** *di mattina* (5:00 AM - 11:59 AM), *di pomeriggio* (12:00 PM - 5:59 PM), *di sera* (6:00 PM - 9:59 PM), *di notte* (10:00 PM - 4:59 AM).

#### 4. Articulated Prepositions (Preposizioni Articolate)
When a core preposition combines with a definite article, they merge into a single word:

| Prep | + il | + lo | + l' | + la | + i | + gli | + le |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **a** | al | allo | all' | alla | ai | agli | alle |
| **da** | dal | dallo | dall' | dalla | dai | dagli | dalle |
| **di** | del | dello | dell' | della | dei | degli | delle |
| **in** | nel | nello | nell' | nella | nei | negli | nelle |
| **su** | sul | sullo | sull' | sulla | sui | sugli | sulle |

#### 5. Present Indicative of Reflexive Verbs (**Alzarsi**)
Reflexive verbs require reflexive pronouns: *mi, ti, si, ci, vi, si*.
* **Alzarsi (to get up):** Io mi alzo, Tu ti alzi, Lui/Lei si alza, Noi ci alziamo, Voi vi alzate, Loro si alzano.

#### 6. Irregular verbs: **Andare**, **Bere**, **Uscire**
* **Andare (to go):** vado, vai, va, andiamo, andate, vanno.
* **Bere (to drink):** bevo, bevi, beve, beviamo, bevete, bevono.
* **Uscire (to go out):** esco, esci, esce, usciamo, uscite, escono.

---

### Unit 6: Presente Progressivo e Preposizioni di Luogo (Progressive Present and Place)

#### 1. Present Progressive Architecture
Formed using conjugated **Stare** + Gerund (**-ando** for -are, **-endo** for -ere/-ire):
* **Io sto** studiando / scrivendo / finendo
* **Tu stai** studiando / scrivendo
* **Lui/Lei sta** studiando / scrivendo
* **Noi stiamo** studiando / scrivendo
* **Voi state** studiando / scrivendo
* **Loro stanno** studiando / scrivendo
* **Irregulars:** *fare* $\\rightarrow$ facendo | *bere* $\\rightarrow$ bevendo.
* **Reflexives in Progressive:** Pronoun precedes *stare* or attaches to gerund: *Mi sto alzando* (I am getting up).

#### 2. Verb **Venire** (to come)
* **Venire:** Io vengo, Tu vieni, Lui/Lei viene, Noi veniamo, Voi venite, Loro vengono. Origin: *Viene dalla Spagna* (He comes from Spain).

#### 3. Prepositions of Place
* **Su** (on), **Sopra (a)** (above), **Sotto (a)** (under), **In / dentro (a)** (in/inside), **Fra / tra** (between), **Davanti (a)** (in front of), **Dietro (a)** (behind), **(in) vicino (a)** (near/next to).
* *Rule:* *Sopra*, *sotto*, *davanti*, *dietro*, *vicino* are followed by **a + article** (*il gatto è dietro alla poltrona*).

---

### Unit 7: I Mestieri (Jobs and Professions)

#### 1. Job Vocabularies
*Nouns ending in **ista** can be masculine or feminine: **il barista** or **la barista**.*
* **Il chirurgo** (surgeon), **il/la barista** (barista/bartender), **la cameriera** (waitress/server), **il meccanico** (mechanic), **il/la farmacista** (pharmacist), **il/la giornalista** (journalist), **il parrucchiere** (hairdresser), **il vigile urbano** (traffic warden), **il poliziotto** (police officer), **il pompiere** (firefighter), **il postino** (mail carrier), **il veterinario** (veterinarian), **l'architetto** (architect), **l'avvocato** (lawyer), **il medico/dottore** (doctor), **l'infermiere/a** (nurse), **il/la musicista** (musician), **il ballerino** (dancer), **il disegnatore** (designer).

#### 2. Irregular Modal Verbs: **Dovere**, **Potere**, **Volere**
Followed directly by an infinitive:
* **Dovere (must/have to):** devo, devi, deve, dobbiamo, dovete, devono.
* **Potere (can/be able to):** posso, puoi, può, possiamo, potete, possono.
* **Volere (to want):** voglio, vuoi, vuole, vogliamo, volete, vogliono.

#### 3. Sapere, Dire, Dare
* **Sapere (to know an ability/fact):** so, sai, sa, sappiamo, sapete, sanno.
* **Dire (to tell/say):** dico, dici, dice, diciamo, dite, dicono.
* **Dare (to give):** do, dai, dà, diamo, date, danno.

#### 4. Verbs block: -gnere, -gliere, -nere
* **Spegnere (to turn off):** spengo, spegni, spegne, spegniamo, spegnete, spengono.
* **Scegliere (to choose):** scelgo, scegli, sceglie, scegliamo, scegliete, scelgono.
* **Tenere (to hold/keep):** tengo, tieni, tiene, teniamo, tenete, tengono.

#### 5. Interrogative Pronouns
* **What/Which:** *che / quale / quali*
* **Who:** *chi*
* **How much/many:** *quanto / quanta / quanti / quante*

---

### Remediation & Practice exercises

#### Lesson 1: Match images of objects
1. *Il letto* (the bed)
2. *Il frigorifero* (the refrigerator)
3. *L'armadio* (the closet)
4. *Il divano* (the sofa)
5. *La scrivania* (the desk)
6. *Lo specchio* (the mirror)

#### Lesson 2: Conjugate correct present progressive verbs
1. Io sono nello studio: **sto ripetendo** (ripetere) la lezione.
2. Teo è in cucina, **sta facendo** (fare) la merenda.
3. In camera i bambini **si stanno alzando** (alzarsi).
4. La mamma è nel soggiorno, **sta leggendo** (leggere).
5. Tu sei in giardino, **stai chiacchierando** (chiacchierare) con gli amici.
6. Noi siamo in garage, **stiamo pulendo** (pulire) la macchina.
7. Voi siete in cucina, **state bevendo** (bere) un succo di frutta.
8. Le mie sorelle sono in bagno, **si stanno lavando** (lavarsi) le mani.`,
    date: 'Jun 08, 2026',
    category: 'Italian',
    readTime: '15 min read'
  },
  {
    id: 'sci-nyt-1',
    title: 'The Restless Earth: How Geologists Proved Plate Tectonics',
    subtitle: 'Adapted from The New York Times • Earth Sciences',
    content: `### Introduction
For decades, the idea that continents could crawl across the globe was laughed at by the scientific establishment. Alfred Wegener, a German meteorologist, first proposed "continental drift" in 1912, but he was dismissed because he couldn't explain *how* such solid masses could move. It wasn't until the mid-twentieth century, when oceanographers mapped the deep sea, that Wegener was proven right. This article explores the dramatic discoveries that revolutionized geology.

### Teh Great Rift in the Ocean
The breakthrough came during the Cold War. The U.S. Navy wanted to map the ocean floor to hide submarines. Oceanographers Marie Tharp and Bruce Heezen created the first comprehensive maps of the Atlantic floor. To there surprise, they found a massive, continuous mountain range cutting down the center of the ocean—the Mid-Atlantic Ridge. 
* Tharp noticed a deep valley running down the center of the ridge.
* She suggested it was a rift valley where the earth's crust was splitting open.
* At first, Heezen dismissed her idea as "girl talk," but later research proved she was exactly right. The sea floor was actively spreading apart.

### Magma and Magnetic Stripes
As magma wells up from the rift, it cools and forms new crust. Crucially, as the iron-bearing minerals in the magma cool, they align with the Earth's magnetic field like tiny compass needles. 
Because the Earth's magnetic poles reverse polarity every few hundred thousand years, the seafloor acts as a giant tape recorder. Geologists detected alternating "stripes" of normal and reversed magnetic polarity on either side of the mid-ocean ridges. These stripes is perfectly symmetrical, proving that new crust is constantly being created and pushed outward.

### Subduction: The Final Piece
If new crust is constantly being made in the ocean, why doesn't the Earth grow bigger? The answer lies in deep-sea trenches. In these regions, dense oceanic plates is forced down into the hot mantle beneath lighter continental plates. This process, known as subduction, melts the old crust back into magma, fueling volcanoes and triggering major earthquakes.

This dynamic system—sea-floor spreading balanced by subduction—is what we call plate tectonics. Wegener's laughed-at theory are now the foundation of modern earth science.`,
    date: 'Jul 20, 2026',
    category: 'Science',
    readTime: '5 min read'
  },
  {
    id: 'soc-jstor-1',
    title: 'The Social Fabric of the American Revolution: A Re-evaluation',
    subtitle: 'Reprinted from Journal of American History via JSTOR',
    content: `### Overview
Historians often debate whether the American Revolution was a conservative movement to preserve existing liberties or a radical social transformation. While early accounts focused on intellectual elites like Thomas Jefferson and John Adams, modern studies in the *Journal of American History* emphasize the role of ordinary citizens, artisans, and enslaved people in shaping the revolutionary struggle. This paper examines the complex social forces that drove the colonies toward independence.

### Economic Grievances and the Stamp Act
The road to revolution did not begin in high-minded debate halls, but in crowded taverns and shipping docks. After the Seven Years' War, Great Britain found itself deeply in debt and sought to recoup costs by taxing the colonies directly.
* The Stamp Act of 1765 sparked widespread protests because it taxed everyday paper items, from legal documents to playing cards.
* Colonists argued that Parliament had no right to tax them without there consent ("No taxation without representation").
* Merchants in Boston and New York organized boycotts of British goods, which was highly effective.

### Teh Mob as a Political Force
While elites wrote letters and pamphlets, ordinary working-class citizens used more direct methods. Group calling themselves the "Sons of Liberty" enforced boycotts through intimidation, sometimes tarring and feathering loyalist tax collectors.
* The Boston Tea Party of 1773, where protesters dumped 342 chests of tea into Boston Harbor, was not a spontaneous riot but a carefully planned act of defiance.
* These actions show how working-class anger was harnessed by revolutionary leaders to pressure the British crown.

### Social Contradictions of Liberty
The rhetoric of the revolution claimed that "all men are created equal," yet the society that fought for independence was deeply unequal. 
* Many wealthy patriots owned enslaved laborers, and the Continental Congress recieved petitions from enslaved people asking for their freedom based on the same principles of liberty being fought for.
* Women also played a crucial role by organizing boycotts and managing farms while men were away at war, though they remained legally and politically disenfranchised after the war's conclusion.

In conclusion, the American Revolution was not just a war between two armies, but a complex struggle that reshaped the social fabric of the colonies, raising questions about equality and freedom that the new nation would spend centuries trying to resolve.`,
    date: 'Jul 19, 2026',
    category: 'Social Studies',
    readTime: '6 min read'
  }
];

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

**Nonfiction** is bound to documented facts, real people, and verifiable events. The author\'s interpretation matters, but the record cannot be invented. Its purpose is to inform, analyze, or persuade using evidence.

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
