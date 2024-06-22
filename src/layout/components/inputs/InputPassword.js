import React, { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

function InputPassword({ placeholder, value, onChange, onKeyPress, ref, className }) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='flex flex-col w-full'>
            <label className='text-sm'>{placeholder}</label>
            <div className="relative gap-3 flex items-center justify-start">
                <input
                    className={`w-sm rounded-xl focus:border-teal-600 w-full border-2 p-2 text-neutral-500 border-neutral-300 ${className}`}
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    ref={ref}
                />
                <span
                    onClick={toggleShowPassword}
                    className="pr-3 flex items-center cursor-pointer"
                >
                    {showPassword ? <HiEyeOff /> : <HiEye />}
                </span>
            </div>
        </div>
    );
}

export default InputPassword;
