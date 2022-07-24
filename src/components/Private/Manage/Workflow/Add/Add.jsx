import React from "react";
import axios from "axios";
import {useAuthContext} from "../../../../Auth/AuthContext/AuthContext";
import AddCSS from "./Add.module.css";

function Add() {
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
	return (
		<div className={AddCSS.module}>
			<input type="file" id='uploadInput' name="file" onChange={e=>execute(e)} className={AddCSS.uploadInput}  />
			<label className={AddCSS.uploadLabel} htmlFor="uploadInput">Add</label>
		</div>

	);
}

export default Add;