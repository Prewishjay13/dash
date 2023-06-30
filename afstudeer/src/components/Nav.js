import React from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import Home from './Home';
import Models from './Models';
import Posts from './Posts';
import About from './About';
import Table from './Csvtable';
import Csv from './Csvtest';
import Upload from './CsvUpload';
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
                    <li><Link to="/table" className="nav-item">Table</Link></li>
                    <li><Link to="/test" className="nav-item">Test</Link></li>
                    <li><Link to="/upload" className="nav-item">Upload</Link></li>

                    </ul> 
                </nav>
                <Routes>
                    <Route path="/" element={<Home />}/>     
                    <Route path="/models" element={<Models />}/>
                    <Route path="/posts" element={<Posts />}/>
                    <Route path="/about" element={<About />}/>
                    <Route path="/table" element={<Table />}/>
                    <Route path="/test" element={<Csv />}/>
                    <Route path="/upload" element={<Upload />}/>
                   
                </Routes>
            </div>
    );
}

export default Nav;