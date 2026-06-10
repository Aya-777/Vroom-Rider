# Vroom-Rider Architecture

## Overview

Vroom-Rider is a React Native ride-hailing application built using a
Hybrid Clean Architecture with MVVM-style patterns inside a
feature-based modular structure. Zustand is used as the primary state
management solution.

------------------------------------------------------------------------

## Project Structure

### Root Layers

-   **core/** → Global systems (theme, storage, i18n, store, utils)
-   **modules/** → Feature-based modules (auth, home, profile, ride)
-   **navigation/** → App navigation structure (stacks, tabs, deep
    linking)
-   **shared/** → Reusable UI components
-   **assets/** → Fonts, images, SVGs
-   **types/** → Global TypeScript types

------------------------------------------------------------------------

## Feature Module Structure

Each feature follows a consistent structure:

-   screens/
-   components/
-   hooks/
-   services/
-   store/
-   styles/
-   types/
-   constants/
-   viewmodels/

------------------------------------------------------------------------

## State Management

### Global State (Zustand)

Used for: - Authentication state - Theme (light/dark) - Language
selection - Ride-related global state

### Local State

-   useState for UI-only logic (modals, inputs, toggles)

### Feature Stores

-   Optional Zustand stores inside features when needed

------------------------------------------------------------------------

## Architecture Pattern (MVVM Style)

-   **Screens** → UI composition only
-   **Hooks** → business logic & actions
-   **ViewModels** → data transformation & UI-ready state
-   **Components** → reusable UI building blocks
-   **Styles** → separated with dynamic theme support

------------------------------------------------------------------------

## Core Systems

### Theme System

-   ThemeProvider + useTheme hook
-   Zustand-based theme store
-   Light/Dark mode with design tokens:
    -   spacing
    -   radius
    -   typography
    -   shadows

### i18n System

-   i18next + react-native-localize
-   RTL support (Arabic/English)
-   Organized per module (auth/home/profile/ride)

### Storage System

-   MMKV (fast storage)
-   AsyncStorage fallback
-   SecureStorage for sensitive data

------------------------------------------------------------------------

## Navigation

-   RootNavigator controls app flow
-   AuthStack for authentication
-   MainTabs for main app
-   Nested Stacks:
    -   HomeStack
    -   ProfileStack
-   Deep linking enabled

------------------------------------------------------------------------

## Modules

### Auth

-   Login / Signup screens
-   PIN-based UI components
-   ViewModels for authentication logic

### Home

-   Service cards
-   Destination cards
-   Home header
-   ViewModel-driven data

### Profile

-   Profile cards & sections
-   Grid & list UI
-   Logout system

### Ride

-   Full ride flow:
    -   Select Ride
    -   Extra Details
    -   Ride Confirmation
    -   Driver Found
-   Vehicle selection system

------------------------------------------------------------------------

## Shared Components

-   Header
-   SearchBar
-   Linear Background
-   BottomSheetCard
-   Ride UI components

------------------------------------------------------------------------

## Conventions

-   Feature-first architecture
-   Strict MVVM separation
-   Zustand as primary global state tool
-   Reusable UI preferred over duplication
-   Theme-driven styling only
-   All new features must follow module structure

------------------------------------------------------------------------

## Rule of Extension

Any new feature or architectural decision MUST: - Follow module
structure - Respect MVVM separation - Use Zustand for global state only
when necessary - Be documented inside this architecture


---

## Coding Standards

### General Principles
- Write clean, readable, and self-documenting code.
- Prefer composition over duplication.
- Keep files small and focused on a single responsibility.
- Avoid business logic inside UI components.

---

### Naming Conventions
- **Components:** PascalCase (e.g. `LoginForm.tsx`)
- **Hooks:** camelCase starting with `use` (e.g. `useLoginViewModel`)
- **Files & folders:** kebab-case or feature-based grouping
- **Constants:** UPPER_SNAKE_CASE or grouped in `constants/`

---

### Architecture Rules (Strict MVVM)

#### Screens
- Only UI composition
- No API calls or business logic
- Should only call hooks/viewmodels

#### Hooks
- Handle actions and side effects
- Bridge between UI and state logic

#### ViewModels
- Transform raw data into UI-ready structures
- No direct UI rendering

#### Components
- Pure reusable UI
- Must be stateless when possible

---

### State Management Rules (Zustand)
- Use global stores ONLY for shared state
- Do NOT overuse global state for local UI
- Keep stores modular per domain (auth, ride, theme, etc.)
- Avoid mixing UI state with business state

---

### Styling Rules
- Use `createStyles(colors)` pattern
- No hardcoded colors
- Always use theme tokens (spacing, radius, typography)
- Support dark/light mode by default

---

### TypeScript Rules
- Always define explicit types for props and state
- Avoid `any` unless absolutely necessary
- Prefer interfaces for objects and types for unions

---

### Import Rules
- Group imports:
  1. React / RN imports
  2. Third-party libraries
  3. Internal modules
  4. Assets
- Avoid deep relative imports when possible

---

### Feature Rules
- Every feature must follow the module structure:
  screens / components / hooks / services / store / types / viewmodels
- No cross-feature direct imports (use shared layer if needed)

---

### Performance Rules
- Avoid unnecessary re-renders
- Memoize heavy components when needed
- Keep state minimal
