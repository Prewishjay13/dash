import React, { useState, useEffect } from "react";
import Papa from 'papaparse';

export default function Rice() {


  React.useEffect(() => {
    const loadData = () => {
      Papa.parse('.Data.csv', {
        // download: true,
        header: true,
        dynamicTyping: true,
        complete: function (results) {

          console.log("hi")
          console.log("result: " + results.object.data)
           const jsonData = JSON.stringify(results.object.data);
          console.log("result: " + jsonData);

          console.log('CSV Headers:', Object.keys(results.data[0]));
       
          
        }
      });
    };

    loadData();
  }, [])
  return <div>Rice Component</div>;
}




