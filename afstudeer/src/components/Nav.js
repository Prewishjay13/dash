import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Charts from "../pages/Charts";
import Models from "../pages/Models";
import Knn from "./Knn";
import About from "../pages/About";
import Table from "./Csvtable";
//import Csv from './Csvtest';
import Upload from "./CsvUpload";
import Tensor from "./Tensor";
import Scatterplot from "./Scatterplot";
import Lineplot from "./Lineplot";
import "../style.css";

function Nav() {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/" className="nav-item">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/charts" className="nav-item">
                  Charts
                </Link>
              </li>
              <li>
                <Link to="/models" className="nav-item">
                  Models
                </Link>
              </li>

              <li>
                <Link to="/about" className="nav-item">
                  About
                </Link>
              </li>

              <li>
                <Link to="/table" className="nav-item">
                  Table
                </Link>
              </li>
              <li>
                <Link to="/upload" className="nav-item">
                  Upload
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/" className="nav-item">
                Home
              </Link>
            </li>
            <li>
              <Link to="/charts" className="nav-item">
                Charts
              </Link>
            </li>
            <li>
              <Link to="/models" className="nav-item">
                Models
              </Link>
            </li>

            <li>
              <Link to="/about" className="nav-item">
                About
              </Link>
            </li>

            <li>
              <Link to="/table" className="nav-item">
                Table
              </Link>
            </li>
            <li>
              <Link to="/upload" className="nav-item">
                Upload
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end"></div>
      </div>

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/models" element={<Models />} />
          <Route path="/knn" element={<Knn />} />
          <Route path="/tensor" element={<Tensor />} />

          <Route path="/about" element={<About />} />
          <Route path="/table" element={<Table />} />

          <Route path="/upload" element={<Upload />} />
          <Route path="/scatterplot" element={<Scatterplot />} />
          <Route path="/lineplot" element={<Lineplot />} />
        </Routes>
      </div>
    </>
  );
}

export default Nav;
