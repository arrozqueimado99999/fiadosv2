import React, { useEffect, useState } from 'react';
import { HiCalendar } from 'react-icons/hi';

function InputData({ placeholder, value, onChange, ref, className }) {
    const [initialValue, setInitialValue] = useState('');

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0]; // Formata a data como YYYY-MM-DD
        setInitialValue(formattedDate);
    }, []);

    return (
        <div className='flex flex-col w-full'>
            <label className='text-sm'>{placeholder}</label>
            <div className='relative flex items-center'>
                <input
                    className={`w-min rounded-xl  cursor-pointer focus:border-teal-600 border-2 p-2 text-neutral-500 border-neutral-300 ${className}`}
                    type="date"
                    value={value || initialValue}
                    onChange={onChange}
                    ref={ref}
                />
            </div>
        </div>
    );
}

export default InputData;
