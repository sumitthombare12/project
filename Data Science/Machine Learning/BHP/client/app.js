function getBathValue() {
  var bath = document.getElementsByName("bath-in");
  for(var i in bath) {
    if(bath[i].checked) {
      return parseInt(i)+1;
    }
  }
}

function getBHKValue() {
  var bhk = document.getElementsByName("bhk-in");
  for(var i in bhk) {
    if(bhk[i].checked) {
      return parseInt(i)+1;
    }
  }
}

function onClickEstimaterPrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("sqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("location");
  var estPrice = document.getElementById("estPrice");

  var url = "http://127.0.0.1:5000/predict_home_price";

  $.post(url, {
    total_sqft: parseFloat(sqft.value),
    bhk: bhk,
    bath: bathrooms,
    location: location.value
    }, function(data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = data.estimated_price+ " Lakh";
      console.log(status);
  });
}

function onPageLoad() {
  console.log(" Document loaded");
  var url = "http://127.0.0.1:5000/get_location_names";
  console.log(url);
  $.get(url, function(data, status) {
    console.log("got response for get_location_names");
    if(data) {
      var locations = data.locations;
      var location = document.getElementById("location");
      $('#location').empty();
      for(var i in locations) {
        var opt = new Option(locations[i]);
        $('#location').append(opt);
      }
      var opt = new Option("other");
      $('#location').append(opt);
    }
  });
}

window.onload = onPageLoad;