$(document).ready(function () {
    //array of existing buttons
    var superheroes = ["Batman", "Superman", "Wonder Woman", "Spiderman", "Deadpool", "Captain America", "Wolverine", "Aquaman", "Black Panther", "Starlord"]

    function renderButtons() {

        for (var i = 0; i < superheroes.length; i++) {
            var myBTN = $("<button class='superBTN' data-name=' " + superheroes[i] + "'>"+superheroes[i]+"</button>")
            $("#heroBtns").append(myBTN)
        }
    }

    $("#add-hero").on("click", function () {
        event.preventDefault()
        
        var heroInput = $("#hero-input").val().trim()
        
        if (heroInput != ""){
            superheroes.push(heroInput)
            
            renderButtons()
				
        } 
        else {
				$('#hero-input').attr("placeholder", "Enter your favorite superhero to see some gifs")
				renderButtons();
			}
			return false;
    })
    function displayGifs() {
        $("#heroGifs").empty()
        
        // $("form").on("click", function() {
            var superheroChoices = $(this).attr('data-name');

            // var apikey = "&api_key=AKnbLrKSn42S9vkarKPL1lclGUpv5LQE"
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + superheroChoices + "&api_key=AKnbLrKSn42S9vkarKPL1lclGUpv5LQE&limit=9"
            
            $.ajax({
                url: queryURL,
                method: 'GET'
            }).then(function (response) {
                var heroDiv = $("<div class= col-md-4 heroImage>");
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var stillGif = response.data[i].images.fixed_width_still.url;
                    var playGif = response.data[i].images.fixed_width.url;
                    var rating = response.data[i].rating;				
                    var ratingDisplay = $('<p>').text( "Rating: " + rating.toUpperCase());
                    var image = $("<img>").attr("src", stillGif);
                    image.attr("playsrc", playGif);
                    image.attr("stopsrc", stillGif); 
                    heroDiv.append(image);
                    $('#heroGifs').append(heroDiv);
                    image.addClass("playChosenGif");
                    heroDiv.append(ratingDisplay);
                
                    // var stillGif = response.data[i + 1].images.fixed_width_still.url;
                    // var playGif = response.data[i + 1].images.fixed_width.url;
                    // var rating = response.data[i + 1].rating;				
                    // var ratingDisplay = $('<p>').text( "Rating: " + rating.toUpperCase());
                    // var image = $("<img>").attr("src", stillGif);
                    // image.attr("playsrc", playGif);
                    // image.attr("stopsrc", stillGif); 
                    // heroDiv.append(image);
                    // $('#heroGifs').append(heroDiv);
                    // image.addClass("playChosenGif");
                    // heroDiv.append(ratingDisplay);
                
                    // var stillGif = response.data[i + 2].images.fixed_width_still.url;
                    // var playGif = response.data[i + 2].images.fixed_width.url;
                    // var rating = response.data[i + 2].rating;				
                    // var ratingDisplay = $('<p>').text( "Rating: " + rating.toUpperCase());
                    // var image = $("<img>").attr("src", stillGif);
                    // image.attr("playsrc", playGif);
                    // image.attr("stopsrc", stillGif); 
                    // heroDiv.append(image);
                    // $('#heroGifs').append(heroDiv);
                    // image.addClass("playChosenGif");
                    // heroDiv.append(ratingDisplay);
                
        }
    });
}

function newGifs(){
    var play = $(this).attr('playsrc');
    var stop = $(this).attr('stopsrc');
    if ($(this).attr('playsrc') == $(this).attr('src')) {
        //This changes the image src
        $(this).attr('src', stop);
    } else {
        $(this).attr('src', play);
    }
}

renderButtons()
$(document).on("click", ".superBTN", displayGifs);
$(document).on("click", ".playChosenGif", newGifs);

})