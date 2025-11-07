# Magic Super 8 Ball — ChatGPT App

A polished fortune-telling experience built with the OpenAI Apps SDK. Ask thoughtful questions, tune the energetic tone, and receive cinematic responses inspired by the classic Magic 8 Ball.

## Features

- **Premium UX:** Layered surfaces, deliberate spacing, and tasteful typography aligned with the Apps SDK design guidance.
- **Tone controls:** Quickly switch the orb's mood between positive, tentative, and grounded replies.
- **Persistent history:** The last dozen readings remain available for effortless recall.
- **Deterministic flair:** Identical questions yield the same response, keeping collaborative sessions consistent.

## Project structure

```text
src/
 ├─ app.ts            # ChatGPT App definition and UI layout
 ├─ responses.ts      # Curated catalogue of polished Magic 8 Ball replies
 └─ types/            # Lightweight type declarations for the Apps SDK components
```

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start a local preview:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Keep the codebase tidy:
   ```bash
   npm run lint
   ```

> ℹ️ Package versions are pinned to the early Apps SDK release. Upgrade cautiously and review the official changelog for breaking UI or manifest updates.
