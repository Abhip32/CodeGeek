import {React, useState} from 'react'
import "./SignUp.scss";
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";
import Axios from 'axios';
import "./Buysubscription.scss"
import {AiFillWarning} from "react-icons/ai"
import CardItem from "./CardItem"
import {
    AiOutlineMail,
    AiOutlineUpload,
    AiFillPhone,
    AiFillInfoCircle,
    AiOutlineUser
} from "react-icons/ai"
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import CardContainer from './CardContainer';
import { useEffect } from 'react';


function Login() {
    const [img, setImg] = useState("");
    const [index, setIndex] = useState(0);
    const [data, setData] = useState([]);
    const [cardholder,setCardholder]=useState("CARD HOLDER NAME");
    const [cardnumber,setCardNumber]=useState("CARD NUMBER");
    const [EXPMM,setEXPMM]=useState("MM");
    const [EXPYY,setEXPYY]=useState("YY");
    const [CVV,setCVV]=useState("CVV");
    const [plans,setPlans]=useState([]);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    const [id, setId] = useState("");
    const [subscription, setSubscription] = useState("");
    const [email, setemail] = useState("");
    const [pic, setpic] = useState("");
    const [amount, setamount] = useState("");
    const [date, setdate] = useState(Date.now());
    const [status,setStatus]=useState([]);
    const cn = document.getElementById("crdnum");
    let navigate = useNavigate();
    let location = useLocation();

    const cardNumberInput = document.querySelector(".card-number-input");
    const cardHolderInput = document.querySelector(".card-holder-input");
    const cardMonthInput = document.querySelector(".card-month-input");
    const cardYearInput = document.querySelector(".card-year-input");
    const cardCVCInput = document.querySelector(".card-cvc-input");

    const frontCard = document.querySelector(".Front_card");
const backCard = document.querySelector(".back_card");

    


    const setTransaction = (e) => {
      e.preventDefault();
      if(cardnumber!=""&&cardholder!=""&&id!=""&&date!=""&&subscription!=""&&cardnumber.length==19&&cardholder.length>5)
      {
        Axios.post(`http://localhost:8000/InsertTransaction`,{
          cardno:cardnumber,
          cardhld:cardholder,
          userid:id,
          date:date,
          type:subscription
  
  
        }).then((res)=>
        {
          setSubscriptions(e);
          navigate("/Login", {state: {result:"Subscribed Successfully !"}});
        })
      }


      if(cardnumber==""||cardholder==""||id==""||date==""||subscription==""||CVV=="")
      {
        setStatus("Please fill all the fields")
      }

      else if(cardnumber.length!=19)
      {
        console.log(cardnumber.length)
        setStatus("Invalid card number")
      }

      else if(cardholder.length<6)
      {
        setStatus("Invalid card holder name")
      }

      else if(EXPMM.length!=2||EXPYY.length!=2)
      {
        setStatus("Invalid Card Expiration Date")
      }
      

    }

    

    






    useEffect(() => {
      Axios.post(`http://localhost:8000/getPlans`,{
  
      }).then((res)=>{
        console.log(res.data)
        setPlans(res.data);
      })
   }, []);

    const setSubscriptions = (e) => {
      e.preventDefault();
      console.log("Subscription");
      Axios.post("http://localhost:8000/addSubscription",
      {
          user:location.state.username,
          id:id,
          date:date,
          type:subscription
      })

    }



    Axios.post("http://localhost:8000/getUserInfoall",
    {
        user:location.state.username
    }).then((res)=>
    {
        setId(res.data.id);
        setemail(res.data.email);
        setpic(res.data.pic); 
    })

    const cardFlip = (value) => {
      
        setCVV(value)
        cardCVCInput.addEventListener("mouseenter", () => {
          frontCard.style.transform = "perspective(1000px) rotateY(-180deg)";
          backCard.style.transform = "perspective(1000px) rotateY(0deg)";
        });
        cardCVCInput.addEventListener("mouseleave", () => {
          frontCard.style.transform = "perspective(1000px) rotateY(0deg)";
          backCard.style.transform = "perspective(1000px) rotateY(180deg)";
        });
      
    };


    return (
        <div>
            <div style={{margin:"20px",width:"80vw",height:"min-content",marginLeft:"auto",marginRight:"auto",background: "linear-gradient(to right, #00b4db, #0083b0)",color:"white",padding:"20px",borderRadius:"20px"}}>
            <h1 style={{marginLeft:"auto",marginRight:"auto"}}>Payment For Subscription</h1>
              <h2>Your Details from Database</h2>
              <img src={pic} style={{width:"100px",height:"100px",borderRadius:"100px"}}/>
              <h4>Name : {location.state.username}</h4>
              <h4>User ID : {id}</h4>
              <h4>Email : {email}</h4>
             
            
            </div>
           <br/>
            <h3 style={{marginLeft:"8vw"}}>Plans :</h3>
            <div style={{padding:"20px", display:"flex",gap:"20px",marginLeft:"5vw",marginRight:"auto"}}>
            
      { plans.map((item,index) => 
            (
                <CardItem objProp={{
                    level: item.level,
                    applyGradient: item.applyGradient,
                    price: item.price,
                    para1: item.para1,
                    para2: item.para2,
                    btnDark: item.btnDark,
                    tick: item.tick,
                    type:"User"
                  }}/>
            ))}
      </div>

      <br/>
      
      <h3 style={{marginLeft:"13vw"}}>Payment  :</h3>
            <div>
            <div class="cc__main__container">
    <div class="form__container">

      <div class="card__main">
        <div class="Front_card">
          <div class="top_card">
            <span class="visa">VISA</span>
            <div class="logo">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="middle_card">
            <span class="chip"></span>
            <div class="card_number">{cardnumber}</div>
          </div>
          <div class="bottom_card">
            <div class="card_info">
              <div class="card_holder_name">{cardholder}</div>
            </div>
            <div class="card_info">
              <div class="card_holder_info">
                <span class="expire_month">{EXPMM}</span>
                <span>/</span>
                <span class="expire_year">{EXPYY}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="back_card">
          <div class="top_card">
            <span class="black_strip"></span>
            <div class="cvc_strip">
              <span class="cvc_number">{CVV}</span>
            </div>
          </div>
          <div class="bottom_card">
            <div class="flex">
              <span class="sticker"></span>
              <div class="logo1">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form action="">
        <div class="inputBox">
          <span>card holder name</span>
          <input type="text" maxlength="30" class="card-holder-input" placeholder="CARD HOLDER NAME" onChange={(e)=>setCardholder(e.target.value)} />
        </div>
        <div class="inputBox">
          <span>card number</span>
          <input type="text" maxlength="16" class="card-number-input" id="crdnum" placeholder="0000 0000 0000 0000" onChange={(e)=>setCardNumber(e.target.value.replace(/\d{4}(?=.)/g, "$& "))} />
        </div>

        <div class="multi__box">
          <div class="inputBox" onChange={(e)=>setEXPMM(e.target.value)}>
            <span>exp. (MM)</span>
            <input type="text" maxlength="2" class="card-month-input" placeholder="00" />
          </div>
          <div class="inputBox" onChange={(e)=>setEXPYY(e.target.value)}>
            <span>exp. (YY)</span>
            <input type="text" maxlength="2" class="card-year-input" placeholder="00" />
          </div>
          <div class="inputBox" onChange={(e)=>cardFlip(e.target.value)}>
            <span>CVC</span>
            <input type="text" maxlength="3" class="card-cvc-input" placeholder="000"/>
          </div>
        </div>
        <br/>
        <br/>
        <span>Type of Subscription : </span>
        <select onChange={e=>setSubscription(e.target.value)} style={{padding:"15px",backgroundColor: "rgb(232, 240, 254)",border:"none",borderRadius:"20px",width:"80%"}}>
                            <option value="Basic">Select Plan Here</option>
                            <option value="Basic">Basic</option>
                            <option value="Lite">Lite</option>
                            <option value="Pro">Pro</option>
                </select>
        <br/>
        <br/>
       <div style={status.length == 0 ?{display:"none"}:{backgroundColor:"rgb(232, 240, 254)",borderRadius:"20px",padding:"30px"}}>
                            <h1 style={{color:"#2196f3",fontWeight:"900"}}><AiFillWarning style={{color:"red"}}/> Oops !!</h1>
                            <br/>
                            <ul>
                                <li>
                                    <h5 style={{color:"red",fontWeight:"700"}}>{status}</h5>
                               </li>
                            </ul>

        </div>
        <br/>
        <button onClick={(e)=>setTransaction(e)} style={subscription=="Basic" ? {display:"block",padding:"10px",borderRadius:"20px",backgroundColor:"#2196f3",fontWeight:"900",color:"white"}:{display:"none"}}> {subscription=="Basic"&&<h4>Pay Securely 200</h4>}</button>
        <button onClick={(e)=>setTransaction(e)} style={subscription=="Lite" ? {display:"block",padding:"10px",borderRadius:"20px",backgroundColor:"#2196f3",fontWeight:"900",color:"white"}:{display:"none"}}> {subscription=="Lite"&&<h4>Pay Securely 400</h4>}</button>
        <button onClick={(e)=>setTransaction(e)} style={subscription=="Pro" ? {display:"block",padding:"10px",borderRadius:"20px",backgroundColor:"#2196f3",fontWeight:"900",color:"white"}:{display:"none"}}> {subscription=="Pro"&&<h4>Pay Securely 1000</h4>}</button>
      </form>
    </div>
  </div>
              

            </div>
          
        </div>
    )
}

export default Login
