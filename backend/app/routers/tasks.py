from fastapi import APIRouter, Depends, HTTPException, status

from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import TaskResponse, TaskCreate, TaskUpdate
from app.models import Task

from app.services import get_task, create_task, get_board, update_task, delete_task

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("/{task_id}", response_model=TaskResponse)
def get_task_by_id(task_id: str, session: Session = Depends(get_db)) -> Task:
    task = get_task(session, task_id)

    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task not found"
        )

    return task


@router.post("", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task_endpoint(data: TaskCreate, session: Session = Depends(get_db)) -> Task:

    board = get_board(session, data.board_id)

    if board is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Board not found"
        )

    response = create_task(session, data)

    return response


@router.patch("/{task_id}", response_model=TaskResponse)
def update_task_endpoint(
    task_id: str, data: TaskUpdate, session: Session = Depends(get_db)
) -> Task:
    response = update_task(session, task_id, data)

    if response is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task not found"
        )

    return response


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task_endpoint(task_id: str, session: Session = Depends(get_db)) -> None:
    deleted = delete_task(session, task_id)

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task not found"
        )

    return None
