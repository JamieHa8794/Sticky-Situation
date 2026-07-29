import { Prisma } from '../generated/prisma/client';
import { prisma } from '../lib/prisma';
import type {
  Task,
  CreateTaskInput,
  TaskUpdates,
} from '../../shared/types/tasks';

export function createTask(newTask: CreateTaskInput): Promise<Task> {
  return prisma.task.create({ data: newTask });
}

export async function deleteTask(taskId: string): Promise<Task | void> {
  try {
    const deletedTask = await prisma.task.delete({ where: { id: taskId } });

    return deletedTask;
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2025'
    ) {
      return undefined;
    }
    throw e;
  }
}

export async function updateTask(
  taskId: string,
  updates: TaskUpdates,
): Promise<Task | undefined> {
  try {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: updates,
    });
    return updatedTask;
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2025'
    ) {
      return undefined;
    }
    throw e;
  }
}
