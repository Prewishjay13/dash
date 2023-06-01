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


// export default function Card(props) {
//     let badgeText
//     if (props.openSpots === 0) {
//         badgeText = "SOLD OUT"
//     } else if (props.location === "Online") {
//         badgeText = "ONLINE"
//     }
    
//     /*
//     Challenge:
//     1. Display the correct text in the badge based on the logic above
//     2. Only display the badge if badgeText has a value
//     */
    
//     return (
//         <div className="card">
//             {badgeText && <div className="card--badge">{badgeText}</div>}

//vb2
// export default function App() {
//     const cards = data.map(item => {
//         return (
//             <Card
//                 key={item.id}
//                 item={item}
//             />
//         )
//     })        
    
//             // <Hero />
//     return (
//         <div>
//             <Navbar />
//             <section className="cards-list">
//                 {cards}
//             </section>
//         </div>
//     )
// // }

// export default function Card(props) {
//     let badgeText
//     if (props.item.openSpots === 0) {
//         badgeText = "SOLD OUT"
//     } else if (props.item.location === "Online") {
//         badgeText = "ONLINE"
//     }
    
//     /*
//     Challenge: Fix our component! 😱
//     */
    
//     export default function Card(props) {
//         let badgeText
//         if (props.item.openSpots === 0) {
//             badgeText = "SOLD OUT"
//         } else if (props.item.location === "Online") {
//             badgeText = "ONLINE"
//         }
        
//         /*
//         Challenge: Fix our component! 😱
//         */
        
//         return (
//             <div className="card">
//                 {badgeText && <div className="card--badge">{badgeText}</div>}
//                 <img src={`../images/${props.item.coverImg}`} className="card--image" />
//                 <div className="card--stats">
//                     <img src="../images/star.png" className="card--star" />
//                     <span>{props.item.stats.rating}</span>
//                     <span className="gray">({props.item.stats.reviewCount}) • </span>
//                     <span className="gray">{props.item.location}</span>
//                 </div>
//                 <p className="card--title">{props.item.title}</p>
//                 <p className="card--price"><span className="bold">From ${props.item.price}</span> / person</p>
//             </div>
//         )
//     }