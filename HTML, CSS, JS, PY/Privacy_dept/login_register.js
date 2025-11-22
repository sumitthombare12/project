btn_bar = document.getElementById("login_bar");
btn_lg = document.getElementById("log_btn");
btn_rg = document.getElementById("rgt_btn");
form = document.getElementById("form-container");

function openLogin() {
    btn_bar.style.animation = "regis_button_margin 0.5s forwards";
    btn_lg.style = "background-color: #eeeeee;";
    btn_rg.style = "background-color: #FFFFFF;";

    form.innerHTML = `<input type="text" id="username" placeholder="Enter username" required>
                    <input type="password" id="password" placeholder="Enter password" required>
                    <button id="loginBtn" type="button" onclick="onLogin();">Submit</button>
                    <a href="">Forgot Password</a>`;
}

function openRegister() {
    btn_bar.style.animation = "login_button_margin 0.5s forwards";
    btn_lg.style = "background-color: #FFFFFF;";
    btn_rg.style = "background-color: #eeeeee;";

    form.innerHTML = `<input type="text" id="pname" placeholder="Enter name(Name Surname)" required>
                    <input type="text" id="mailid" placeholder="Enter email id" required>
                    <input type="text" id="username" placeholder="Enter username" required>
                    <input type="password" id="password" placeholder="Enter password" required>
                    <input type="password" id="rpassword" placeholder="Retype password" required>
                    <button id="sendOTPBtn" type="button" onclick="sendOTP();">Send OTP</button>`;
}

//Old Person Login
function onLogin() {
    var username = document.getElementById("username").value;
    var password =  document.getElementById("password").value;
    let loginBtn = document.getElementById("loginBtn");
    console.log(username);
    console.log(password);

    loginBtn.innerHTML = "Checking Data!";
    loginBtn.disabled = true;

    let Promise1 = new Promise((resolve, reject)=> {
        url = "http://127.0.0.1:5000/check_user";
        try {
            $.post(url, {
                username: username,
                password: password
            }, function(data, status) {
                alert("Success:"+status);
                if(data.flag == true) {
                    resolve("Data found successfully");
                }
            });
        } catch(e) {
            alert(e);
            reject("Internal Server Error");
        }
    });

    Promise1.then((message)=> {
        alert(message);
        
        const now = new Date();
        const expiry = now.getTime() + 30*24*60*60*1000;
        localStorage.setItem("privacy_dept_username", JSON.stringify({value: username, expiry}));

        const item = JSON.parse(localStorage.getItem("privacy_dept_username"));
        if (item && new Date().getTime() < item.expiry) {
            console.log("privacy_dept_username:", item.value);
        } else {
            localStorage.removeItem("privacy_dept_username");
        }

        loginBtn.innerHTML = "Submit";
        loginBtn.disabled = false;
    
        location.href = "welcome_page.html";
    }).catch((error)=> {
        alert(message);
        loginBtn.innerHTML = "Submit";
        loginBtn.disabled = false;
    })
}

