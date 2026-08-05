import { Link } from 'react-router';
import type { Board } from '../../../shared/types/boards';
import { BOARD_ICON_OPTIONS } from '../../data/icons';

import '../../styles/boards/BoardCard.css';

import {
  ArrowRight,
  Pencil,
  Trash2,
  SquareCheck,
  Clock4,
  Rocket,
} from 'lucide-react';
import { getDaysAgo } from '../../utils';

type BoardCardProps = {
  boards: Board[];
  boardId: string;
  setCurrentlyEditing: (id: string) => void;
  setShowForm: (isShowing: boolean) => void;
  handleConfirmDelete: (boardId: string) => void;
};

function BoardCard(props: BoardCardProps) {
  const {
    boards,
    boardId,
    setCurrentlyEditing,
    setShowForm,
    handleConfirmDelete,
  } = props;

  const board = boards.find((b) => b.id === boardId);
  if (!board) return;
  const boardTaskCount = board.taskCount || 0;

  const daysAgo = board.updatedAt ? getDaysAgo(board.updatedAt) : 0;

  const selectedIconOption = BOARD_ICON_OPTIONS.find(
    (iconOption) => iconOption.id === board.icon,
  );
  const SelectedIcon = selectedIconOption?.Icon ?? Rocket;
  const accentColor = selectedIconOption?.accent || 'green';

  return (
    <div className="board-card">
      <div className="card-main">
        <div className="card-header">
          <div className="header-start">
            <div className={`card-icon icon-container  accent-${accentColor}`}>
              <SelectedIcon className={`icon lg  accent-${accentColor}`} />{' '}
            </div>
          </div>
          <div className="header-end">
            <button
              className="btn icon outlined"
              onClick={() => {
                setCurrentlyEditing(boardId);
                setShowForm(true);
              }}
            >
              <Pencil className="icon xs " />
            </button>
            <button
              className="btn icon destructive outlined"
              onClick={() => {
                handleConfirmDelete(boardId);
              }}
            >
              <Trash2 className="icon xs" />
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="card-title">{board.title}</div>
          <div className="card-description">{board.description}</div>
        </div>
        <div className="card-footer">
          <div className="card-footer-item">
            <SquareCheck className="icon xs" />
            <div>{boardTaskCount} tasks</div>
          </div>
          <div className="card-footer-item">
            <Clock4 className="icon xs" />
            <div>Updated {daysAgo}d ago</div>
          </div>
        </div>
      </div>
      <div className="card-bottom">
        <Link className="board-link" to={`/boards/${boardId}`}>
          <div>Open Board</div>
          <div>
            <ArrowRight />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default BoardCard;
