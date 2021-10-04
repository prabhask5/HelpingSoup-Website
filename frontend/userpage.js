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
                addRow(rowID,goodsNotes);
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
function addRow (rowID,goodsNotes) {
    console.log("addRow is called");
    var SaveBtn = addSaveBtn(rowID,goodsNotes);
    var code =`<tr id="E${rowID}">
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
function addSaveBtn (rowID,goodsNotes) {
    console.log("addSaveBtn is called");
    console.log(`This is the goodsNotes ${goodsNotes}`);
    var code = `<button class="btn btn-md btn-primary" id="SaveBtn${rowID}" onClick="SaveOrder(${rowID},'${goodsNotes}')">&#10004;</button>`;
    return code;
}

function SaveOrder(rowID,goodsNotes) {
    console.log("Save Order is called");
    console.log("this is the rowid " + `#E${rowID}1`);
    var Name = encodeURI($(`#E${rowID}1`).text());
    var Address = encodeURI($(`#E${rowID}2`).text());
    var startTime = encodeURI($(`#E${rowID}3`).text());
    var endTime = encodeURI($(`#E${rowID}4`).text());
    var Date = $(`#E${rowID}5`).text();
    $(`#E${rowID}`).remove();
    
    var goods = goodsNotes;
    goods = encodeURI(goods);
    var partUrl = "http://localhost:5500/frontend/pages/myorders.html?Name="
    var url = partUrl + Name + "&Address=" + Address + "&startTime=" + startTime + "&endTime=" + endTime + "&Date=" + Date + "&goodNotes=" + goods;
    console.log(url);
    window.location.href = url;
}

function addPopUp (rowID,goodsNotes) {
    console.log("added Popup");
    var code =`<p class="expand-one" id=popUp${rowID} onClick="popUpClicked(${rowID})"><a href="#">Click for Good Notes</a></p>
                <p class="content-one" id=hiddenWords${rowID}>${goodsNotes}</p>`
  return code;
}

function popUpClicked (rowID) {
    console.log("popup is clicked");
    $(`#hiddenWords${rowID}`).slideToggle('slow');
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