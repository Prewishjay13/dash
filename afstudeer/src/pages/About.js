import React from "react";
import { Link } from "react-router-dom";
import "../style.css";
import health from "../images/health.png"
import finance from "../images/finance.png"
import retail from "../images/retail.png"
export default function About() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-wrap space-x-4 pt-8">
          <Card
            image={health}
            title="Health and Lifestyle"
            content=""
            link="/health"
          />
              <Card
            image={finance}
            title="Finance & Marketing"
            content=""
            link="/finance"
          />
          
          <Card
            image={retail}
            title="Retail"
            content=""
            link="/retail"
          />
          {/* Add more Card components here */}
        </div>
      </div>
    </>
  );
}

function Card({ image, title, content, link }) {
  return (
    <div className="w-96 bg-base-100 shadow-xl p-4">
      <div className="w-full aspect-w-4 aspect-h-3">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-base">{content}</p>
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <Link to={link}>Read more</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
