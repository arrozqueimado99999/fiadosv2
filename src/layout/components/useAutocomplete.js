import { useState, useEffect } from 'react';

const useAutocomplete = (options) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const words = inputValue.substring(0, cursorPosition).split(' ');
    const currentWord = words[words.length - 1];
    if (currentWord) {
      setFilteredOptions(
        options.filter(option =>
          option.toLowerCase().includes(currentWord.toLowerCase())
        )
      );
      if (isFocused) {
        setDropdownVisible(true);
      }
    } else {
      setFilteredOptions([]);
      setDropdownVisible(false);
    }
  }, [inputValue, options, cursorPosition, isFocused]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setCursorPosition(e.target.selectionStart);
    setActiveOptionIndex(-1);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setDropdownVisible(false), 100); // Delay to allow option click
    setIsFocused(false);
  };

  const handleOptionClick = (option) => {
    const words = inputValue.substring(0, cursorPosition).split(' ');
    words[words.length - 1] = option;
    const newValue = [...words, ...inputValue.substring(cursorPosition).split(' ')].join(' ');
    setInputValue(newValue);
    setDropdownVisible(false);
    setTimeout(() => setCursorPosition(newValue.length), 0); // Update cursor position
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && activeOptionIndex >= 0) {
      const words = inputValue.substring(0, cursorPosition).split(' ');
      words[words.length - 1] = filteredOptions[activeOptionIndex];
      const newValue = [...words, ...inputValue.substring(cursorPosition).split(' ')].join(' ');
      setInputValue(newValue);
      setDropdownVisible(false);
      e.preventDefault();
      setTimeout(() => setCursorPosition(newValue.length), 0); // Update cursor position
    } else if (e.key === 'ArrowDown') {
      setActiveOptionIndex((prevIndex) =>
        prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === 'ArrowUp') {
      setActiveOptionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : 0
      );
    }
  };

  return {
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
  };
};

export default useAutocomplete;
