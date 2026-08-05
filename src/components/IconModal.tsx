import { useState } from 'react';
import { BOARD_ICON_OPTIONS } from '../data/icons';

import '../styles/IconModal.css';
import type { BoardIconName } from '../types/icons';

type IconModalProps = {
  setShowIconModal: (showModal: boolean) => void;
  selectedIcon: BoardIconName;
  setIcon: (iconId: BoardIconName) => void;
};
function IconModal(props: IconModalProps) {
  const { setShowIconModal, selectedIcon, setIcon } = props;

  const [tempSelectedIcon, setTempSelectedIcon] = useState(selectedIcon);

  return (
    <div className="modal-overlay">
      <div className="modal-container icon-modal">
        <div className="modal-header">
          <div className="modal-title-container">
            <div className="modal-title">Choose an Icon</div>
            <div className="modal-description">
              Select an icon to represent your board
            </div>
          </div>
        </div>
        <div className="modal-body">
          <div className="icon-list">
            {BOARD_ICON_OPTIONS.map((icon) => {
              return (
                <div key={icon.id}>
                  <button
                    className={`
                        btn secondary 
                        ${tempSelectedIcon === icon.id ? 'selected' : ''} 
                        `}
                    onClick={() => {
                      setTempSelectedIcon(icon.id);
                    }}
                  >
                    <div className={`icon-container accent-${icon.accent}`}>
                      {
                        <icon.Icon
                          className={`icon xl accent-${icon.accent}`}
                        />
                      }
                    </div>
                    <div className="icon-label">{icon.label}</div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="btn secondary"
            onClick={() => {
              setShowIconModal(false);
            }}
          >
            Cancel
          </button>
          <button
            className="btn primary"
            onClick={() => {
              setIcon(tempSelectedIcon);
              setShowIconModal(false);
            }}
          >
            Select Icon
          </button>
        </div>
      </div>
    </div>
  );
}
export default IconModal;
