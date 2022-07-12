import React, {useState, ChangeEvent} from "react";
import Registration from  "./LoginForm.module.css";
import {useAuthContext } from "../../Auth/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/**************************************************/
/********Function Component begins here***********/
/**************************************************/

const LoginForm = () => {
  const [userEmail, setUserEmail] = useState('siaxiong2@csus.edu');
  const [password, setPassword] = useState('newpadd');
  const [confirmPassword, setConfirmPassword] = useState('newpadd');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [checkConfirm, setCheckConfirm] = useState(false);
  const [hideForm, setHideForm] = useState(false);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const {setToken} = useAuthContext();
  const navigate = useNavigate();

  //this doesnt throw a typescript error if i removed the boolean type
  //it should throw an error but not sure why it doesnt
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleCreateAccount = () => {
    setIsActive(false)
    setUserEmail('')
    setPassword('')
    setConfirmPassword('')
  };
  const toggleSignIn = () => {
    setIsActive(true)
    setUserEmail('')
    setPassword('')
    setConfirmPassword('')
  };
  const toggleConfirmNewUser = () => setCheckConfirm(true);


  const handleSubmitRegistration = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // await handleSignIn(userEmail, password, setToken);
    const payload = await axios.post("/api/handleSignIn", {"email": userEmail,"password": password})
    if(payload.data.Credentials) {
      setToken(payload.data);
      setHideForm(true);
      
    }
  }

  const createUser = async () => {
    if(checkPasswordMatch() && checkUserName() && checkFirstName() && checkLastName()){
      // await handleCreateUser(userEmail, password);
      // await axios.post("/handleSignUp", {"username":userEmail,"password":password, "action":"SIGN_UP"})
      await axios({method:"post",url:"/api/handleSignUp",data:{username:userEmail,password:password,firstName:firstName,lastName:lastName}})
      toggleConfirmNewUser();
    } else {
      console.log("Please check that valid inputs are entered.")
    }
  }

  //after confirmation the form doesnt auto take user to home page
  //because setToken, like in handlSubmitRegistration() above, needs to be set 
  //so the user would have access to the private routes
  const handleConfirmation = async () => {
   const payload =  await axios({method:"post", url:"/api/handleConfirmation", data:{email: userEmail, code:confirmationCode}})
   console.log("handleConfirmation payload: ")
   console.log(payload)
  }

  const checkUserName = () => {
    return userEmail !== ''
  }
  const checkPasswordMatch = () => {
    return password === confirmPassword;
  }

  const checkFirstName = () => {
    return firstName != ''
  }

  const checkLastName = () => {
    return lastName != ''
  }

  /***************BUILDING BLOCK COMPONENTS FOR THIS COMPONENT*******************/

  return (
    <form onSubmit={handleSubmitRegistration}  className={[Registration["registration-form"], hideForm ?  Registration["registration-form-hidden"] : null].join(" ")}>
      <div className={Registration["registration-form__nav"]}>
        <button type="button" onClick={toggleCreateAccount} className={[Registration["registration-form__sign-in-button"], isActive ? null :  Registration["registration-form__header-buttons"]].join(" ")}>Sign In</button>
        <button type="button" onClick={toggleSignIn} className={[Registration["registration-form__create-account-button"],  isActive ? Registration["registration-form__header-buttons"] : null].join(" ")}>Create Account</button>
      </div>      
      <div className={[Registration["registration-form__body"], Registration["registration-form__create-account-body"], isActive && !checkConfirm ? Registration["registration-form__body_active"] : null].join(" ")}>
        <label>
          <input type="text" value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="First Name"/>
        </label>
        <label>
          <input type="text" value={lastName} onChange={e=>setLastName(e.target.value)} placeholder="Last Name"/>
        </label>
        <label>
          <input type="text" value={userEmail} onChange={e=>setUserEmail(e.target.value)} placeholder="Email"/>
        </label>
        <label htmlFor="">
          <input type="text" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
        </label>
        <label htmlFor="">
          <input type="text" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}  placeholder="Confirm Password"/>
        </label>
        <input type="button" onClick={createUser} value="Create Account" className={[Registration["registration-form_submit-button"]].join(" ")} />
      </div>      
      <div className={[Registration["registration-form__body"], Registration["registration-form__confirmation"], checkConfirm ? Registration["registration-form__confirmation-show"] : null ].join(" ")}>
        <label>
          <input type="text" value={confirmationCode} onChange={e=>setConfirmationCode(e.target.value)} placeholder="Confirmation Code" />
        </label>
        <input type="button" onClick={handleConfirmation} value="Confirm" className={[Registration["registration-form_submit-button"]].join(" ")}/>
      </div>
      <div className={[Registration["registration-form__body"], Registration["registration-form__sign-in-body"], isActive ? null : Registration["registration-form__body_active"]].join(" ")}>
        <label htmlFor="">
          <input type="text"  value={userEmail} onChange={e=>setUserEmail(e.target.value.toString())} placeholder="Email"/>
        </label>
        <label>
          <input  type="text"  value={password} onChange={e=>setPassword(e.target.value.toString())}  placeholder="Password"/>
        </label>
        <input  type="submit" value="Sign In" className={[Registration["registration-form_submit-button"]].join(" ")}/>
      </div>
   </form>
    )
};/** this is a random comment */

export default LoginForm;