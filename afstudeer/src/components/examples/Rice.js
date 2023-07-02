import React, { useState, useEffect } from "react";
import Papa from 'papaparse';


export default function Rice() {

  const [data, setData] = useState([]);
  //const [Json, setJson] = useState([]);
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [headerValues, setHeaderValues] = useState([]);
   
    const handleCsvUpload = (event) => {
    
      const file = event.target.files[0];
      
      console.log(file);
      console.log("1");
      Papa.parse(file, {
          header: true,
          dynamicTyping: true,
          complete: function (results) {
  
            results.data.map((o) => { o["isChecked"] = false; });
            // console.log("result1: " + results.data)
          const jsonData = JSON.stringify(results.data);
          console.log("result2: " + jsonData);
          const data = results.data;
          const csvHeaders = Object.keys(results.data[0]);
          //const Json = JSON.stringify(results.data);

          var headerValues = csvHeaders.map((header) =>
            results.data.map((row) => row[header])
          );

          
      
        console.log("2");

          //logt de headers
          //console.log('CSV Headers:', Object.keys(results.data[0]));
          setData(data);
          //setJson(Json);
          setCsvHeaders(csvHeaders); 
          setHeaderValues(headerValues);

        }
      });
     

    };
    console.log("3");
    console.log("data1:" + data);
    //console.log("data1:" + Json);
    console.log("data2:" + csvHeaders);
    console.log("data3:" + headerValues); 
    console.log("4");



  return ( <div className="upload">

  <input type="file" accept=".csv" onChange={handleCsvUpload} />
  </div>
  )
}




