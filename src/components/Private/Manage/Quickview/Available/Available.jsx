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
			console.log("🚀 -> file: Available.jsx -> line 15 -> getAllFiles -> response", response);
			console.log("🚀 -------------------------------------------------------------------------🚀");
			(response.data).length != 0  ? setAllFiles(response.data) : setAllFiles(null);
		};
		getAllFiles();

	}, []);

	const files = <ul>
		{allFiles?.map((file, index) => <li className={AvailableCSS["listItem"]} key={index}><Link to={`/manage/form${"?" + "from=availablePage" + "&" + "formName=" + (file.fileName).replace("/", ":")}`}>{(file.fileName).substring((file.fileName).indexOf("/")+1)}</Link></li>) ?? <li></li>}
	</ul>;
	  	
	return (
		<div>
			{files}
		</div>
	);
}

export default Available;