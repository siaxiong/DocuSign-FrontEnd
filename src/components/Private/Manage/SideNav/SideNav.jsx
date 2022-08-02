import React, {useState} from "react";
import {Link} from "react-router-dom";
import SideNavCSS from "./SideNav.module.css";
import AddButton from "../Add/Add";


function SideNav() {
	const [clickedTab, setClickedTab] = useState(null);

	const toggleTab = tab => setClickedTab(tab);

	return (
		<div className={SideNavCSS.module}>
			<AddButton/>
			<ul className={`${SideNavCSS.ul}`}>
				<li className={SideNavCSS.noHover}>WORKFLOW</li>
				<li className={clickedTab == "requireTab" ? SideNavCSS.clickedTab : null}><Link to="require"  onClick={()=>toggleTab("requireTab")}>Action Require</Link></li>
				<li className={clickedTab == "pendingTab" ? SideNavCSS["clickedTab"] : null}><Link to="pending" onClick={()=>toggleTab("pendingTab")}>Pending</Link></li>
				<li className={clickedTab == "completedTab" ? SideNavCSS["clickedTab"] : null}><Link to="completed"  onClick={()=>toggleTab("completedTab")}>Completed</Link></li>
			</ul>
			<ul className={`${SideNavCSS.ul}`}>
				<li className={SideNavCSS.noHover}>QUICK VIEWS</li>
				<li className={clickedTab == "availableTab" ? SideNavCSS["clickedTab"] : null} onClick={()=>toggleTab("availableTab")}><Link to="available">Available</Link></li>
				<li className={clickedTab == "deletedTab" ? SideNavCSS["clickedTab"] : null} onClick={()=>toggleTab("deleteTab")}><Link to="deleted">Deleted</Link></li>
			</ul>

		</div>
	);
}

export default SideNav;