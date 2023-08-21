import React from "react";

export default function Customer(){

    return( <>
        <div class="flex flex-col items-center justify-center h-screen">
          <h1 class="text-3xl font-bold mb-4">Customer targeting met Machine Learning</h1>
          <p class="text-center mb-2">
          Met Machine Learning kan je op basis van leeftijd, gender, interesses speciefieke klanten bereiken.
          </p>
          <p class="text-center">
            Dit maakt het mogelijk marketings strategieen te bedenken voor specifieke doelgropen.
          </p>
          <div className="card ">
         <h2 className="text-center font-bold pt-6">Hoe werkt het?</h2> 
          <p class="text-center">
            Door het trainen van een model op basis van leeftijd, gender, interesses en andere kenmerken met data. Is het mogelijk
            om een model te trainen dat ervoor zorgt 
            </p>
            
            <p>
            dat kan berekenen hoeveel interesser voor een bepaald produkt zal zijn.
          </p>
          </div>
        </div>
      </>)
}