# Roadmap: Courses for Veterans Landing

## Overview

Проект создаёт каркас Next.js приложения с FSD-архитектурой для лендинга курсов для ветеранов. Три фазы: инициализация проекта (toolchain), настройка FSD-структуры (архитектура), сборка основы лендинга (рабочая страница). По завершении -- готовый скелет, в который можно добавлять секции по Figma-макету.

## Phases

- [ ] **Phase 1: Project Initialization** - Next.js + pnpm + Tailwind: рабочий dev-сервер с пустым проектом
- [ ] **Phase 2: FSD Structure** - Полная структура слоёв FSD с shared-директориями
- [ ] **Phase 3: Landing Assembly** - Рабочая главная страница с layout, metadata и глобальными стилями

## Phase Details

### Phase 1: Project Initialization
**Goal**: Developer может запустить dev-сервер и увидеть дефолтную страницу Next.js
**Depends on**: Nothing (first phase)
**Requirements**: SETUP-01, SETUP-02, SETUP-03
**Success Criteria** (what must be TRUE):
  1. `pnpm dev` запускает dev-сервер без ошибок
  2. Браузер показывает страницу на localhost:3000
  3. TypeScript компилируется без ошибок (`pnpm build` проходит)
  4. Tailwind-классы применяются к элементам на странице
**Plans:** 1 plan

Plans:
- [ ] 01-01-PLAN.md -- Scaffold Next.js project with pnpm, Tailwind v4, and verify dev server + build

### Phase 2: FSD Structure
**Goal**: Проект организован по FSD-архитектуре со всеми слоями и shared-директориями
**Depends on**: Phase 1
**Requirements**: FSD-01, FSD-02, FSD-03
**Success Criteria** (what must be TRUE):
  1. Все 6 FSD-слоёв существуют как директории (app, pages, widgets, features, entities, shared)
  2. Shared-слой содержит поддиректории ui, lib, config, assets
  3. Главная страница вынесена в `src/pages/home` как FSD page-компонент
**Plans**: TBD

Plans:
- [ ] 02-01: Create FSD layer directories and shared sublayers

### Phase 3: Landing Assembly
**Goal**: Пользователь видит рабочую главную страницу лендинга с корректной HTML-структурой и стилями
**Depends on**: Phase 2
**Requirements**: LAND-01, LAND-02, LAND-03
**Success Criteria** (what must be TRUE):
  1. Root layout задаёт lang, viewport, базовую metadata (title, description)
  2. Главная страница рендерится в браузере без ошибок и warnings в консоли
  3. Глобальные стили Tailwind (base, components, utilities) подключены и работают
  4. Страница использует FSD home page компонент через root layout
**Plans**: TBD

Plans:
- [ ] 03-01: Build root layout and connect FSD home page with global styles

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Project Initialization | 0/1 | Not started | - |
| 2. FSD Structure | 0/1 | Not started | - |
| 3. Landing Assembly | 0/1 | Not started | - |
