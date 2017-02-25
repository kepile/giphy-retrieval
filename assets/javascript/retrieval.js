
      var sports = ["Skiing", "Gymnastics", "Football", "Racing", "Baseball", "Hockey"];
      var sport = "";
      var host = "http://api.giphy.com/v1/gifs/"
      var key = "&api_key=dc6zaTOxFJmzC";   
      var limit = "&limit=10";
      var pagestatus = "still"; 

      // Function for creating buttons for spot selection
      function renderButtons() {
         // remove any buttons that are on the page already
         $("#sport-view").empty();
         // for each sport in the array, create a button
         for (var i = 0; i < sports.length; i++) {
          var newBtn = $("<button class = 'col-xs-5 col-md-2 btn btn-info sportBtn'></button");
          newBtn.html(sports[i]).attr("data-name", sports[i]);
           $("#sport-view").append(newBtn);
       }

      }

       // create buttons on the page for first time
      renderButtons();

      // if user adds a sport and clicks  submit then add it to array and create new buttons
      $("#add-topic").on("click", function() {
           event.preventDefault();
           sport = $("#user-input").val().trim();
           sports.push(sport);
           $("#user-input").val("");
           renderButtons();
       
      });
      
     // if user clicks a button to select a sport, retrieve GIFs and display
     $(document).on("click", ".sportBtn", function() {
            var sportPick = $(this).data("name");
            var queryURL = host + "search?q=blooper+" + sportPick + limit + "&fmt=json"+key;
          
            $.ajax({
              url:queryURL,
              method:"GET"

            }).done(function(response) {
                // when data is returned, remove any images that might be displayed and display new sport
                // set the pagestatus which controls allowing only 1 image to be animated
                  var pagestatus = "still";
                  $("#sport-gif").empty();
                  for (var i = 0; i < response.data.length; i++) {
                      // for each image returned, create an image tag and put in still image  
                      // include data elements for image src for still and animate and
                     // image which houses the state that is currently displayed
                       var sportBtn = $("<img>")
                      sportBtn.attr("src", response.data[i].images.fixed_height_still.url).attr("class", "layout").
                      attr("data-still", response.data[i].images.fixed_height_still.url).attr("data-animate", response.data[i].images.fixed_height.url).
                      attr("data-image", "still");
                      // create a div for displaing using bootstrap class of card.  append images and rating
                      var newDiv = $("<div class = 'card'>").append(sportBtn);
                      var rating = $("<p class = 'text-center card-text'>").html("Rating: " + response.data[i].rating.toUpperCase());
                      newDiv.append(rating);
                      // display on page
                      $("#sport-gif").append(newDiv);
                   };    
              } );
          });


// function to be executed when an image is clicked
  $(document).on("click", ".layout", function() {
    // check to see if there are any images animated by checking the toggle pagestatus
            if (pagestatus === "still") {
              // if pagestatus is "still" nothing is animated so animate the picture that was clicked
              $(this).attr("src", $(this).data("animate"));
              // clear working memory and reset data-image toggle to animate
              $(this).removeData("image");
              $(this).attr("data-image", "animate");
              // update the toggle pagestatus 
              pagestatus = "animate";
           } else if ($(this).data("image") === "animate") {
             // if pagestatus is "animate" and the image that was clicked is the picture that is animated
             // update the src to the still image which controls 1 image being animated at a time
             // remove working memory for the data toggle and then update it with "still"
               $(this).attr("src", $(this).data("still"));
               $(this).removeData("image");
               $(this).attr("data-image", "still");
               // update the toggle pagestatus which controls 1 image being animated at a time
               pagestatus = "still";
           }
   })

      
    