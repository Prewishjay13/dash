import React from "react";
import {Link} from 'react-router-dom';
import '../style.css';
import knn from '../images/knn.jpeg';
import tensor from "../images/tensor.png";
export default function Models () {

  return ( 
    <><div class="flex items-center justify-center h-screen">
      <div class="flex space-x-4">
        <div class="w-96 bg-base-100 shadow-xl">
          <div class="w-full aspect-w-4 aspect-h-3">
            <img
              src={knn}
              alt="Scatterplot"
              class="object-cover w-full h-full" />
          </div>
          <div class="p-4">
            <h2 class="text-xl font-bold mb-2">KNN</h2>
            <p class="text-base">
            Classification is like sorting things into different groups based on their characteristics. For example, 
            it's like sorting fruits into categories like apples, bananas, 
            and oranges based on how they look or other traits.
            </p>
            <div class="flex justify-end mt-4">
              <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <Link to="/knn">Gebruik</Link>
              </button>
            </div>
          </div>
        </div>
        <div class="w-96 bg-base-100 shadow-xl">
          <div class="w-full aspect-w-4 aspect-h-3">
            <img
              src={tensor}
              alt="Lineplot"
              class="object-cover w-full h-full" />
          </div>
          <div class="p-4">
            <h2 class="text-xl font-bold mb-2">Tensorflow regression</h2>
            <p class="text-base">
            Linear regression is like drawing a straight line through a cloud of points on a graph to show the general trend, 
            helping you make predictions about new points in the same area.
            </p>
            <div class="flex justify-end mt-4">
              <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <Link to="/tensor">Gebruik</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* <div>
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

      </div> */}
      </>


)
}
