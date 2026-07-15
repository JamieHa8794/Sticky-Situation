import { prisma } from '../server/lib/prisma';
import { Task } from '../shared/types/tasks';

const seedTasks: Task[] = [
  {
    id: 'seed-1',
    title: 'Initialize React project',
    description: 'Scaffold the application with Vite, React, and TypeScript.',
    status: 'done',
    priority: 'high',
    dueDate: '2026-06-22',
    tags: ['setup', 'vite', 'react'],
  },
  {
    id: 'seed-2',
    title: 'Build the Kanban board',
    description:
      'Render the board, workflow columns, task cards, and empty states.',
    status: 'done',
    priority: 'high',
    dueDate: '2026-06-24',
    tags: ['react', 'components', 'ui'],
  },
  {
    id: 'seed-3',
    title: 'Implement local task CRUD',
    description:
      'Support creating, editing, deleting, and changing the status of tasks.',
    status: 'done',
    priority: 'high',
    dueDate: '2026-06-27',
    tags: ['crud', 'state', 'react'],
  },
  {
    id: 'seed-4',
    title: 'Add local persistence',
    description:
      'Persist task changes in localStorage and load seed data on first use.',
    status: 'done',
    priority: 'medium',
    dueDate: '2026-06-29',
    tags: ['local-storage', 'persistence'],
  },
  {
    id: 'seed-5',
    title: 'Refactor task state with useReducer',
    description:
      'Centralize task state transitions in a typed reducer with explicit actions.',
    status: 'done',
    priority: 'medium',
    dueDate: '2026-07-01',
    tags: ['architecture', 'react', 'reducer'],
  },
  {
    id: 'seed-6',
    title: 'Expand the task model',
    description:
      'Add priority, due date, and tag fields to tasks and editing workflows.',
    status: 'done',
    priority: 'medium',
    dueDate: '',
    tags: ['typescript', 'data-model'],
  },
  {
    id: 'seed-7',
    title: 'Add task discovery controls',
    description:
      'Implement search, priority filtering, status filtering, and sorting.',
    status: 'done',
    priority: 'medium',
    dueDate: '2026-07-03',
    tags: ['search', 'filters', 'sorting'],
  },
  {
    id: 'seed-8',
    title: 'Build task action modals',
    description:
      'Move create and edit flows into a modal and add delete confirmation.',
    status: 'done',
    priority: 'medium',
    dueDate: '2026-07-05',
    tags: ['modal', 'ux', 'forms'],
  },
  {
    id: 'seed-9',
    title: 'Implement drag and drop',
    description:
      'Allow tasks to move between workflow columns with visual feedback.',
    status: 'done',
    priority: 'high',
    dueDate: '2026-07-07',
    tags: ['drag-drop', 'interaction'],
  },
  {
    id: 'seed-10',
    title: 'Create the design token system',
    description:
      'Centralize colors, spacing, typography, radii, shadows, and button states.',
    status: 'done',
    priority: 'medium',
    dueDate: '2026-07-09',
    tags: ['design-system', 'css', 'tokens'],
  },
  {
    id: 'seed-11',
    title: 'Redesign the Kanban interface',
    description:
      'Apply the design system to the page, toolbar, columns, cards, forms, and modals.',
    status: 'done',
    priority: 'high',
    dueDate: '2026-07-11',
    tags: ['ui', 'css', 'portfolio'],
  },
  {
    id: 'seed-12',
    title: 'Create the frontend task service',
    description:
      'Move task persistence and data access behind an asynchronous service layer.',
    status: 'done',
    priority: 'high',
    dueDate: '2026-07-12',
    tags: ['architecture', 'services', 'frontend'],
  },
  {
    id: 'seed-13',
    title: 'Set up the Express backend',
    description:
      'Create the TypeScript backend project with Express and a health-check route.',
    status: 'done',
    priority: 'high',
    dueDate: '2026-07-13',
    tags: ['express', 'typescript', 'backend'],
  },
  {
    id: 'seed-14',
    title: 'Add backend controllers and services',
    description:
      'Separate HTTP handling, task operations, and persistence responsibilities.',
    status: 'done',
    priority: 'high',
    dueDate: '2026-07-14',
    tags: ['controllers', 'services', 'architecture'],
  },
  {
    id: 'seed-15',
    title: 'Implement the task REST API',
    description:
      'Add backend endpoints for reading, creating, updating, and deleting tasks.',
    status: 'done',
    priority: 'high',
    dueDate: '2026-07-15',
    tags: ['rest-api', 'crud', 'backend'],
  },
  {
    id: 'seed-16',
    title: 'Integrate PostgreSQL and Prisma',
    description:
      'Persist tasks in PostgreSQL through Prisma and connect all frontend interactions.',
    status: 'done',
    priority: 'high',
    dueDate: '2026-07-17',
    tags: ['postgresql', 'prisma', 'database'],
  },
  {
    id: 'seed-17',
    title: 'Add database seed data',
    description:
      'Create repeatable development seed data that reflects the project roadmap.',
    status: 'done',
    priority: 'medium',
    dueDate: '',
    tags: ['database', 'seed', 'development'],
  },
  {
    id: 'seed-18',
    title: 'Document and publish V1',
    description:
      'Add a README, screenshots, setup instructions, architecture notes, and a V2 roadmap.',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2026-07-19',
    tags: ['readme', 'github', 'portfolio'],
  },
  {
    id: 'seed-19',
    title: 'Add task comments',
    description: 'Allow users to discuss work directly within a task.',
    status: 'todo',
    priority: 'low',
    dueDate: '',
    tags: ['collaboration', 'feature'],
  },
  {
    id: 'seed-20',
    title: 'Create archived tasks view',
    description: 'Allow users to browse and restore completed tasks.',
    status: 'todo',
    priority: 'low',
    dueDate: '',
    tags: ['workflow', 'feature'],
  },
  {
    id: 'seed-21',
    title: 'Add API loading and error states',
    description:
      'Represent request loading, failures, and recovery behavior in the frontend.',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-07-21',
    tags: ['api', 'ux', 'error-handling'],
  },
  {
    id: 'seed-22',
    title: 'Create the board data model',
    description:
      'Add a Board model with editable title and description and relate tasks to boards.',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-07-23',
    tags: ['boards', 'prisma', 'data-model'],
  },
  {
    id: 'seed-23',
    title: 'Implement the board REST API',
    description:
      'Add endpoints for creating, reading, updating, and deleting boards.',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-07-25',
    tags: ['boards', 'rest-api', 'backend'],
  },
  {
    id: 'seed-24',
    title: 'Scope tasks to their board',
    description:
      'Update task queries and mutations so each operation belongs to a specific board.',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-07-27',
    tags: ['boards', 'tasks', 'database'],
  },
  {
    id: 'seed-25',
    title: 'Add application routing',
    description:
      'Introduce React Router and create routes for the boards list and individual boards.',
    status: 'todo',
    priority: 'high',
    dueDate: '',
    tags: ['routing', 'react', 'navigation'],
  },
  {
    id: 'seed-26',
    title: 'Build the Boards page',
    description:
      'Display available boards and support creating, opening, renaming, and deleting them.',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-07-30',
    tags: ['boards', 'page', 'frontend'],
  },
  {
    id: 'seed-27',
    title: 'Build the Board details page',
    description:
      'Load the selected board, render its tasks, and display its editable title and description.',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-08-01',
    tags: ['boards', 'routing', 'frontend'],
  },
  {
    id: 'seed-28',
    title: 'Add user authentication',
    description:
      'Implement account registration, login, logout, and secure password handling.',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-08-03',
    tags: ['auth', 'users', 'security'],
  },
  {
    id: 'seed-29',
    title: 'Protect routes and board data',
    description:
      'Require authentication and ensure users can access only boards they own.',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-08-04',
    tags: ['authorization', 'security', 'boards'],
  },
  {
    id: 'seed-30',
    title: 'Add task assignees',
    description:
      'Allow authenticated users to assign board tasks and display assignee information.',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    tags: ['assignees', 'users', 'tasks'],
  },
  {
    id: 'seed-31',
    title: 'Add automated test coverage',
    description:
      'Test critical frontend behavior, backend services, API endpoints, and authorization rules.',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-08-06',
    tags: ['testing', 'vitest', 'api'],
  },
  {
    id: 'seed-32',
    title: 'Deploy the finished application',
    description:
      'Deploy the frontend, backend, and database and update the portfolio documentation.',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-08-08',
    tags: ['deployment', 'portfolio', 'release'],
  },
];

async function main(): Promise<void> {
  for (const task of seedTasks) {
    await prisma.task.upsert({
      where: {
        id: task.id,
      },
      update: task,
      create: task,
    });
  }
}

main()
  .then(() => {
    console.log('Database seeded successfully.');
  })
  .catch((error) => {
    console.error('Database seeding failed:', error);
    process.exitCode = 1;
  });
