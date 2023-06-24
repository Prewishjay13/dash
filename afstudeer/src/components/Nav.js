import React from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import Home from './Home';
import Models from './Models';
import Posts from './Posts';

function Nav() {

    return (

            <div>
                <nav className="nav">
                    <Link to="/" className="nav-item">Home</Link>
                    <Link to="/models" className="nav-item">Models</Link>
                    <Link to="/posts" className="nav-item">Posts</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />}/>     
                    <Route path="/models" element={<Models />}/>
                    <Route path="/posts" element={<Posts />}/>
                </Routes>
            </div>
    );
}

export default Nav;