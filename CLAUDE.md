# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Mercedes-Benz landing page built with React 19, featuring a floating visual indicator widget.

## Development Commands

```bash
# Start development server (localhost:3000 with hot reload)
npm start

# Run tests in watch mode
npm test

# Production build (outputs to ./build)
npm run build
```

## Architecture

### Component Hierarchy and Data Flow

```
App.js (Root Component)
├─ Renders: Full Mercedes landing page with 10+ sections
├─ State: visibleText (viewport text capture), scrollTimeoutRef (debounce)
├─ Scroll Listener: Captures all visible text in viewport every 300ms
└─ Renders: <FloatingWidget />
    └─ Renders: Chat bubble + animated orb (bottom-right, z-index: 5000)
    └─ Pure presentational component with no interactivity
```

### Key Architectural Patterns

**Viewport Text Tracking**: `App.js:41-57` implements a scroll event listener that captures all visible text elements (`p, h1, h2, h3, h4, h5, h6, span, div`) in the viewport. This is debounced with a 300ms timeout and stored in `visibleText` state. This data was intended to provide context for an AI assistant (feature removed).

**Component Isolation**: Each component manages its own state. No global state management (Redux/Context) is used.

## Styling Architecture

- **No CSS frameworks**: All styling is hand-written CSS with custom animations
- **Theme**: Dark mode (`#050509` base) with Mercedes luxury aesthetic
- **Key patterns**:
  - Glass morphism effects (backdrop-filter blur) on navbar and chat bubble
  - Full-height sections with parallax-ready background images
  - Responsive breakpoints: 1024px (tablet), 768px (mobile)
  - Button system: 4 variants (primary, outline, ghost, link) in `App.css:78-120`

## Product Data Structure

Car models are defined in `App.js:60-91` as an array of objects:

```javascript
{
  name: string,
  price: string,
  description: string,
  image: string (external URL)
}
```

**Note**: This data exists but is not currently rendered in the UI. Future work may involve displaying these in a models section.

## Current Implementation Status

**Functional**:
- Landing page with 10 narrative sections
- Scroll tracking for viewport content capture
- Floating widget with animated orb (non-interactive visual element)

## Testing

Uses React Testing Library with Jest. Test files follow the `*.test.js` pattern. Basic smoke test exists in `App.test.js` (renders learn react link).

## Build Configuration

Standard Create React App setup (react-scripts 5.0.1). ESLint config extends `react-app` and `react-app/jest`. No custom webpack configuration has been ejected.
