import React from 'react';
import { NumericFormat } from 'react-number-format';

function InputReal({ placeholder, value, onChange, onKeyPress, ref, className }) {
    return (
        <div className='flex flex-col'>
            <label className='text-sm'>{placeholder}</label>
            <NumericFormat
                className={`rounded-xl w-full focus:border-teal-600 p-2 text-neutral-500 border-2 border-neutral-300 ${className}`}
                value={value}
                onValueChange={(values) => {
                    const { value } = values;
                    onChange({ target: { value } });
                }}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                prefix="R$ "
                type="text"
                placeholder={placeholder}
                onKeyPress={onKeyPress}
                getInputRef={ref}
            />
        </div>
    );
}

export default InputReal;
