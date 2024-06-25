import React from 'react';

function InputText({ placeholder, value, onChange, onKeyPress, ref, className }) {
    return (
        <div className='flex flex-col w-full'>
            <label className='text-sm'>{placeholder}</label>
            <input
                className={`w-full rounded-xl focus:border-teal-600 border-2 p-2 text-neutral-500 border-neutral-300 ${className}`}
                type="text"
                value={value}
                onChange={onChange}
                onKeyPress={onKeyPress}
                ref={ref}
            />
        </div>
    );
}

export default InputText;
