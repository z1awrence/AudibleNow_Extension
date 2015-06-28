// This callback function is called when the content script has been 
// injected and returned its results
function onPageDetailsReceived(pageDetails)  { 
    document.getElementById('title').value = pageDetails.url; 
    document.getElementById('text').innerText = pageDetails.summary; 
} 

// Global reference to the status display SPAN
var statusDisplay = null;

// POST the data to parse using XMLHttpRequest stuff etc
function addBookmark() {
    
    // Cancel the form submit
    event.preventDefault();
    
    Parse.initialize("PsO5rkxMEaRvzzig7IKiQgfpQVRNdQFpPYO9Ipg0", "y5TnJxnaphDQ51Ezzq5mXd8nCqRQ3MQdTUxIMLRm");

    email = document.getElementById('email').value;

    var Note = Parse.Object.extend("Note");
    var User = Parse.Object.extend("User");
    var query = new Parse.Query(User);
    query.equalTo("email", email);
    query.find({
      success: function(foundUser) {
        foundUser = foundUser[0];
        var note = new Note();
        note.set("title", document.getElementById('title').value);
        note.set("content", document.getElementById('text').value);
        note.set("user", foundUser);
        note.save(null, {
          success: function(note){
          },
          error: function(note){
          }
        });
        }
    });
}

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Cache a reference to the status display SPAN
    statusDisplay = document.getElementById('status-display');
    // Handle the bookmark form submit event with our addBookmark function
    document.getElementById('addbookmark').addEventListener('submit', addBookmark);
    // Get the event page
    chrome.runtime.getBackgroundPage(function(eventPage) {
        // Call the getPageInfo function in the event page, passing in 
        // our onPageDetailsReceived function as the callback. This injects 
        // content.js into the current tab's HTML
        eventPage.getPageDetails(onPageDetailsReceived);
    });
});