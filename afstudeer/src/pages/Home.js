import React, { useState } from "react";
import { Link } from "react-router-dom";
// import * as tf from "@tensorflow/tfjs";
// import Papa from "papaparse";
import "../style.css";

export default function Home() {
  return (
    <>
      <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-3xl font-bold mb-4">Welcome!</h1>
        <p class="text-center mb-2">
          Op deze website kan met je data een Machine model trainen en
          gebruiken!
        </p>
        <p class="text-center">
          Zorg wel ervoor dat je data bestand geen lege velden bevat.
        </p>
        <div className="card ">
       <h2 className="text-center font-bold pt-6">Waarschuwing ofzo</h2> 
        <ul class="list-disc">
          <li>Now this is a story all about how, my life got flipped-turned upside down</li>
          <li>Now this is a story all about how, my life got flipped-turned upside down</li>
          <li>Now this is a story all about how, my life got flipped-turned upside down</li>
          <li>Now this is a story all about how, my life got flipped-turned upside down</li>
        </ul>
        </div>
      </div>
    </>
  );
}
