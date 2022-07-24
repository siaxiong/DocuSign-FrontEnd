import React from "react";
import {Link} from "react-router-dom";
import SideNavCSS from "./SideNav.module.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import AddButton from "../Manage/Workflow/Add/Add";


function SideNav() {
	return (
		<div className={SideNavCSS.module}>
			{/* <Link to="/add" className={SideNavCSS.upload}>Add Document</Link> */}
			<AddButton/>
			{/* <p className=''>WORKFLOW</p> */}
			<ul className={`${SideNavCSS.ul}`}>
				<li className={SideNavCSS.noHover}>WORKFLOW</li>
				<li><Link to="required">Action Required</Link></li>
				<li><Link to="pending">Pending</Link></li>
				<li><Link to="completed">Completed</Link></li>
			</ul>
			{/* <p className=''>QUICK VIEWS</p> */}
			<ul className={`${SideNavCSS.ul}`}>
				<li className={SideNavCSS.noHover}>QUICK VIEWS</li>
				<li><Link to="available">Available</Link></li>
				<li><Link to="deleted">Deleted</Link></li>
			</ul>

		</div>
	);
}

export default SideNav;