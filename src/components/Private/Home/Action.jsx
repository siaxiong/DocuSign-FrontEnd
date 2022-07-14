import React from "react";
import ActionCSS from "./Action.module.css";
import image from "./home-hero-bg.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
	faCircleExclamation,
	faClock,
	faCheckCircle,
	faGear
} from "@fortawesome/free-solid-svg-icons";

function Action() {
	return (
		<div className={ActionCSS.module} style={{background:`url(${image})`}}>
			<ul>
				<li>
					<div className={ActionCSS.card}>
						<FontAwesomeIcon icon={faCircleExclamation } color="white" size="lg" /> 
						<p>Action Required</p>                   
					</div>
				</li>
				<li>
					<div className={ActionCSS.card}>
						<FontAwesomeIcon icon={faClock} color="white" size="lg" />                    
						<p>Pending</p>
					</div>
				</li>            
				<li>
					<div className={ActionCSS.card}>
						<FontAwesomeIcon icon={faCheckCircle} color="white" size="lg" />                   
						<p>Completed</p>
					</div>
				</li>           
				<li>
					<div className={ActionCSS.card}>
						<FontAwesomeIcon icon={faGear} color="white" size="lg" />                   
						<p>Others</p>
					</div>
				</li> 
			</ul>
		</div>
	);
}

export default Action;