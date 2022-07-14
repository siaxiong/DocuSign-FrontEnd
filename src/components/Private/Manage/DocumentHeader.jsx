import React from "react";
import DocumentHeaderCSS from "./DocumentHeader.module.css";
function DocumentHeader() {
	return (
		<div className={DocumentHeaderCSS.module}>
			<ul>
				<li>Name</li>
				<li>Status</li>
				<li>Last Change</li>
			</ul>
		</div>
	);
}
export default DocumentHeader;