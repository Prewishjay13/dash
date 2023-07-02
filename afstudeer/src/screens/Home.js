import React from "react";
import '../style.css';
//import ReactDOM from 'react-dom/client';
import {Link} from 'react-router-dom'


function Home () {
return ( 

   
 <Link to="/posts" className="nav-item">  
    <div className="box-one">
        <h>Home Page</h>
        <p>Welcome to the Home page. This is where</p>
    </div>
</Link>

)
}

export default Home;
