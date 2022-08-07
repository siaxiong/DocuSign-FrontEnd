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
			
			(response.data).length == 0 ? null : setPendingFiles((response.data));

		};
		init();
	},[]);

	let listItems = null;

	const toggleShowPendingList = (key) => showPendingList != null ? setShowPendingList(null) : setShowPendingList(key);


	const pdfListUL = <ul>
		<li className={PendingCSS["list__header"]}>
			<p>File Name</p>
			<p>Signer</p>
		</li>
		<ul>
			{pendingFiles?.map((file, index)=>{
				let tempArr = null;
				if (Array.isArray(file)) {
					tempArr = file;
					file = file[0];
				}
	
				return <li className={PendingCSS["list__item"]} key={index}>
					<a onClick={()=>toggleShowPendingList(index)}>
						{
							<>
								<div className={PendingCSS["list__item-top"]}>
									<p>{`${index+1})`}</p>
									<p>{(file.fk_fileName).substring((file.fk_fileName).indexOf("/")+1)}</p>
								</div>
								{showPendingList !== null ? null : <p>{`${file.email}`}</p>}

								<ul className={(showPendingList === index) ? PendingCSS["pendingUserUL_Show"] : PendingCSS["pendingUserUL_Hidden"]}>
									{ tempArr ? tempArr.map((obj, key2)=><li className={obj.signed ? [PendingCSS["pendingUserLI"], PendingCSS["strike-through"]].join(" ") : PendingCSS["pendingUserLI"]} key={key2}>{(key2+1)+ ") " + obj.email}</li>) :
										[file].map((obj, key2)=><li className={obj.signed ? [PendingCSS["pendingUserLI"], PendingCSS["strikeThrough"]].join(" ") : PendingCSS["pendingUserLI"]} key={key2}>{(key2+1)+ ") " + obj.email}</li>)}
								</ul>
							</>
						}
					</a>
				</li>;
			})}
		</ul>
	</ul>;		


	return (
		<div>
			{pendingFiles ? pdfListUL :	<p>No pending files.</p>}
		</div>
	);
}

export default Pending;