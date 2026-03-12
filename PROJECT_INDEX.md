# Project Index

## Folder Structure

```
alt-playbook/
│
├── index.html          # Home/landing page — intro to the quiz, start button
├── quiz.html           # Quiz page — renders questions one section at a time
├── results.html        # Results page — score, breakdown by section, share prompt
│
├── css/
│   ├── styles.css      # Global styles, variables, typography, layout
│   └── quiz.css        # Quiz-specific styles (question cards, progress bar, options)
│
├── js/
│   ├── questions.js    # All quiz questions and answers as a data array (no logic)
│   └── quiz.js         # Quiz logic — rendering questions, tracking answers, scoring
│
└── assets/
    └── (images, icons if needed)
```

## File Responsibilities

### `index.html`
Landing page. Explains what this is and why it exists. Has a "Start Quiz" CTA. Sets the tone.

### `quiz.html`
The main experience. Renders multiple choice questions grouped by ALT section. Shows a progress bar. Allows user to move forward only after selecting an answer.

### `results.html`
Shows final score. Breaks down performance by section (e.g. "You scored 4/5 on Radical Collaboration"). Encourages retaking or sharing.

### `css/styles.css`
Design tokens (colors, fonts, spacing), resets, global layout. All CSS variables live here.

### `css/quiz.css`
Styles specific to the quiz interaction — option states (default, selected, correct, incorrect), transitions, progress bar.

### `js/questions.js`
Pure data file. Exports an array of question objects. No DOM logic here. Each question has: section, question text, options array, correct answer index, and explanation.

### `js/quiz.js`
All quiz functionality — loading questions, handling clicks, tracking score per section, navigating between questions, passing results to the results page.

## Question Object Shape

```js
{
  section: "Reflexive AI Usage",
  question: "What does 'AI-First' mean according to ALT?",
  options: [
    "Using AI only for code generation",
    "Treating AI as the first approach to any task",
    "Replacing all human roles with AI",
    "Using AI tools only in the discovery phase"
  ],
  answer: 1, // index of correct option
  explanation: "AI-First means proactively exploring AI as a primary approach, not an afterthought."
}
```

## Sections & Question Count (target)
| Section | Target Questions |
|---|---|
| What is ALT? | 3 |
| Build to Think | 4 |
| Daily Creation of Value | 4 |
| Reflexive AI Usage | 5 |
| Radical Collaboration | 4 |
| Everyone Contributes | 3 |
| Bring the Pain Forward | 4 |
| **Total** | **~27** |
