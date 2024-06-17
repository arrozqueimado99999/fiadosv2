import React from 'react';
import BtnSolid from './components/buttons/BtnSolid';
import { HiMenu } from 'react-icons/hi';
import IconFiados from '../IconFiados.svg';

function MainNav({ toggleNav }) {
    return (
        <nav className="bg-neutral-900 text-white w-full h-12 gap-4 flex justify-start items-center px-4 py-2">
            <span className="sm:hidden">
                <BtnSolid icon={<HiMenu />} click={toggleNav} />
            </span>
            <img className="h-3/4" src={IconFiados} alt="Icon Fiados" />
        </nav>
    );
}

export default MainNav;
