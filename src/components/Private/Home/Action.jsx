import React, {useEffect, useState} from "react";
import ActionCSS from "./Action.module.css";
import image from "./home-hero-bg.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
	faCircleExclamation,
	faClock,
	faCheckCircle,
	faGear
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {useAuthContext} from "../../Auth/AuthContext/AuthContext";
import axios from "axios";

function Action() {

	const {myToken} = useAuthContext();
	const [requiredNum, setRequiredNum] = useState(0);
	const [pendingNum, setPendingNum] = useState(0);
	const [completedNum, setCompletedNum] = useState(0);

	useEffect(()=>{
		const init = async () => {

			const num1 = await axios.get("/api/db/getAssignedPDFs", {params: {email: myToken.email}, headers: {"Authorization": `Bearer ${myToken.jwt}`}});
			const num2 = await axios.get("/api/db/getPendingPDFs", {params: {email: myToken.email}, headers: {"Authorization": `Bearer ${myToken.jwt}`}});
			const num3 = await axios("/api/db/getCompletedPDFs", {params: {email: myToken.email}, headers: {"Authorization": `Bearer ${myToken.jwt}`}});

			setRequiredNum(num1.data.length);
			setPendingNum(num2.data.length);
			setCompletedNum(num3.data.length);

		};

		init();


	},[]);

	return (
		<div className={ActionCSS.module} style={{background:`url(${image})`}}>
			<ul>
				<li>
					<Link to="/manage/required">
						<div className={ActionCSS.card}>
							<div className={ActionCSS.status}>
								{requiredNum ? <p>{requiredNum}</p> : null}
								<FontAwesomeIcon icon={faCircleExclamation } color={requiredNum ? "#FF9F29" : "white"} size="lg" /> 
							</div>
							<p>Action Required</p>                   
						</div>
					</Link>
				</li>
				<li>
					<Link to="/manage/pending">
						<div className={ActionCSS.card}>
							<div className={ActionCSS.status}>
								{pendingNum ? <p>{pendingNum}</p> : null}
								<FontAwesomeIcon icon={faClock} color="white" size="lg" />                    
							</div>
							<p>Pending</p>
						</div>
					</Link>
				</li>            
				<li>
					<Link to="/manage/completed">
						<div className={ActionCSS.card}>
							<div className={ActionCSS.status}>
								{completedNum ? <p>{completedNum}</p> : null}
								<FontAwesomeIcon icon={faCheckCircle} color="white" size="lg" />                   
							</div>
							<p>Completed</p>
						</div>
					</Link>
				</li>           
			</ul>
		</div>
	);
}

export default Action;