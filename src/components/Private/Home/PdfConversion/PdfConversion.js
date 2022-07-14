const fileToBase64 = async (file, cb) => {
	console.log(file);
	const reader = new FileReader();
	let base64 = null;

	reader.onload = function(fileLoadedEvent) {
		base64 = fileLoadedEvent.target.result;
		// console.log(base64)
		cb(base64);
	};

	reader.readAsDataURL(file);
	return base64;
};

export default fileToBase64;
