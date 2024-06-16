import React from 'react';

function Toggle({ change, checked }) {
    return (
        <div className='flex gap-2'>
            <label className="relative gap-2 inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={checked}
                    onChange={change}
                />
                <div className="peer ring-0 bg-rose-400 rounded-full outline-none duration-300 after:duration-500 w-10 h-10 shadow-md peer-checked:bg-emerald-500 peer-focus:outline-none after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-8 after:w-8 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180 peer-checked:after:rotate-0">
                </div>
                <p className='text-neutral-700'>Pago</p>
            </label>
        </div>
    );
}

export default Toggle;
