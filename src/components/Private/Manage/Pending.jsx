import React, {useEffect, useState} from "react";
import axios from "axios";
import { useAuthContext } from "components/Auth/AuthContext/AuthContext";
import PendingCSS from "./Pending.module.css";

function Pending() {
	const {myToken} = useAuthContext();
	const [pendingFiles, setPendingFiles] = useState(null);
	const [showPendingList, setShowPendingList] = useState(null);

	useEffect(()=>{
		const init = async () => {
			const response = await axios.get("/api/db/getPendingPDFs", {params: {email: myToken.email}, headers: {"Authorization": `Bearer ${myToken.jwt}`}});
			console.log("🚀 ----------------------------------------------------------------🚀");
			console.log("🚀 -> file: Pending.jsx -> line 13 -> init -> response.data", response);
			console.log("🚀 ----------------------------------------------------------------🚀");
			
			(response.data).length == 0 ? null : setPendingFiles(response.data);
		};
		init();
	},[]);

	let listItems = null;

	const toggleShowPendingList = (key) => showPendingList != null ? setShowPendingList(null) : setShowPendingList(key);

	const createItem = function(file, index){
		console.log("🚀 --------------------------------------------------------------------------🚀");
		console.log("🚀 -> file: Pending.jsx -> line 38 -> createItem -> createItem", createItem);
		console.log("🚀 --------------------------------------------------------------------------🚀");	
		
		return <li className={PendingCSS["listItem"]} key={index}>
			<a onClick={()=>toggleShowPendingList(index)}>
				{(file[0].fk_fileName).substring((file[0].fk_fileName).indexOf("/")+1)}
				<ul className={(showPendingList == index) ? PendingCSS["pendingUserUL_Show"] : PendingCSS["pendingUserUL_Hidden"]}>
					{file.map((obj, key2)=><li className={obj.signed ? [PendingCSS["pendingUserLI"], PendingCSS["strikeThrough"]].join(" ") : PendingCSS["pendingUserLI"]} key={key2}>{obj.order + ") " + obj.email}</li>)}
				</ul>
			</a>
		</li>;
	};



	console.log("🚀 ---------------------------------------------------------------------------🚀");
	console.log("🚀 -> file: Pending.jsx -> line 21 -> Pending -> pendingFiles", pendingFiles);
	console.log("🚀 ---------------------------------------------------------------------------🚀");
	
	pendingFiles && function(){listItems =  <ul>{pendingFiles.map((file, index)=>createItem(file, index))}</ul>;}();

	return (
		<div>
			{listItems ? listItems :	<p>Pending</p>}
		</div>
	);
}

export default Pending;