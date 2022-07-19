import React from "react";
import {Link} from "react-router-dom";
import SideNavCSS from "./SideNav.module.css";
// import 'bootstrap/dist/css/bootstrap.min.css';


function SideNav() {
	return (
		<div className={SideNavCSS.module}>
			<Link to="/add" className={SideNavCSS.upload}>Add Document</Link>
			<p className=''>WORKFLOW</p>
			<ul className={`${SideNavCSS.ul} ${SideNavCSS.envelope}`}>
				<li><Link to="required">Action Required</Link></li>
				<li><Link to="pending">Pending</Link></li>
				<li><Link to="completed">Completed</Link></li>
			</ul>
			<p className=''>QUICK VIEWS</p>
			<ul className={`${SideNavCSS.ul} ${SideNavCSS.view}`}>
				<li><Link to="available">Available</Link></li>
				<li><Link to="deleted">Deleted</Link></li>
			</ul>

		</div>
	);
}

export default SideNav;