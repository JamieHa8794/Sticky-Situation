import { useState } from 'react';

import '../styles/customDropdown.css';
import { ChevronDown, Check } from 'lucide-react';

type CustomDropdownProps<T> = {
  options: { name: string; key: T }[];
  placeholderText: string;
  customClosedStateText?: string;

  selectedOption: T;
  onChange: (value: T) => void;

  width?: string;
};

function CustomDropdown<T>(props: CustomDropdownProps<T>) {
  const {
    options,
    placeholderText,
    customClosedStateText,
    selectedOption,
    onChange,
    width = '100%',
  } = props;
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedOptionName = options.find(
    (option) => option.key === selectedOption,
  )?.name;

  return (
    <div className="dropdown-container" style={{ width }}>
      <button
        className="dropdown-button"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {customClosedStateText
          ? customClosedStateText
          : showDropdown || !selectedOption
            ? placeholderText
            : selectedOptionName}
        <ChevronDown className="icon grey xs" />
      </button>
      <div
        className={`dropdown-options-container ${showDropdown ? '' : 'hidden'}`}
      >
        {options.map((option, idx) => {
          return (
            <button
              key={idx}
              className={`dropdown-option ${showDropdown ? '' : 'hidden'}`}
              onClick={() => {
                onChange(option.key);
                setShowDropdown(false);
              }}
            >
              {option.name}
              {selectedOption === option.key ? (
                <Check className="icon primary sm" />
              ) : (
                ''
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CustomDropdown;
