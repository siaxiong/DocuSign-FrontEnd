import React from "react";
import FormHeaderCSS from "./Form/FormHeader.module.css";

function FormHeader() {
	return (
		<div className={FormHeaderCSS.module}>
			<ul>
				<li>Test</li>
				<li>Status</li>
				<li>Last Change</li>
			</ul>
		</div>
	);
}

export default FormHeader;