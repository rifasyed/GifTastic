$(document).ready(function () {
    //array of existing buttons
    var superheroes = ["Batman", "Superman", "Wonder Woman", "Spiderman", "Deadpool", "Captain America", "Wolverine", "Aquaman", "Black Panther", "Starlord"]

    function renderButtons() {

        $("#heroBtns").empty()

        for (var i = 0; i < superheroes.length; i++) {
            var myBTN = $("<button class='superBTN' data-name=''"+superheroes[i]+"'>"+superheroes[i]+"</button>")
            $("#heroBtns").append(myBTN)
            // console.log("hi")
        }
    }


    //api variable
    $("#add-hero").on("click", function () {
        event.preventDefault()
        
        var heroInput = $("#hero-input").val().trim()
        
        
        // console.log("hi");
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
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + superheroChoices + "&api_key=AKnbLrKSn42S9vkarKPL1lclGUpv5LQE"
            
            $.ajax({
                url: queryURL,
                method: 'GET'
            }).then(function (response) {
                // console.log("hi")
                var heroDiv = $("<div class=heroImage>");
                // console.log(response)
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    // var p = $("<p>").text("Rating: " + results[i].rating);
                    // var heroImage = $("<img>");
                    // heroImage.attr("src", results[i].images.fixed_height.url);
                    // heroDiv.append(p);
                    // heroDiv.append(heroImage);
                    // $("#heroGifs").prepend(heroDiv);
                    console.log("hi")
                var stillGif = response.data[i].images.fixed_height_still.url;

				var playGif = response.data[i].images.fixed_height.url;

				var rating = response.data[i].rating;				

				var ratingDisplay = $('<p>').text( "Rating: " + rating.toUpperCase());
                topicDiv.append(ratingDisplay);

				var image = $("<img>").attr("src", stillGif); //Passes still image link to the image src
				image.attr("playsrc", playGif); //Creates playsrc attr and passes moving gif link to the image playsrc
				image.attr("stopsrc", stillGif); //Creates stopsrc attr and passes still image link to the image stopsrc
				
				topicDiv.append(image);

				// Puts the entire topic above the previous celebrities.
				$('#heroGifs').append(heroDiv);

				image.addClass("playChosenGif"); // Added a class to image tag

            
        }
    });
    
    
// })
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
    // text input functionality to create a new button when submit is pressed

    //still & animate gif on click
    // $("#anime").on("click", function () {
    //     var state = $(this).attr("data-state")

    //     if (state === "still") {
    //         $(this).attr("src", $(this).attr("data-animate"));
    //         $(this).attr("data-state", "animate");

    //     } else {
    //         $(this).attr("src", $(this).attr("data-still"));
    //         $(this).attr("data-state", "still");
    //     }
    // })

    //     var imageURL = response.data.image_original_url
        //     var heroImg = $("<img>")
        //     heroImg.attr("src", imageUrl)
        //     heroImg.attr("alt", "superhero gif")
        //     $("#heros".prepend(heroImg))
        //     console.log(response)
        //     // $("#animeButtons").text(JSON.stringify(response))
        // })
        // console.log(queryURL);

    renderButtons()
    $(document).on("click", ".superBTN", displayGifs);
	$(document).on("click", ".playChosenGif", newGifs);

})