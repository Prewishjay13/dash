import React from "react"

//regel 8 if statement als titels bestaat render de div met de titel extra vb:
// {props.openSpots === 0 && <div className="card--badge">SOLD OUT</div>}
//als openSpots = 0 render de div 

function Post(props) {
    return (
        <div>
            {props.titels && <h3>Title: {props.titels}</h3>}
            <p>Text: {props.text}</p>
            <hr />
        </div>
    )
}
export default Post;

