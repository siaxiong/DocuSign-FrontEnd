/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState} from "react";
import UploadCSS from "./Upload.module.css";
import { fileToBase64 } from "./PdfConversion/PdfConversion";
import { useAuthContext } from "../../Auth/AuthContext/AuthContext";
import axios from "axios";

export default function Upload(props) {
	const {myToken} = useAuthContext();
	const regex = new RegExp(":", "g");


	const execute = async (e) => {
		//e.target.files[0] reads "/" as ":" so have to replace ":" back to "/"
		let modifiedFile = new File([e.target.files[0]], myToken.email + "/" + (e.target.files[0].name).replaceAll(regex, "/"));
		const file = new FormData();
		console.log(modifiedFile);
		file.append("file", modifiedFile);
		axios.post("/api/db/handleAddPdf", file, {headers: {"Authorization": `Bearer ${myToken.jwt}`}}).then(res=>console.log(res));
	};

	const deleteFile = () => {
		axios.delete("/api/db/deleteFile", {data: {fileName: "siax/Sia-Xiong-Resume.pdf", token: myToken.Credentials}, headers: {"Authorization": `Bearer ${myToken.jwt}`}}).then(res=>console.log(res));
	};

	const getFile = () => {
		console.log("axios(getFile)");
		axios.get("/api/db/getFile", {params: {fileName: "decoded-file.pdf"}, headers: {"Authorization": `Bearer ${myToken.jwt}`}}).then(res=>console.log(res));
	};

	const getAllFiles = () => {
		console.log("axios(getAllFiles)");
		axios.get("/api/db/getAllFiles", {headers: {"Authorization": `Bearer ${myToken.jwt}`}}).then(res=>console.log(res));
	};
	const getAllEmails = () => {
		console.log("axios(getAllEmails)");
		axios.get("/api/db/getAllEmails", {headers: {"Authorization": `Bearer ${myToken.jwt}`}}).then(res=>console.log(res));
	};

	return (
		<div className={UploadCSS.module}>
			<div className={`${UploadCSS.box} ${props.cname}`}>
				<p>Upload a document to get started</p>
				<input type="file" id='uploadInput' name="file" onChange={e=>execute(e)} className={UploadCSS.uploadInput}  />
				<label className={UploadCSS.uploadLabel} htmlFor="uploadInput">Upload file</label>
				<button onClick={deleteFile}>Delete File</button>
				<button onClick={getFile}>GetFile</button>
				<button onClick={getAllFiles}>GetAllFiles</button>
				<button onClick={getAllEmails}>GetAllEmails</button>
			</div>
		</div>
	);
}
