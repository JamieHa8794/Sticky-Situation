# Sticky Situation | Kanban Board

A full-stack project management application built with React, TypeScript, Express, Prisma, and PostgreSQL.

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

The application uses a React and TypeScript frontend backed by an Express REST API, with Prisma and PostgreSQL providing relational data modeling and persistence.

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

- Node.js
- Express
- TypeScript

### Database

- PostgreSQL
- Prisma ORM

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

Express Routes
        ↓
Controllers
        ↓
Services
        ↓
Prisma
        ↓
PostgreSQL
```

---

## Key Technical Decisions

### Frontend Service Layer

Frontend data access is abstracted behind dedicated service functions rather than coupling API requests directly to React components.

The application originally used local persistence during early development. Abstracting persistence behind a service layer allowed the application to later migrate to a REST API without requiring significant changes throughout the component layer.

### Layered Backend Architecture

The Express backend separates routes, controllers, and services.

Routes define API endpoints, controllers handle HTTP-specific request and response concerns, and services contain application and persistence logic. This separation keeps responsibilities clear and makes the backend easier to maintain and extend as additional resources are introduced.

### Relational Board and Task Modeling

Boards and tasks are modeled as related resources in PostgreSQL rather than treating tasks as a single global collection.

Each task belongs to a board, allowing task operations to be scoped to the appropriate project while providing a foundation for additional relationships such as users, ownership, and task assignments.

### URL-Driven Board Navigation

React Router is used to represent application navigation and board selection through URLs.

Individual boards are identified through route parameters, allowing board pages and editing flows to derive the active board from the URL rather than maintaining duplicate navigation state inside the application.

### PostgreSQL + Prisma

PostgreSQL serves as the application's primary data store, with Prisma providing schema management, migrations, relational modeling, and type-safe database access.

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

- REST API for board and task operations
- Layered Express backend architecture
- PostgreSQL persistence
- Prisma ORM integration
- Relational board and task data
- Database migrations
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

### Clone the Repository

```bash
git clone <repository-url>
```

### Install Dependencies

```bash
cd sticky-situation
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL=your_database_url
```

### Run Database Migrations

```bash
npx prisma migrate dev
```

### Seed the Database

```bash
npx prisma db seed
```

### Start the Frontend

```bash
npm run dev
```

### Start the Backend

In a separate terminal:

```bash
npm run dev:server
```

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
