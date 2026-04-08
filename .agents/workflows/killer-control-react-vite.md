---
description: KILLER-CONTROL-REACT-VITE-FIREBASE-CODE-SAFETY
---

RULE NAME: KILLER-CONTROL-REACT-VITE-FIREBASE-CODE-SAFETY

This workspace belongs to the React + Vite + Firebase project “Killer Control”.
Apply these code-safety rules in every task without exception.

1) STACK LOCK
- This project is React + Vite and must remain React + Vite only.
- Do NOT introduce Next.js, Remix, Nuxt, server components, server actions, pages router, app router, or any framework-specific patterns outside the current stack.
- Do NOT replace the current routing, auth architecture, or build system unless explicitly requested.
- Do NOT migrate JavaScript to TypeScript, or TypeScript to JavaScript, unless explicitly requested.
- Do NOT introduce new state libraries, form libraries, or UI frameworks unless explicitly requested.

2) MINIMAL CHANGE PRINCIPLE
- Change only the files strictly necessary to complete the requested task.
- Do NOT refactor unrelated code.
- Do NOT rename files, folders, exports, imports, routes, components, hooks, translation keys, or Firebase collections unless absolutely required by the requested task.
- Do NOT rewrite working code “for cleanliness” or “best practices” if it is outside scope.
- Preserve current behavior unless the request explicitly asks to change that behavior.

3) SAFE REACT IMPLEMENTATION
- Do NOT create render loops, effect loops, or unnecessary rerenders.
- Do NOT move logic across components unless required.
- Keep hooks valid and stable: never call hooks conditionally, inside loops, or outside React components/custom hooks.
- When editing useEffect, verify dependencies carefully and avoid introducing navigation loops, duplicated fetches, or auth race conditions.
- Do NOT add optimistic assumptions in UI state that can desync from Firebase or backend state.

4) SAFE ROUTING
- Do NOT change route paths, route guards, navigation flow, redirects, or default landing pages unless explicitly requested.
- Do NOT redirect users “blindly” after login, signup, save, or onboarding.
- Resolve the real auth/profile/dashboard state first, then navigate.
- Avoid redirect loops between login, dashboard, onboarding, and home.
- Protected routes must wait until auth/session loading has finished before redirecting. Auth loading and protected-route patterns should block redirects until the auth state is known. [web:57][web:64][web:58]

5) FIREBASE SAFETY
- Treat Firebase configuration, auth, Firestore reads/writes, storage paths, and cloud functions as sensitive code.
- Do NOT replace valid Firebase config with placeholders.
- Do NOT hardcode secrets, API keys, tokens, or environment-specific credentials into source files.
- In Vite, client-exposed env variables must use import.meta.env and the VITE_ prefix; do not use process.env in client code. Vite exposes client env variables through import.meta.env and only variables prefixed with VITE_ are available to browser code. [web:54][web:56][web:65]
- If env vars are required, reference the existing env structure instead of inventing new names unless explicitly requested.
- If Firebase auth providers or domains are involved, do not alter them casually.
- Do NOT modify Firestore collection names, document shapes, or field names without checking existing usage across the app first.

6) AUTH SAFETY
- Assume authentication state is asynchronous.
- Never rely only on immediate auth.currentUser checks at app startup to decide redirects.
- When touching auth flows, respect the existing auth listener/provider architecture.
- If the app uses onAuthStateChanged or an equivalent session listener, preserve that pattern and ensure loading state is handled before rendering or redirecting. Auth listeners emit asynchronously and require an initialization/loading phase before the app decides what to render. [web:57][web:63]
- Do NOT break session persistence on refresh.
- Do NOT log out users implicitly as a side effect of unrelated changes.
- Do NOT touch provider config, redirect URIs, or auth domain settings unless explicitly requested.

7) DATA SAFETY
- Never delete, reset, overwrite, or migrate user data unless the task explicitly requires it.
- For updates, prefer additive and backward-compatible changes.
- When changing forms or save handlers, preserve existing validation, field mapping, and submit behavior unless explicitly requested.
- Do NOT change database write locations unless explicitly requested.
- If a data model change is necessary, warn clearly before applying it.

8) BUILD AND RUNTIME SAFETY
- Do NOT introduce code that breaks Vite build, dev server, or import resolution.
- Preserve existing alias strategy, file extensions, and module boundaries unless explicitly requested.
- Do NOT add Node-only APIs to client code.
- Do NOT add browser-incompatible server utilities into React components.
- Avoid changes that can cause blank screens, failed hydration-like behavior, unresolved imports, or runtime crashes. Misconfigured Firebase initialization and invalid env usage can cause startup failures and blank-app behavior in Vite apps. [cite:4][web:54]

9) DEBUGGING DISCIPLINE
- When fixing a bug, identify the root cause and patch the smallest safe area.
- Do NOT apply broad rewrites when a focused fix is enough.
- Preserve existing logs unless they expose secrets.
- If adding temporary debug code, remove it before finishing unless explicitly requested.
- Do NOT silence errors without solving the underlying issue.

10) CODE STYLE DISCIPLINE
- Follow the existing project conventions.
- Match current file structure, naming conventions, component patterns, and Firebase usage style.
- Reuse existing helpers, hooks, contexts, services, and utilities before creating new ones.
- Do NOT duplicate logic that already exists in the project.
- If a shared provider, auth context, or route wrapper already exists, extend it carefully instead of creating a parallel implementation.

11) PRE-COMMIT SELF-CHECK
Before finalizing any task, verify all of the following:
- Only necessary files were changed.
- No routes were altered unintentionally.
- No auth flow was broken.
- No Firebase config or env handling was corrupted.
- No secrets were hardcoded.
- No existing user data paths were changed unintentionally.
- No translation or design rules were violated.
- The app remains compatible with React + Vite.
- The task was solved with the minimum safe change possible.

If any check fails, revise the implementation before finalizing.