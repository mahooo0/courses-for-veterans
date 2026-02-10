# Requirements: Courses for Veterans Landing

**Defined:** 2026-02-10
**Core Value:** Готовый каркас Next.js приложения с FSD-архитектурой для быстрой верстки лендинга по Figma-макету

## v1 Requirements

### Project Setup

- [ ] **SETUP-01**: Next.js приложение инициализировано с App Router и TypeScript
- [ ] **SETUP-02**: pnpm настроен как пакетный менеджер
- [ ] **SETUP-03**: Tailw

### FSD Architecture

- [ ] **FSD-01**: Создана структура слоёв FSD (app, pages, widgets, features, entities, shared)
- [ ] **FSD-02**: Shared слой содержит базовые директории (ui, lib, config, assets)
- [ ] **FSD-03**: Главная страница создана как FSD page

### Landing Foundation

- [ ] **LAND-01**: Root layout с базовой HTML-структурой и metadata
- [ ] **LAND-02**: Главная страница рендерится без ошибок
- [ ] **LAND-03**: Базовые глобальные стили Tailwind подключены

## v2 Requirements

### Developer Experience

- **DX-01**: ESLint настроен с правилами для Next.js и FSD
- **DX-02**: Prettier настроен для единообразного форматирования
- **DX-03**: Path aliases настроены (@shared, @widgets, @features и т.д.)

### Content

- **CONT-01**: Секции лендинга по Figma-макету (Hero, About, Courses и т.д.)
- **CONT-02**: Адаптивная верстка (mobile/tablet/desktop)
- **CONT-03**: SEO-оптимизация (meta tags, Open Graph)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend / API | Лендинг статический |
| Авторизация | Не нужна на этом этапе |
| CMS / Админка | Контент захардкожен |
| Многостраничность | Одностраничный лендинг |
| Анимации | Добавим позже при необходимости |
| База данных | Статический сайт |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| SETUP-01 | Phase 1 | Pending |
| SETUP-02 | Phase 1 | Pending |
| SETUP-03 | Phase 1 | Pending |
| FSD-01 | Phase 2 | Pending |
| FSD-02 | Phase 2 | Pending |
| FSD-03 | Phase 2 | Pending |
| LAND-01 | Phase 3 | Pending |
| LAND-02 | Phase 3 | Pending |
| LAND-03 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 9 total
- Mapped to phases: 9
- Unmapped: 0

---
*Requirements defined: 2026-02-10*
*Last updated: 2026-02-10 after roadmap creation*
