import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import style from "./Document.module.css";

function Manage() {
	return (
		<>
			{console.log("Managed is called")}
			<div className={style.module}>
				<div className={`${style.border} ${style.SideNav}`}>
					<SideNav/>
				</div>
				<div id='outlet' className={`${style.border} ${style.outlet}`}>
					<Outlet/>
				</div>
			</div>
		</>
	);
}

export default Manage;