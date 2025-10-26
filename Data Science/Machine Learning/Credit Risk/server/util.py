import json
import pickle
import numpy as np

__homes = None
__intents = None
__data_columns = None
__model = None

def get_home_intent_values():
    with open("./artifacts/credit_risk_columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __homes = __data_columns[8: 12]
        __intents = __data_columns[12:]
        print(__data_columns)
    return __homes, __intents

def predict_credit_risk_model(age, income, emp_length, amount, rate, status, percent_income, cred_length, home, intent):

    with open("./artifacts/credit_risk_columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']

    with open("./artifacts/credit_risk_model.pickle", "rb") as f:
        __model = pickle.load(f)

    try:
        loc_home_index = __data_columns.index(home.lower())
        loc_intent_index = __data_columns.index(intent.lower())
    except:
        return "Exception is coming"

    x = np.zeros(len(__data_columns))
    x[0] = age
    x[1] = income
    x[2] = emp_length
    x[3] = amount
    x[4] = rate
    x[5] = status
    x[6] = percent_income
    x[7] = cred_length
    if loc_home_index >= 0 and loc_intent_index >= 0:
        x[loc_home_index] = 1
        x[loc_intent_index] = 1
    return __model.predict([x])[0]

if __name__ == "__main__":
    print(get_home_intent_values())
    print(predict_credit_risk_model(24, 28000, 6.0, 10000	, 10.37, 0, 0.36, 2, 'Home_OWN', 'Intent_HOMEIMPROVEMENT'))
    print(predict_credit_risk_model(27, 64000, 0.0, 10000, 15.27, 0, 0.16, 10, 'Home_RENT', 'Intent_PERSONAL'))