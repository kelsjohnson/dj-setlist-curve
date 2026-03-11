# Project Name

**dj-setlist-curve**

---

# Project Purpose

dj-setlist-curve is a DJ set architecture and planning tool.

The application helps DJs generate potential setlists by mapping a desired energy curve to tracks in a curated library.

**The core idea:**

- desired energy curve  
- curated track library  
- sequencing constraints  
- → generated setlist  

The tool assists DJs in planning the flow of a set rather than manually selecting tracks one-by-one.

---

# Core Product Vision

The long-term product experience is a visual energy curve editor.

**Users will:**

- view a graph representing energy across a DJ set
- drag points on the graph
- shape the curve of the set
- generate track sequences that match that curve

**Conceptually:**

```
Energy
9 |        •
8 |      •
7 |    •
6 |  •
5 | •
  +----------------
    1 2 3 4 5 (tracks)
```

The curve represents the desired energy progression of the set. The generator maps tracks to those energy targets.

---

# Current Development Phase

**Phase:** V0 prototype

The visual curve editor is not implemented yet. Instead we use **preset curves** as a temporary stand-in for the future graph input.

**Example preset:** `build` → `[3, 4, 5, 6, 7]`

These arrays represent the energy target for each track slot. The purpose of V0 is to validate the set generation engine before building the UI curve editor.

---

# Core Architecture

The system has three conceptual layers.

## 1. Curve Input

**Currently:** preset dropdown

**Future:** visual graph editor, draggable points, interactive energy curve

---

## 2. Curve Translation

The curve becomes an array of target energy values.

**Examples:** `[3, 4, 5, 6, 7]` or `[2, 5, 7, 6, 8]`

Each number corresponds to the desired energy level for a track position.

---

## 3. Set Generator

The generator selects tracks matching those targets. This is the core engine currently being built.

---

# Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Planned styling:** SCSS
- **Development environment:** Node.js, npm, Cursor IDE, GitHub

---

# Repository Structure

```
src
├── data
│   └── mockTracks.ts
├── types
│   └── track.ts
├── utils
│   └── generateSet.ts
├── App.tsx
└── main.tsx
```

---

# Data Model

Track definition lives in **`src/types/track.ts`**.

**Current type:**

```ts
export type EnergyLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type Track = {
  id: string
  title: string
  artist: string
  bpm: number
  key: string
  energy: EnergyLevel
  tags: string[]
}
```

---

# Track Library Strategy (V0)

The V0 track library is manual local data in **`src/data/mockTracks.ts`**. Tracks are manually entered objects.

**Example:**

```ts
{
  id: "1",
  title: "Electric Feel (Levity Remix)",
  artist: "Levity",
  bpm: 124,
  key: "8A",
  energy: 4,
  tags: ["groovy", "warm-up", "house"]
}
```

This provides a small curated dataset to test the generator.

**Future sources (not in V0):** Spotify playlists, SoundCloud likes, CSV imports, Serato metadata, local file scanning.

---

# Generator Engine

Main logic: **`src/utils/generateSet.ts`**

The generator takes:

- `tracks`
- `preset`
- `trackCount`
- `startBpm`
- `selectedTag`

and returns **`Track[]`** representing the generated setlist.

---

# Energy Curve System

Temporary preset curves map to energy arrays.

**Example structure:**

```ts
const curveMap = {
  "warm-up": [2, 3, 4, 4, 5],
  build: [3, 4, 5, 6, 7],
  peak: [5, 6, 7, 8, 9],
  wave: [3, 5, 7, 5, 8],
  sunrise: [2, 3, 5, 4, 3]
}
```

Each number represents the target energy for that position in the set. Later these will come from the visual graph editor.

---

# Generator Algorithm Concept

For each energy target:

1. **Filter** tracks that:
   - have not been used
   - have energy within ±1 of target
   - have BPM within ~8 of previous track
   - match selected tag (optional)
2. **Rank** candidates by energy closeness and BPM closeness
3. **Select** best candidate
4. **Append** to set
5. **Update** previous BPM
6. **Repeat**

---

# Development Philosophy

The project intentionally progresses in small, understandable steps.

- Clarity over cleverness
- Readable code
- Minimal premature abstraction
- Prove the generator concept before adding UI complexity

---

# Preferred AI Assistance Style

**DO:**

- Guide development step-by-step
- Provide explanations
- Use scaffolding or partial code
- Help debug specific issues

**DO NOT:**

- Rewrite entire files automatically
- Introduce large frameworks
- Over-engineer abstractions
- Generate huge code blocks without explanation

The developer prefers learning while building, not autopilot coding.

---

# Commit Philosophy

Use small logical commits.

**Examples:** `feat: add Track type model` · `feat: add mock DJ track library` · `feat: implement arc-based set generator`

Avoid giant multi-purpose commits.

---

# Current Project State

**Completed:**

- Repo setup
- React/Vite scaffold
- Track type definition
- Mock track library

**Completed in `generateSet.ts`:**

- CurvePreset union type
- curveMap — energy point arrays per preset (temporary stand-in for future graph editor)
- GenerateSetOptions input type
- generateSet function signature
- curve variable pulling energy targets from curveMap
- result array and usedIds Set initialized
- loop iterating over curve energy points
- basic track matching by exact energy level
- deduplication via usedIds

**Not yet wired up (params exist but unused):**

- `selectedTag` — filter candidates to tracks containing this tag
- `startBpm` — anchor first track BPM, constrain transitions
- `trackCount` — limit result length

**Remaining generator logic:**

- Energy tolerance (±1 match instead of exact)
- BPM proximity filtering
- Candidate scoring/ranking
- selectedTag filtering
- trackCount slicing

---

# Future Roadmap

## V1

- Visual curve editor: draggable points, curve smoothing, dynamic energy arrays

## V2

- Expanded track library tools: track editor, tag management, energy editing

## V3

- External library ingestion: Spotify, SoundCloud, Serato metadata, CSV imports

---

# Key Principle

**Remember:** Preset curves are temporary scaffolding.

The real product is:

**visual curve → energy targets → set generator**

The generator engine being built now is the foundation of the entire system.
