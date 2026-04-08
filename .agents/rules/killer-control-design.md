---
trigger: always_on
---

# KILLER-CONTROL-DESIGN-AND-I18N-GUARD

## Purpose

Protect the existing Killer Control design and enforce strict multilingual quality across Spanish, Catalan, and English. Do not allow unsolicited UI changes or incorrect translation behavior. [cite:49][cite:24]

## Rules

- Do not modify the visual design unless the user explicitly asks for a design change.
- Do not add new sections, cards, banners, buttons, labels, icons, modals, decorations, effects, shadows, gradients, spacing changes, layout changes, or animations unless explicitly requested.
- Do not redesign existing components.
- Do not improve the UI proactively.
- Do not move blocks, change hierarchy, replace texts, or reinterpret screen structure unless explicitly requested.
- If the task is technical or functional, change only the minimum code required.

## Scope discipline

- Execute only what is explicitly requested.
- Do not infer extra features.
- Do not refactor unrelated files.
- Do not rename variables, components, routes, files, or translation keys unless strictly necessary for the requested task.
- If a requested change could affect UI, layout, or translations outside scope, stop and ask before proceeding.

## Language policy

- Killer Control supports exactly 3 interface languages: Spanish (`es`), Catalan (`ca`), and English (`en`). [cite:49]
- Always preserve the language selected by the user.
- Never auto-switch language.
- Never mix languages in the same screen, modal, component, validation message, or result.
- Every visible string must appear in the currently selected language only.
- All new UI text must go through the existing i18n system and must never be hardcoded.

## Translation quality

- Translate with native-level quality in Spanish, Catalan, and English.
- Do not translate literally when natural product wording requires adaptation.
- Respect product tone, UX context, and consistency across the entire app.
- Keep labels short, buttons clear, settings language consistent, and onboarding text natural.
- Place every translated string in the correct UI location and context.
- Do not truncate, duplicate, overflow, or misplace translated strings in the layout.
- When text length differs across languages, adapt implementation carefully without changing the design.

## Mandatory terminology

- In Killer Control, use the branded term `Killer` wherever the product terminology requires it. [cite:24]
- Do not replace the intended branded term with `Asesino`. [cite:24]

## Locked approved translations

Preserve these approved UI translations exactly unless the user explicitly asks to change them: [cite:30]

- `profile.personal_data` = `Perfil killer`
- `Profile.payments` = `Plan de suscripción`
- `profile.appearance` = `Apariencia`
- `Profile.manual` = `Guía del usuario`

## React i18n safety

- This project is React + Vite and must stay compatible with that stack. [cite:25]
- If a component uses translations, ensure the translation function is properly imported and initialized before use.
- Never leave raw fallback text in JSX on localized screens.
- Never hardcode a new visible string directly in JSX if the screen is translated.

## Final check

Before finishing any task, verify all of the following:

- No unintended visual changes were introduced.
- No extra UI elements were added.
- No approved translations were overwritten without permission.
- No text appears in the wrong language.
- No mixed-language UI remains.
- All new visible strings are connected to i18n.
- The selected language is preserved.
- The layout remains visually identical unless the user explicitly requested otherwise.
- The implementation solves only the requested task.