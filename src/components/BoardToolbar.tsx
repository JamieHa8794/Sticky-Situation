import { taskStatusList, priorityList } from '../data/tasks';
import type { sortOptions } from '../types/task';
import { sortList } from '../data/board';

type BoardToolbarProps = {
  handleToggleTaskFormModal: () => void;
  serachText: string;
  handleSearchText: (searchText: string) => void;
  selectedStatus: string;
  handleSetSelectedStatus: (status: string) => void;
  selectedPriority: string;
  handleSetSelectedPriority: (priority: string) => void;
  sortBy: sortOptions;
  handleSetSortBy: (sortBy: sortOptions) => void;
  resetView: () => void;
};

function BoardToolbar(props: BoardToolbarProps) {
  const {
    handleToggleTaskFormModal,
    serachText,
    handleSearchText,
    selectedStatus,
    handleSetSelectedStatus,
    selectedPriority,
    handleSetSelectedPriority,
    sortBy,
    handleSetSortBy,
    resetView,
  } = props;
  return (
    <div className="board-toolbar">
      <div className="board-toolbar-start">
        <button onClick={handleToggleTaskFormModal}>Create New Task</button>
      </div>
      <div className="board-toolbar-end">
        <div className="board-toolbar-item">
          <input
            placeholder="Search"
            value={serachText}
            onChange={(e) => handleSearchText(e.target.value)}
          ></input>
        </div>
        <div className="board-toolbar-item">
          <select
            value={selectedStatus}
            onChange={(e) => handleSetSelectedStatus(e.target.value)}
          >
            <option value={''}>Filter by Status</option>
            {taskStatusList.map((status, idx) => {
              return (
                <option value={status.key} key={idx}>
                  {status.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="board-toolbar-item">
          <select
            value={selectedPriority}
            onChange={(e) => handleSetSelectedPriority(e.target.value)}
          >
            <option value={''}>Filter by Priority</option>
            {priorityList.map((priorityItem, idx) => {
              return (
                <option value={priorityItem.key} key={idx}>
                  {priorityItem.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="board-toolbar-item">
          <select
            value={sortBy}
            onChange={(e) => handleSetSortBy(e.target.value as sortOptions)}
          >
            {sortList.map((sortListItem, idx) => {
              return (
                <option value={sortListItem.key} key={idx}>
                  {sortListItem.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="board-toolbar-item">
          <button onClick={resetView}>Reset View</button>
        </div>
      </div>
    </div>
  );
}

export default BoardToolbar;
