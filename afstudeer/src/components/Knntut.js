import React from "react";

export default function Knntut(){

    return( <>
        <div class="flex flex-col items-center justify-center h-screen">
          <h1 class="text-3xl font-bold mb-4">KNN en klassificatie</h1>
          <p class="text-center mb-2">
         Voor dat wij uitleg geven over KNN is het belangrijk dat klassificatie uitgelegd wordt.
          </p>
          <p class="text-center">
            Hierna zullen wij KNN uitleggen.
          </p>
          <div className="card ">
         <h2 className="text-center font-bold pt-6">Wat is klassificatie?</h2> 
          <p class="text-center">
            Klassificatie is in de Machine Learning wereld het nagaan in welk groep een bepaald variable ligt. Denk aan bijvoorbeeld katten en honden
            </p>
            
            <p>
            als je een dataset hebt met afmetingen van verschillende katten en honden en een model met deze afmetingen traint.
          </p>
          <p>
            Krijg je een model waarin je aan de hand van welke afmetingen je invult kan dat model na gaan of je met een kat of hond te maken hebt.
          </p>
          <p>
            Dit is vooral handig als een persoon zelf niet weet en alleen de afmetingen bij de hand heeft.
            </p>
            <p>
            Zo een model kan ook getraind worden voor bijvoorbeeld om na te gaan of iemand diabetes heeft of niet, of een bepaald voertuig geserviced moet worden of niet.
            </p>
          </div>
        </div>
      </>)
}