let welcome = document.getElementById('welcome');
let input = document.getElementById('warningText');
let userString = sessionStorage.getItem('currentUser');
let currentUser = JSON.parse(userString);

if (userString === null) {
    window.location = "http://localhost:8080/project-1/index.html"
} else {
    console.log(currentUser);
    if (currentUser != null) {
        welcome.innerHTML = "Welcome to Reimbursements " + currentUser.username;
    }
}

function home() {
    window.location = "http://localhost:8080/project-1/manager/Mhome.html"
}

function sendResolve() {
    console.log("sendResolve() started")
    let resolveForm = document.resolveForm;

    let reimid = document.getElementById('reimid').value;
    let status = document.getElementById('status').value;

    const resolvetemplate = {
        username: currentUser.username,
        reimid: reimid,
        status: status
    }

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        console.log("Processing")
        if (this.readyState === 4 && this.status === 200) {
            alert("Success");
            let data = JSON.parse(xhr.responseText);
            console.log(data);
            if (data != null) {
                renderHTML(data);
            }
        }

        if (this.readyState === 4 && this.status === 204) {
            console.log("Failed");
            let childDiv = document.getElementById("warningText")
            childDiv.textContent = "Failed"
        }
    }

    xhr.open("POST", "http://localhost:8080/project-1/resolve");
    xhr.send(JSON.stringify(resolvetemplate));
}

function renderHTML(data) {

    input.append("ID: "+ data.ersid);
    input.append(document.createElement("br"));

    input.append("Author: " + data.author.username);
    input.append(document.createElement("br"));

    input.append("Resolver: " + data.resolve.username);
    input.append(document.createElement("br"));

    input.append("Status: " + data.status.status);
    input.append(document.createElement("br"));

    input.append("Type: " + data.type.type);
    input.append(document.createElement("br"));

    input.append("Description: " + data.description);
    input.append(document.createElement("br"));

    input.append("Amount: $" + data.amt);
    input.append(document.createElement("br"));

    input.append("Submitted: " + data.submitted);
    input.append(document.createElement("br"));
    
    input.append("Resolved: " + data.resolved);
    input.append(document.createElement("br"));
    
    input.append(document.createElement("hr"));
}