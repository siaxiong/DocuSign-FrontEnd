import React, {useEffect, useState} from "react";
import axios from "axios";
import {useAuthContext} from "components/Auth/AuthContext/AuthContext.ts";
import RequireCSS from "./Require.module.css";
import {Link} from "react-router-dom";

function Require() {

	const {myToken} = useAuthContext();
	const [pdfList, setPDFlist] = useState(null);

	useEffect(()=>{
		const init = async () => {
			const response = await axios.get("/api/db/getAssignedPDFs", {params: {email: myToken.email}, headers: {"Authorization": `Bearer ${myToken.jwt}`}});
			console.log("🚀 ----------------------------------------------------------------🚀");
			console.log("🚀 -> file: Require.jsx -> line 15 -> init -> response", response);
			console.log("🚀 ----------------------------------------------------------------🚀");
			(response.data).length == 0 ? null : setPDFlist(response.data);
		};
		init();
	},
	[]);

	const pdfListUL =  <ul>
		<li className={RequireCSS["list__header"]}>
			<p>File Name</p>
			<p>From</p>
		</li>
		<ul>
			{pdfList?.map((file, index)=>{
				return <li className={RequireCSS["list__item"]} key={index}>
					<Link to={`/manage/form${("?" + "from=requiredPage" + "&" + "formName=" + file.fk_fileName).replace("/",":") + "&" + "formVersion=" + file.currentVersion}`}>
						{
							<>
								<div className={RequireCSS["list__item-top"]}>
									<p>{`${index+1})`}</p>
									<p>{(file.fk_fileName).substring((file.fk_fileName).indexOf("/")+1)}</p>
								</div>
								<p>{file.fk_fileName.substring(0, (file.fk_fileName).indexOf("/"))}</p>
							</>
						}
					</Link>
				</li>;
			})}
		</ul>;
	</ul>;	
	
	return (
		<div>
			{pdfList ? pdfListUL : <p>No file needs action.</p>}
		</div>
	);
	
}

export default Require;