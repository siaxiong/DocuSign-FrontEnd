import React, {useEffect, useState} from "react";
import axios from "axios";
import {useAuthContext} from "components/Auth/AuthContext/AuthContext.ts";
import RequiredCSS from "./Required.module.css";
import {Link} from "react-router-dom";

function Required() {

	const {myToken} = useAuthContext();
	const [pdfList, setPDFlist] = useState(null);


	useEffect(()=>{
		
		const init = async () => {
			const response = await axios.get("/api/db/getAssignedPDFs", {params: {email: myToken.email}, headers: {"Authorization": `Bearer ${myToken.jwt}`}});
			console.log("🚀 -------------------------------------------------------------🚀");
			console.log("🚀 -> file: Required.jsx -> line 11 -> Required -> response", response.data);
			console.log("🚀 -------------------------------------------------------------🚀");

			(response.data).length == 0 ? null : setPDFlist(response.data);
		};
		init();

	},
	[]);


	let pdfListItems = null;
	console.log("🚀 -------------------------------------------------------------------🚀");
	console.log("🚀 -> file: Required.jsx -> line 32 -> Required -> pdfList", pdfList);
	console.log("🚀 -------------------------------------------------------------------🚀");

	const listItem = (item) => {
		return <li>


		</li>;
	};

	console.log("🚀 -------------------------------------------------------------------🚀");
	console.log("🚀 -> file: Required.jsx -> line 42 -> Required -> pdfList", pdfList);
	console.log("🚀 -------------------------------------------------------------------🚀");


	pdfList && function(){pdfListItems = <ul>{pdfList.map((pdf, index)=><li className={RequiredCSS["listItem"]} key={index}><Link to={`/manage/form${("?" + "from=requiredPage" + "&" + "formName=" + pdf.fk_fileName).replace("/",":")}`}>{(pdf.fk_fileName).substring((pdf.fk_fileName).lastIndexOf("/")+1)}</Link></li>)}</ul>;}();

	return (
		<div>
			{pdfListItems ? pdfListItems : <p>Required Page</p>}
		</div>
	);
}

export default Required;