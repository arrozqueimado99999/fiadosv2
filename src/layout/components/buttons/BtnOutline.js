import React from 'react';
import { Tooltip } from 'react-tooltip';

const BtnOutline = ({ icon, text, click, tooltip, id }) => {
  const buttonClasses = `btn-primary duration-75 btn-tooltip border-2 text-neutral-600 border-neutral-200 focus:scale-90 flex w-fit flex-row menu-item hover:bg-opacity-10 font-bold items-center gap-1 p-2 rounded-full hover:bg-neutral-900 ${text ? 'px-4' : ''}`;

  return (
    <div>
      <button
        onClick={click}
        className={buttonClasses}
        data-tooltip-id={tooltip ? `tooltip-id-${id}` : ""}
      >
        {icon && <span className="text-xl ">{icon}</span>}
        {text && <span className="text-sm">{text}</span>}
      </button>
      {tooltip && (
        <Tooltip className='rounded-md bg-slate-700' delayShow={500} id={`tooltip-id-${id}`} place="bottom" effect="solid">
          {tooltip}
        </Tooltip>
      )}
    </div>
  );
};

export default BtnOutline;
