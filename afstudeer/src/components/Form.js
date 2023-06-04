import React from "react";
import "../style.css"

function Form() {
return (
    <main>
        <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                />
                <button 
                    className="form--button"
                >
                    Predict
                </button>
            </div>
</main>
)
}

export default Form;