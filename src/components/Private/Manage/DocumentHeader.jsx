import React from "react";
import DocumentHeaderCSS from "./DocumentHeader.module.css";
import {Link} from "react-router-dom";

function DocumentHeader() {



	return (
		<div className={DocumentHeaderCSS.module}>
			<ul>
				<Link to="/manage/available" className={DocumentHeaderCSS.backButton}>Back</Link>
			</ul>
		</div>
	);
}
export default DocumentHeader;