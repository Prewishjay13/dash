import React from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import Home from './Home';
import Models from './Models';
function Nav() {

    return (

            <div>
                <nav className="nav">
                    <Link to="/" className="nav-item">Home</Link>
                    <Link to="/models" className="nav-item">Models</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />}/>     
                    <Route path="/models" element={<Models />}/>
                </Routes>
            </div>
    );
}

export default Nav;