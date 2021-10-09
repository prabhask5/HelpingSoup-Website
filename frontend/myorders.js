$(document).ready(function(){
    console.log("ready is called");
    gettingURL();
});

function addRow (rowID) {
    console.log("addRow is called");
    var delBtn = addDeleteBtn(rowID);
    var doneBtn = addDoneBtn(rowID);
    var InProgressBtn = addInProgressBtn(rowID);
    var code =`<tr id="E${rowID}">
                <th id="E${rowID}1" class="text-center"></th>
                <th id="E${rowID}2" class="text-center"></th>
                <th id="E${rowID}3" class="text-center"></th>
                <th id="E${rowID}4" class="text-center"></th>
                <th id="E${rowID}5" class="text-center"></th>
                <th id="E${rowID}6" class="text-center notes"><p id="E${rowID}6p" class="straight"></p></th>
                <th id="E${rowID}7" class="text-center buttons">${doneBtn} ${InProgressBtn} ${delBtn}</th>
                </tr>`;
    if (rowID == 1){
        $("#newRows").append(code);
    }
    else {
        $("#newRows").prepend(code);
    }
}



function gettingURL () {
    var urlParams = new URLSearchParams(window.location.search);
    var Name = urlParams.get('Name');
    var Address = urlParams.get('Address');
    var startTime = urlParams.get('startTime');
    var endTime = urlParams.get('endTime');
    var Date = urlParams.get('Date');
    var goodNotes = urlParams.get('goodNotes');
    console.log("this is the goodsNotes " + goodNotes);
    var rowID = $(`#ordersTable tr`).length;

    addRow(rowID);
    $(`#E${rowID}1`).html(Name);
    $(`#E${rowID}2`).html(Address);
    $(`#E${rowID}3`).html(startTime);
    $(`#E${rowID}4`).html(endTime);
    $(`#E${rowID}5`).html(Date);
    $(`#E${rowID}6p`).html(goodNotes);
}

function addDeleteBtn (rowID) {
    var code = `<button class="btn btn-md btn-primary" id="deleteBtn${rowID}">&#10060;</button>`;
    return code;
}

function addDoneBtn (rowID) {
    var code = `<button class="btn btn-md btn-primary" id="doneBtn${rowID}">&#10004;</button>`;
    return code;
}

function addInProgressBtn (rowID) {
    var code = `<button class="btn btn-md btn-primary" id="InProgressBtn${rowID}">	&#9202;</button>`;
    return code;
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