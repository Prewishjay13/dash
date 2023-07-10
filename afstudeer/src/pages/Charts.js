import React from "react";
import "../style.css";
//import ReactDOM from 'react-dom/client';
import { Link } from "react-router-dom";
import scatter from "../images/scatter.png";
import line from "../images/line.png";

function Charts() {
  return (
    <div class="flex items-center justify-center h-screen">
      <div class="flex space-x-4">
        <div class="w-96 bg-base-100 shadow-xl">
          <div class="w-full aspect-w-4 aspect-h-3">
            <img
              src={scatter}
              alt="Scatterplot"
              class="object-cover w-full h-full"
            />
          </div>
          <div class="p-4">
            <h2 class="text-xl font-bold mb-2">Scatterplot</h2>
            <p class="text-base">
              If a dog chews shoes, whose shoes does he choose?
            </p>
            <div class="flex justify-end mt-4">
              <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <Link to="/scatterplot">Gebruik</Link>
              </button>
            </div>
          </div>
        </div>
        <div class="w-96 bg-base-100 shadow-xl">
          <div class="w-full aspect-w-4 aspect-h-3">
            <img
              src={line}
              alt="Lineplot"
              class="object-cover w-full h-full"
            />
          </div>
          <div class="p-4">
            <h2 class="text-xl font-bold mb-2">Lineplot</h2>
            <p class="text-base">
              If a dog chews shoes, whose shoes does he choose?
            </p>
            <div class="flex justify-end mt-4">
              <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <Link to="/lineplot">Gebruik</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charts;
