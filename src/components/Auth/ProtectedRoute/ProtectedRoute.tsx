import React from "react";
import {
	Navigate, Outlet
} from "react-router-dom";

import {useAuthContext} from "../AuthContext/AuthContext";

  type CountProviderProps = {children: React.ReactNode}

function ProtectedRoute({children}:CountProviderProps) {

    
	const {myToken} = useAuthContext();
	console.log(myToken);

	myToken ? console.log("myToken exist") : console.log("myToken does NOT exist");

	return myToken ? <React.Fragment><Outlet/></React.Fragment> :  <Navigate to="/" replace />;
}

export default ProtectedRoute;