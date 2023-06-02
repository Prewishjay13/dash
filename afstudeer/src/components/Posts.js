import React from "react";
import Post from "./posts/Post";
import Data from "../data/Data";

const dataElements = Data.map(data => {
    return <Post titels={data.titel} text={data.text} />
})

function Posts () {

return (
    <div>
        {dataElements}
    </div>
)

}
export default Posts;