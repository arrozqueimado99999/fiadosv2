import React from 'react';
import { Tooltip } from 'react-tooltip';

const BtnAlpha = ({ icon, text, click, tooltip, id }) => {
  const buttonClasses = `btn-primary duration-75 btn-tooltip focus:scale-90 flex w-fit flex-row menu-item hover:bg-opacity-10 font-bold items-center text-neutral-800 gap-1 p-2 rounded-full hover:bg-neutral-900 ${text ? 'px-4' : ''}`;

  return (
    <div>
      <button
        onClick={click}
        className={buttonClasses}
        data-tooltip-id={tooltip ? `tooltip-id-${id}` : ""}
      >
        {icon && <span className="text-xl z-0">{icon}</span>}
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

export default BtnAlpha;