//New Register Person
function setRegister(otp_id, pname, mailid, username, password) {

    let newH3 = document.createElement("h4");
    newH3.innerHTML = "<br> OTP ID:"+otp_id;
    newH3.style.color = "black";

    let newDiv = document.createElement("div");
    newDiv.style.cssText = `width: 400px;
                        height: 40px;
                        border-radius: 5px/5px;
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;`;
    newDiv.setAttribute("id", "otp-container");

    firstInput = document.createElement("input");
    firstInput.setAttribute("id", "otpIn1");
    firstInput.setAttribute("maxlength", "1");
    firstInput.type = "number";
    secondInput = document.createElement("input");
    secondInput.setAttribute("id", "otpIn2");
    secondInput.setAttribute("maxlength", "1");
    secondInput.type = "number";
    thirdInput = document.createElement("input");
    thirdInput.setAttribute("id", "otpIn3");
    thirdInput.setAttribute("maxlength", "1");
    thirdInput.type = "number";
    fourthInput = document.createElement("input");
    fourthInput.setAttribute("id", "otpIn4");
    fourthInput.setAttribute("maxlength", "1");
    fourthInput.type = "number";

    firstInput.style.width = "30px";
    secondInput.style.width = "30px";
    thirdInput.style.width = "30px";
    fourthInput.style.width = "30px";

    newDiv.appendChild(firstInput);
    newDiv.appendChild(secondInput);
    newDiv.appendChild(thirdInput);
    newDiv.appendChild(fourthInput);

    let subBtn = document.createElement("button");
    subBtn.setAttribute("id", "create_new");
    subBtn.type = "reset";
    subBtn.innerHTML = "Submit";
    subBtn.addEventListener('click', ()=>{

        let val1 = document.getElementById("otpIn1").value;
        let val2 = document.getElementById("otpIn2").value;
        let val3 = document.getElementById("otpIn3").value;
        let val4 = document.getElementById("otpIn4").value;
        let my_otp = val1 + val2 + val3 + val4;

        let url = "http://127.0.0.1:5000/check_otp";
        let Promise1 = new Promise((resolve, reject)=> {
            try {
                $.post( url, {
                    otp_id: otp_id,
                    my_otp: my_otp,
                    name: pname,
                    email: mailid,
                    username: username,
                    password: password,
                }, function(data, status){
                    resolve("data inserted successfully & status:"+status);
                });

            } catch(e) {
                reject("Internal Server Error");
                alert(e);
            }
        });

        Promise1.then((message)=> {
            alert(message);
        
            const now = new Date();
            const expiry = now.getTime() + 30*24*60*60*1000;
            localStorage.setItem("privacy_dept_username", JSON.stringify({value: username, expiry}));

            const item = JSON.parse(localStorage.getItem("privacy_dept_username"));
            if (item && new Date().getTime() < item.expiry) {
                console.log("privacy_dept_username:", item.value);
            } else {
                localStorage.removeItem("privacy_dept_username");
            }

            location.href = "welcome_page.html";
        }).catch((error)=> {
            alert(error);
        })
    });

    

    form.appendChild(newH3);
    form.appendChild(newDiv);
    form.appendChild(subBtn);

    const inputs = document.querySelectorAll("#otp-container input");

    inputs.forEach((input, index) => {
        input.addEventListener("input", () => {
            
            if (input.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
            }
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && input.value === "" && index > 0) {
            inputs[index - 1].focus();
            }
        });
    });
}

function sendOTP() {

    var pname = document.getElementById("pname").value;
    var mailid = document.getElementById("mailid").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var rpassword = document.getElementById("rpassword").value;
    let otp_id = "";
    let url = "http://127.0.0.1:5000/send_otp";
    let send_btn = document.getElementById("sendOTPBtn");
    send_btn.innerHTML = "Seding OTP...";
    send_btn.disabled = true;

    console.log(pname + "\n" + mailid + "\n" + username + "\n" + password + "\n" + rpassword);

    if(password.trim() != '') {
        if(password == rpassword) {
            if(username.trim() != '') {
                if(mailid.trim() != '') {
                    let Promise1 = new Promise((resolve, reject)=> {
                        try {
                            $.post( url, {
                                email: mailid,
                                name: pname
                            }, function(data, status){
                                this.otp_id = data.otp_id;
                                resolve(data.otp_id);
                            });

                        } catch(e) {
                            reject("Internal Server Error");
                            alert(e);
                        }
                    });

                    Promise1.then((otp_id) => {
                        send_btn.innerHTML = "Sended OTP";
                        setRegister(otp_id, pname, mailid, username, password);
                        send_btn.innerHTML = "Send OTP";
                        send_btn.disabled = false;
                    }).catch((error)=> {
                        send_btn.innerHTML = "Send OTP";
                        send_btn.disabled = false;
                        alert(error);
                    })

                    console.log("send successfully!");
                } else {
                    alert("Valid mail required")
                }
            } else {
                alert("Username needed!");
            }
        } else {
            alert("Both password required!");
        }
    } else {
        alert("Please write password!");
    }
}
