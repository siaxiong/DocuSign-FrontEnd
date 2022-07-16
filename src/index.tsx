import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {Deleted, Completed, Pending, Required,
	Form, Add, PdfViewer,Available, Home} from "./components/index";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AuthProvider from "./components/Auth/AuthProvider/AuthProvider";
import ProtectedRoute from "./components/Auth/ProtectedRoute/ProtectedRoute";
import ManageLayout from "./components/Private/Home/ManageLayout";
import Manage from "./components/Private/Manage/Manage";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);

root.render(

	<BrowserRouter>
		<AuthProvider>
			<Routes>
				<Route path="/" element={<App/>}>
					<Route element={<ProtectedRoute><ManageLayout/></ProtectedRoute>}>
						<Route index element={<Home/>}/>
						<Route path="manage" element={<Manage/>} >
							<Route index element={<Available/>}/>
							<Route path="required" element={<Required/>}>
								<Route path="pdfViewer" element={<PdfViewer/>}/>
							</Route>
							<Route path="pending" element={<Pending/>}/>
							<Route path="completed" element={<Completed/>}/>
							<Route path="available" element={<Available/>}/>
							<Route path="deleted" element={<Deleted/>}/>
							<Route path="add" element={<Add/>}/>
							<Route path=":formName" element={<Form/>}/>
						</Route>
					</Route>
				</Route>
			</Routes>
		</AuthProvider>
	</BrowserRouter>
);

