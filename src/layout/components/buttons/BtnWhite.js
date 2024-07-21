import React from 'react';

const BtnWhite = ({ icon, text, click }) => {
  const buttonClasses = `btn-primary duration-75 flex flex-row focus:scale-90 w-fit menu-item font-semibold items-center text-neutral-800 gap-1 p-2 rounded-full bg-white bg-blend-multiply ${text ? 'px-4' : ''}`;

  return (
    <button
      onClick={click}
      className={buttonClasses}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {text && <span className="text-sm">{text}</span>}
    </button>
  );
};

export default BtnWhite;
