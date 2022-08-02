/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState, CSSProperties} from "react";
import UploadCSS from "./Upload.module.css";
import { fileToBase64 } from "./PdfConversion/PdfConversion";
import { useAuthContext } from "../../Auth/AuthContext/AuthContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
	faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { PulseLoader } from "react-spinners";


export default function Upload(props) {
	const {myToken} = useAuthContext();
	const regex = new RegExp(":", "g");
	const [file, setFile] = useState(null);
	const [notPDF, setNotPDF] = useState(false);
	let [loading, setLoading] = useState(false);
	let [color, setColor] = useState("rgb(255, 206, 0)");



	const saveFileState = async (e) => {
		//e.target.files[0] reads "/" as ":" so have to replace ":" back to "/"

		setNotPDF(false);
		let modifiedFile = new File([e.target.files[0]], myToken.email + "/" + (e.target.files[0].name).replaceAll(regex, "/"));
		if (!(modifiedFile.name).endsWith(".pdf")) {
			console.log("The file is not a PDF!");
			setNotPDF(true);
			return;
		}
		const tempFile = new FormData();
		tempFile.append("file", modifiedFile);
		setFile(tempFile);
	};

	const startUpload = async () => {
		setLoading(true);
		await axios.post("/api/db/handleAddPdf", file, {headers: {"Authorization": `Bearer ${myToken.jwt}`}}).then(res=>console.log(res)).catch(error=>console.log(error));
		setFile(null);
		setLoading(false);
	};

	const removedPickedFile = async () => {
		setFile(null);
	};


	const override = {
		display: "block",
		margin: "0 auto",
		borderColor: "red",
	};

	return (
		<div className={UploadCSS.module}>
			<div className={`${UploadCSS.box} ${props.cname}`}>

				{
					(file && !loading) ? 
						<>
							<label className={UploadCSS.uploadLabel} htmlFor="uploadInput">{file ? "Confirm" : "Upload"}</label>
							<input type="button" id="uploadInput" style={{display: "none"}} onClick={startUpload}/> 
							<FontAwesomeIcon onClick={removedPickedFile} icon={faXmark } color={"black"} size="lg" /> 
							<p style={{color: "black"}}>{(file.get("file").name).substring((file.get("file").name).indexOf("/")+1)}</p> 
						</> : null
				}
				{
					(!file && !loading) ? 
						<>
							<p>Upload a PDF document to get started</p>
							<input type="file" id='uploadInput' name="file" onChange={e=>saveFileState(e)} className={UploadCSS.uploadInput} />
							<label className={UploadCSS.uploadLabel} htmlFor="uploadInput">{file ? "Confirm" : "Upload"}</label>
				
						</> : null
				}

				{
					loading ? <>
						<PulseLoader speedMultiplier={1} color={color} loading={loading} cssOverride={override} size="1em" /> 
						<p>Uploading</p>
					</>: null
				}

				{notPDF ? <p style={{color: "red"}}>The file is not a PDF. Please select only PDF files.</p> : null}
				{/* {file ? 
					<>
						<FontAwesomeIcon onClick={removedPickedFile} icon={faXmark } color={"black"} size="lg" /> 
						<p style={{color: "black"}}>{(file.get("file").name).substring((file.get("file").name).indexOf("/")+1)}</p> 
					</> :
					null
				}  */}

			</div>
		</div>
	);
}
