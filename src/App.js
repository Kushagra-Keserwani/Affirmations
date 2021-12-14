import React, { useState } from 'react';
// eslint-disable-next-line

// FOR FRONT END PART 
import './App.css';
import le from './Images/LE.png';
import el from './Images/EL.png';
import playfooter from './Images/Notch@2x.png';
import doingBest from './Images/Cup@2x03.png';
import load from './load.svg';
import leaf from './Images/Plant@2x.png';
import v from './Images/LevelCircle0.png';




// FOR BACKEND
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_BASE_URL = "https://affirmationbackend.herokuapp.com";





function App(props) {

  // Frontend states
  const[count, setCount] = useState(0);
  const[playClick, setPlayClick] = useState(1);
  const[reloadClick, setReloadClick] = useState(1);

  // Backend States

  const [inputValue, setInputValue] = useState("");
  const [resultval, setResultVal] = useState();
  const [type, setType] = useState("");
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tried, setTried] = useState(false);
  const [feedbackDone, setFeedbackDone] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [resultLength, setResultLength]=useState(0);
  const [email, setEmail] = useState("");
  // Current uid is a uid provided to user for some particular search
  const [current_uid, setCurrent_uid] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const checkLength = (val) => {
    if(val!==null && val!==undefined){
    //console.log(val.length);
    setResultLength(val.length);
    }
  }

  const searchViaType = async (e) => {
    e.preventDefault();
    if (type=="" || inputValue=="") {
      noTextWarning();
      document.getElementsByClassName("active")[0].classList.remove("active");
    }
    else {
      setIsCategorySelected(true);
      setLoading(true);
      var api = `${API_BASE_URL}/type`;
      var data = await axios.get(api, {
        headers: {
          type: type,
          search_query: inputValue
        },
      });
      await setResultVal(data);
      
      //Setting tried named state to check if user has tried something or not, so that we can take positive or negative review from the user
      await setTried(true);
      await setLoading(false);
      await updateUserActivity(data);
      // await setResultLength(resultval?.data[0]?.answer.length);
      // console.log(resultLength);
       checkLength(resultval?.data[0]?.answer);
      //console.log(resultLength);
     
    



    //FRONTEND
    let img = document.getElementById("doingimg");

    if ((playClick + reloadClick) % 2 === 0) {
      setPlayClick((previousValue) => {
        return previousValue + 1
      })

      if (window.innerWidth >= 1025) {
        
          return (
            img.style.transform = "translateY(-65%)",
            img.style.transition = "transform 0.25s linear",
            img.setAttribute("src", doingBest),
            img.classList.remove("img-adjust"),
            document.getElementById("reloadbtn").style.visibility = "visible",
            document.getElementById("like").style.visibility = "visible",
            document.getElementById("unlike").style.visibility = "visible",
            document.getElementById("invisiblePara1").style.visibility = "visible",
            document.querySelector("hr").style.visibility = "visible"
          );
        
      }

      else if (window.innerWidth >= 641 && window.innerWidth <= 1024) {
        

          return(
          img.style.height = "30%",
          img.style.transition = "height 0.25s linear",
          img.style.objectFit= "cover",
          img.style.objectPosition = "0% 80%",
          
          // img.style.transform = "translateY(-60%)",
          // img.style.transition = "transform 0.25s linear",
          // img.style.zIndex="-1",
          img.setAttribute("src", doingBest),
          img.classList.remove("img-fluid"),
          img.style.width="100%",
          document.getElementById("reloadbtn").style.visibility = "visible",
          document.getElementById("like").style.visibility = "visible",
          document.getElementById("unlike").style.visibility = "visible",
          document.getElementById("invisiblePara1").style.visibility = "visible",
          document.getElementById("invisiblePara1").classList.add("vertical-center"),
          document.querySelector("hr").style.visibility = "visible"

          );
        
      }

      else if (window.innerWidth < 640) {
        

          return(
          img.style.height = "23%",
          img.style.width="100%",
          img.style.transition = "height 0.25s linear",
          img.style.objectFit= "cover",
          img.style.objectPosition = "0% 80%",
          // img.style.transform = "translateY(-60%)",
          // img.style.transition = "transform 0.25s linear",
          // img.style.zIndex="-1",
          img.setAttribute("src", doingBest),
          img.classList.remove("img-fluid"),
          document.getElementById("reloadbtn").style.visibility = "visible",
          document.getElementById("like").style.visibility = "visible",
          document.getElementById("unlike").style.visibility = "visible",
          document.getElementById("invisiblePara1").style.visibility = "visible",
          document.getElementById("invisiblePara1").classList.add("vertical-center"),
          document.querySelector("hr").style.visibility = "visible"
          );
        
      }
    }
    else if ((playClick + reloadClick) % 2 !== 0) {
      setPlayClick((previousValue) => {
        return previousValue + 1
      })

      if (window.innerWidth >= 1025) {
        
        return(
        document.getElementById("doingimg").setAttribute("src", leaf)
        );
      
    }
    if (window.innerWidth >= 641 && window.innerWidth <= 1024) {
     
      return(
      document.getElementById("doingimg").setAttribute("src", leaf)
      );
    
    }
    else {
      

      return(
      document.getElementById("doingimg").setAttribute("src", leaf)
      );
    
    }

      // if (window.innerWidth >= 1025) {
        
      //     return(
      //     img.style.transform = "translateY(-60%)",
      //     img.style.transition = "transform 0.25s linear",
      //     document.getElementById("doingimg").setAttribute("src", leaf)
      //     );
        
      // }

      // else if (window.innerWidth >= 641 && window.innerWidth <= 1024) {
    
      //     return(
      //     img.style.height = "50%",
      //     img.style.transition = "height 0.25s linear",
      //     document.getElementById("doingimg").setAttribute("src", leaf)
      //     );
        
      // }

      // else if (window.innerWidth < 640) {
       
      //     return(
      //     img.style.height = "55%",
      //     img.style.transition = "height 0.25s linear",
      //     document.getElementById("doingimg").setAttribute("src", leaf)
      //     );
        
      // }
    }
  } 
  };




  function onHeadClick() {
    setCount((previousValue) => {
      return previousValue + 1
    })
  }

  

  const searchViaTypeAgainOnReload = async () => {

    if (isCategorySelected) {
      setLoading(true);
      var api = `${API_BASE_URL}/type`;
      var data = await axios.get(api, {
        headers: {
          type: type,
        },
      });
     setResultVal(data);
     setLoading(false);
     checkLength(resultval?.data[0]?.answer);
    console.log(resultLength);
    } else {
      setIsCategorySelected(false);
    }

   


    if ((playClick + reloadClick) % 2 !== 0) {

      setReloadClick((previousValue) => {
        return previousValue + 1
      });
     
      if (window.innerWidth >= 1025) {
        
          return(
          document.getElementById("doingimg").setAttribute("src", leaf),
          document.getElementById("reloadimg").style.transform = "rotate("+ (reloadClick-1)*360 +"deg)",
          document.getElementById("reloadimg").style.transition = "transform 0.5s linear"
          // document.getElementById("reloadimg").style.transform = "rotate(0deg)"
          );
        
      }
      if (window.innerWidth >= 641 && window.innerWidth <= 1024) {
       
        return(
        document.getElementById("doingimg").setAttribute("src", leaf),
        document.getElementById("reloadimg").style.transform = "rotate("+ (reloadClick-1)*360 +"deg)",
        document.getElementById("reloadimg").style.transition = "transform 0.5s linear"
        // document.getElementById("reloadimg").style.transform = "rotate(360deg)",
        // document.getElementById("reloadimg").style.transition = "transform 0.25s linear"
        );
      
      }
      else {
        

        return(
        document.getElementById("doingimg").setAttribute("src", leaf),
        document.getElementById("reloadimg").style.transform = "rotate("+ (reloadClick-1)*360 +"deg)",
        document.getElementById("reloadimg").style.transition = "transform 0.5s linear"
       
        );
      
      }

    }

    else if ((playClick + reloadClick) % 2 === 0) {
      setReloadClick((previousValue) => {
        return previousValue + 1
      });
     
      if (window.innerWidth >= 1025) {
        return(
        document.getElementById("doingimg").setAttribute("src", doingBest),
        document.getElementById("reloadimg").style.transform = "rotate("+ (reloadClick-1)*360 +"deg)",
        document.getElementById("reloadimg").style.transition = "transform 0.25s linear"
        );
      }
      if (window.innerWidth >= 641 && window.innerWidth <= 1024) {
        
          return(
          document.getElementById("doingimg").setAttribute("src", doingBest),
          document.getElementById("reloadimg").style.transform = "rotate("+ (reloadClick-1)*360 +"deg)",
          document.getElementById("reloadimg").style.transition = "transform 0.25s linear"
          );
        
      }
      else {
        
          return(
          document.getElementById("doingimg").setAttribute("src", doingBest),
          document.getElementById("reloadimg").style.transform = "rotate("+ (reloadClick-1)*360 +"deg)",
          document.getElementById("reloadimg").style.transition = "transform 0.25s linear"
          );
        
      }
    }


  };
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const validEmail = () =>{
    toast.success("🎉  You have been subscribed " ,{
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      transition: Slide
    });
  }
  const invalidEmail = () =>{
    toast.warning("❌   Please enter a valid E-mail" ,{
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      transition: Slide
    });
  }
  const categoryNotSelectedWarning = () =>{
    toast.warning(' Please select a Category', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      transition: Slide
    });
  }
  const noTextWarning = () =>{
    toast.warning('Enter text and then select a category', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      transition: Slide
    });
  }
  const notify = () => {
    toast.warning('🚀  Thank you for the feedback! ', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
      transition: Slide
    });
  }




  const like = async () => {
    var api = `${API_BASE_URL}/it_worked`;
    var data = await axios.get(api, {
      headers: {
        id: resultval.data[0].id,
      },
    });
    setTried(false);
    setFeedbackDone(true);
    setItWorks();
  };

  const unlike = async () => {
    var api = `${API_BASE_URL}/not_worked`;
    var data = await axios.get(api, {
      headers: {
        id: resultval.data[0].id,
      },
    });
    setTried(false);
    setFeedbackDone(true);
    notWorks();
  };

  //Sending User Activity
  const updateUserActivity = async (data) => {
    var res_data = data
    var uid = await uuidv4();
    var api = `${API_BASE_URL}/add_user_activity`;
    var data = await axios.get(api, {
      headers: {
        result: res_data.data[0].answer,
        search_query: inputValue,
        uid: uid
      },
    });
    setCurrent_uid(uid)
  }

  const setItWorks = async () => {
    var uid = current_uid;
    var api = `${API_BASE_URL}/it_works`;
    var data = await axios.get(api, {
      headers: {
        uid: uid
      },
    });
  }

  //Not works
  const notWorks = async () => {
    var uid = current_uid;
    var api = `${API_BASE_URL}/not_works`;
    var data = await axios.get(api, {
      headers: {
        uid: uid
      },
    });
  }

  function subscribe() {
    if(validateEmail(email)){
    var value = email;
    var api = `${API_BASE_URL}/add/subscriber`;
    var data = axios.get(api, {
      headers: {
        email: email
      },
    });
    setSubscribed(true);
    validEmail();
  }else{
    invalidEmail();
  }
  }
  var text1=window.innerWidth<=641;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-7 col-lg-7 col-custom col-md-12 col-12 col-sm-12">
          <nav className="navbar navbar-light">
            <div className="container">
              <a className="navbar-brand" href="/">
                <h1 id="branding">
                  <img src={le} alt="" id="levelLE" />
                  <img src={v} alt="" id="levelV" />
                  <img src={el} alt="" id="levelEL" />
                  </h1>

              </a>
            </div>
          </nav>
          <br />
          <p id="subhead">Change your thoughts {text1?<br/>:""}and you can change your world.</p>
          <h2 id="head" >Let's turn your thoughts<br />into an <span id="affirmation" onClick={onHeadClick}>affirmation</span>.</h2>
          {
            (count % 2 !== 0)
              ?
              <p id="affir_para">
                <button id="close" onClick={onHeadClick}>X</button>
                <br />Affirmations are kind statements that encourage you to look at the world & ourselves from a different perspective. When you repeat them often, and believe in them, you can start to make changes in your mindset, your thoughts & your world.</p>
              :
              <></>
          }
          <br />
          <form onSubmit={searchViaType}>
            <div className="field-wrapper floating mb-3" id="before-input">
            <label htmlFor="floatingInput">Type here, what's weighing you down?
              </label>
              <input type="text"  value={inputValue} onChange={(text) => {
                setInputValue(text.target.value);
              }} onKeyPress={(event)=>{ 
                if(event.key=="Enter" && type==""){
                  event.preventDefault();
                  if(inputValue==""){
                    noTextWarning();
                  }else{
                    categoryNotSelectedWarning();
                  }
                 const elem = document.getElementsByClassName("active");
                 if(elem.length>0){
                  elem[0].classList.remove("active");
                 }
                }
                }} className="text-field-input" id="floatingInput" placeholder="For eg.: I feel stuck at this point in my life">
              </input>
             
            </div>
            <br />
            <p id="chooseType1" className="chooseType">What part of your life does this belong to?</p>
            <div className="buttons">
              <button onClick={async () => {
                await setType("SELF");
              }} className="btn btnglow" type="submit">🙂 <span>Self</span>&nbsp;</button>
              <button onClick={async () => {
                await setType("FAMILY");
              }} className="btn btnglow" type="submit">👪 <span>Family & Friends</span></button>{text1?<br />:null}
              <button onClick={async () => {
                await setType("LOVE");
              }} className="btn btnglow" type="submit">❤️ <span>Love</span></button>
              <button  onClick={async () => {
                await setType("WORK");
              }} className="btn btnglow" type="submit">📁 <span>Work</span></button>
            </div>
          </form>
          <div className="footer footer1">
            <img src={playfooter} alt="" id="footerimg" />
            {!subscribed ? (<>
              <input type="email" placeholder="Enter your E-mail to join the waiting list for Level" required={true} id="subscribeinput" value={email} onChange={(text) => {
                setEmail(text.target.value);
              }} />
              &nbsp;&nbsp;&nbsp;
              <button onClick={() => subscribe()} id="btnsubscribe">SUBSCRIBE</button>
            </>
            ) : (<><p className="subscribeThanks"> Thanks for subscribing, let's level up 📈 together.</p></>)}
          </div>
        </div>
        <div className="col-xl-5 col-lg-5 col-cust-2 col-md-12 col-12 col-sm-12 one-edge-shadow">
          <img src={doingBest} alt=""  className="img-fluid img-adjust" id="doingimg" />
          <p id="invisiblePara1" className="text-center vertical-center" >
            <span className="qoutationMark">“</span>{resultval?.data[0]?.answer}<span className="qoutationMark">&nbsp;”</span>
          </p>
          <hr />
          <button id="reloadbtn" onClick={searchViaTypeAgainOnReload}>
            <img src={load} alt="" id="reloadimg" />
          </button>
          <button id="like" onClick={() => {
            like();
            notify();
          }}>
            &nbsp;&nbsp;Like &nbsp;👍&nbsp;&nbsp;
            </button>
          <button id="unlike" onClick={() => {
            unlike();
            notify();
          }}>
            Unlike 👎
            </button>
          <div><ToastContainer
           toastStyle={{ backgroundColor: "##F9CE47" }}
            transition={Slide}
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          </div>
          <div className="footer footer2">
            {!subscribed ? (<>
              <input type="email" required={true} placeholder="Enter your E-mail to join the waiting list for Level"  id="subscribeinput" value={email} onChange={(text) => {
                setEmail(text.target.value);
              }} />
              &nbsp;&nbsp;&nbsp;
              <div className="subscribeDiv">
              <button onClick={() => subscribe()} id="btnsubscribe">SUBSCRIBE</button>
              </div>
            </>
            ) : (<><font></font></>)}

          </div>
        </div>

      </div>
    </div>
  );

}

export default App;
