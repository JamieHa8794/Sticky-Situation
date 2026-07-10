import { taskStatusList, priorityList } from '../data/tasks';
import type { sortOptions } from '../types/task';
import { sortList } from '../data/board';

import '../styles/BoardToolbar.css';
import { Plus, Search } from 'lucide-react';
import CustomDropdown from './customDropdown';

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
        <button className="btn primary" onClick={handleToggleTaskFormModal}>
          <Plus className="icon sm" />
          Create New Task
        </button>
      </div>
      <div className="board-toolbar-end">
        <div className="board-toolbar-item">
          <div className="input-container">
            <Search className="icon grey sm" />
            <input
              className="inpt"
              placeholder="Search Tasks..."
              value={serachText}
              onChange={(e) => handleSearchText(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="board-toolbar-item">
          <CustomDropdown
            options={taskStatusList}
            placeholderText={'Status'}
            selectedOption={selectedStatus}
            onChange={handleSetSelectedStatus}
            width="115px"
          />
        </div>
        <div className="board-toolbar-item">
          <CustomDropdown
            options={priorityList}
            placeholderText={'Priority'}
            selectedOption={selectedPriority}
            onChange={handleSetSelectedPriority}
            width="100px"
          />
        </div>
        <div className="board-toolbar-item">
          <CustomDropdown
            options={sortList}
            placeholderText={`Sort By:`}
            formatSelectedText={(option) => `Sort: ${option.name}`}
            selectedOption={sortBy}
            onChange={handleSetSortBy}
            width="160px"
          />
        </div>
        <div className="board-toolbar-item">
          <button onClick={resetView} className="btn outlined">
            Reset View
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoardToolbar;
