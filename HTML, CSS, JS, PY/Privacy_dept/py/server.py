from flask import Flask, request, jsonify
import util
import webbrowser

app = Flask(__name__)
dict = {}

@app.route('/check_otp', methods=['POST'])
def check_otp():

    otp_id = request.form["otp_id"]
    my_otp = request.form["my_otp"]
    name = request.form["name"]
    email = request.form["email"]
    username = request.form["username"]
    password = request.form["password"]

    response = jsonify({
        'Status:' : util.insertUserData(otp_id, my_otp, name, email, username, password)
    })

    print(response)
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response

@app.route('/send_otp', methods=['POST'])
def send_otp():
    emailid = request.form["email"]
    name = request.form["name"]
    print("Hello")
    response = jsonify({
        'otp_id' : util.sendOTP(emailid, name)
    })

    print(response)
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response

@app.route('/classify_points', methods=['POST'])
def classify_points():
    username = request.form["username"]
    service_type = request.form["service_type"]
    is_name = request.form["is_name"]
    is_phone = request.form["is_phone"]
    is_addr = request.form["is_addr"]
    is_gov_id = request.form["is_gov_id"]
    is_fincial_details = request.form["is_fincial_details"]
    two_step_verification = request.form["two_step_verification"]
    secure_password = request.form["secure_password"]
    account_uses = request.form["account_uses"]
    permission_type = request.form["permission_type"]
    Privacy_policy = request.form["Privacy_policy"]
    manage_password = request.form["manage_password"]
    bank_alert_sms = request.form["bank_alert_sms"]
    free_prize = request.form["free_prize"]
    public_wifi = request.form["public_wifi"]
    self_googled = request.form["self_googled"]
    manage_old_account = request.form["manage_old_account"]

    print(service_type, is_name, is_phone, is_addr, is_gov_id, is_fincial_details, two_step_verification, secure_password, account_uses, permission_type, Privacy_policy, manage_password, bank_alert_sms, free_prize, public_wifi, self_googled, manage_old_account)

    raw_data = util.classify_points(service_type, is_name, is_phone, is_addr, is_gov_id, is_fincial_details, two_step_verification, secure_password, account_uses, permission_type, Privacy_policy, manage_password, bank_alert_sms, free_prize, public_wifi, self_googled, manage_old_account)

    try:
        util.insertPoints(username, int(raw_data["new_points"]))
    except Exception as e:
        print(e)

    print(raw_data['total_points'])
    response = jsonify({
        'new_points' : int(raw_data['new_points']),
        'total_points' : int(raw_data['total_points']),
        'labels': list(raw_data['labels']),
        'data': list(raw_data['data'])
    })

    print(response)
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response

@app.route('/check_user', methods=['POST'])
def check_user():
    username = request.form["username"]
    password = request.form["password"]

    response = jsonify({
        'flag': util.check_user(username, password)
    })

    print(response)
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response

@app.route('/fetch_rank', methods=['POST'])
def fetch_rank():
    username = request.form["username"]

    raw_data = util.fetch_rank(username)
    print(raw_data)
    response = jsonify({
        'user_points': int(raw_data["user_points"]),
        'user_rank': int(raw_data["user_rank"]),
        'ranks': list(raw_data["ranks"])
    })

    print(response)
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response

if __name__ == "__main__":
    print("Starting python flask server for Home Price Prediction")
    webbrowser.open_new_tab("welcome_page.html")
    app.run()