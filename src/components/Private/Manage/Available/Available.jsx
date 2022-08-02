/* eslint-disable no-mixed-spaces-and-tabs */
import React, {useEffect, useState} from "react";
import AvailableCSS from "./Available.module.css";
import {useAuthContext} from "components/Auth/AuthContext/AuthContext.ts";
import {Link} from "react-router-dom";
import axios from "axios";

function Available() {
	const {myToken, setToken} = useAuthContext();
	const [pdfList, setAllFiles] = useState(null);
	const [selectCheckBox, setSelectCheckBox] = useState(false);
	const [deleteArr, setDeleteArr] = useState([]);

	useEffect(() => {
		const getAllFiles = async () => {
			const response = await axios("/api/db/getAvailableFiles", {params: {email: myToken.email} ,headers: {"Authorization": `Bearer ${myToken.jwt}`}});
			(response.data).length != 0  ? setAllFiles(response.data) : setAllFiles(null);
		};
		getAllFiles();

	}, []);

	const toggleCheckBox = () => setSelectCheckBox(!selectCheckBox);
	const checkCheckBox = e => {
		console.log(e.target.value);
		if(deleteArr.some(fileName => fileName === e.target.value)) {
			setDeleteArr(deleteArr.filter(fileName => fileName !== e.target.value));
			return;
		}
		const tempArr = deleteArr.map(fileName=>fileName);
		tempArr.push(e.target.value);
		setDeleteArr(tempArr);
	};

	const deleteFiles = () => {
		console.log(deleteArr);
		setDeleteArr([]);
		setSelectCheckBox(false);
	};

	const pdfListUL = <ul>
		<li className={AvailableCSS["list__header"]}>
			<p>File Name</p>
		</li>
		{pdfList?.map((file, index) => 
			<li className={AvailableCSS["list__item"]} key={index}>
				{selectCheckBox ? 
					<>
						<input type={"checkbox"} value={file.fileName} onChange={checkCheckBox} style={{margin: "1em"}}/>
						<a>{(file.fileName).substring((file.fileName).indexOf("/")+1)}</a>
					</> :
					<Link to={`/manage/form${"?" + "from=availablePage" + "&" + "formName=" + (file.fileName).replace("/", ":") + "&" + "formVersion=" + (file.currentVersion)}`}>
						<div className={AvailableCSS["list__item-top"]}>
							<p>{`${index+1})`}</p>
							<p>{(file.fileName).substring((file.fileName).indexOf("/")+1)}</p>
						</div>					
					</Link>} </li>) ?? <li></li>}
	</ul>;
	  	
	return (
		<div>
			{/* <div className={AvailableCSS["header"]}>
				<button className={AvailableCSS["select-button"]} onClick={toggleCheckBox}>{selectCheckBox ? "Cancel" : "Select"}</button>
				<button className={AvailableCSS["delete-button"]} onClick={selectCheckBox ? deleteFiles :null }>Delete</button>
			</div> */}
			{pdfList ? pdfListUL : <p>No available files.</p>}
		</div>
	);
}

export default Available;