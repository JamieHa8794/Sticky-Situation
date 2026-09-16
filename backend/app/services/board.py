from sqlalchemy import select, func
from sqlalchemy.orm import Session

from app.models.board import Board
from app.schemas.board import BoardCreate, BoardUpdate

from app.models.task import Task


def get_board(session: Session, board_id: str) -> Board | None:
    return session.get(Board, board_id)


def get_boards(session: Session) -> list[tuple[Board, int]]:
    statement = (
        select(Board, func.count(Task.id)).outerjoin(Board.tasks).group_by(Board.id)
    )
    rows = session.execute(statement).all()

    result: list[tuple[Board, int]] = []

    for board, task_count in rows:
        result.append((board, task_count))

    return result


def create_board(session: Session, data: BoardCreate) -> Board:
    new_board = Board(title=data.title, description=data.description, icon=data.icon)

    session.add(new_board)
    session.commit()
    session.refresh(new_board)
    return new_board


def update_board(session: Session, board_id: str, data: BoardUpdate) -> Board | None:
    board = session.get(Board, board_id)

    if not board:
        return None

    updates = data.model_dump(exclude_unset=True)

    for field, value in updates.items():
        setattr(board, field, value)

    session.commit()
    session.refresh(board)
    return board


def delete_board(session: Session, board_id: str) -> bool:
    board = session.get(Board, board_id)

    if not board:
        return False

    session.delete(board)
    session.commit()

    return True
