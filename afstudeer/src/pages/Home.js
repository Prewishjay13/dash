import React from "react";
// import { Link } from "react-router-dom";
// import * as tf from "@tensorflow/tfjs";
// import Papa from "papaparse";
import "../style.css";

export default function Home() {
  return (
    <>
      <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-3xl font-bold mb-4">Welcome to the Machine Learning Portal!</h1>
        <p class="text-center mb-2">
        This website allows you to train and utilize machine learning models with your own data.
        </p>
        <p class="text-center">
          Zorg wel ervoor dat je data bestand geen lege velden bevat.
        </p>
        <div className="card ">
       <h2 className="text-center font-bold pt-6">Before you upload your dataset make sure of the following:</h2> 
        <ul class="list-disc">
            <li>Make sure the file format is .csv, in the future other file formats will be added.</li>
            <li>Ensure your dataset is well-prepared and free from missing values, so no: empty values, N/A or symbols to fill empty spaces</li>
            <li>Feel free to explore and experiment with the different algorithms.</li>
            <li>Remember that practice and experimentation are key to mastering machine learning.</li>
        </ul>
        </div>
      </div>
    </>
  );
}
