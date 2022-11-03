import React,{useState} from "react";
import "./CardItem.scss";
import Axios from "axios";

const CardItem = (props) => {
  console.log("hger");
  const { objProp } = props;
  console.log(props);
  const { level, applyGradient, price,duration, para1, para2, btnDark, tick, type } = objProp;

  const [pricez, setpricez] = useState("");
  const [durationz, setdurationz] = useState("");
  const [status,setStatus] = useState("");

  const update= (lvl,prc,dur) =>{
    if(pricez!=""&&durationz!="")
    {
          Axios.post(`http://localhost:8000/upPlans`,
        {level:lvl,
        duration:durationz,
        price:pricez
      }).then((res)=>{
        setStatus("Updated");
      })

    }
    else{
      setStatus("Missing Fields")
    }
   

 }

  if(type=="User")
  {
    return (
      <div className="card__item">
      
        <div className={`card__item--title ${applyGradient}`}>
  
          <h2>{level}</h2>
        </div>
        <div className="card__item--pricing">
          <div>
            <h1>{price + " ₹ "} for {duration}</h1>
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
  }


  
  if(type=="Admin")
  {
    return (
      <div className="card__item">
        <div className={`card__item--title ${applyGradient}`}>
        <h2 style={status=="Updated" ? {color:"green"}:{color:"red"}}>{status}</h2>
  
          <h2 id="level" value={level} >{level}</h2>
        </div>
        <div className="card__item--pricing">
          <div>
            <h2><input id="price"  onChange={(e)=>{setpricez(e.target.value)}} placeholder={price+ " ₹ "} style={{width:"40%",borderRadius:"20px",textAlign:"center",border:"none"}}/> <br/>for <br/><input onChange={(e)=>{setdurationz(e.target.value)}} id="duration"  placeholder={duration} style={{width:"60%",borderRadius:"20px",textAlign:"center",border:"none"}}/></h2>
            <p>{para1}
                <br/>
                {para2}
            </p>
          </div>
        </div>
        <div className="card__item--btn-ul">
          <ul>
            <li>{tick ? "✔️" : "❌"} Practice Problems</li>
            <li>{tick ? "✔️" : "❌"} Give Exam</li>
            <li>✔️ Use Compilers</li>
          </ul>
        </div>
        <button style={{width:"50%",backgroundColor:"black",borderRadius:"30px",color:"white",margin:"15 px",padding:" 15px 0",fontSize:"2vh",fontWeight:"600",cursor:"pointer",boxShadow:"1px 1px 20px violet",marginBottom:"20px"}} onClick={()=>update(level,price,duration)}>Update</button>
      </div>
      
    );
  }
  
};

export default CardItem;
