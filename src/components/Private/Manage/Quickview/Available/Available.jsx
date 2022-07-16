/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react";
import AvailableCSS from "./AvailableCSS.module.css";
import {useAuthContext} from "components/Auth/AuthContext/AuthContext.ts";
import {Link} from "react-router-dom";
import { Outlet } from "react-router-dom";


function Available() {
	const {myToken} = useAuthContext();

	
	const files = <ul>
		{myToken.files.map((file, index) => <li className={AvailableCSS["listItem"]} key={index}><Link to={`/manage/${file.fileName}`}>{file.fileName}</Link></li>)}

		{/* {myToken.files.map((file, index) => <li className={AvailableCSS["listItem"]} key={index}><a value={file.fileName} onClick={(e)=>setFileName(e.target.value)}>{file.fileName}</a></li>)} */}
	</ul>;
	  	
	return (
		<div>
			{files}
			<Outlet/>
		</div>
	);
}

export default Available;