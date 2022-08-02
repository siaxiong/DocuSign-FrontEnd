import React from "react";
import axios from "axios";
import {useAuthContext} from "../../../Auth/AuthContext/AuthContext";
import AddCSS from "./Add.module.css";

function Add() {
	const {myToken} = useAuthContext();
	const regex = new RegExp(":", "g");


	const execute = async (e) => {
		//e.target.files[0] reads "/" as ":" so have to replace ":" back to "/"
		let modifiedFile = new File([e.target.files[0]], myToken.email + "/" + (e.target.files[0].name).replaceAll(regex, "/"));
		if (!(modifiedFile.name).endsWith(".pdf")) {
			console.log("The file is not a PDF!");
			return false;
		}
		const file = new FormData();
		console.log(modifiedFile);
		file.append("file", modifiedFile);
		await axios.post("/api/db/handleAddPdf", file, {headers: {"Authorization": `Bearer ${myToken.jwt}`}}).then(res=>console.log(res));
	};
	return (
		<div className={AddCSS["add"]}>
			<input type="file" id='uploadInput' name="file" onChange={e=>execute(e)} className={AddCSS["add__input"]}  />
			<label className={AddCSS["add__input-label"]} htmlFor="uploadInput">Add</label>
		</div>

	);
}

export default Add;