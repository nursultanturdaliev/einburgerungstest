# Frage-Daten hinzufügen

Um die vollständigen 460 Fragen hinzuzufügen, können Sie:

## Option 1: Von GitHub Repository

1. Besuchen Sie ein Open-Source Repository mit Einbürgerungstest-Fragen:
   - https://github.com/vlad-ds/anki-german-citizen-test
   - https://github.com/defuncart/einbuergerungstest

2. Extrahieren Sie die Fragen und konvertieren Sie sie in das JSON-Format:

```json
{
  "id": "G001",
  "question": "Frage text...",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "category": "Politik in der Demokratie",
  "explanation": "Erklärung...",
  "state": null,
  "difficulty": "easy"
}
```

## Option 2: Von BAMF Website

1. Besuchen Sie die offizielle BAMF Website
2. Laden Sie den Fragenkatalog herunter
3. Konvertieren Sie die Fragen in das JSON-Format

## Option 3: Manuell

Fügen Sie Fragen manuell zu den JSON-Dateien hinzu:
- `data/general-questions.json` für allgemeine Fragen (300 total)
- `data/state-questions.json` für landesspezifische Fragen (10 pro Bundesland)

## Validierung

Stellen Sie sicher, dass:
- Jede Frage eine eindeutige ID hat
- `correctAnswer` ist ein Index (0-3) für die richtige Option
- `category` ist eine der Kategorien aus `metadata.json`
- `state` ist `null` für allgemeine Fragen oder der Bundeslandname für landesspezifische Fragen

