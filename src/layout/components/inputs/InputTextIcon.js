import React from 'react';

function InputTextIcon({ placeholder, value, onChange, onKeyPress, ref, icon }) {
    return (
        <div
        className='flex gap-2 items-center justify-center w-sm rounded-xl focus:border-teal-600 p-2 text-neutral-500 border-2 border-neutral-300'>
            <span>
                {icon}
            </span>
            <input
            className='focus:outline-none bg-transparent'
            placeholder={placeholder}
                type="text"
                value={value}
                onChange={onChange}
                onKeyPress={onKeyPress}
                ref={ref}
            />
        </div>
    );
}

export default InputTextIcon;
