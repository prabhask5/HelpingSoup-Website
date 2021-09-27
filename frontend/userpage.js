$(document).ready(function(){
    console.log("ready is called");
    getOrders();
});
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
                var Name = element.customerFirstName + " " + element.customerLastName;
                var Address = element.customerStreetAddress;
                var goodsNotes = element.goodsNotes;
                var startTime = element.startTime;
                var endTime = element.endTime;
                endTime = timeConvert(endTime);
                startTime = timeConvert(startTime);
                var Date = element.pickupDate.substring(0,10);
                var popUp = addPopUp(rowID,goodsNotes);
                addRow(rowID);
                $(`#E${rowID}1`).html(Name);
                $(`#E${rowID}2`).html(Address);
                $(`#E${rowID}3`).html(startTime);
                $(`#E${rowID}4`).html(endTime);
                $(`#E${rowID}5`).html(Date);
                $(`#E${rowID}6`).html(popUp);
                console.log("All elements of row have been added this is the rowID " + rowID);
            });
        };

    });
}
//adding a row dynamically
function addRow (rowID) {
    console.log("addRow is called");
    var SaveBtn = addSaveBtn(rowID);
    var code =`<tr id="E${rowID}">
                <th id="E${rowID}1" class="text-center"></th>
                <th id="E${rowID}2" class="text-center"></th>
                <th id="E${rowID}3" class="text-center"></th>
                <th id="E${rowID}4" class="text-center"></th>
                <th id="E${rowID}5" class="text-center"></th>
                <th id="E${rowID}6" class="text-center"></th>
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

function SaveOrder(rowID) {
    console.log("Save Order is called");
    var selectedName = $(`#E${rowID}1`).val();
    var selectedAddress = $(`#E${rowID}2`).val();
    var selectedStartTime = $(`#E${rowID}3`).val();
    var selectedEndTime = $(`#E${rowID}4`).val();
    var selectedDate = $(`#E${rowID}5`).val();
    var selectedNotes = $(`#E${rowID}6`).val();
    console.log(rowID);
    $(`#E${rowID}`).remove();
}

function addPopUp (rowID,goodsNotes) {
    console.log("added Popup");
    var code = `<div id="popUp${rowID}" class="popup" onclick="popUp(${rowID})">Click for Goods Notes
    <span class="popuptext" id="myPopup${rowID}">${goodsNotes}</span>
  </div>`
  return code;
}

function popUp(rowID) {
    console.log("popup is clicked");
    var popup = document.getElementById(`myPopup${rowID}`);
    popup.classList.toggle("show");
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