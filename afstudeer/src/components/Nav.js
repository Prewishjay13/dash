import React from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import Home from '../pages/Home';
import Charts from '../pages/Charts';
import Models from '../pages/Models';
import Posts from './Posts';
import About from '../pages/About';
import Table from './Csvtable';
import Csv from './Csvtest';
import Upload from './CsvUpload';
import Rice from './examples/Rice';
import Graph from './Graph';
import Scatterplot from './Scatterplot';
import Lineplot from './Lineplot';
import '../style.css';

function Nav() {

    return (

            <div>
                <nav className="nav">
                   <ul> 
                    <li><Link to="/" className="nav-item">Home</Link></li>
                    <li><Link to="/charts" className="nav-item">Charts</Link></li>
                    <li><Link to="/models" className="nav-item">Models</Link></li>
                    <li><Link to="/posts" className="nav-item">Posts</Link></li>
                    <li><Link to="/about" className="nav-item">About</Link></li>
                    <li><Link to="/test" className="nav-item">Test</Link></li>
                    <li><Link to="/table" className="nav-item">Table</Link></li>
                    <li><Link to="/upload" className="nav-item">Upload</Link></li>
                    <li><Link to="/rice" className="nav-item">Rice</Link></li>
                    <li><Link to="/graph" className="nav-item">Graph</Link></li>
                    </ul> 
                </nav>

                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/charts" element={<Charts />}/>     
                    <Route path="/models" element={<Models />}/>
                    <Route path="/posts" element={<Posts />}/>
                    <Route path="/about" element={<About />}/>
                    <Route path="/table" element={<Table />}/>
                    <Route path="/test" element={<Csv />}/>
                    <Route path="/upload" element={<Upload />}/>
                    <Route path="/rice" element={<Rice />}/>
                    <Route path="/graph" element={<Graph />}/>
                    <Route path="/scatterplot" element={<Scatterplot />}/>
                    <Route path="/lineplot" element={<Lineplot />}/>

                </Routes>
            </div>
    );
}

export default Nav;