import React from "react"

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

