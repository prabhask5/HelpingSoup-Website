$(document).ready(function () {
  console.log("ready is called");
  addHeader();
  addFooter();
})

function addHeader () {
    var code = `
    <ul id="drops" class="container1">
        <img src="../../docs/logo3.png" alt="HelpingSoup Logo">
        
        <li><a href="main.html">Home</a></li>
        <li><div class="dropdown">
            <a>About</a>
            <div class="dropdown-content">
            <a href='aboutus.html'>About us</a>
            <a href='about.html'>How it Works</a>
            <a href='missionstatement.html'>Mission Statement</a>
            <a href='partners.html'>Partners</a>
            <a href='contact.html'>Contact Us</a>
            <li><a href="forms.html">Donation Form</a></li>
            <li><a href="login.html">Volunteer Login/Sign Up</a></li>
        </div></li>
    </ul>
    `;
    $(`#insertHere`).html(code);
}

function addFooter () {
    var code = `
    <p>
        <div class="footertext" style="text-align: center;">
            We do not sell, rent, or lease our contact data or lists to third parties, and we will not provide your personal information to any third party individual, government agency, or company at any time unless compelled to do so by law.
        </div>
        <a href="mailto:helpingsouptally@gmail.com" target="_blank"><img id="footer1" src="/docs/emailemailemail.png" alt="footer logo" style="width:48px;height:32px;"></a>
        <a href="https://www.linkedin.com/company/helpingsouptally/" target="_blank"><img id="footer2" src="/docs/graylinkedin.png" alt="footer logo" style="width:35px;height:35px;"></a>
        <a href="https://www.instagram.com/helpingsouptally/" target="_blank"><img id="footer3" src="/docs/glyph-logo_May2016_white.png" alt="footer logo" style="width:35px;height:35px;"></a>
        <a href="https://github.com/mihircoding/HelpingSoup-Website" target="_blank"><img id="footer4" src="/docs/Untitled.png" alt="footer logo" style="width:50px;height:50px;"></a>
    </p>
    `;
    $(`.footer`).html(code);
}
