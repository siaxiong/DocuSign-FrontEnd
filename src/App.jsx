import React from "react";
import style from "./App.css";
import FrontPage from "./components/Public/LandingLayout/FrontPage";
import {useAuthContext} from "./components/Auth/AuthContext/AuthContext";
import {Outlet} from "react-router-dom";
// import Manage from './components/Private/Manage/Manage';
// import Home from './components/Private/Home/Home'
import TopNav from "./components/Public/TopNav/TopNav";

function App() {

	const {myToken} = useAuthContext();

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