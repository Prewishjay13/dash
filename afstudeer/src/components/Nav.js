import React from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import Home from './Home';
import Models from './Models';
import Posts from './Posts';
import About from './About';
import '../style.css';
function Nav() {

    return (

            <div>
                <nav className="nav">
                   <ul> 
                    <li><Link to="/" className="nav-item">Home</Link></li>
                    <li><Link to="/models" className="nav-item">Models</Link></li>
                    <li><Link to="/posts" className="nav-item">Posts</Link></li>
                    <li><Link to="/about" className="nav-item">About</Link></li>
                    </ul> 
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