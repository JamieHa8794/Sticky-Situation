# Sticky Situation | Kanban Board

A full-stack project management application built with React, TypeScript, FastAPI, SQLAlchemy, and PostgreSQL.

Sticky Situation supports multiple project boards, persistent task management, board customization, and drag-and-drop workflows through a REST API.

<img
  src="./screenshots/homepage.png"
  alt="Sticky Situation Homepage"
  width="800"
/>

---

## About This Project

Sticky Situation is organized around multiple customizable project boards, each with its own persistent set of tasks. Users can create and manage boards, customize board details and icons, and organize tasks across workflow columns with priorities, due dates, tags, search, filtering, sorting, and drag-and-drop status updates.

The application uses a React and TypeScript frontend backed by a FastAPI REST API. Pydantic defines API schemas, while SQLAlchemy and PostgreSQL provide relational data modeling and persistence.

The project originally used an Express and TypeScript backend with Prisma. It was later migrated to FastAPI, Pydantic, SQLAlchemy, and Alembic, while the `v2.0.0` Git tag preserves the earlier implementation.

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- CSS
- Lucide Icons

### Backend

- Python
- FastAPI
- Pydantic
- Uvicorn

### Database

- PostgreSQL
- SQLAlchemy
- Alembic

---

## Current Features

### Board Management

- Create, edit, and delete project boards
- Customize and persist board icons
- View task counts across boards

### Task Management

- Create, edit, and delete tasks
- Drag and drop tasks between workflow columns
- Track priorities, due dates, and tags
- Persist and scope tasks to their associated board

### Task Discovery

- Search tasks
- Filter by status and priority
- Sort tasks

### Navigation

- Homepage, boards overview, and individual board routes
- URL-driven navigation with React Router

### User Experience

- Custom design system with reusable CSS tokens
- Consistent buttons, inputs, cards, and modal patterns
- Drag-and-drop visual feedback
- Confirmation workflows for destructive actions

### Full-Stack Functionality

- FastAPI REST API with layered routers, schemas, and services
- Relational board and task persistence in PostgreSQL
- SQLAlchemy database access and Alembic migrations
- Seeded development data

---

## Screenshots

### Boards

<img
  src="./screenshots/boards.png"
  alt="Sticky Situation Boards Page"
  width="800"
/>

### Kanban Board

<img
  src="./screenshots/board-view.png"
  alt="Sticky Situation Kanban Board"
  width="800"
/>

### Drag and Drop

<img
  src="./screenshots/drag-and-drop.png"
  alt="Dragging a task between Kanban workflow columns"
  width="800"
/>

### Create / Edit Board

<img
  src="./screenshots/board-form.png"
  alt="Create or Edit Board"
  width="800"
/>

### Task Management

<img
  src="./screenshots/task-form.png"
  alt="Task Management"
  width="800"
/>

---

## Architecture

The application follows a layered architecture that separates UI concerns, data access, HTTP handling, business logic, and persistence. Pydantic defines and validates request and response schemas at the API boundary.

```text
[ Frontend ]

React Components
        ↓
Frontend Service Layer

──────── HTTP / REST API ────────

[ Backend ]

FastAPI Routers
        ↓
Service Layer
        ↓
SQLAlchemy
        ↓
PostgreSQL
```

---

## Key Technical Decisions

### Frontend Service Layer

React components use dedicated service functions to interact with application data rather than handling persistence or API requests directly. This separation also allowed the project to move from localStorage-based persistence to a REST API with minimal changes to the component layer.

### Backend Migration

The original Express/Prisma backend was migrated to FastAPI, SQLAlchemy, Pydantic, and Alembic while preserving the frontend API contract. The previous implementation is preserved by the `v2.0.0` Git tag.

### Backend Architecture

FastAPI routers handle HTTP concerns, Pydantic schemas define and validate API boundaries, and service functions handle application and persistence logic through SQLAlchemy.

### Relational Data Model

Boards and tasks are modeled as related PostgreSQL resources, with each task belonging to a parent board. This keeps board-specific task queries explicit and provides a relational foundation for future ownership and assignment features.

### Design System

Centralized CSS tokens and reusable styling patterns provide consistent typography, spacing, colors, interactive states, and component styling across the application.

---

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3.13
- uv
- PostgreSQL

### Clone the Repository

```bash
git clone https://github.com/JamieHa8794/Sticky-Situation.git
cd Sticky-Situation
```

### Install Frontend Dependencies

```bash
npm install
```

### Install Backend Dependencies

```bash
cd backend
uv sync
```

### Configure Environment Variables

From `backend/`, create `.env` from the example file and configure the PostgreSQL connection.

```bash
cp .env.example .env
```

Set `DATABASE_URL` in `backend/.env` to a running PostgreSQL database, for example:

```env
DATABASE_URL=postgresql+psycopg://USERNAME:PASSWORD@localhost:5432/DATABASE_NAME
```

Create the PostgreSQL database first if it does not already exist.

### Run Database Migrations

```bash
uv run alembic upgrade head
```

### Seed the Database

```bash
cd ..
npm run seed
```

### Start FastAPI

In a separate terminal, from the repository root:

```bash
npm run dev:server
```

FastAPI normally runs at `http://localhost:8000`. Interactive API documentation is available at `http://localhost:8000/docs`.

### Start React/Vite

```bash
npm run dev
```

React/Vite normally runs at `http://localhost:5173`. PostgreSQL must remain running while the application is in use.

---

## Planned Enhancements

### Authentication & Users

- User registration
- User login and logout
- Protected application routes
- User profiles and account settings

### Ownership & Task Assignment

- Associate boards with their owners
- Restrict board access based on authenticated users
- Assign tasks to users
- Display task assignees
- Filter tasks by assignee

### Reliability & User Experience

- Application-wide loading states
- API error handling and recovery states
- Form validation
- Accessibility improvements
- Responsive layouts

### Testing

- Frontend component and integration tests
- Backend service tests
- REST API integration tests
- Authorization and ownership tests

### Deployment

- Deploy the frontend and backend
- Host the PostgreSQL database
- Configure production environment variables
