import React from "react";

function Models () {

    const h = "hello";
    const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"]
    
    //react renders each item from an array automatically
    return(
        <div>
            <h>{h}</h>
            <p>{colors}</p>
        </div>
    )
}

export default Models;