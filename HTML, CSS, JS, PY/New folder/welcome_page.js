document.getElementById("seeMore").addEventListener("click", function(e) {
    e.preventDefault();

    const data = {
    name: "Sumit",
    age: 20
    };

    fetch("http://localhost:8080/sendData", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
    console.log(result);
    })
    .catch(error => console.error("Error:", error));
});

let username = "";

const item = JSON.parse(localStorage.getItem("privacy_dept_username"));
if (item && new Date().getTime() < item.expiry) {
    console.log("privacy_dept_username:", item.value);
    username = item.value;
    console.log(username);
} else {
    localStorage.removeItem("privacy_dept_username");
}
console.log(username);
let loginBox = document.querySelector("#login");

if(username == null || username.trim() == "") {
    console.log("Hello");
    loginBox.innerHTML = `<button onclick="location.href='login_register.html'"><h3>Sign/Register</h3></button>`;
} else {
    loginBox.innerHTML = `<button onclick="displayLoginDiv();" style=" width:40px; background-color: #FFFFFF;"><img src="user_profile_login.png"></button>`;
}

function displayLoginDiv() {
    if(document.getElementById("loginContainer")) {
        return;
    }

    bodyCont = document.body;

    loginContainer = document.createElement('div');
    loginContainer.setAttribute("id", "loginContainer");
    loginContainer.style.cssText =  ` display: flex;
                                    flex-direction: column;
                                    position: fixed;
                                    width: 200px;
                                    padding: 10px;
                                    top:60px;
                                    right: 10px;
                                    background-color: #FFFFFF;
                                    z-index: 10;
                                    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    `;

    usernameDiv = document.createElement('h3');
    usernameDiv.innerHTML = username;
    usernameDiv.style.cssText = "height: 20px; width: 180px; padding: 5px; margin: 0px;";
    loginContainer.appendChild(usernameDiv);

    logoutDiv = document.createElement('h3');
    logoutDiv.innerHTML = "Logout";
    logoutDiv.style.cssText = "height: 20px; width: 180px; padding: 5px; margin: 0px;";
    logoutDiv.addEventListener('click', function() {
        localStorage.removeItem("privacy_dept_username");
        location.reload();
    });
    loginContainer.appendChild(logoutDiv);

    bodyCont.appendChild(loginContainer);
}

document.addEventListener("click", function(event) {
    const loginContainer = document.getElementById("loginContainer");
    const loginBtn = document.querySelector("#login button");
    if (loginContainer && !loginContainer.contains(event.target) && !loginBtn.contains(event.target)) {
        document.body.removeChild(loginContainer);
    }
});