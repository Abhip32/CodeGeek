import React from "react";
import "./CardItem.scss";

const CardItem = (props) => {
  console.log("hger");
  const { objProp } = props;
  console.log(props);
  const { level, applyGradient, price,duration, para1, para2, btnDark, tick } = objProp;
  return (
    <div className="card__item">
      <div className={`card__item--title ${applyGradient}`}>
        <h2>{level}</h2>
      </div>
      <div className="card__item--pricing">
        <div>
          <h1>${price} for {duration}</h1>
          <p>{para1}</p>
          <p>{para2}</p>
        </div>
      </div>
      <div className="card__item--btn-ul">
      
        <ul>
          <li>{tick ? "✔️" : "❌"} Practice Problems</li>
          <li>{tick ? "✔️" : "❌"} Give Exam</li>
          <li>✔️ Use Compilers</li>
        </ul>
      </div>
    </div>
  );
};

export default CardItem;
