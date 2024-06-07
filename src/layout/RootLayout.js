import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from './SideBar';
import MainNav from "./MainNav";

export default function RootLayout() {
    return (
		<div className="flex flex-col h-screen w-full bg-gray-100 overflow-hidden">
            <MainNav/>
            <div className="flex w-full h-full">
                <SideBar/>

                <main className="w-full">
                    <Outlet/>
                </main>
            </div>
        </div>        
    )
}