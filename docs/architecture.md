# SaaS Dashboard Architecture Guide

## Overview

This project follows a **feature-driven**, **scalable**, and **maintainable** architecture using:

* Next.js (App Router)
* React
* Redux Toolkit
* Tailwind CSS
* Sonner
* JavaScript (.jsx)
* REST API (Next.js Route Handlers)

The goal is to keep every layer responsible for only one thing.

---

# Project Structure

```text
src/
│
├── app/
│   ├── api/
│   ├── dashboard/
│   └── components/
│       └── ui/
│
├── components/
│   ├── teams/
│   ├── projects/
│   ├── users/
│   └── ...
│
├── redux/
│   ├── slices/
│   └── store.js
│
├── services/
│
├── hooks/
│
├── lib/
│
├── utils/
│
├── data/
│
└── styles/
```

---

# Architecture Flow

```text
User
 │
 ▼
UI Component
 │
 ▼
Page
 │
 ▼
Redux Async Thunk
 │
 ▼
Service
 │
 ▼
API Route
 │
 ▼
File Storage / Database
```

Each layer has a single responsibility.

---

# Responsibilities

## 1. UI Components

Location

```text
src/components/
```

Responsibilities

* Display data
* Render forms
* Render tables
* Render cards
* Render dialogs
* Receive props
* Call callbacks

Should NOT

* Fetch APIs
* Dispatch Redux
* Show business logic

Example

```jsx
<TeamForm
    initialValues={team}
    onSubmit={handleSubmit}
/>
```

---

## 2. Pages

Location

```text
src/app/dashboard/
```

Responsibilities

* Connect UI with Redux
* Handle navigation
* Handle submit events
* Call reusable helpers

Example

```jsx
const handleSubmit = async (values) => {
    await handleAsyncAction(
        dispatch,
        addTeam,
        values,
        {
            successMessage: "Team created successfully."
        }
    );
};
```

---

## 3. Redux

Location

```text
src/redux/slices/
```

Responsibilities

* Global state
* Async thunks
* Loading
* Error state
* CRUD reducers

Should NOT

* Navigate
* Show toasts
* Access browser APIs

---

## 4. Services

Location

```text
src/services/
```

Responsibilities

* API communication only

Example

```jsx
export const getTeams = () =>
    apiClient.get("/api/teams");
```

Should NOT

* Update Redux
* Show notifications
* Navigate

---

## 5. API Routes

Location

```text
src/app/api/
```

Responsibilities

* Validate requests
* Read data
* Write data
* Return responses

Should NOT

* Know about React
* Know about Redux

---

## 6. lib/

Shared reusable code.

Current libraries

```text
apiClient.js
apiResponse.js
fileStorage.js
handleAsyncAction.js
idGenerator.js
```

These files should remain framework-independent whenever possible.

---

# API Response Format

Every endpoint should return the same response structure.

Success

```json
{
    "success": true,
    "message": "Team created successfully.",
    "data": {}
}
```

Error

```json
{
    "success": false,
    "message": "Team already exists."
}
```

---

# Service Pattern

Every service should look similar.

```jsx
import apiClient from "@/lib/apiClient";

const API_URL = "/api/teams";

export const getTeams = () =>
    apiClient.get(API_URL);

export const getTeam = (id) =>
    apiClient.get(`${API_URL}/${id}`);

export const createTeam = (data) =>
    apiClient.post(API_URL, data);

export const updateTeam = (id, data) =>
    apiClient.put(`${API_URL}/${id}`, data);

export const deleteTeam = (id) =>
    apiClient.delete(`${API_URL}/${id}`);
```

---

# Redux Pattern

Every slice should contain

* Initial state
* Async thunks
* Reducers
* Extra reducers

Example

```text
fetchTeams
fetchTeam
addTeam
editTeam
removeTeam
```

---

# Form Pattern

Forms should be reusable.

Example

```jsx
<TeamForm
    initialValues={team}
    onSubmit={handleSubmit}
/>
```

The form should only collect values.

It should NOT

* Dispatch Redux
* Call APIs
* Navigate

---

# Toast Notifications

This project uses **Sonner**.

Toast notifications should be shown from

* Pages
* Shared helper (`handleAsyncAction.js`)

Never from

* Redux slices
* Services
* API routes

---

# Naming Conventions

Folders

```text
teams
projects
users
tasks
```

Files

```text
teamSlice.js
teamService.js
TeamForm.jsx
TeamCard.jsx
TeamStats.jsx
```

Components

Use PascalCase

```text
TeamCard
UserTable
ProjectForm
```

Functions

Use camelCase

```text
getTeams
createTeam
deleteProject
updateUser
```

Constants

Use UPPER_SNAKE_CASE

```text
API_URL
DEFAULT_PAGE_SIZE
MAX_UPLOAD_SIZE
```

---

# Adding a New Module

Whenever adding a new module (Departments, Clients, Tasks, etc.), follow this order:

1. Create JSON data (or database model).
2. Create API routes.
3. Create a service.
4. Create a Redux slice.
5. Build reusable components.
6. Build pages.
7. Connect routing.
8. Test CRUD operations.

Following this sequence keeps every module consistent.

---

# Future Improvements

As the application grows, consider introducing:

* Authentication middleware
* Role-based permissions
* Form validation library (React Hook Form + Zod)
* Centralized constants
* Shared validators
* Environment configuration
* Database (PostgreSQL/MySQL)
* ORM (Prisma)
* Unit and integration tests
* Logging and monitoring
* Internationalization (i18n)

These can be added incrementally without changing the overall architecture because the project already separates concerns between UI, state management, services, APIs, and data storage.
