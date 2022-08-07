import React, {useEffect, useState} from "react";
import CompletedCSS from "./Completed.module.css";
import {useAuthContext} from "components/Auth/AuthContext/AuthContext.ts";
import {Link} from "react-router-dom";
import axios from "axios";

function Completed() {

	const {myToken} = useAuthContext();
	const [pdfArray, setCompletedPDFs] = useState(null);

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
	

	const pdfListUL = <ul>
		<li className={CompletedCSS["list__header"]}>
			<p>File Name</p>
			<p>Signer</p>
		</li>
		{pdfArray?.map((file, index) => 
			<li className={CompletedCSS["list__item"]} key={index}>
				<Link to={`/manage/form${"?" + "from=completedPage" + "&" + "formName=" + (file.fileName).replace("/", ":") + "&" + "formVersion=" + (file.currentVersion)}`}>
					<div className={CompletedCSS["list__item-top"]}>
						<p>{`${index+1})`}</p>
						<p>{(file.fileName).substring((file.fileName).indexOf("/")+1)}</p>
					</div>
					<p className={CompletedCSS["list__item-top"]}>{file.signer}</p>
				</Link>
			</li> 
		)} 
	</ul>;


	return (
		<div>
			{pdfArray ? pdfListUL: <p>No completed files.</p>}
		</div>
	);
}

export default Completed;