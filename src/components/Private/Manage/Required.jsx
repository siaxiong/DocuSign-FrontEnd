import React, {useEffect, useState} from "react";
import axios from "axios";
import {useAuthContext} from "components/Auth/AuthContext/AuthContext.ts";
import RequiredCSS from "./Required.module.css";
import {Link} from "react-router-dom";

function Required() {

	const {myToken} = useAuthContext();
	const [pdfList, setPDFlist] = useState([]);


	useEffect(()=>{
		
		const init = async () => {
			const pdfs = await axios.get("/api/db/getAssignedPDFs", {params: {email: myToken.email}, headers: {"Authorization": `Bearer ${myToken.jwt}`}});
			console.log("🚀 -------------------------------------------------------------🚀");
			console.log("🚀 -> file: Required.jsx -> line 11 -> Required -> pdfs", pdfs);
			console.log("🚀 -------------------------------------------------------------🚀");

			setPDFlist(pdfs.data);
		};
		init();

	},
	[]);

	const pdfListItems = <ul>{pdfList.map((pdf, index)=><li className={RequiredCSS["listItem"]} key={index}><Link to={`/manage/form${("?" + pdf[0].fk_fileName).replace("/","=")}`}>{(pdf[0].fk_fileName).substring((pdf[0].fk_fileName).lastIndexOf("/")+1)}</Link></li>)}</ul>;

	return (
		<div>
			{pdfListItems}
		</div>
	);
}

export default Required;