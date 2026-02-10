# Courses for Veterans — Landing Page

## What This Is

Одностраничный лендинг для образовательной платформы / курсов для ветеранов. Построен на Next.js с архитектурой Feature-Sliced Design (FSD) и стилизацией через Tailwind CSS. Дизайн берётся из готового Figma-макета и верстается поэтапно.

## Core Value

Готовый каркас Next.js приложения с чёткой FSD-архитектурой, в который можно быстро и предсказуемо добавлять секции лендинга по Figma-макету.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Next.js приложение инициализировано с App Router
- [ ] FSD-архитектура настроена (app, pages, widgets, features, entities, shared)
- [ ] Tailwind CSS подключён и настроен
- [ ] TypeScript сконфигурирован
- [ ] Базовая структура лендинга (layout, главная страница)
- [ ] ESLint + Prettier настроены
- [ ] pnpm как пакетный менеджер

### Out of Scope

- Бэкенд / API — лендинг статический
- Авторизация / регистрация — не нужна на этом этапе
- CMS / админка — контент захардкожен
- Многостраничность — одна страница
- Анимации / интерактив — добавим позже при необходимости

## Context

- Проект стартует с нуля (greenfield)
- Есть готовый Figma-макет — дизайн будет верстаться поэтапно
- Пользователь будет давать указания по каждой секции отдельно
- FSD (Feature-Sliced Design) — методология структурирования фронтенд-приложений по слоям: app → pages → widgets → features → entities → shared

## Constraints

- **Tech stack**: Next.js (App Router), TypeScript, Tailwind CSS, pnpm
- **Architecture**: Feature-Sliced Design (FSD)
- **Design source**: Figma — верстка строго по макету
- **Scope**: Только каркас приложения на первом этапе, без компонентов UI

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router | Современный стандарт Next.js, лучше для SSR/SSG | — Pending |
| FSD-архитектура | Предсказуемая структура, масштабируемость | — Pending |
| Tailwind CSS | Быстрая стилизация, хорошо сочетается с FSD | — Pending |
| pnpm | Быстрый, экономный по диску | — Pending |
| Figma → код поэтапно | Пользователь контролирует каждый шаг верстки | — Pending |

---
*Last updated: 2026-02-10 after initialization*
