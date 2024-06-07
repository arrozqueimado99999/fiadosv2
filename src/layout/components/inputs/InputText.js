import React from 'react';

function InputText({ placeholder, value, onChange, onKeyPress, ref, className }) {
    return (
        <input
            className={`w-sm h-8 rounded-md text-neutral-700 border-slate-300 ${className}`}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            ref={ref}
        />
    );
}

export default InputText;
