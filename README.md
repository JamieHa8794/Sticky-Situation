# Sticky Situation | Kanban Board

A full-stack project management application built with React, TypeScript, FastAPI, SQLAlchemy, and PostgreSQL.

Sticky Situation supports multiple project boards, persistent task management, board customization, and drag-and-drop workflows through a full-stack REST API.

<img
  src="./screenshots/homepage.png"
  alt="Sticky Situation Homepage"
  width="800"
/>

---

## About This Project

Sticky Situation is a full-stack Kanban project management application designed around multiple customizable project boards.

Users can create and manage boards, customize board details and icons, and organize tasks through workflow columns. Tasks support priorities, due dates, tags, search, filtering, sorting, and drag-and-drop status updates.

The application uses a React and TypeScript frontend backed by a FastAPI REST API. Pydantic defines API schemas, while SQLAlchemy and PostgreSQL provide relational data modeling and persistence.

The project originally used an Express and TypeScript backend with Prisma. It was migrated to FastAPI, Pydantic, SQLAlchemy, and Alembic as the active backend and database tooling. The `v2.0.0` Git tag preserves the earlier Express/Prisma implementation.

The project emphasizes maintainable application architecture, separation of concerns, reusable UI patterns, and a consistent design system across the application.

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
- Uvicorn

### API Schemas and Validation

- Pydantic

### Database

- PostgreSQL
- SQLAlchemy

### Migrations

- Alembic

### Development Data

- Python/SQLAlchemy seed script

---

## Architecture

The application follows a layered architecture that separates UI concerns, data access, HTTP handling, business logic, and persistence.

```text
[ Frontend ]

React Components
        ↓
Frontend Service Layer

──────── HTTP / REST API ────────

[ Backend ]

FastAPI Routers
        ↓
Pydantic Request/Response Schemas
        ↓
Python Service Layer
        ↓
SQLAlchemy
        ↓
PostgreSQL
```

---

## Key Technical Decisions

### Frontend Service Layer

Frontend data access is abstracted behind dedicated service functions rather than coupling API requests directly to React components.

The application originally used local persistence during early development. Abstracting persistence behind a service layer allowed the application to later migrate to a REST API without requiring significant changes throughout the component layer.

### Layered Backend Architecture

The FastAPI backend separates routers, Pydantic schemas, and Python service functions.

FastAPI routers define API endpoints, Pydantic schemas validate request and response data, and services contain application and persistence logic through SQLAlchemy. This separation keeps responsibilities clear while preserving the project’s layered architecture.

### Relational Board and Task Modeling

Boards and tasks are modeled as related resources in PostgreSQL rather than treating tasks as a single global collection.

Each task belongs to a board, allowing task operations to be scoped to the appropriate project while providing a foundation for additional relationships such as users, ownership, and task assignments.

### URL-Driven Board Navigation

React Router is used to represent application navigation and board selection through URLs.

Individual boards are identified through route parameters, allowing board pages and editing flows to derive the active board from the URL rather than maintaining duplicate navigation state inside the application.

### PostgreSQL + SQLAlchemy

PostgreSQL serves as the application's primary data store, with SQLAlchemy providing relational modeling and database access. Alembic manages schema migrations.

### Reusable Design System

The application's visual language is built around centralized design tokens for colors, typography, spacing, borders, shadows, and interactive states.

Reusable styling patterns are applied across buttons, inputs, icons, cards, modals, navigation, and other interface elements to maintain consistency as the application grows.

---

## Current Features

### Board Management

- Create multiple project boards
- Edit board titles and descriptions
- Delete boards
- Select and persist board icons
- Display task counts for each board
- Navigate between individual project boards

### Task Management

- Create, edit, and delete tasks
- Drag and drop tasks between workflow columns
- Track task priority and due dates
- Organize tasks with tags
- Persist task changes to PostgreSQL
- Scope tasks to their associated board

### Task Discovery

- Search tasks
- Filter tasks by status
- Filter tasks by priority
- Sort tasks

### Navigation

- Application homepage
- Boards overview page
- Individual board pages
- URL-driven board navigation with React Router
- Global application navigation

### Full-Stack Functionality

- FastAPI REST API with layered routers, schemas, and services
- PostgreSQL persistence
- SQLAlchemy database access
- Relational board and task data
- Alembic database migrations
- Seeded development data

### User Experience

- Custom design system with reusable CSS tokens
- Consistent button, input, card, and modal patterns
- Board icon customization
- Drag-and-drop visual feedback
- Confirmation workflows for destructive actions
- Cohesive navigation, homepage, boards, and Kanban interfaces

---

## Screenshots

### Homepage

<img
  src="./screenshots/homepage.png"
  alt="Sticky Situation Homepage"
  width="800"
/>

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

### Ownership & Collaboration

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
- Prepare the application for public portfolio demonstrations
