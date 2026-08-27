# MusicPlayer Architecture

## Overview

MusicPlayer uses a feature-oriented React architecture. Application behavior is
organized by feature, while code shared by multiple features lives under
`shared`.

The project favors:

- React hooks as UI controllers.
- Plain functions for API and storage integrations.
- TypeScript interfaces for domain models.
- Small presentation-focused components.
- Dependencies that point from the UI toward application, domain, and
  infrastructure boundaries.

The project does not use controller classes or a global state library. Hooks
provide enough state management and orchestration for the current application.

## Source structure

```text
src/
├── app/
│   └── App.tsx
├── layout/
│   └── Footer.tsx
├── modules/
│   ├── search/
│   │   ├── application/
│   │   │   └── useSongSearch.ts
│   │   ├── domain/
│   │   │   └── types.ts
│   │   ├── infrastructure/
│   │   │   ├── artistApi.ts
│   │   │   ├── lyricsApi.ts
│   │   │   └── youtubeApi.ts
│   │   └── ui/
│   │       ├── components/
│   │       └── screens/
│   │           └── SearchScreen.tsx
│   └── favorites/
│       ├── application/
│       │   └── useFavorites.ts
│       ├── domain/
│       │   └── types.ts
│       ├── infrastructure/
│       │   └── favoritesStorage.ts
│       └── ui/
│           ├── components/
│           └── screens/
│               └── FavoriteSongScreen.tsx
├── shared/
│   ├── api/
│   │   └── httpClient.ts
│   └── ui/
│       ├── Loader.tsx
│       └── Message.tsx
├── images/
├── css/
└── index.tsx
```

## Layer responsibilities

### Domain

The domain layer defines the data used by a feature. It must not import React,
browser APIs, storage implementations, or UI components.

Examples:

- `SongSearchData`
- `Artist`
- `LyricResponse`
- `YouTubeSearchResponse`
- `FavoriteSong`

### Application

The application layer coordinates feature behavior. In this project, custom
hooks act as controllers.

`useSongSearch` owns:

- Search state.
- Loading state.
- Coordination of artist, lyrics, and YouTube requests.
- Selection of a previously saved song.
- Construction of the current complete song result.

`useFavorites` owns:

- The favorites collection.
- Adding and deleting favorites.
- Synchronization with persistent storage.

Hooks may call infrastructure functions, but UI components should not contain
API or storage implementation details.

### Infrastructure

The infrastructure layer communicates with systems outside the feature.

Examples:

- TheAudioDB artist search.
- Lyrics.ovh song search.
- YouTube Data API search.
- Browser `localStorage` persistence.

Infrastructure modules translate feature inputs into external requests. API
URLs and storage keys should remain here instead of being repeated in hooks or
components.

### UI

The UI layer contains screens and components.

- Screens compose components for a route or feature view.
- Components render data and communicate user intent through callbacks.
- Components should not call external APIs or access `localStorage` directly.

### App and layout

`app/App.tsx` is the composition root. It connects feature hooks, configures
routes, and passes data and actions into feature screens.

Layout components are application-wide visual elements that do not belong to a
single feature.

### Shared

Code belongs in `shared` only when multiple features can use it without taking
on a feature-specific dependency.

Current examples are the HTTP client, loading indicator, and message component.

## Dependency direction

```text
App
 ├── Search UI ──────> useSongSearch ──────> API infrastructure
 │                         │                       │
 │                         └──────> Search domain <┘
 │
 └── Favorites UI ──> useFavorites ────────> Storage infrastructure
                           │                       │
                           └────> Favorites domain <┘

Infrastructure ─────> shared HTTP utilities
UI ─────────────────> shared UI components
```

Domain code must not depend on application, infrastructure, or UI code.

## Search flow

```text
SongForm
   ↓ onSearch
SearchScreen
   ↓
useSongSearch.searchSong
   ├── searchArtist
   ├── searchLyrics
   └── searchYouTube
          ↓
   Search state updates
          ↓
SongDetails renders the result
```

## Favorites flow

```text
Current search result
   ↓ addFavorite
useFavorites
   ↓
favoritesStorage
   ↓
localStorage

FavoritesCarousel
   ├── onSelect → favorite route and selected song
   └── onDelete → useFavorites.deleteFavorite
```

## File placement rules

When adding code, use the following questions:

1. Is it specific to search or favorites? Put it inside that module.
2. Is it a domain model with no framework dependency? Put it in `domain`.
3. Does it coordinate state or feature actions? Put it in `application`.
4. Does it communicate with an API, storage, or another external system? Put it
   in `infrastructure`.
5. Does it render a feature? Put it in `ui/components` or `ui/screens`.
6. Is it genuinely reusable across features? Put it in `shared`.
7. Does it connect routes and features? Put it in `app`.

Avoid moving code into `shared` preemptively. A feature should own its code
until another feature has a real reason to reuse it.

## Adding a new feature

Start with only the directories the feature needs:

```text
src/modules/new-feature/
├── domain/
├── application/
├── infrastructure/
└── ui/
    ├── components/
    └── screens/
```

Recommended order:

1. Define domain types.
2. Implement external integrations as plain infrastructure functions.
3. Create a controller hook for state and orchestration.
4. Build presentation components and screens.
5. Connect the feature in `app/App.tsx`.
6. Add tests at the appropriate boundaries.

Do not create empty layers merely to match the directory template.

## State-management guidance

Continue using local state and custom hooks while state remains owned by a
small number of related screens.

Consider React Context when several distant components need the same feature
state. Consider a dedicated state library only when state transitions and
cross-feature coordination become difficult to understand through hooks and
context.

## Testing guidance

- Test domain rules as plain TypeScript functions.
- Test infrastructure with mocked network or storage boundaries.
- Test controller hooks for state transitions and error handling.
- Test screens and components from the user's perspective.
- Keep at least one application-level test covering the main search form.

Every pull request must continue to pass:

```bash
npm run typecheck
npm test -- --watchAll=false
npm run build
```

## Environment and deployment

The application reads the YouTube browser key from:

```text
REACT_APP_YOUTUBE_API_KEY
```

Local development loads it from the ignored `.env` file. GitHub Actions maps
the encrypted `YOUTUBE_API_KEY` repository secret to this environment variable
only during post-merge production builds.

Never commit `.env`, OAuth client-secret JSON files, `node_modules`, or generated
`build` output.
