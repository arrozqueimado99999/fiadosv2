import React from 'react';

const BtnAlpha = ({ icon, text, click }) => {
  const buttonClasses = `btn-primary flex flex-row menu-item hover:bg-opacity-70 font-bold items-center text-neutral-800 gap-1 p-2 rounded-xl hover:bg-neutral-200 ${text ? 'px-4' : ''}`;

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

export default BtnAlpha;
