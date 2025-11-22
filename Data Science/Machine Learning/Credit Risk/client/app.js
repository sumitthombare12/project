
function getPercentIncome() {
    var income = document.getElementById('cst_income');
    var amount = document.getElementById('ln_amount');
    var per_inc = document.getElementById('percent_income');
    if(income.value != '' && amount.value != '') {
        var per = parseInt(amount.value)/parseInt(income.value);
        per_inc.value = per;
    } else {
        per_inc.value = 0;
    }

}

function onClickEstimaterRisk() {
    console.log("Estimate risk button clicked");
    var cst_age = document.getElementById('cst_age');
    var cst_income = document.getElementById('cst_income');
    var emp_length = document.getElementById('emp_length');
    var ln_amount = document.getElementById('ln_amount');
    var ln_rate = document.getElementById('ln_rate');
    var status_list = document.getElementById('status_list');
    var percent_income = document.getElementById('percent_income');
    var cred_length = document.getElementById('cred_length');
    var home_list = document.getElementById('homes_list');
    var ln_intent = document.getElementById('intents_list');
    var estRisk = document.getElementById('result');

    if(cst_age.value != '' && cst_income.value != '' && emp_length.value != '' && ln_amount.value != '' && ln_rate.value != '' && percent_income.value != '' && cred_length.value != '') {
        var url = "http://127.0.0.1:5000/predict_credit_risk";

        $.post(url, {
            cst_age: parseInt(cst_age.value),
            cst_income: parseInt(cst_income.value),
            emp_length: parseFloat(emp_length.value),
            ln_amount: parseInt(ln_amount.value),
            ln_rate: parseFloat(ln_rate.value),
            ln_status: status_list.value,
            percent_income: parseFloat(percent_income.value),
            cred_length: parseInt(cred_length.value),
            cst_home : home_list.value,
            ln_intent: ln_intent.value
            }, function(data, status) {
                console.log(data.credit_risk);
                if(data.credit_risk == "N") {
                    estRisk.innerHTML = "<h3>"+data.credit_risk+"O</h3>";
                } else {
                    estRisk.innerHTML = "<h3>"+data.credit_risk+"ES</h3>";
                }
                console.log(status);
        });
    } else {
        console.log("Enter all input values");
    }
}

function onPageLoad() {
    console.log(" Document loaded");
    var url = "http://127.0.0.1:5000/get_home_intent_val";
    console.log(url);
    $.get(url, function(data, status){
        console.log("got response for get_home_intent_values");
        if(data) {
            var homes = data.home;
            var intents = data.intent;
            //homes data loaded
            var home_list = document.getElementById('homes_list');
            $('#homes_list').empty();
            for(var i in homes) {
                var opt = new Option(homes[i]);
                $('#homes_list').append(opt);
            }
            //intent data loaded
            var intents_list = document.getElementById("intents_list");
            $('#intents_list').empty();
            for(var j in intents) {
                var opt = new Option(intents[j]);
                $('#intents_list').append(opt);
            }
        }
    });
}

window.onload = onPageLoad;