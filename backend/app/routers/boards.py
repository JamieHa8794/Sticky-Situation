from fastapi import APIRouter, Depends, HTTPException, status

from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import BoardSummaryResponse, BoardResponse, BoardCreate, BoardUpdate
from app.models import Board
from app.services import get_boards, get_board, create_board, update_board, delete_board

router = APIRouter(prefix="/boards", tags=["boards"])


def _build_board_summary(board: Board, task_count: int) -> BoardSummaryResponse:
    board_summary = BoardSummaryResponse(
        id=board.id,
        title=board.title,
        description=board.description,
        icon=board.icon,
        created_at=board.created_at,
        updated_at=board.updated_at,
        task_count=task_count,
    )

    return board_summary


@router.get(
    "",
    response_model=list[BoardSummaryResponse],
)
def list_boards(session: Session = Depends(get_db)) -> list[BoardSummaryResponse]:
    response = get_boards(session)
    summaries: list[BoardSummaryResponse] = []

    for board, task_count in response:
        summary = _build_board_summary(board, task_count)
        summaries.append(summary)

    return summaries


@router.get(
    "/{board_id}",
    response_model=BoardSummaryResponse,
)
def get_board_by_id(
    board_id: str,
    session: Session = Depends(get_db),
) -> BoardSummaryResponse:
    response = get_board(session, board_id)

    if response is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Board not found"
        )

    board, task_count = response

    board_summary = _build_board_summary(board, task_count)

    return board_summary


@router.post("", response_model=BoardResponse, status_code=status.HTTP_201_CREATED)
def create_board_endpoint(
    data: BoardCreate, session: Session = Depends(get_db)
) -> Board:
    response = create_board(session, data)

    return response


@router.patch("/{board_id}", response_model=BoardResponse)
def update_board_endpoint(
    board_id: str, data: BoardUpdate, session: Session = Depends(get_db)
) -> Board:
    response = update_board(session, board_id, data)

    if response is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Board not found"
        )

    return response


@router.delete("/{board_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_board_endpoint(board_id: str, session: Session = Depends(get_db)) -> None:
    deleted = delete_board(session, board_id)

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Board not found"
        )

    return None
