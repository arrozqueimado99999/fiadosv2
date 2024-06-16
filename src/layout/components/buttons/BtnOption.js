import React from 'react';
import { Tooltip } from 'react-tooltip';

const BtnOption = ({ icon, text, click, className }) => {
  const buttonClasses = `btn-primary duration-75 flex w-full items-center text-neutral-800 gap-1 p-2 hover:bg-opacity-10 hover:bg-neutral-900 font-bold  ${className} ${text ? 'px-4' : ''}`;

  return (
    <div>
      <button
        onClick={click}
        className={buttonClasses}>
        {icon && <span className="text-md">{icon}</span>}
        {text && <span className="text-sm font-normal truncate">{text}</span>}
      </button>
    </div>
  );
};

export default BtnOption;
