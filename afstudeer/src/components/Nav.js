import React from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import Home from './Home';
import Models from './Models';
import Posts from './Posts';
import About from './About';
function Nav() {

    return (

            <div>
                <nav className="nav">
                    <Link to="/" className="nav-item">Home</Link>
                    <Link to="/models" className="nav-item">Models</Link>
                    <Link to="/posts" className="nav-item">Posts</Link>
                    <Link to="/about" className="nav-item">About</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />}/>     
                    <Route path="/models" element={<Models />}/>
                    <Route path="/posts" element={<Posts />}/>
                    <Route path="/about" element={<About />}/>
                </Routes>
            </div>
    );
}

export default Nav;