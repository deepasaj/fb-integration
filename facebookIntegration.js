  // Additional JS functions here
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1405855399688698', // App ID
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

    // Additional init code here
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            // connected
            callAPI();
        } else if (response.status === 'not_authorized') {
            // not_authorized
            login();
        } else {
            // not_logged_in
            login();
        }
    });
};

function login() {
    FB.login(function(response) {
        if (response.authResponse) {
        // connected
            testAPI();
        } else {
        // cancelled
        }
    },{scope: 'status_update'}); // scope is used to request permission.
    // status_update is permission useful for posting status
}

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Good to see you, ' + response.name + '.');
    });
    fetchFriends();
}

function callAPI() {
    console.log('Welcome back!  Fetching your information... ');
    FB.api('/me', function(response) {
        console.log('Good to see you, ' + response.name + '.');
    });
   fetchFriends();
}

function fetchFriends() {
  FB.api('/me/friends?fields=name,first_name,picture', function(response) {
        
        var friends_div = document.getElementById("friends_list");
        var ul_obj = document.createElement("ul");
        friends_div.appendChild(document.createTextNode("All Friends"));
        response.data.forEach(function  (friend) {
          var img_obj = document.createElement("img");
          img_obj.setAttribute('src', friend.picture.data.url);
          var li_obj = document.createElement("li");
          var name = document.createTextNode(friend.name);
          li_obj.appendChild(img_obj);
          li_obj.appendChild(name);
          ul_obj.appendChild(li_obj);
        });
        friends_div.appendChild(ul_obj);
    });
}

function appPromotion () {
  var message = 'I am using sajni\'s app and it is goood!!!.'
  postStatus(message);
}

function postStatus (status) {
    FB.api('/me/feed', 'post', { message: status }, function(response) {
        if (!response || response.error) {
            alert('Error occured   --- '+JSON.stringify(response.error));
        } else {
            alert('Post ID: ' + response.id);
        }
    });
}
