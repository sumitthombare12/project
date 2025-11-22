from flask import Flask, request, jsonify
import util

app = Flask(__name__)
@app.route('/get_home_intent_val')
def get_home_intent_val():
    response = jsonify({
        'home' : util.get_home_intent_values()[0],
        'intent': util.get_home_intent_values()[1]
    })
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response

@app.route('/predict_credit_risk', methods=['POST'])
def predict_credit_risk():
    cst_age = int(request.form["cst_age"])
    cst_income = int(request.form['cst_income'])
    emp_length = float(request.form['emp_length'])
    ln_amount = int(request.form['ln_amount'])
    ln_rate = float(request.form['ln_rate'])
    ln_status = int(request.form['ln_status'])
    percent_income = float(request.form['percent_income'])
    cred_length = int(request.form['cred_length'])
    cst_home = str(request.form['cst_home'])
    ln_intent = str(request.form['ln_intent'])

    response = jsonify({
        'credit_risk' : util.predict_credit_risk_model(cst_age, cst_income, emp_length, ln_amount, ln_rate, ln_status, percent_income, cred_length, cst_home, ln_intent)
    })

    print(response)
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response

if __name__ == "__main__":
    print("Starting python flask server for Home Price Prediction")
    app.run()