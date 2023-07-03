import React from "react";
import '../style.css';
//import ReactDOM from 'react-dom/client';
import {Link} from 'react-router-dom';
import scatter from '../images/scatter.png';
import line from '../images/line.png';
function Charts () {
    return ( 
    
        <div>
        <Link to="/scatterplot" className="nav-item">
          <div className="chart-box">
            <h2>Scatter plot</h2>
            <img src={scatter} alt="Scatterplot" />
          </div>
        </Link>
  
        <Link to="/lineplot" className="nav-item">
          <div className="chart-box">
            <h2>Line plot</h2>
            <img src={line} alt="Lineplot" />
          </div>
        </Link>
      </div>
  

    )
    }
    
    export default Charts;