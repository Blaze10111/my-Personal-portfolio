var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
   
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
   
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    // Add 'active-link' to the title that was clicked
    event.currentTarget.classList.add("active-link");
    // Show the content div that matches the ID passed in the function
    document.getElementById(tabname).classList.add("active-tab");
}

// ---------------------------------------
// 2. Mobile Side Menu Logic
// ---------------------------------------
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    // Brings the menu into view by setting right to 0
    sidemenu.style.right = "0";
}

function closemenu() {
    // Hides the menu by pushing it 200px off the right side of the screen
    sidemenu.style.right = "-200px";
}

// ---------------------------------------
// 3. Contact Form & Google Sheets Integration
// ---------------------------------------
// REPLACE the URL below with your actual Google Apps Script Deployment URL
const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault();
    
    // Optional: Add a 'Sending...' state to the button for better UX
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerHTML = "Sending...";

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            // Success Message
            msg.innerHTML = "Message sent successfully!";
            submitBtn.innerHTML = "Submit";
            
            // Clear message after 5 seconds
            setTimeout(function() {
                msg.innerHTML = "";
            }, 5000);
            
            // Reset the form fields
            form.reset();
        })
        .catch(error => {
            console.error('Error!', error.message);
            msg.innerHTML = "Error sending message. Please try again.";
            submitBtn.innerHTML = "Submit";
        });
});