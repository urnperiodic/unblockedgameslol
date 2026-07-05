# Home - Classroom Dual-Mode Portal 🎓🎮

Welcome to **Home - Classroom**, an advanced, high-performance web-based portal featuring a dual-mode layout that acts as a fully compliant educational resource system, while securely offering an immersive arcades/games hub.

With standard-compliant, modern React patterns, the portal delivers rich content management, modular learning suites, interactive tools, and customizable styling preferences.

---

## 🚀 Core Architectural Layout

This application operates in two distinct view states:

### 1. Educational Syllabus Mode (The Decoy / Classroom Mode)
By default, the platform boots into an elegant, high-contrast light theme styled as a **School Syllabus and Learning Center** to ensure innocent user visibility under monitoring environments. This educational view hosts:
- 📑 **Innocent Article Hub**: An academic reader with category filtering, search parameters, and preloaded literature content.
- 🧪 **AI Article Generator**: Leveraging server-side AI model structures to generate curriculum-aligned texts dynamically.
- ⚡ **Interlocking Workspaces**:
  - **Flashcards Workspace**: Study tools with flip actions, status reviews, and persistent progression.
  - **Grammar Checker Workspace**: Real-time grammatical diagnostic suite for writing improvement.
  - **Quiz Workspace**: Dynamic academic assessment mode.

### 2. Arcades & Games Arena Mode (The Unlocked Portal)
Once unlocked via the secure dashboard access controls, the interface transforms into a beautiful dark-ambient **Games Arena**:
- 🎮 **Massive Unblocked Library**: Dozens of categorized browser-based games (including *Solo*, *Multiplayer Hub*, *Shooter*, *Sports*, *Party*, *Minecraft*, *Emulated*, and *Not Games*).
- 📌 **Bookmarks & Favorites**: Save and store personal shortcuts securely with browser-based persistence.
- 🎭 **Tab & Tab Icon Disguise (Cloaking)**: Instantly disguise browser tabs and favicons to mirror *Google Classroom*, *Google Drive*, *Google Docs*, *Canvas LMS*, or custom user settings.
- 💬 **Docked Game Chat**: A collapsible and draggable/resizable panel embedded alongside your active sandbox view.
- 🎨 **Cosmic Slate Themes**: Custom-tailored CSS variables offering dark themes like **Cyborg**, **Violet**, **Ice**, and **Rose Pine**.
- 📺 **Specialized Integrations**: Quick access links to a custom YouTube workspace, proxy web configurations, movies portals, and unblocked lobbies.

---

## ⚡ Dynamic Thumbnail Optimization

To maintain fluid desktop performance, high rendering speeds, and reduce cumulative network overhead, the application uses an inline URL optimization routine:
* **Asset Scaling**: Auto-detects supported third-party content distribution networks (such as `img.poki-cdn.com`) and automatically scales dimensions down to the optimized **512x512** format.
* **Frictionless Rendering**: Improves load metrics and keeps browser frames active without flickering.

---

## 🛠️ Project Structure

```bash
├── public/                # Static resources and HTML files
├── src/
│   ├── App.jsx            # Main app entry point with state management & portal loop
│   ├── components/        # High-fidelity interactive panels & modular components
│   │   ├── ChatWorkspace.jsx
│   │   ├── FlashcardsWorkspace.jsx
│   │   ├── GrammarCheckerWorkspace.jsx
│   │   ├── MoviesWorkspace.jsx
│   │   ├── QuizWorkspace.jsx
│   │   └── UserChat.jsx
│   ├── data/              # Database sources and static references
│   │   ├── articles.ts    # Preloaded educational syllabi
│   │   ├── games.ts       # Structured catalog of browser games (with featured markers)
│   │   └── workspaceData.ts
│   ├── index.css          # Core CSS variables, Tailwind configurations, and layout themes
│   └── main.jsx           # React strict-mode DOM binding
├── vite.config.js         # Build configuration definitions
└── package.json           # Project dependencies and script executors
```

---

## 🔧 Installation & Local Execution

Get up and running locally with the following sequence:

1. **Install Base Dependencies**:
   ```bash
   npm install
   ```

2. **Run Dev Environment**:
   ```bash
   npm run dev
   ```
   *The dev server automatically boots on port `3000` via Vite.*

3. **Production Compilation**:
   ```bash
   npm run build
   ```

---

## 🎯 Code Quality & Performance Safeguards

* **Modular Files**: Decoupled component files under `src/components` to prevent bundle congestion.
* **Durable Local Storage**: Saves user-authored bookmark structures, active theme profiles, and interface states to `localStorage` safely.
* **Adaptive Aspect Ratios**: Leverages Tailwind's standard CSS aspect grids for beautiful responsive scaling across full monitor scopes.
