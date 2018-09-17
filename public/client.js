const FOOD_URL = "https://api.edamam.com/search";
const foodId = "7fd223ec";
const foodKey = "817ee5945f6f33e30affd1cededc234a";

//request to Edamam API
function recipeRequest(searchTerm, callback) {
    let query = {
        q: `${searchTerm}`,
        app_id: `${foodId}`,
        app_key: `${foodKey}`,
        to: 8,
        image: ""
    }
    let result = $.ajax({
            /* update API end point */
            url: FOOD_URL,
            data: query,
            dataType: "json",
            /*set the call type GET / POST*/
            type: "GET"
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            /* if the results are meeningful, we can just console.log them */
            console.log(result);
            callbackFood(result);
        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

}


//what to do with the Edamam data that's sent back
function callbackFood(data) {
    console.log(data);
    let display = data.hits.map((item, index) => renderRecipes(item));
    $("#recipeResults").html(display);
    $("#recipeResults").html(display);
};


//how to show Edamam data on the page.
function renderRecipes(item) {
    let label = item.recipe.label;
    let image = item.recipe.image;
    let originalRecipe = item.recipe.url;

    return `<div class="imageContainer resultsBackground">
<a href="${originalRecipe}" class="links"><h3>${label}</h3></a>
<div class = "product-image" style="background-image: url(${image})" alt=${label}></div>
</div>`
}
//making sure the user enters a valid search entry, and calling the three API's and showing the data on the page
function submitHandler() {
    $('.js-searchForm').on('submit', function (event) {
        event.preventDefault();
        let searchTerm = $('#search').val();
        $("#errorFood").html("");
        if (searchTerm === "") {
            $("#errorFood").html("Oops, enter a food please");
        } else {
            $("#errorFood").html("");
            $('#search').val("");
            $(".recipesHeader").html("<h2>Recipes</h2>");
            recipeRequest(searchTerm, callbackFood);
        }
    });
}
$(submitHandler);

