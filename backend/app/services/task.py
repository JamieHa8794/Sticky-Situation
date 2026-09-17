from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.task import Task

from app.schemas.task import TaskCreate, TaskUpdate


def get_task(session: Session, task_id: str) -> Task | None:
    task = session.get(Task, task_id)

    if task is None:
        return None

    return task


def get_tasks_for_board(session: Session, board_id: str) -> list[Task]:
    statement = select(Task).where(Task.board_id == board_id)
    tasks = session.scalars(statement).all()

    return tasks


def create_task(session: Session, data: TaskCreate) -> Task:
    new_task = Task(
        title=data.title,
        description=data.description,
        status=data.status,
        priority=data.priority,
        due_date=data.due_date,
        tags=data.tags,
        board_id=data.board_id,
    )
    session.add(new_task)
    session.commit()
    session.refresh(new_task)

    return new_task


def update_task(session: Session, task_id: str, data: TaskUpdate) -> Task | None:
    task = session.get(Task, task_id)

    if task is None:
        return None

    updates = data.model_dump(exclude_unset=True)

    for field, value in updates.items():
        setattr(task, field, value)

    session.commit()
    session.refresh(task)
    return task


def delete_task(session: Session, task_id: str) -> bool:
    task = session.get(Task, task_id)

    if task is None:
        return False

    session.delete(task)
    session.commit()

    return True
