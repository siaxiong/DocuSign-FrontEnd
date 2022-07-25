import React, {useEffect} from "react";
import style from "./App.css";
import FrontPage from "./components/Public/LandingLayout/FrontPage";
import {useAuthContext} from "./components/Auth/AuthContext/AuthContext";
import {Outlet} from "react-router-dom";
// import Manage from './components/Private/Manage/Manage';
// import Home from './components/Private/Home/Home'
import TopNav from "./components/Public/TopNav/TopNav";
import axios from "axios";

function App() {

	const {myToken, setToken} = useAuthContext();
	const loginURL = "/api/handleSignUp";
	console.log("🚀 ---------------------------------------------------------🚀");
	console.log("🚀 -> file: App.jsx -> line 13 -> App -> myToken", myToken);
	console.log("🚀 ---------------------------------------------------------🚀");
	
	useEffect(()=>{
		const cachedResult = JSON.parse(sessionStorage.getItem(loginURL));
		console.log("🚀 -------------------------------------------------------------------------🚀");
		console.log("🚀 -> file: App.jsx -> line 21 -> useEffect -> cachedResult", cachedResult);
		console.log("🚀 -------------------------------------------------------------------------🚀");

		(cachedResult != null) ? setToken(cachedResult) : null;
 

	}, []);

	return (
		<div className={style.center}>  
			<TopNav/>
			{
				myToken ? <Outlet/> : <FrontPage/>    
			}    

		</div>
	);
}

export default App;