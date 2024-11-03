import React from "react";
import Logo from "../GamerBug-removebg-preview.png";


function NavigationBar(){
    return(
        <div className = 'fixed z-20 w-full flex justify-between bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500'>
            <div className = 'flex'>
                <img src = {Logo} alt = "GameRLogo" className = 'p-2 w-36 h-15' />
            </div>
            <div className = 'flex space-x-2 mr-4'>
                <a href="#" className='p-2 m-1 rounded-md font-bold text-white hover:bg-gradient-to-r from-purple-400 to-pink-400'>Log in</a>
            </div>
        </div>
    )
}

export default NavigationBar;