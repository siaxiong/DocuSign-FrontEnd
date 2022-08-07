import React, {useRef, useEffect, useState} from "react";
import WebViewer from "@pdftron/webviewer";
import axios from "axios";
import {useAuthContext} from "components/Auth/AuthContext/AuthContext.ts";
import {useParams, useSearchParams } from "react-router-dom";
import ViewerCSS from "./PDFViewer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
	faPaperPlane, faDownLong
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import { PulseLoader } from "react-spinners";


function Available() {
	const [base64File, setBase64File] = useState(null);
	const viewerDiv = useRef(null);
	const {myToken} = useAuthContext();
	const [searchParams] = useSearchParams();
	const [loading, setLoading] = useState(false);
	const [fileSent, setFileSent] = useState(false);
	const [color, setColor] = useState("rgb(255, 206, 0)");
	const [existingAccounts, setExistingAccounts] = useState(null);
	const [recipientEmails, setRecipientEmails] = useState(null);
	const [readyToSend, setReadyToSend] = useState(false);
	const [sendInOrder, setSendInOrder] = useState(false);
	let instance = useRef(null);



	let fromPage = searchParams.get("from");

	let formName = searchParams.get("formName");
	formName = formName.replace(":", "/");
	
	let formVersion = searchParams.get("formVersion");

	const sendIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d=\"M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z\"/></svg>";

	function base64ToBlob(base64) {
		const binaryString = window.atob(base64);
		const len = binaryString.length;
		const bytes = new Uint8Array(len);



		for (let i = 0; i < len; ++i) {
			bytes[i] = binaryString.charCodeAt(i);
		}
  
		return new Blob([bytes], { type: "application/pdf" });
	}

	const base64Arraybuffer = async (data) => {
		const base64url = await new Promise((r) => {
			const reader = new FileReader();
			reader.onload = () => r(reader.result);
			reader.readAsDataURL(new Blob([data]));
		});
		return base64url.split(",", 2)[1];
	};

	const checkIfAccountExist = (emailStringList) =>{
		// Remove white space and split the emails in the single string into individual elements of an arr
		let emailList = (emailStringList.replace(/\s+/g, "")).split(",");

		// Remove duplicates
		emailList = [...new Set(emailList)];

		// Remove empty string in case user leaves a comma at the end of input
		emailList = emailList.filter(email=> email !== "" && email !== myToken.email);
		
		if (emailList.find(email=> !(existingAccounts.some(account=>account.email===email))) || emailList.length === 0) {
			setReadyToSend(false);
			return false;
		}
		setRecipientEmails(emailList);
		setReadyToSend(true);
	};

	const toggleSendInOrder = (status) => {
		console.log(status);
		setSendInOrder(status);
		console.log(sendInOrder);
	};
	
	useEffect(()=>{

		const init = async () => {
			if (fromPage === "requiredPage"){ 
				console.log("is true");
				setReadyToSend(true);
			}
			const resp = await axios("/api/db/getAllUsers", {headers: {"Authorization": `Bearer ${myToken.jwt}`}});
			setExistingAccounts(resp.data);
		};

		init();
		WebViewer({
			path: "../lib"
		}, viewerDiv.current).then(async inst =>{  
			instance.current = inst;
			const { documentViewer, annotationManager } = inst.Core;

			await axios("/api/db/getBase64File", {params: {formName, formVersion},headers: {"Authorization": `Bearer ${myToken.jwt}`}})
				.then(res=>{


					inst.UI.loadDocument(base64ToBlob(res.data), {extension: "pdf"});

					if (fromPage === "requiredPage") {
						const sendButton = {
							type: "actionButton",
							img: sendIcon,
							onClick:  async () => {
								const doc = documentViewer.getDocument();
								const xfdfString = await annotationManager.exportAnnotations();
								const data = await doc.getFileData({
									// saves the document with annotations in it
									xfdfString
								});
								const arr = new Uint8Array(data);
								const blob = new Blob([arr], { type: "application/pdf" });
								let myFile = new File([blob], formName, { type: "application/pdf" } );
								let file = new FormData();
								file.append("file", myFile);
	
								if (fromPage == "requiredPage") {		
									setLoading(true);
									await axios.post("/api/db/updateRecipient", file, { params: {email: myToken.email, formName, formVersion, token: myToken.Credentials},headers: {"Authorization": `Bearer ${myToken.jwt}`}})
										.then(res=>{
											console.log(res);
											setLoading(false);
											setFileSent(true);
			
										})
										.catch(err=>{
											console.log(err);
											setLoading(false);
											setFileSent(true);
			
										});
								}
						
							},
							dataElement: "alertButton",
							hidden: [ "mobile" ]
						};
			
						instance.current.setHeaderItems(function(header){
							const items = header.getItems().slice(0,13);
							header.update(items);
						});
							
						instance.current.setHeaderItems(function(header){
							header.push(sendButton);
						});

					}

				});
		});

	}, []);


	useEffect(() => {

		const init = async ()=>{

			if (instance.current && fromPage === "availablePage"){  
				const { documentViewer, annotationManager } = instance.current.Core;
			
				const sendButton = {
					type: "actionButton",
					img: sendIcon,
					onClick:  async () => {
						const doc = documentViewer.getDocument();
						const xfdfString = await annotationManager.exportAnnotations();
						const data = await doc.getFileData({
							// saves the document with annotations in it
							xfdfString
						});
						const arr = new Uint8Array(data);
						const blob = new Blob([arr], { type: "application/pdf" });
						let myFile = new File([blob], formName, { type: "application/pdf" } );
						let file = new FormData();
						file.append("file", myFile);
						if (fromPage == "availablePage") {
							setLoading(true);
							await axios.post( sendInOrder ? "/api/db/addRecipientsInOrder" : "/api/db/addRecipientsUnOrder",file,{ params: {recipientEmails: JSON.stringify(recipientEmails), formName, formVersion, ownerEmail: myToken.email, token: myToken.Credentials}, headers: {"Authorization": `Bearer ${myToken.jwt}`}})
								.then(resp=>{
									console.log("sendInOrder");
									console.log(sendInOrder);
									setLoading(false);
									setFileSent(true);
								})
								.catch(err=>{
									console.log(err);
									setLoading(false);
									setFileSent(true);
								});
	
						}
						if (fromPage == "requiredPage") {
							console.log("send button clicked from require page");
	
							setLoading(true);
							// (fromPage == "availablePage") && await axios.post("/api/db/addRecipientsInOrder",file,{ params: {emailList, formName, formVersion, ownerEmail: myToken.email, token: myToken.Credentials}, headers: {"Authorization": `Bearer ${myToken.jwt}`}}).then(res=>console.log(res));
							await axios.post("/api/db/updateRecipient", file, { params: {email: myToken.email, formName, formVersion, token: myToken.Credentials},headers: {"Authorization": `Bearer ${myToken.jwt}`}})
								.then(res=>{
									console.log(res);
									setLoading(false);
									setFileSent(true);
	
								})
								.catch(err=>{
									console.log(err);
									setLoading(false);
									setFileSent(true);
	
								});
						}
				
					},
					dataElement: "alertButton",
					hidden: [ "mobile" ]
				};
	
				instance.current.setHeaderItems(function(header){
					const items = header.getItems().slice(0,13);
					header.update(items);
				});

				if (readyToSend) {
					instance.current.setHeaderItems(function(header){
						header.push(sendButton);
					});
				}
					

	
	
			}};
		init();

	}, [readyToSend, sendInOrder]);


	const override = {
		display: "block",
		margin: "0 auto",
		borderColor: "red",
	};


	return (
		<div>
			{/* <Link to="/manage/available" className={""}>Back</Link> */}
			<p style={{textAlign: "center", margin: "1em 0"}}>{formName.substring(formName.indexOf("/")+1)}</p>
			{ fromPage === "availablePage" ?	<>
				<label htmlFor="recipient-email">
					<p>Enter the recipient&apos;s email. The email MUST be associated with an existing account.</p>
					<p>If sending to more than one recipient, separate each recipient&apos;s email with a comma(no space after the comma).</p>
					<input type="input" id="recipient-email" className={ViewerCSS["recipient__email"]} onChange={e=>{
						setRecipientEmails(e.target.value.toString());
						checkIfAccountExist(e.target.value.toString());
					}} placeholder="Recipient email(s)"/>
				</label> 
				<div className={ViewerCSS["radio__container"]}>
					<p>Un Order: If there are multiple recipients, each recipient gets their own copy and they can sign in any order.
					You&apos;re sending each person their own copy of the same form to sign. You will receive back the same number of forms
					as their are recipients.</p>
					<p>Example: A manager sends out a emergency contact form that every employee needs to sign. Each employee will get their own copy and can sign it whenever they want.</p>
					<p>In Order: If there are multiple recipients, each recipient has to sign the form in the order that their email
					appears in the input above. More importantly, they all sign the same form (not individual copy of the same form)!
					You will receive only one form back with all the recipient&apos;s signatures.</p>
					<p>Example: A manager wants to work on a project that requires a budget. The budget needs to be approve by supervisor 1 then supervisor 2 then supervisor 3 in this order. If it is not the supervisor&apos;s turn then they won&apos;t see the form yet.</p>
					<label>
						<input type="radio" checked={!sendInOrder}  onChange={()=>toggleSendInOrder(false)}/>
						Un Order
					</label>
					<label>
						<input type="radio" checked={sendInOrder} onChange={()=>toggleSendInOrder(true)}/>
						In Order
					</label>
				</div>
			
			</>: null}
			<div>
			</div>
			{
				(!loading && !fileSent) ? <div className='webviewer' ref={viewerDiv} style={{height: "100vh"}}></div> : null
			}

			{
				loading && !fileSent ? 
					<div className={ViewerCSS["Viewer__loading-div"]}>
						<PulseLoader style={{textAlign: "center", margin: "1em 0"}} speedMultiplier={1} color={color} loading={loading} cssOverride={override} size="1em" /> 
						<p>Sending</p>
					</div> : null
			}

			{
				fileSent ? <p style={{textAlign: "center", margin: "1em 0"}} >File sent!</p> : null
			}
		</div>
	);
}

export default Available;