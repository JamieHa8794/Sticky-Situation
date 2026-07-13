import express from 'express';
import cors from 'cors';
import { Task } from '../shared/types/tasks';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);

app.use(express.json());

const tasks: Task[] = [
  {
    id: '1',
    title: 'Initialize React project',
    description: 'Scaffold the application with Vite and TypeScript.',
    status: 'done',
    priority: 'high',
    dueDate: '2026-06-25',
    tags: ['setup', 'vite', 'react'],
  },
  {
    id: '2',
    title: 'Implement task management',
    description: 'Support creating, editing, deleting, and updating tasks.',
    status: 'done',
    priority: 'high',
    dueDate: '2026-06-28',
    tags: ['crud', 'react'],
  },
  {
    id: '3',
    title: 'Build design system',
    description:
      'Introduce reusable design tokens, spacing, typography, and colors.',
    status: 'done',
    priority: 'medium',
    dueDate: '2026-07-08',
    tags: ['design', 'tokens', 'css'],
  },
  {
    id: '4',
    title: 'Redesign Kanban interface',
    description:
      'Apply the new visual language to the toolbar, board, cards, and modals.',
    status: 'done',
    priority: 'high',
    dueDate: '2026-07-10',
    tags: ['ui', 'ux'],
  },
  {
    id: '5',
    title: 'Implement drag and drop',
    description: 'Allow users to move tasks between workflow columns.',
    status: 'done',
    priority: 'high',
    dueDate: '2026-07-11',
    tags: ['drag-drop', 'feature'],
  },
  {
    id: '6',
    title: 'Create frontend service layer',
    description: 'Move persistence logic into a dedicated task service.',
    status: 'done',
    priority: 'medium',
    dueDate: '2026-07-12',
    tags: ['architecture', 'services'],
  },
  {
    id: '7',
    title: 'Set up Express backend',
    description:
      'Create the backend project and expose a health-check endpoint.',
    status: 'done',
    priority: 'high',
    dueDate: '2026-07-13',
    tags: ['express', 'backend'],
  },
  {
    id: '8',
    title: 'Implement GET /tasks',
    description:
      'Return all tasks from the backend and connect the frontend read path.',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2026-07-14',
    tags: ['api', 'backend'],
  },
  {
    id: '9',
    title: 'Migrate CRUD operations',
    description: 'Replace local persistence with backend API endpoints.',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-07-16',
    tags: ['api', 'crud'],
  },
  {
    id: '10',
    title: 'Support multiple boards',
    description:
      'Allow users to create, rename, and switch between Kanban boards.',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    tags: ['boards', 'feature'],
  },
  {
    id: '11',
    title: 'Implement POST /tasks',
    description: 'Create new tasks through the backend API.',
    status: 'todo',
    priority: 'high',
    dueDate: '',
    tags: ['api', 'backend'],
  },
  {
    id: '12',
    title: 'Implement PATCH /tasks/:id',
    description: 'Update existing tasks through the backend.',
    status: 'todo',
    priority: 'high',
    dueDate: '',
    tags: ['api', 'backend'],
  },
  {
    id: '13',
    title: 'Implement DELETE /tasks/:id',
    description: 'Remove tasks using the backend API.',
    status: 'todo',
    priority: 'high',
    dueDate: '',
    tags: ['api', 'backend'],
  },
  {
    id: '14',
    title: 'Remove localStorage persistence',
    description: 'Complete the migration to backend-driven data.',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    tags: ['architecture', 'cleanup'],
  },
  {
    id: '15',
    title: 'Add loading and error states',
    description:
      'Handle asynchronous requests gracefully throughout the application.',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    tags: ['ux', 'api'],
  },
  {
    id: '16',
    title: 'Create board management',
    description: 'Allow users to create, rename, and delete Kanban boards.',
    status: 'todo',
    priority: 'high',
    dueDate: '',
    tags: ['boards', 'feature'],
  },
  {
    id: '17',
    title: 'Add React Router',
    description:
      'Introduce routing and prepare for multiple application pages.',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    tags: ['routing', 'react'],
  },
  {
    id: '18',
    title: 'Build Boards page',
    description:
      'Display all available boards and allow users to switch between them.',
    status: 'todo',
    priority: 'high',
    dueDate: '',
    tags: ['boards', 'navigation'],
  },
  {
    id: '19',
    title: 'Implement board settings',
    description: 'Edit board title, description, and workflow configuration.',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    tags: ['boards', 'settings'],
  },
  {
    id: '20',
    title: 'Add user authentication',
    description: 'Allow users to securely sign in and manage their own boards.',
    status: 'todo',
    priority: 'high',
    dueDate: '',
    tags: ['auth', 'security'],
  },
  {
    id: '21',
    title: 'Integrate a database',
    description:
      'Persist boards and tasks using a real database instead of memory.',
    status: 'todo',
    priority: 'high',
    dueDate: '',
    tags: ['database', 'backend'],
  },
  {
    id: '22',
    title: 'Implement board sharing',
    description: 'Invite collaborators and support shared project boards.',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    tags: ['collaboration', 'feature'],
  },
  {
    id: '23',
    title: 'Add activity history',
    description:
      'Record task updates and display a chronological activity feed.',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    tags: ['history', 'feature'],
  },
  {
    id: '24',
    title: 'Support file attachments',
    description: 'Allow users to attach files to tasks.',
    status: 'todo',
    priority: 'low',
    dueDate: '',
    tags: ['attachments', 'feature'],
  },
  {
    id: '25',
    title: 'Build dashboard analytics',
    description: 'Visualize task completion and workflow metrics.',
    status: 'todo',
    priority: 'low',
    dueDate: '',
    tags: ['dashboard', 'analytics'],
  },
  {
    id: '26',
    title: 'Write component tests',
    description: 'Add unit and integration tests for key UI components.',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    tags: ['testing', 'vitest'],
  },
  {
    id: '27',
    title: 'Deploy the application',
    description:
      'Publish the frontend and backend for portfolio demonstrations.',
    status: 'todo',
    priority: 'high',
    dueDate: '',
    tags: ['deployment', 'portfolio'],
  },
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is listening on Port: ${PORT}`);
});
