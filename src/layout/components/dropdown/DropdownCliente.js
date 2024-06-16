import React, { useState } from 'react';
import { HiDotsVertical, HiOutlineUser, HiOutlineCog, HiOutlineLogout, HiArrowDown } from 'react-icons/hi';
import BtnAlpha from '../buttons/BtnAlpha';

function DropdownCliente({ options }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <BtnAlpha
          icon={<HiDotsVertical/>}
          click={toggleDropdown}
        />
      </div>

      {isOpen && (
        <div className="origin-top-right flex absolute right-0 mt-2 w-fit rounded-xl overflow-hidden shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options}
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownCliente;
