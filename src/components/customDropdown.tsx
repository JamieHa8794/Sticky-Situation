import { useState } from 'react';

import '../styles/customDropdown.css';
import type { LucideIcon } from 'lucide-react';
import { ChevronDown, Check } from 'lucide-react';
import type { SelectOption, OptionTone } from '../types/common';

type CustomDropdownProps<T> = {
  options: { name: string; key: T; icon?: LucideIcon; tone?: OptionTone }[];
  placeholderText: string;
  formatSelectedText?: (option: SelectOption<T>) => string;

  selectedOption: T;
  onChange: (value: T) => void;

  width?: string;
  showOptionIcons?: boolean;
};

function CustomDropdown<T>(props: CustomDropdownProps<T>) {
  const {
    options,
    placeholderText,
    formatSelectedText,
    selectedOption,
    onChange,
    width = '100%',
    showOptionIcons,
  } = props;
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedOptionObject = options.find(
    (option) => option.key === selectedOption,
  );

  const SelectedIcon = selectedOptionObject?.icon;
  const selectedTone = selectedOptionObject?.tone;

  let buttonText = placeholderText;

  if (selectedOptionObject) {
    if (formatSelectedText) {
      buttonText = formatSelectedText(selectedOptionObject);
    } else {
      buttonText = selectedOptionObject.name;
    }
  }

  return (
    <div className="dropdown-container" style={{ width }}>
      <button
        className="dropdown-button"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="dropdown-button-start">
          {showOptionIcons && SelectedIcon && (
            <SelectedIcon
              className={`icon sm ${selectedTone ? `icon ${selectedTone}` : ''}`}
              fill="currentColor"
            />
          )}

          <span>{buttonText}</span>
        </div>
        <ChevronDown className="icon grey xs" />
      </button>
      <div
        className={`dropdown-options-container ${showDropdown ? '' : 'hidden'}`}
      >
        {options.map((option, idx) => {
          const Icon = option.icon;
          return (
            <button
              key={idx}
              className={`dropdown-option ${showDropdown ? '' : 'hidden'}`}
              onClick={() => {
                onChange(option.key);
                setShowDropdown(false);
              }}
            >
              <div className="dropdown-option-start">
                {showOptionIcons && Icon ? (
                  <Icon
                    className={`icon sm ${option.tone}`}
                    fill="currentColor"
                  />
                ) : (
                  ''
                )}
                {option.name}
              </div>
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
