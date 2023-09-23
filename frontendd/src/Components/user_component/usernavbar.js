import React from "react";
import { Link, useNavigate } from 'react-router-dom';


function Usernavbar({user}) {
    const navigate=useNavigate();
    const handleLogout = ()=> {
        localStorage.removeItem('jwtToken');
        navigate('/')
    }
    return (
        <>
            <div className="sidebar">
                <p className='welcomeAdmin'> Welcome <br/><strong>{user.user.data.name}</strong></p>
                <div className="logout-btn-div">
                    <button className='logOut' onClick={handleLogout}>Logout <i class="logout fa-solid fa-arrow-right-from-bracket"></i></button>
                </div>
            </div>
        </>
    )
}

export default Usernavbar;