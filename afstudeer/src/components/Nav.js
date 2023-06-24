import React from 'react';

import { Link } from 'react-router-dom';


function Nav() {
    const navStyle = {
        color: 'white'
    };
    return (
        <nav>
            <h3>Logo</h3>
            <ul className="nav-Links">
                <Link style={navStyle} to="/Home">
                    <li>Projects</li>
                </Link>
            
            </ul>
        </nav>
    );
}

export default Nav;