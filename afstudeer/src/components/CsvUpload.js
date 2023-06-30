import React from 'react';
const csv = require('csv-parser')
const fs = require('fs')
const results = [];




 

  export default function Upload() {

    fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log(results);
    });
   
    return (
            <div>
                <h>hi</h>
            </div>
    )

  } 
