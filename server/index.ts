import express from 'express';
import cors from 'cors';

import {
  deleteTaskController,
  createTaskController,
  updateTaskController,
} from './controllers/taskController';

import {
  getBoardsController,
  getBoardController,
  createBoardController,
  getBoardTasksController,
} from './controllers/boardControllers';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);

app.use(express.json());

// Task routes

app.delete('/tasks/:taskId', deleteTaskController);

app.post('/tasks', createTaskController);

app.patch('/tasks/:taskId', updateTaskController);

// Board routes

app.get('/boards', getBoardsController);

app.get('/boards/:boardId', getBoardController);

app.post('/boards', createBoardController);

app.delete('/boards/:boardId', deleteTaskController);

app.patch('/boards/:boardId', updateTaskController);

app.get('/boards/:boardId/tasks', getBoardTasksController);

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is listening on Port: ${PORT}`);
});
