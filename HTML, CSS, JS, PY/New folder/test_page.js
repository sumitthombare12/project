function changeSelectColor() {
    document.getElementById("two_step").style = "color: black;";
}

class calculatePoints {
    #points = 0;
    #url = "http://127.0.0.1:5000/classify_points";

    #service_type = document.getElementById("service_type").value;
    #is_name = document.getElementById("is_name").checked;
    #is_phone = document.getElementById("is_phone").checked;
    #is_addr = document.getElementById("is_addr").checked;
    #is_gov_id = document.getElementById("is_gov_id").checked;
    #is_fincial_details = document.getElementById("is_fincial_details").checked;
    #is_two_step = document.getElementById("two_step").value;
    #is_scr_pswt = document.getElementById("scr_pswt").value;
    #is_acc_use = document.getElementById("acc_use").value;
    #is_perm_type = document.getElementById("perm_type").value;
    #is_Privacy_policy = document.getElementById("Privacy_policy").value;
    #is_manage_pass = document.getElementById("manage_pass").value;
    #is_bank_alert = document.getElementById("bank_alert").value;
    #is_free_prize = document.getElementById("free_prize").value;
    #is_public_wifi = document.getElementById("public_wifi").value;
    #is_self_googled = document.getElementById("self_googled").value;
    #is_old_account = document.getElementById("old_account").value;


    async #checkData() {

        /*console.log(` ${this.#service_type}\n ${this.#is_name}\n ${this.#is_phone}\n ${this.#is_addr}\n ${this.#is_gov_id}\n 
    ${this.#is_fincial_details}\n ${this.#is_two_step}\n ${this.#is_scr_pswt}\n ${this.#is_acc_use}\n 
    ${this.#is_perm_type}\n ${this.#is_Privacy_policy}\n ${this.#is_manage_pass}\n ${this.#is_blank_alert}\n 
    ${this.#is_free_prize}\n ${this.#is_public_wifi}\n ${this.#is_self_googled}\n ${this.#is_old_account}`);*/

        if(this.#service_type.trim() == "") {
            alert("Service Type Required");
            return 0;
        }

        let cal_btn = document.getElementById("cal_btn");
        cal_btn.innerHTML = "<b>Calculating...<b>";
        cal_btn.disabled = true;

        let data = {}

        data["username"] = (username != null? username: "");
        data["service_type"] = (this.#service_type.trim() != ''? this.#service_type: "");
        data["is_name"] = this.#is_name;
        data["is_phone"] = this.#is_phone;
        data["is_addr"] = this.#is_addr;
        data["is_gov_id"] = this.#is_gov_id;
        data["is_fincial_details"] = this.#is_fincial_details;
        data["two_step_verification"] = (this.#is_two_step.trim() != ''? this.#is_two_step: "");
        data["secure_password"] = (this.#is_scr_pswt.trim() != ''? this.#is_scr_pswt: "");
        data["account_uses"] = (this.#is_acc_use.trim() != ''? this.#is_acc_use: "");
        data["permission_type"] = (this.#is_perm_type.trim() != ''? this.#is_perm_type: "");
        data["Privacy_policy"] = (this.#is_Privacy_policy.trim() != ''? this.#is_Privacy_policy: "");
        data["manage_password"] = (this.#is_manage_pass.trim() != ''? this.#is_manage_pass: "");
        data["bank_alert_sms"] = (this.#is_bank_alert.trim() != ''? this.#is_bank_alert: "");
        data["free_prize"] = (this.#is_free_prize.trim() != ''? this.#is_free_prize: "");
        data["public_wifi"] = (this.#is_public_wifi.trim() != ''? this.#is_public_wifi: "");
        data["self_googled"] = (this.#is_self_googled.trim() != ''? this.#is_self_googled: "");
        data["manage_old_account"] = (this.#is_old_account.trim() != ''? this.#is_old_account: "");
        console.log(data);

        await $.post(this.#url, data, function(data, status) {
                this.#points = data.new_points;
                console.log(data.new_points);
                console.log(data.total_points)
                console.log(data.labels);
                console.log(data.data);

                let en_labels = encodeURIComponent(JSON.stringify(data.labels))
                let en_data = encodeURIComponent(JSON.stringify(data.data))

                // Open another page (same domain)
                let newWin = window.open("overview_page.html?points="+data.new_points+"&total_points="+data.total_points+"&labels="+en_labels+"&data="+en_data, "_self");

            }.bind(this)
        );

        cal_btn.innerHTML = "<b>Submit</b>";
        cal_btn.disabled = false;

        return this.#points;
    }

    returnData() {
        return this.#checkData();
    }
}

document.getElementById("cal_btn").addEventListener('click', () => {
    let obj = new calculatePoints();
    console.log(obj.returnData());
});

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
