import React from "react";
import FormCSS from "./Form.module.css";

function Form() {
	return (
		<div>
			<form className={FormCSS.registerForm}>
				<input
					id="first-name"
					className={FormCSS.registerForm}
					type="text"
					placeholder="First Name"
					name="firstName"
				/>
				<input
					id="last-name"
					className={FormCSS.formField}
					type="text"
					placeholder="Last Name"
					name="lastName"
				/>
				<input
					id="email"
					className={FormCSS.formField}
					type="text"
					placeholder="Email"
					name="email"
				/>
				<button className={FormCSS.formField}
					type="submit">
          Send
				</button>
			</form>
		</div>
	);
}

export default Form;