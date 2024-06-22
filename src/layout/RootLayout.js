import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from './SideBar';
import BtnSolid from "./components/buttons/BtnSolid";
import { HiMenu } from "react-icons/hi";
import IconFiados from '../IconFiados.svg';
import { auth } from "../firebaseConfig";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import DropdownUser from "./components/dropdown/DropdownUser";
import Loading from "./Loading";

function RootLayout() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const db = getFirestore();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                console.log("User is logged in:", authUser);
                setIsLoggedIn(true);
                try {
                    const userDoc = await getDoc(doc(db, "users", authUser.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        console.log("User data fetched from Firestore:", userData);
                        setUser(userData);
                    } else {
                        console.log("User document does not exist in Firestore.");
                    }
                } catch (error) {
                    console.error("Error fetching user data from Firestore:", error);
                }
            } else {
                console.log("No user is logged in.");
                setIsLoggedIn(false);
                navigate('/login');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [db, navigate]);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const closeNav = () => {
        if (isNavOpen) {
            setIsNavOpen(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login'); // Navegar para a página de login após o logout
        } catch (error) {
            console.error("Erro ao fazer logout: ", error);
        }
    };

    if (loading) {
        return <Loading/>;
    }

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className="flex flex-col h-screen w-full bg-gray-100 overflow-hidden relative">
            <nav className="bg-neutral-900 text-white w-full h-12 gap-4 flex justify-between items-center px-4 py-2">
                <div className="flex justify-center h-full items-center w-fit gap-3">
                    <span className="sm:hidden">
                        <BtnSolid icon={<HiMenu />} click={toggleNav} />
                    </span>
                    <img className="h-3/4" src={IconFiados} alt="Icon Fiados" />
                </div>
                <div id="uuu" className="flex h-full items-center gap-2">
                    {user ? <DropdownUser user={user} /> : <span>Loading...</span>}
                </div>
            </nav>
            <div className="flex w-full h-full">
                {isNavOpen && (
                    <div 
                        className="fixed inset-0 animate-fade xl:hidden backdrop-blur-sm bg-black bg-opacity-50 z-40"
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
