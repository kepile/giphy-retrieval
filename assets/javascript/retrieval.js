
      var sports = ["skiing", "gymnastics", "american football", "horseback riding", "baseball", "hockey"];
      var sport = "";
      var host = "http://api.giphy.com/v1/gifs/"
      var key = "&api_key=dc6zaTOxFJmzC";   
      var limit = "&limit=10";

      // Function for displaying movie data
      function renderButtons() {
         $("#sport-view").empty();
         for (var i = 0; i < sports.length; i++) {
           var newBtn = $("<button>").html(sports[i]).attr("data-name", sports[i]).attr("class", "sportBtn");
           $("#sport-view").append(newBtn);
       }
        // YOUR CODE GOES HERE

      }

       // var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";
     
      // This function handles events where one button is clicked
      renderButtons();

      $("#add-topic").on("click", function() {
         event.preventDefault();
         sport = $("#user-input").val().trim();
         sports.push(sport);
         $("#user-input").val("");
        
         renderButtons();
     
      });
      
     
         $(document).on("click", ".sportBtn", function() {
            var sportPick = $(this).data("name");
            var queryURL = host + "search?q=blooper+" + sportPick + limit + "&fmt=json"+key;
          
            $.ajax({
              url:queryURL,
              method:"GET"

            }).done(function(response) {
                  $("#sport-gif").empty();
                  console.log(response.data.length);
                  for (var i = 0; i < response.data.length; i++) {
                      var sportBtn = $("<img>").attr("src", response.data[i].images.fixed_height_still.url).attr("class", "layout").
                      attr("data-still", response.data[i].images.fixed_height_still.url).attr("data-animate", response.data[i].images.fixed_height.url).
                      attr("data-image", "still");
                      $("#sport-gif").append(sportBtn);
                   };    
              } );
          });



          $(document).on("click", ".layout", function() {
                   if ($(this).data("image") === "still") {
                      $(this).attr("src", $(this).data("animate"));
                      $(this).removeData("image");
                      $(this).attr("data-image", "animate");
                   } else {
                       $(this).attr("src", $(this).data("still"));
                       $(this).removeData("image");
                       $(this).attr("data-image", "still");
                   }
           })

      
    