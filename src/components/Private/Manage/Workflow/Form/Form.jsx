import React, {useRef, useEffect, useState} from "react";
import WebViewer from "@pdftron/webviewer";
// import axios from 'axios';
import axios from "axios";
import {useAuthContext} from "components/Auth/AuthContext/AuthContext.ts";
import {useParams } from "react-router-dom";
import FormCSS from "./Form.module.css";


function Available() {
	const [base64File, setBase64File] = useState(null);
	const viewerDiv = useRef(null);
	const {myToken} = useAuthContext();
	const {formName} = useParams();
	// console.log("🚀 ---------------------------------------------------------------------🚀");
	// console.log("🚀 -> file: Available.jsx -> line 13 -> Available -> myToken", myToken.files);
	// console.log("🚀 ---------------------------------------------------------------------🚀");

	function base64ToBlob(base64) {
		const binaryString = window.atob(base64);
		const len = binaryString.length;
		const bytes = new Uint8Array(len);
		for (let i = 0; i < len; ++i) {
			bytes[i] = binaryString.charCodeAt(i);
		}
  
		return new Blob([bytes], { type: "application/pdf" });
	}

	useEffect(() => {
		WebViewer({
			path: "../lib"
		}, viewerDiv.current).then(async instance =>{  

			await axios("/api/db/getFile", {params: {fileName: myToken.email + "/" + formName},headers: {"Authorization": `Bearer ${myToken.jwt}`}})
      
				.then(res=>{
					console.log("🚀 -------------------------------------------------------------🚀");
					console.log("🚀 -> file: Available.jsx -> line 41 -> useEffect -> res", res.data);
					console.log("🚀 -------------------------------------------------------------🚀");
					instance.UI.loadDocument(base64ToBlob(res.data), {extension: "pdf"});
					const { documentViewer, annotationManager } = instance.Core;

					// instance.UI.disableElements(["header"]);

  
					documentViewer.addEventListener("documentLoaded", () => {
						console.log("documentLoaded event!");
					});      
				});


		});
  
	}, []);



	return (
		<div>
			<p>{formName}</p>
			<div>

			</div>
			<div className='webviewer' ref={viewerDiv} style={{height: "100vh"}}></div>
		</div>
	);
}

export default Available;