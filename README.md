# Einbürgerungstest Vorbereitung

Eine moderne Web-Anwendung zur Vorbereitung auf den deutschen Einbürgerungstest.

## Features

- **460 offizielle Fragen**: 300 allgemeine Fragen + 160 landesspezifische Fragen (10 pro Bundesland)
- **Verschiedene Übungsmodi**:
  - Alle Fragen durchgehen (sequenziell)
  - Zufälliger Test (33 Fragen, 60 Minuten Timer)
  - Übungsmodus mit sofortigem Feedback
  - Kategorie-Filter
  - Lesezeichen-Übungen
  - Wiederholung falscher Antworten
- **Fortschrittsverfolgung**: Lokale Speicherung aller Antworten und Statistiken
- **Statistiken**: Detaillierte Übersicht über Ihre Leistung nach Kategorien
- **Lesezeichen**: Markieren Sie schwierige Fragen zum späteren Üben
- **Dark Mode**: Unterstützung für helles und dunkles Theme
- **PWA**: Installierbar als Progressive Web App für Offline-Zugriff
- **Responsive Design**: Optimiert für Desktop und Mobile

## Technologie-Stack

- **Next.js 14+** mit App Router
- **TypeScript**
- **Tailwind CSS**
- **React Context API** für State Management
- **localStorage** für Datenpersistenz

## Installation

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Production Build
npm run build

# Production Server starten
npm start
```

## Datenstruktur

Die Fragen sind in JSON-Dateien organisiert:

- `data/general-questions.json` - 300 allgemeine Fragen
- `data/state-questions.json` - 160 landesspezifische Fragen
- `data/metadata.json` - Metadaten und Konfiguration

### Frage-Schema

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

## Deployment auf Vercel

1. Repository zu GitHub pushen
2. Auf [Vercel](https://vercel.com) einloggen
3. Neues Projekt importieren
4. Build-Konfiguration:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `out`
5. Deploy

Die App wird automatisch als statische Seite exportiert.

## Hinweise

- Die aktuellen JSON-Dateien enthalten Beispiel-Fragen. Um die vollständigen 460 Fragen zu verwenden, müssen diese aus offiziellen BAMF-Quellen oder Open-Source-Repositories hinzugefügt werden.
- Für PWA-Icons: Ersetzen Sie `public/icon-192.png` und `public/icon-512.png` mit eigenen Icons.

## Lizenz

Dieses Projekt ist für Bildungszwecke erstellt. Alle Fragen basieren auf dem offiziellen Fragenkatalog des Bundesamts für Migration und Flüchtlinge (BAMF).
