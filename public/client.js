//Defined functions and objects
function sanitizedClasses(rawString) {
    //using Regular expresions https://en.wikipedia.org/wiki/Regular_expression for details and http://regexr.com/ to experience it
    let rawStringLowerCased = rawString.toLowerCase();
    //    console.log("rawStringLowerCased = ", rawStringLowerCased);

    //remove returns
    let rawStringWihtoutReturns = rawStringLowerCased.replace(/(\r\n|\n|\r)/gm, " ");
    //    console.log("rawStringWihtoutReturns = ", rawStringWihtoutReturns);

    //remove apostrophes
    let rawStringWihtoutApostrophe = rawStringWihtoutReturns.replace(/'/gm, '');
    //    console.log("rawStringWihtoutApostrophe = ", rawStringWihtoutApostrophe);

    //remove punctuation and convert the string into an array by using the split method
    let rawStringWihtoutPunctuation = rawStringWihtoutApostrophe.replace(/[ ,!.";():-]+/g, " ");
    //    console.log("rawStringWihtoutPunctuation = ", rawStringWihtoutPunctuation);

    return rawStringWihtoutPunctuation;
}

function displayAddedRecipes() {
    const username = $('#loggedInUserName').val();
    console.log(username);
    $.ajax({
            type: 'GET',
            url: '/recipe/get/' + username,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            if ((!result) || (result != undefined) || (result != "")) {

                $("#js-display-recipes").html('');
                let buildAddedRecipes = "";

                $.each(result, function (resultKey, resultValue) {
                    buildAddedRecipes += '<div class="saved-recipes ' + sanitizedClasses(resultValue.recipeName) + ' ' + sanitizedClasses(resultValue.tags) + '">';
                    buildAddedRecipes += '<h3>Recipe Name:</h3>';
                    buildAddedRecipes += '<p>' + resultValue.recipeName + '</p>';
                    buildAddedRecipes += '<h3>Ingredients:</h3>';
                    buildAddedRecipes += '<p>' + resultValue.ingredients + '</p>';
                    buildAddedRecipes += '<h3>Instructions:</h3>'
                    buildAddedRecipes += '<p>' + resultValue.instructions + '</p>';
                    buildAddedRecipes += '<h3>Tags:</h3>'
                    buildAddedRecipes += '<p>' + resultValue.tags + '</p>';
                    buildAddedRecipes += '<h3>Notes:</h3>'
                    buildAddedRecipes += '<p>' + resultValue.notes + '</p>';
                    buildAddedRecipes += '<h3>Share Publicly?</h3>';
                    buildAddedRecipes += '<p>' + resultValue.shared + '</p>';
                    buildAddedRecipes += '<form class="editRecipeForm">';
                    buildAddedRecipes += '<input type="hidden" class="editRecipeItem" value="' + resultValue._id + '" >';
                    buildAddedRecipes += '<button type="submit" class="editItemButton" value="">';
                    buildAddedRecipes += '<i class="fas fa-pen-square" aria-hidden="true"></i>';
                    buildAddedRecipes += '</button>';
                    buildAddedRecipes += '</form>';
                    buildAddedRecipes += '<form class="deleteRecipeForm">';
                    buildAddedRecipes += '<input type="hidden" class="deleteRecipeItem" value="' + resultValue._id + '" >';
                    buildAddedRecipes += '<button type="submit" class="deleteItemButton" value="">';
                    buildAddedRecipes += '<i class="fas fa-minus-square" aria-hidden="true"></i>';
                    buildAddedRecipes += '</button>';
                    buildAddedRecipes += '</form>';
                    buildAddedRecipes += '</div>';
                });

                //use the HTML output to show it in the index.html
                $("#js-display-recipes").html(buildAddedRecipes);
            }

        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
};

//display edited recipes
function displayEditedRecipes(recipeIdToEdit) {
    const username = $('#loggedInUserName').val();
    console.log(username);
    $.ajax({
            type: 'GET',
            url: '/recipe/get-by-id/' + recipeIdToEdit,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            if ((!result) || (result != undefined) || (result != "")) {

                $("#js-edit-recipe").html('');
                let buildEditedRecipes = "";

                $.each(result, function (resultKey, resultValue) {
                    buildEditedRecipes += '<div class="container">';
                    buildEditedRecipes += '<form id="js-edit-form">';
                    buildEditedRecipes += '<input type="hidden" class="editRecipeItem" value="' + resultValue._id + '" >';
                    buildEditedRecipes += '<div class="row">';
                    buildEditedRecipes += '<div class="col-25">';
                    buildEditedRecipes += '<label for="rname">Recipe Name</label>';
                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '<div class="col-75">';
                    buildEditedRecipes += '<input type="text" name="recipename" id="js-edit-recipeName" placeholder="Name of your recipe.." value="' + resultValue.recipeName + '">';
                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '<div class="row">';
                    buildEditedRecipes += '<div class="col-25">';
                    buildEditedRecipes += '<label for="ingredients">Ingredients</label>';
                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '<div class="col-75">';
                    buildEditedRecipes += '<textarea name="ingredients" id="js-edit-ingredients" placeholder="List ingredients and their measurements..">' + resultValue.ingredients + '</textarea>';
                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '<div class="row">';
                    buildEditedRecipes += '<div class="col-25">';
                    buildEditedRecipes += '<label for="instructions">Instructions</label>';
                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '<div class="col-75">';
                    buildEditedRecipes += '<textarea name="instructions" id="js-edit-instructions" placeholder="Write instructions on how to prepare this recipe..">' + resultValue.instructions + '</textarea>';
                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '<div class="row">';
                    buildEditedRecipes += '<div class="col-25">';
                    buildEditedRecipes += '<label for="tags">Tags:</label>';
                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '<div class="col-75">';
                    buildEditedRecipes += '<input type="tags" id="js-edit-tags" placeholder="Add tags to help you search for this recipe in the future." value="' + resultValue.tags + '" id="tags" />';
                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '<div class="row">';
                    buildEditedRecipes += '<div class="row">';
                    buildEditedRecipes += '<div class="col-25">';
                    buildEditedRecipes += '<label for="notes">Notes (optional)</label>';
                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '<div class="col-75">';
                    buildEditedRecipes += '<textarea name="notes" id="js-edit-notes" placeholder="Write any helpful notes. For example, how many people will it serve...">' + resultValue.notes + '</textarea>';
                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '<div class="row">';
                    buildEditedRecipes += '<div class="col-25"><label>Share Publicly?</label>';
                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '<div class="col-75">';
                    buildEditedRecipes += '<div class="radio-btns">';
                    buildEditedRecipes += '<div class="ui radio checkbox">';
                    buildEditedRecipes += '<label for="yes">Yes</label>';
                    if (resultValue.shared == "Yes") {
                        buildEditedRecipes += '<input type="radio" name="edit-shared-radio" value="Yes" checked="checked">';
                    } else {
                        buildEditedRecipes += '<input type="radio" name="edit-shared-radio" value="Yes">';
                    }

                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '<div class="ui radio checkbox">';
                    buildEditedRecipes += '<label for="no">No</label>';
                    if (resultValue.shared == "Yes") {
                        buildEditedRecipes += '<input type="radio" name="edit-shared-radio" value="No">';
                    } else {
                        buildEditedRecipes += '<input type="radio" name="edit-shared-radio" value="No" checked="checked">';
                    }

                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '<div class="row">';
                    buildEditedRecipes += '<input class="submit-button" type="submit" value="Submit">';
                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '</div>';
                    buildEditedRecipes += '</form>';
                    buildEditedRecipes += '</div>';
                });

                //use the HTML output to show it in the index.html
                $("#js-edit-recipe").html(buildEditedRecipes);
            }

        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
};

//display public recipes
function displayPublicRecipes() {
    $.ajax({
            type: 'GET',
            url: '/recipe/get-public/',
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            if ((!result) || (result != undefined) || (result != "")) {

                $("#js-display-public-recipes").html('');
                let buildAddedRecipes = "";
                let isShared = "";

                $.each(result, function (resultKey, resultValue) {
                    buildAddedRecipes += '<div class="saved-recipes">';
                    buildAddedRecipes += '<h3>Recipe Name:</h3>';
                    buildAddedRecipes += '<p>' + resultValue.recipeName + '</p>';
                    buildAddedRecipes += '<h3>Ingredients:</h3>';
                    buildAddedRecipes += '<p>' + resultValue.ingredients + '</p>';
                    buildAddedRecipes += '<h3>Instructions:</h3>'
                    buildAddedRecipes += '<p>' + resultValue.instructions + '</p>';
                    buildAddedRecipes += '<h3>Tags:</h3>'
                    buildAddedRecipes += '<p>' + resultValue.tags + '</p>';
                    buildAddedRecipes += '<h3>Notes:</h3>'
                    buildAddedRecipes += '<p>' + resultValue.notes + '</p>';
                    buildAddedRecipes += '</div>';
                });

                //use the HTML output to show it in the index.html
                $("#js-display-public-recipes").html(buildAddedRecipes);
            }

        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
};

//Edit a recipe
$(document).on('submit', '.editRecipeForm', function (event) {
    event.preventDefault();
    let recipeIdToEdit = $(this).parent().find('.editRecipeItem').val();
    let recipeObject = {
        'id': recipeIdToEdit
    };
    $.ajax({
            method: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            url: '/edit-from-recipe-list/' + recipeIdToEdit,
        })
        .done(function (result) {
            displayEditedRecipes(recipeIdToEdit);
            $('main').hide();
            $('#js-edit-recipe').show();
            //            alert('Edited!', 'Maybe next time...', 'success');
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            alert('Oops...', 'Please try again', 'error');
        });
});

//Delete a recipe
$(document).on('submit', '.deleteTransactionForm', function (event) {
    event.preventDefault();
    let transactionIdToDelete = $(this).parent().find('.deleteTransactionItem').val();
    let transactionObject = {
        'id': transactionIdToDelete
    };
    $.ajax({
            method: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',
            url: '/delete-from-transaction-list/' + transactionIdToDelete,
        })
        .done(function (result) {
            displaySubcategorySummary();
            displayTransactionHistory();
            alert('Removed!', 'Maybe next time...', 'success');
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            alert('Oops...', 'Please try again', 'error');
        });
});


// Triggers


//when the page loads...
$(document).ready(function () {
    displayPublicRecipes();
    $("main").hide();
    $("#js-landing-page").show();
});

//when user enters keyword to search for recipes
$(document).keyup('#js-search', function (event) {
    event.preventDefault();
    let searchTerm = $("#js-search").val();
    console.log(searchTerm);
    if (searchTerm.length != 0) {
        $("#js-display-recipes .saved-recipes").hide();
        //display classes starting wtih the searchTerm or containing the searchTerm inside
        $("div[class^='" + searchTerm + "'],div[class*=' " + searchTerm + "']").show();
    } else {
        $("#js-display-recipes .saved-recipes").show();
    }
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
    const recipeName = $("#js-recipeName").val();
    const ingredients = $("#js-ingredients").val();
    const instructions = $("#js-instructions").val();
    const tags = $("#js-tags").val();
    const notes = $("#js-notes").val();
    const shared = $("input[name='shared-radio']:checked").val();
    console.log(shared); //validate the input
    if (recipeName == "") {
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
            recipeName: recipeName,
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

//Submit Edit Recipe Form
$(document).on('submit', '#js-edit-form', function (event) {
    event.preventDefault();

    //take the input from the user
    const username = $("#loggedInUserName").val();
    const recipeId = $(".editRecipeItem").val();
    const recipeName = $("#js-edit-recipeName").val();
    const ingredients = $("#js-edit-ingredients").val();
    const instructions = $("#js-edit-instructions").val();
    const tags = $("#js-edit-tags").val();
    const notes = $("#js-edit-notes").val();
    const shared = $("input[name='edit-shared-radio']:checked").val();
    console.log("hey"); //validate the input
    if (recipeName == "") {
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
        const editRecipeObject = {
            recipeName: recipeName,
            username: username,
            ingredients: ingredients,
            instructions: instructions,
            tags: tags,
            notes: notes,
            shared: shared
        };
        console.log(editRecipeObject);

        //make the api call using the payload above
        $.ajax({
                type: 'PUT',
                url: '/edit-from-recipe-list/' + recipeId,
                dataType: 'json',
                data: JSON.stringify(editRecipeObject),
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

//Click on My Recipes nav menu uption
$('#js-nav-my-recipes').on('click', function (event) {
    event.preventDefault();
    displayAddedRecipes();
    $('main').hide();
    $('#js-my-recipes-page').show();
    $('#js-navigation').show();
});

////User will be able to remove item from recipe history
$(document).on('submit', '.deleteRecipeForm', function (event) {
    event.preventDefault();
    let recipeIdToDelete = $(this).parent().find('.deleteRecipeItem').val();
    let recipeObject = {
        'id': recipeIdToDelete
    };
    $.ajax({
            method: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',
            url: '/delete-from-recipe-list/' + recipeIdToDelete,
        })
        .done(function (result) {
            displayAddedRecipes();
            alert('Removed!', 'Maybe next time...', 'success');
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            alert('Oops...', 'Please try again', 'error');
        });
});


////button triggers
//$(document).on('click', 'button', function (event) {
//    event.preventDefault();
//});


////form trigger
//$(document).submit('form', function (event) {
//    event.preventDefault();
//});
