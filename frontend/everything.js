$(document).ready(function(){
    console.log("ready is called");
    insertCode();
});

//html change with url
function changeHref (base,reference) {
    var urlParams = new URLSearchParams(window.location.search);
    var volunteerEmail = urlParams.get('email');
    $("#" + reference).attr("href", base + "?email=" + volunteerEmail);
}

function insertCode () {
    var urlParams = new URLSearchParams(window.location.search);
    var volunteerEmail = urlParams.get('email');
    console.log("this is the email " + volunteerEmail);
    
    if (volunteerEmail != null){
        $(`#drops`).remove()
        var code = `
        <ul class="container1">
            <img src="../../docs/logo3.PNG" alt="HelpingSoup Logo">

            <li><a id="linkOrder1" onclick="changeHref(\`main.html\`,\`linkOrder1\`)" href="main.html">Home</a></li>
                <li><div class="dropdown">
                    <a style="color: black;">About</a>
                    <div class="dropdown-content">
                    <a id="linkOrder21" onclick="changeHref(\`aboutus.html\`,\`linkOrder21\`)" href='aboutus.html'>About us</a>
                    <a id="linkOrder22" onclick="changeHref(\`about.html\`,\`linkOrder22\`)" href='about.html'>How it Works</a>
                    <a id="linkOrder23" onclick="changeHref(\`missionstatement.html\`,\`linkOrder23\`)" href='missionstatement.html'>Mission Statement</a>
                    <a id="linkOrder24" onclick="changeHref(\`partners.html\`,\`linkOrder24\`)" href='partners.html'>Partners</a>
                    <a id="linkOrder25" onclick="changeHref(\`contact.html\`,\`linkOrder25\`)" href='contact.html'>Contact Us</a>
                    </div>
                  </div></li>

                <li><a id="linkOrder3" onclick="changeHref(\`forms.html\`,\`linkOrder3\`)" href="forms.html">Donation Form</a></li>

                <li><div class="dropdown">
                    <a style="color: black;">Volunteer Pages</a>
                    <div class="dropdown-content">
                    <a id="linkOrder5" onclick="changeHref(\`userpage.html\`,\`linkOrder5\`)" href="userpage.html">Donation's List</a>
                    <a id="linkOrder6" onclick="changeHref(\`myorders.html\`,\`linkOrder6\`)" href="myorders.html">My Orders</a>
                    <a id="linkOrder7" href="login.html">Sign Out</a>
                    </div>
                </div></li>

        </ul>`;
        $(`#insertHere`).html(code);
    }
}