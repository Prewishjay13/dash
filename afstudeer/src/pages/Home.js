import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import Papa from "papaparse";
import "../style.css";

export default function Home() {
  
return(  
<div className="home">
<div><h1>Welcome!</h1></div>
<p>Op deze website kan met je data een Machine model trainen en gebruiken!</p>
<p>Zorg wel ervoor dat je data bestand geen lege velden bevat.</p>
  </div>
  );

}
 