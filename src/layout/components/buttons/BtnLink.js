import React from 'react';
import { NavLink } from 'react-router-dom';

const BtnLink = ({ icon, text, to, isActive }) => {
  const activeClasses = 'bg-teal-600 text-white';
  const defaultClasses = 'duration-75 px-4 flex gap-2 flex-row font-bold text-neutral-700 items-center p-2 rounded-xl w-full border-transparent border-2 hover:border-neutral-300';
  const buttonClasses = `${defaultClasses} ${isActive ? activeClasses : 'btn-primary'} ${text ? 'px-4' : ''}`;

  return (
    <NavLink to={to} className={buttonClasses}>
      {icon && <span className="text-xl ">{icon}</span>}
      {text && <span className="text-sm">{text}</span>}
    </NavLink>
  );
};

export default BtnLink;
