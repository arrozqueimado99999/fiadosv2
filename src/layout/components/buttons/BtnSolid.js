import React from 'react';

const BtnSolid = ({ icon, text, click }) => {
  const buttonClasses = `btn-primary flex flex-row menu-item font-bold items-center text-white gap-1 p-2 rounded-xl bg-teal-600 hover:bg-teal-700 bg-blend-multiply ${text ? 'px-4' : ''}`;

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

export default BtnSolid;
