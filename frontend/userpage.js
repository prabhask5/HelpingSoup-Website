$(document).ready(function(){
    console.log("ready is called");
    getOrders();
});
//html change with url
function changeHref (base,reference) {
    var urlParams = new URLSearchParams(window.location.search);
    var volunteerEmail = urlParams.get('email');
    $("#" + reference).attr("href", base + "?email=" + volunteerEmail);
    
}
//GET CALLS
function getOrders() {
    console.log("get orders is called");
    var url = "http://localhost:4000/api/GetAllOrders";
    var method = "GET";
    callAjax(url,method).
    done(function(data,textStatus,jqXHR) {
        if (data) {
            console.log("got some data");
            data.forEach(element => {
                var rowID = $("#customerTable tr").length;
                var ID = element.customerID;
                var Name = element.customerFirstName + " " + element.customerLastName;
                var Address = element.customerStreetAddress;
                var goodsNotes = element.goodsNotes;
                var startTime = element.startTime;
                var endTime = element.endTime;
                endTime = timeConvert(endTime);
                startTime = timeConvert(startTime);
                var startDate = element.firstDate.substring(0,10);
                var endDate = element.lastDate.substring(0,10);
                startDate = dateSymbolSwitch(startDate);
                endDate = dateSymbolSwitch(endDate);
                var popUp = addPopUp(rowID,goodsNotes);
                
                addRow(rowID,goodsNotes);

                $(`#E${rowID}0`).val(ID);
                $(`#E${rowID}1`).html(Name);
                $(`#E${rowID}2`).html(Address);
                $(`#E${rowID}3`).html(startTime);
                $(`#E${rowID}4`).html(endTime);
                $(`#E${rowID}5`).html(startDate + " - " + endDate);
                $(`#E${rowID}6`).html(popUp);
                console.log("All elements of row have been added this is the rowID " + rowID);
            });
        };

    });
}
//adding a row dynamically
function addRow (rowID,goodsNotes) {
    console.log("addRow is called");
    var SaveBtn = addSaveBtn(rowID);
    var code =`<tr id="E${rowID}">
                <th id="E${rowID}0" hidden class="text-center"></th>   
                <th id="E${rowID}1" class="text-center"></th>
                <th id="E${rowID}2" class="text-center"></th>
                <th id="E${rowID}3" class="text-center"></th>
                <th id="E${rowID}4" class="text-center"></th>
                <th id="E${rowID}5" class="text-center"></th>
                <th id="E${rowID}6" class="text-center notes"></th>
                <th id="E${rowID}7" class="text-center">${SaveBtn}</th>
                </tr>`;
    if (rowID == 1){
        $("#rowsAdd").append(code);
    }
    else {
        $("#rowsAdd").prepend(code);
    }
}
//converting military time to real time
function timeConvert (time){
    console.log("timeConvert is called");
    var timeArray = time.split(':');
    time = timeArray[0] + ":" + timeArray[1];
    
    if (timeArray[0] >= 12) {
             
        time = time + " PM";
        if (timeArray[0] > 12) {
            var newHour = (timeArray[0] % 12).toString();
                
            time = newHour + time.substring(2)
        }
    }
    else{
        time = time + " AM";
    }
    return time;
}
//adding the save button to the row
function addSaveBtn (rowID) {
    console.log("addSaveBtn is called");
    var code = `<button class="btn btn-md btn-primary" id="SaveBtn${rowID}" onClick="SaveOrder(${rowID})">&#10004;</button>`;
    return code;
}
//saving order with post call sending volunteerEmail and customerID
function SaveOrder(rowID) {
    console.log("Save Order is called");
    console.log("this is the rowid " + `#E${rowID}1`);
    var urlParams = new URLSearchParams(window.location.search);
    var volunteerEmail = urlParams.get('email');
    
    
    var url = 'http://localhost:4000/api/SelectingOrders';
    var method = "POST";
    var myObject = new Object();
    console.log("object created");
    myObject.deliveryNotes = "here";
    myObject.deliveryStatus = "selected";
    myObject.volunteerEmail = volunteerEmail;
    myObject.customerID = $(`#E${rowID}0`).val();
    console.log("all elements declared");
    var myStr = JSON.stringify(myObject);
    console.log(myStr);
    $(`#E${rowID}`).remove();
    callAjax(url,method,myStr);
}

//adding popup button
function addPopUp (rowID,goodsNotes) {
    console.log("added Popup");
    var code =`<p class="expand-one" id=popUp${rowID} onClick="popUpClicked(${rowID})"><a href="#">Click for Good Notes</a></p>
                <p class="content-one" id=hiddenWords${rowID}>${goodsNotes}</p>`
  return code;
}
//when popup is clicked
function popUpClicked (rowID) {
    console.log("popup is clicked");
    $(`#hiddenWords${rowID}`).slideToggle('slow');
}
//change "-" to "/" in date
function dateSymbolSwitch (date) {
    var goodDate = date.replace(/\-/g,'/');
    var dateArr = goodDate.split("/");
    var newDate = dateArr[1] + "/" + dateArr[2] + "/" + dateArr[0];
    return newDate;
}

//ajax function
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