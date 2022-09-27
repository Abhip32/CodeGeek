import React from "react";
import "./CardContainer.scss";
import CardItem from "./CardItem";
import Axios from "axios";


Axios.post(`http://localhost:8000/getPlans`,{
      }).then((res)=>
      {
        allCardsInfo=res.data;
        console.log(allCardsInfo);
      })

var allCardsInfo = [
  {
    level: "FREE",
    applyGradient: "blueGradient",
    price: 0,
    para1: "Great for Staters",
    para2: "Discover how to create your first projects.",
    btnDark: false,
    tick: false,
  },
  {
    level: "LITE",
    applyGradient: "purpleGradient",
    price: 7,
    para1: "For Planned Projects",
    para2: "Bring your designs to the next level and export them.",
    btnDark: true,
    tick: true,
  },
  {
    level: "PRO",
    applyGradient: "orangeGradient",
    price: 12,
    para1: "For Professional Use",
    para2: "Enjoy limitless use with interactive export options",
    btnDark: false,
    tick: true,
  },
];
const CardContainer = () => {
  
  return (
    <div className="card__container">

      {allCardsInfo.map((singleCard) => {
        return <CardItem objProp={singleCard} key={singleCard.level} />;
      })}

      
    </div>
  );
};

export default CardContainer;
