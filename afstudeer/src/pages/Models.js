import React from "react";
import {Link} from 'react-router-dom';
import '../style.css';
import knn from '../images/knn.jpeg';
import tensor from "../images/tensor.png";
export default function Models () {

  return ( 
    
    <div>
    <Link to="/Knn" className="nav-item">
      <div className="chart-box">
        <h2>KNN</h2>
        <img src={knn} alt="KNN" />
      </div>
    </Link>

    <Link to="/Tensor" className="nav-item">
      <div className="chart-box">
        <h2>Tensorflow</h2>
        <img src={tensor} alt="Tensor" />
      </div>
    </Link>

  </div>


)
}
