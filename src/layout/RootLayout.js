import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from './SideBar';
import BtnSolid from "./components/buttons/BtnSolid";
import { HiMenu } from "react-icons/hi";
import IconFiados from '../IconFiados.svg';

function RootLayout() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const closeNav = () => {
        if (isNavOpen) {
            setIsNavOpen(false);
        }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-gray-100 overflow-hidden relative">
            <nav className="bg-neutral-900 text-white w-full h-12 gap-4 flex justify-start items-center px-4 py-2">
                <span className="sm:hidden">
                    <BtnSolid icon={<HiMenu />} click={toggleNav} />
                </span>
                <img className="h-3/4" src={IconFiados} alt="Icon Fiados" />
            </nav>
            <div className="flex w-full h-full">
                {isNavOpen && (
                    <div 
                        className="fixed inset-0 xl:hidden bg-black bg-opacity-50 z-40"
                        onClick={closeNav}
                    ></div>
                )}
                <SideBar isOpen={isNavOpen} toggleNav={toggleNav} />
                <main className="w-full relative z-10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default RootLayout;
