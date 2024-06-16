import React from 'react';

function InputText({ placeholder, value, onChange, onKeyPress, ref, className }) {
    return (
        <div className='flex flex-col'>
            <label className='text-sm'>{placeholder}</label>
            <input
                className={`w-sm rounded-xl focus:border-teal-600 p-2 text-neutral-500 border-2 border-neutral-300 ${className}`}
                type="number"
                value={value}
                onChange={onChange}
                onKeyPress={onKeyPress}
                ref={ref}
            />
        </div>
    );
}

export default InputText;
