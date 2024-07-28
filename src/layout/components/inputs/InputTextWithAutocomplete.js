import React, { useState, useEffect, useRef } from 'react';
import useAutocomplete from '../useAutocomplete';
import recommendations from '../autocompleteOpt.json';

function InputTextWithAutocomplete({ placeholder, value, onChange, onKeyPress, className }) {
  const inputRef = useRef(null);

  const {
    inputValue,
    setInputValue,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
    filteredOptions,
    isDropdownVisible,
    handleOptionClick,
    handleKeyDown,
    activeOptionIndex,
  } = useAutocomplete(recommendations);

  useEffect(() => {
    setInputValue(value);
  }, [value, setInputValue]);

  useEffect(() => {
    if (isDropdownVisible) {
      inputRef.current.focus();
    }
  }, [isDropdownVisible]);

  const combinedHandleInputChange = (e) => {
    handleInputChange(e);
    onChange(e);
  };

  const combinedHandleOptionClick = (option) => {
    handleOptionClick(option);
    onChange({ target: { value: option } });
  };

  return (
    <div className='flex flex-col w-full relative'>
      <label className='text-sm'>{placeholder}</label>
      <input
        className={`w-full rounded-xl focus:border-teal-600 border-2 p-2 text-neutral-500 border-neutral-300 ${className}`}
        type="text"
        value={inputValue}
        onChange={combinedHandleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyPress={onKeyPress}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      {isDropdownVisible && (
        <ul className="absolute top-16 z-10 w-full bg-white border border-gray-300 rounded-xl no-scrollbar mt-1 max-h-40 overflow-auto">
          {filteredOptions.map((option, index) => (
            <li
              key={option}
              className={`p-2 cursor-pointer ${index === activeOptionIndex ? 'bg-gray-200' : ''}`}
              onMouseDown={(e) => {
                e.preventDefault();
                combinedHandleOptionClick(option);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InputTextWithAutocomplete;
