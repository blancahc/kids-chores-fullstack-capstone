//Defined functions and objects

// Triggers

//when the page loads...
$(document).ready(function () {
    $("main").hide();
    $("#js-landing-page").show();
});
//when user signs in
$('#js-sign-in-form').on('submit', function (event) {
    event.preventDefault();

    //take the input from the user
    const username = $("#loginUsername").val();
    const password = $("#loginPassword").val();

    //validate the input
    if (username == "") {
        alert('Please input user name');
    } else if (password == "") {
        alert('Please input password');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const loginUserObject = {
            username: username,
            password: password
        };
        console.log(loginUserObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/users/login',
                dataType: 'json',
                data: JSON.stringify(loginUserObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                $('#loggedInUserName').val(result.username);
                console.log(result);
                $("main").hide();
                $("#js-navigation").show();
                $("#js-add-recipe").show();
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                alert('Incorrect Username or Password');
            });
    };
});

//when user clicks on sign-up link within landing page
$(document).on('click', '#js-sign-up-link', function (event) {
    event.preventDefault();
    $("main").hide();
    $("#js-sign-up-page").show();
});

////Accidentally clicked on Sign Up form but already have an account, Go back to Sign In Form
$(document).on('click', '#js-back-to-login', function (event) {
    event.preventDefault();
    $("main").hide();
    $("#js-landing-page").show();
});

//when user submits sign up form
$('#js-sign-up-form').on('submit', function (event) {
    event.preventDefault();

    //take the input from the user
    const name = $("#signUpName").val();
    const username = $("#signUpUsername").val();
    const password = $("#signUpPassword").val();
    //validate the input
    if (name == "") {
        alert('Please add a name');
    } else if (username == "") {
        alert('Please add an user name');
    } else if (password == "") {
        alert('Please add a password');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const newUserObject = {
            name: name,
            username: username,
            password: password
        };
        console.log(newUserObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/users/create',
                dataType: 'json',
                data: JSON.stringify(newUserObject),
                contentType: 'application/json'
            })
            //if call is sucessful
            .done(function (result) {
                console.log(result);
                $("main").hide();
                $("#js-navigation").show();
                $("#js-add-recipe").show();
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});

//when someone clicks on sign-out button in navigation
$('#js-signout-button').on('click', function (event) {
    location.reload();
});

//Submit Add Recipe Form
$('#js-add-form').on('submit', function (event) {
    event.preventDefault();

    //take the input from the user
    const username = $("#loggedInUserName").val();
    const recipename = $("#js-recipename").val();
    const ingredients = $("#js-ingredients").val();
    const instructions = $("#js-instructions").val();
    const tags = $("#js-tags").val();
    const notes = $("#js-notes").val();
    const shared = $("#js-shared").val();

    //validate the input
    if (recipename == "") {
        alert('Please add a recipe name');
    } else if (ingredients == "") {
        alert('Please enter the ingredients');
    } else if (instructions == "") {
        alert('Please enter the instructions');
    } else if (tags == "") {
        alert('Please enter tags');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const newRecipeObject = {
            recipename: recipename,
            username: username,
            ingredients: ingredients,
            instructions: instructions,
            tags: tags,
            notes: notes,
            shared: shared
        };
        console.log(newRecipeObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/recipes/create',
                dataType: 'json',
                data: JSON.stringify(newRecipeObject),
                contentType: 'application/json'
            })
            //if call is sucessful
            .done(function (result) {
                console.log(result);
                $("main").hide();
                $("#js-navigation").show();
                $("#js-added-recipe").show();
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };

});


//Click on Add Recipe nav menu uption
$('#js-nav-add-recipe').on('click', function (event) {
    event.preventDefault();
    $('main').hide();
    $('#js-add-recipe').show();
    $('#js-navigation').show();
});

//Click on Add Recipe nav menu uption
$('#js-nav-my-recipes').on('click', function (event) {
    event.preventDefault();
    $('main').hide();
    $('#js-my-recipes-page').show();
    $('#js-navigation').show();
});

////button triggers
//$(document).on('click', 'button', function (event) {
//    event.preventDefault();
//});


////form trigger
//$(document).submit('form', function (event) {
//    event.preventDefault();
//});
