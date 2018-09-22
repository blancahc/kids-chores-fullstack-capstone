// Triggers


//when the page loads...
$(document).ready(function () {
    //do stuff
    $("main").hide();
    $("#js-landing-page").show();
});
//when user signs in
$('#js-sign-in-form').on('submit', function (event) {
    event.preventDefault();
    $("main").hide();
    $("#js-navigation").show();
    $("#js-add-recipe").show();
});

//when user clicks on sign-up link within landing page
$(document).on('click', '#js-sign-up-link', function (event) {
    event.preventDefault();
    $("main").hide();
    $("#js-sign-up-page").show();
});

//when user clicks on Sign In link/button within sign up form
$(document).on('click', '#js-back-to-login', function (event) {
    event.preventDefault();
    $("main").hide();
    $("#js-landing-page").show();
});

//when user submits sign up form
$('#js-sign-up-form').on('submit', function (event) {
    event.preventDefault();
    $("main").hide();
    $("#js-navigation").show();
    $("#js-add-recipe").show();
});

//when someone clicks on sign-out button in navigation
$('#js-signout-button').on('click', function (event) {
    location.reload();
});

////button triggers
//$(document).on('click', 'button', function (event) {
//    event.preventDefault();
//});


////form trigger
//$(document).submit('form', function (event) {
//    event.preventDefault();
//});
