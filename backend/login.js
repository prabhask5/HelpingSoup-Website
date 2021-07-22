$(document).ready(function() {
    console.log("Ready is called");
});

/*
use later when not using tester html
function saveNewUser () {
    console.log("saveLogin is called");
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var email = $("#email").val();
    var address = $("#address").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var zip = $("#zip").val();
    var school = $("#school").val();
    var password = $("#password").val();
    var myObject = new Object ();

    myObject.firstName = firstName;
    myObject.lastName = lastName;
    myObject.email = email;
    myObject.address = address;
    myObject.city = city;
    myObject.state = state;
    myObject.zip = zip;
    myObject.school = school;
    myObject.password = password;

    var myStr = JSON.stringify(myObject);
    console.log(myStr);
    var url = "replace this with api url";
    var method = 'POST';
    callAjax(url,method,myStr);
}
*/
function callAjax(uri, method, formData) {
    return $.ajax({
    url: uri,
    crossDomain:true,
    //dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    accepts:'application/json',
    data: formData,
    type: method
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        $('#info').html('<p>An error has occurred</p>');
        alert('I am in ajax error');
    })
    .always(function(data, textStatus, jqXHR) {
        
        // do any cleanup
    });
}