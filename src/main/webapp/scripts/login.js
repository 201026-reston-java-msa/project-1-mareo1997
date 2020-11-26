//const sendLogin = () => {
function sendLogin() {
	console.log("sendLogin() started")
	let loginForm = document.loginForm;
	let username = document.getElementById('username').value;
	let password = document.getElementById('password').value;
	console.log("Username: " + username + " Password: " + password);

	const logintemplate = {
		username: username,
		password: password
	}

	//This begins AJAX workflow
	let xhr = new XMLHttpRequest();

	// setting up a callback function for when ready state changed (ready stat starts from 0 to 4)
	// this call back is called everytime readyState changes
	xhr.onreadystatechange = function() {
		console.log("Processing")
		if (this.readyState === 4 && this.status === 200) {
			console.log("Employee");
            sessionStorage.setItem('currentUser',this.responseText);
			window.location = "http://localhost:8080/project-1/Ehome.html"
            //console.log(sessionStorage.getItem('currentUser'))
		}
		if (this.readyState === 4 && this.status === 201) {
			console.log("Manager");
            sessionStorage.setItem('currentUser',this.responseText);
			window.location = "http://localhost:8080/project-1/Mhome.html"
			//console.log(sessionStorage.getItem('currentUser'))
		}
		if (this.readyState === 4 && this.status === 204) {
			console.log("Failed");
			alert("Failed to log in! Username or password is incorrect");
			let childDiv = document.getElementById("warningText")
			childDiv.textContent = "Failed to log in! Username or Password is incorrect"

		}
	};

	xhr.open("POST", "http://localhost:8080/project-1/login");
    xhr.send(JSON.stringify(logintemplate));
}

//document.getElementById("login").addEventListener('submit', sendLogin);