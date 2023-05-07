import React, { useState, useEffect, useRef } from 'react';

interface SortingSelectProps {
  selectedValue: string;
  onSelectedValueChange: Function;
}

const SortingSelect:React.FC<SortingSelectProps> = ({ selectedValue, onSelectedValueChange }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [selectValue, setSelectValue] = useState(selectedValue);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
      <div className={`sorting-select-dropdown ${isDropdownOpen? '' : 'hidden'}`}>
        <label className="select-item" htmlFor="select-all">All</label>
        <input className="option" id="select-all" type="radio" name="option" value="All" onClick={handleOptionChange} />

        <label className="select-item" htmlFor="select-done">Done</label>
        <input className="option" id="select-done" type="radio" name="option" value="Done" onClick={handleOptionChange} />

        <label className="select-item" htmlFor="select-undone">Undone</label>
        <input className="option" id="select-undone" type="radio" name="option" value="Undone" onClick={handleOptionChange} />
      </div>
    </div>
  );
};

export default SortingSelect;