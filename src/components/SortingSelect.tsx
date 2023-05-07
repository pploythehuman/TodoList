import React, { useState, useEffect, useRef } from 'react';

interface SortingSelectProps {
  selectedValue: string;
  onSelectedValueChange: Function;
}

const SortingSelect: React.FC<SortingSelectProps> = ({ selectedValue, onSelectedValueChange }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [selectValue, setSelectValue] = useState(selectedValue);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = [
    { value: 'All', label: 'All' },
    { value: 'Done', label: 'Done' },
    { value: 'Undone', label: 'Undone' },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const handleOptionChange = (event: any) => {
    if (event) {
      onSelectedValueChange(event.target.value);
    }
    setIsDropdownOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (containerRef.current && !containerRef?.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [containerRef])

  useEffect(() => {
    setSelectValue(selectedValue);
  }, [selectedValue]);

  return (
    <div className="sorting-select-group" ref={containerRef}>
      <button className="sorting-select-button" onClick={toggleDropdown}>
        <p style={{ fontSize: '13px' }}>{selectValue}</p>
        <div className="arrow" />
      </button>
      <div className={`sorting-select-dropdown ${isDropdownOpen ? '' : 'hidden'}`}>
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <label className="select-item" htmlFor={`select-${option.value}`}>
              {selectValue === option.value ? (
                <div className="selected-option">{option.label}</div>
              ) : (
                <p style={{ fontSize: '13px' }}>{option.label}</p>
              )}
            </label>
            <input
              className="option"
              id={`select-${option.value}`}
              type="radio"
              name="option"
              value={option.value}
              onClick={handleOptionChange}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SortingSelect;
