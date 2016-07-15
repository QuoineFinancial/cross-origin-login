$(document).ready(function() {
  var button = $('#login');
  var quoineHost = "https://staging1.quoine.com",
  // var quoineHost = "https://jbits-api.quoine.com",
      jbitsHost = "http://localhost:3000";

  // staging
  var userId = "9143",
      secret = "OkZax807AbGraK8IM8Zii1eznQ8rgQW7QPPGvx1Iejo6BQYbFPmVBtjEZnjDTcX49PGBuck/Yr9NnWF59qoi+g==";

  // quoineHost = prompt("Please enter quoine host", quoineHost);
  // jbitsHost = prompt("Please enter url", jbitsHost);
  // tokenId = prompt("Please enter user id", tokenId);
  // secret = prompt("Please enter user secret", secret);

  // production
  // var userId = "17284",
  //     secret = "h5SE8LtTDY8hadMy8WCObaY4p0Bm7xnFEsUp12kEsVVKOIaNWlOVth7axWnKgDbKuaamKipWP3Z90K076JlKfA==";

  //Sign the request for Authentication
  $.ajaxSetup({
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-Quoine-Auth', sign(getAuthPayload(userId), secret));
    }
  });
  //end

  button.click(function(){
    // button.text('Logging in ...');
    // button.prop('disabled', true);
    //Request login token
    $.getJSON(quoineHost + "/cors_auth", function(response) {
      //Use token to login to trading dashboard
      window.open(jbitsHost + "/#/auth?token=" + response.encrypted, '_blank', 'width=1280,height=800,toolbar=0,location=0,menubar=0');
      // window.location = jbitsHost + "/#/auth?token="+response.encrypted
    });
  });
});

function sign(payload, secret){
  var oHeader = {alg: 'HS256', typ: 'JWT'};
  var sHeader = JSON.stringify(oHeader);
  var sPayload = JSON.stringify(payload);
  return KJUR.jws.JWS.sign("HS256", sHeader, sPayload, secret);
}

function getAuthPayload(userId){
  return {
    user_id: userId,
    path: "/cors_auth",
    nonce: new Date().getTime()
  }
}
