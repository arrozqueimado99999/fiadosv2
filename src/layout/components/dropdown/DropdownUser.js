// src/components/dropdown/DropdownUser.js
import React, { useState, useEffect, useRef } from 'react';
import { HiAdjustments, HiChevronDown, HiLogout, HiOutlineLogout } from 'react-icons/hi';
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import UserImg from "../../../assets/EIGHT.svg";
import { auth } from "../../../firebaseConfig";
import BtnOption from '../buttons/BtnOption';

function DropdownUser({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login'); // Navegar para a página de login após o logout
        } catch (error) {
            console.error("Erro ao fazer logout: ", error);
        }
    };

    useEffect(() => {
        console.log("User prop in DropdownUser:", user);
    }, [user]);

    return (
        <div className="relative min-w-22 rounded-full cursor-pointer hover:bg-gray-500 hover:bg-opacity-30 h-full flex" ref={dropdownRef}>
            <div className="flex items-center h-full pr-4 w-fit gap-2" onClick={toggleDropdown}>
              <img src={UserImg} className='h-full'></img>
              <p className='text-md'>{user.firstName}</p>
            </div>
            {isOpen && (
                <div className="origin-top-right z-50 animate-slideDown flex absolute right-0 mt-8 w-fit rounded-xl overflow-hidden shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu" className='min-w-32'>
                    <BtnOption
                        click={handleLogout}
                        text={'Configurações'}
                        icon={<HiAdjustments/>}
                    />
                    <BtnOption
                      click={handleLogout}
                      text={'Sair'}
                      icon={<HiOutlineLogout/>}
                      className={'text-red-400'}
                    />

                    </div>
                </div>
            )}
        </div>
    );
}

export default DropdownUser;