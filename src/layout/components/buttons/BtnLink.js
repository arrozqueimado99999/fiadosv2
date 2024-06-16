import React from 'react';
import { NavLink } from 'react-router-dom';

const BtnLink = ({ icon, text, to }) => {
  const buttonClasses = `btn-primary duration-75 focus:bg-teal-600 focus:text-white px-4 flex gap-2 flex-row font-bold text-neutral-700 items-center p-2 rounded-xl w-full hover:bg-slate-200 ${text ? 'px-4' : ''}`;

  return (
    <NavLink to={to} className={buttonClasses}>
            {icon && <span className="text-xl ">{icon}</span>}
            {text && <span className="text-sm">{text}</span>}
    </NavLink>
  );
};

export default BtnLink;
