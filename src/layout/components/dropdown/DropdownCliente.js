import React, { useState, useEffect, useRef } from 'react';
import { HiChevronDown, HiDotsVertical, HiMenu } from 'react-icons/hi';
import BtnAlpha from '../buttons/BtnAlpha';

function DropdownCliente({ options, icon }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className='z-0'>
        <BtnAlpha
          icon={icon}
          click={toggleDropdown}
        />
      </div>

      {isOpen && (
        <div className="origin-top-right z-50 animate-slideDown flex absolute right-0 mt-2 w-fit rounded-xl overflow-hidden shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options}
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownCliente;
