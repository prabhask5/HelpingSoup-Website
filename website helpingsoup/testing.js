function ShowHideDiv() {
    var chkYes = document.getElementById("chkYes");
    var chkNo = document.getElementById('chkNo');
    var emailaddress = document.getElementById("emailaddress");
    var phonenumber = document.getElementById('phonenumber')
    emailaddress.style.display = chkYes.checked ? "block" : "none";
    phonenumber.style.display = chkNo.checked ? "block" : "none";
}