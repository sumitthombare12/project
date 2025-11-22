const el = document.getElementById("container");
const rect = el.getBoundingClientRect();

console.log("Bottom (viewport):", rect.bottom);

const bottomAbsolute = rect.bottom + window.scrollY;
console.log("Bottom (page):", bottomAbsolute);

if(bottomAbsolute <= window.innerHeight-70) {
    document.querySelector("footer").style.cssText = `
        display: flex;
        flex-direction: row;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background-color: #FFFFFF;
        gap: 40px;
        color: #737373;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        padding-left: 15%;
        align-items: center;
        bottom: 0px;
    `;
}

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

let ranks;
getRanks();

function getRanks() {
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
        alert("Please first register you");
    } else {
        let url = "http://127.0.0.1:5000/fetch_rank";

        $.post(url, {username: username}, function(data, status) {
            let pointing = document.getElementById("pointing");
            pointing.innerHTML = `<h3>Ranking: ${data.user_rank}</h3><h3>Points: ${data.user_points}</h3>`;

            rank_container = document.getElementById("ranking");
            rank_container.innerHTML = "";
            if(status == "success") {
                let label = document.createElement('h3');
                label.innerHTML = "Sr. No.";
                let label1 = document.createElement('h3');
                label1.innerHTML = "USERNAME";
                let label2 = document.createElement('h3');
                label2.innerHTML = "FULL NAME";
                let label3 = document.createElement('h3');
                label3.innerHTML = "POINTS";
                rank_container.appendChild(label);
                rank_container.appendChild(label1);
                rank_container.appendChild(label2);
                rank_container.appendChild(label3);
                let cnt = 1;
                for(let idx in data.ranks) {
                    console.log(data.ranks[idx]);

                    let label = document.createElement('h3');
                    label.innerHTML = cnt;
                    label1 = document.createElement('h3');
                    label1.innerHTML = data.ranks[idx][0];
                    label2 = document.createElement('h3');
                    label2.innerHTML = data.ranks[idx][1];
                    label3 = document.createElement('h3');
                    label3.innerHTML = data.ranks[idx][2];
                    rank_container.appendChild(label);
                    rank_container.appendChild(label1);
                    rank_container.appendChild(label2);
                    rank_container.appendChild(label3);

                    cnt = cnt + 1;
                }
            } else {
                rank_container.innerHTML = `<h2 style="color:#737373">Loading Failed</h2>`;
            }
        });
    }
}