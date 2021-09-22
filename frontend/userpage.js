$(document).ready(function(){
    console.log("ready is called");
    getOrders();
});

function getOrders() {
    console.log("getting into getOrders");
    var url = "http://localhost:4000/api/GetAllOrders";
    var method = "GET";
    callAjax(url,method).
    done(function(data,textStatus,jqXHR) {
        if (data) {
            console.log("got some data");
            data.forEach(element => {
                console.log("getting the name " + element.customerFirstName + " " + element.customerLastName);
            });
        };

    });
}

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