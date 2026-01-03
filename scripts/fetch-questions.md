# Fetching Complete Question Data

To populate all 460 questions, you have several options:

## Option 1: Use GitHub Repository (Recommended)

1. Visit: https://github.com/vlad-ds/anki-german-citizen-test
2. Download the Anki deck
3. Convert Anki cards to JSON format
4. Use the conversion script below

## Option 2: Scrape Official BAMF Website

The official questions are available at:
- https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Einbuergerung/einbuergerungstest-fragenkatalog.pdf

You can use a PDF parser or manual entry.

## Option 3: Use Existing JSON Data

Search GitHub for repositories containing "einbürgerungstest" and "json" to find pre-formatted question data.

## Conversion Script Template

```javascript
// Example: Convert Anki deck to our JSON format
// This is a template - adapt based on your data source

const questions = []; // Your source data

const converted = questions.map((q, index) => ({
  id: `G${String(index + 1).padStart(3, '0')}`,
  question: q.question,
  options: q.options, // Array of 4 options
  correctAnswer: q.correctIndex, // 0-3
  category: q.category || "Politik in der Demokratie",
  explanation: q.explanation || "",
  state: q.state || null,
  difficulty: "medium"
}));

// Save to general-questions.json or state-questions.json
```

## Current Status

The application structure is ready. You currently have:
- 2 sample general questions
- 1 sample question per state (16 states)

**To complete:** Add the remaining 298 general questions and 144 state-specific questions (9 more per state).

