$(document).ready(function() {
  var button = $('#login');
  var quoineHost = "https://staging1.quoine.com",
      jbitsHost = "http://localhost:3000";

  // ASANO
  // var userId = "8721",
  //     secret = "A367oAQNEH0BhA3YCjmO1y4hDCpwc3Nt0WdaPY2t1gD+tOTB2WOK4h400TCs+NbBigMsd8LZNnvP0uTzDF0qtA==";

  // ASANO 2
  // var userId = "8542",
  //     secret = "eMNxmErhooEYjCVTfU5HX4EbNBZESprP0kdaeyttFW4+JLT03j5ZPB46F79O2X2xqeTDz7vEIlKiZDRZtqd0jw==";

  // MARIO
  // var userId = "5264",
  //     secret = "aaqRcNdJox8Js4mWYI2KO8MAhu/rDJ3DrP0oe5yljyd0qAzYAKLhzy6FdIuFgANFVhBT6h5muZ+BCqzqtPBz2Q==";

  // ME
  var userId = "5521",
      secret = "FRQtr1NvxfI3MVtitozN3RgCfFwZC8PQfJNnHbH672rc7+NpmHQGYc94b+nhK0KMbWLuU7Ps+ccs7msOwlgBSA==";

  // CHINH
  // var userId = "5712",
  //     secret = "wmCIAW/DSwaLTB4f8L023vkRnpF5CwIiHYL0U+1KCJG9LedS/q8j42ohvo80hbcIOofxKXpIHsruCKYNsE5qfA==";

  // CHINH 2
  // var userId = "5607",
  //     secret = "iP9TgR+0S1L3CG4NahlgMENu1lZK+9YQqlzYNuyDAtPowqGxGhqQl46RBE6nPsPDaGJbwfLbuJ960jhL96krTw==";

  // JBIT
  // var userId = "16892",
  //     secret = "/pY6BZz0D5RnrajQmvq8X+tUYp/LegPOIxZQa381s58SQHxLfcm/s8fHAPHz2eu30gKzJJTuYXSWMnRRNCa8mA==";

  //Sign the request for Authentication
  $.ajaxSetup({
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-Quoine-Auth', sign(getAuthPayload(userId), secret));
    }
  });
  //end

  button.click(function(){
    button.text('Logging in ...');
    button.prop('disabled', true);
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
