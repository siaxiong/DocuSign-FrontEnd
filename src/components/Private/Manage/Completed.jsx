import React, {useEffect, useState} from "react";
import CompletedCSS from "./CompletedCSS.module.css";
import {useAuthContext} from "components/Auth/AuthContext/AuthContext.ts";
import {Link} from "react-router-dom";
import axios from "axios";

function Completed() {

	const {myToken} = useAuthContext();
	const [completedPDFs, setCompletedPDFs] = useState(null);

	useEffect(()=>{

		const init = async () => {
			const response = await axios("/api/db/getCompletedPDFs", {params: {email: myToken.email}, headers: {"Authorization": `Bearer ${myToken.jwt}`}});
			console.log("🚀 ------------------------------------------------------------------🚀");
			console.log("🚀 -> file: Completed.jsx -> line 13 -> init -> response", response);
			console.log("🚀 ------------------------------------------------------------------🚀");

			(response.data).length != 0  ? setCompletedPDFs(response.data) : setCompletedPDFs(null);

		};
		init();

	}, []);

	const files = <ul>
		{completedPDFs?.map((file, index) => <li className={CompletedCSS["listItem"]} key={index}><Link to={`/manage/form${"?" + "from=completedPage" + "&" + "formName=" + (file.fileName).replace("/", ":")}`}>{(file.fileName).substring((file.fileName).indexOf("/")+1)}</Link></li>) ?? <li></li>}
	</ul>;


	return (
		<div>
			{files}
		</div>
	);
}

export default Completed;