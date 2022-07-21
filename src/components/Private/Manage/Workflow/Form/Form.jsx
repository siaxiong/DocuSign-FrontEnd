import React, {useRef, useEffect, useState} from "react";
import WebViewer from "@pdftron/webviewer";
// import axios from 'axios';
import axios from "axios";
import {useAuthContext} from "components/Auth/AuthContext/AuthContext.ts";
import {useParams } from "react-router-dom";
import FormCSS from "./Form.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
	faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";


function Available() {
	const [base64File, setBase64File] = useState(null);
	const viewerDiv = useRef(null);
	const {myToken} = useAuthContext();
	let {formName} = useParams();

	formName = formName.replace("?", "/");

	// eslint-disable-next-line quotes
	const sendIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"/></svg>`;
	const emailList = "siaxiong2@csus.edu,siaxiongdev@gmail.com,siaxiong23@icloud.com";

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

			const sendButton = {
				type: "actionButton",
				img: sendIcon,
				onClick:  () => {
					axios.post("/api/db/addRecipients",{emailList: emailList, fileName: myToken.email + "/" + formName},{headers: {"Authorization": `Bearer ${myToken.jwt}`}}).then(res=>console.log(res));
				},
				dataElement: "alertButton",
				hidden: [ "mobile" ]
			};
			// instance.UI.setToolbarGroup("toolbarGroup-Insert");
			instance.setHeaderItems(function(header){
				header.push(sendButton);
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