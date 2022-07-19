/* eslint-disable no-mixed-spaces-and-tabs */
import React, {useEffect, useState} from "react";
import AvailableCSS from "./AvailableCSS.module.css";
import {useAuthContext} from "components/Auth/AuthContext/AuthContext.ts";
import {Link} from "react-router-dom";
import axios from "axios";

function Available() {
	const {myToken, setToken} = useAuthContext();
	const [allFiles, setAllFiles] = useState(null);

	useEffect(() => {
		const getAllFiles = async () => {
			const response = await axios("/api/db/getAllFiles", {params: {email: myToken.email} ,headers: {"Authorization": `Bearer ${myToken.jwt}`}});
			console.log("🚀 -------------------------------------------------------------------------🚀");
			console.log("🚀 -> file: Available.jsx -> line 17 -> getAllFiles -> response", response);
			console.log("🚀 -------------------------------------------------------------------------🚀");
			
			response.data != "" ? setAllFiles(response.data) : setAllFiles(null);
		};
		getAllFiles();

	}, []);
	console.log("🚀 --------------------------------------------------------------------🚀");
	console.log("🚀 -> file: Available.jsx -> line 9 -> Available -> myToken", myToken);
	console.log("🚀 --------------------------------------------------------------------🚀");

	
	// const url = window.location.pathname;
	

	const files = <ul>
		{allFiles?.map((file, index) => <li className={AvailableCSS["listItem"]} key={index}><Link to={`/manage/${(file.fileName).substring((file.fileName).lastIndexOf("/")+1)}`}>{(file.fileName).substring((file.fileName).lastIndexOf("/")+1)}</Link></li>) ?? <li>No files.</li>}

		{/* {myToken.files.map((file, index) => <li className={AvailableCSS["listItem"]} key={index}><a value={file.fileName} onClick={(e)=>setFileName(e.target.value)}>{file.fileName}</a></li>)} */}
	</ul>;
	  	
	return (
		<div>
			{files}
		</div>
	);
}

export default Available;