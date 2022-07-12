import React, {useState} from "react";
import UploadCSS from "./Upload.module.css";
import { fileToBase64 } from "./PdfConversion/PdfConversion";
import { useAuthContext } from "../../Auth/AuthContext/AuthContext";
import axios from "axios";

export default function Upload(props) {
    const [fileName, setFileName] = useState("");
    const [base64, setBase64] = useState("");
    const {myToken} = useAuthContext();

    const execute = async (e) => {
        const file = new FormData();
        file.append("file", e.target.files[0]);
        axios.post("/api/db/handleAddPdf", file, {headers: {"Authorization": `Bearer ${myToken.jwt}`}}).then(res=>console.log(res));
    };

    const deleteFile = () => {
        axios.delete("/api/db/deleteFile", {data: {fileName: "siax/Sia-Xiong-Resume.pdf", token: myToken.Credentials}, headers: {"Authorization": `Bearer ${myToken.jwt}`}}).then(res=>console.log(res));
    };

    const getFile = () => {
        axios.get("/api/db/getFile", {params: {fileName: "decoded-file.pdf"}, headers: {"Authorization": `Bearer ${myToken.jwt}`}}).then(res=>console.log(res));
    };

    const getAllFiles = () => {
        axios.get("/api/db/getAllFiles", {headers: {"Authorization": `Bearer ${myToken.jwt}`}}).then(res=>console.log(res));
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
            </div>
        </div>
    );
}
