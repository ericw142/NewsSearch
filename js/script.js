$(document).ready(function(){

    function search(){
        // Get searchTerm
        var searchTerm = $("#searchTerm").val();
        // Get Number of records to retrieve
        var numRecords = $("#NumRecords").val();
        var startYear = $("#StartDate").val().replace(/-/g, '');
        var endYear = $("#EndDate").val().replace(/-/g, '');
    
        if (endYear < startYear) {
            alert("Check starting and end dates");
            return;
        }
        if (startYear < 18510101) {
            alert("Pick a later starting year");
            return;
        }
        if (endYear > 20210101) {
            alert("Pick an earlier ending year");
            return;
        }
        // Creating queryURL
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +searchTerm + "&begin_date="+ startYear + "&end_date=" + endYear + "&api-key=f5Ql8CE6k7NqGhfkbESevpi2pGC8dDq3";
    
        // AJAX
       
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
             // Within .then, create variables to store headline
            for (var i = 0; i < numRecords; i++) {
                // Variables
                var headline = response.response.docs[i].headline.main;
                var abstract = response.response.docs[i].abstract;
                var card = $("<div>");
    
                // Headline
                var cardH = $("<div>");
                cardH.addClass("card-header");
                cardH.text(headline);
                cardH.on("click", function(){
                    window.open(response.response.docs[i].web_url, '_blank');
                })
    
                // Abstract 
                var cardA = $("<div>");
                cardA.addClass("card-body");
                cardA.text(abstract);
    
                // Link to article
                var a = $("<a>");
                a.addClass("btn btn-primary stretched-link");
                a.attr("href", response.response.docs[i].web_url);
                a.attr("target", '_blank');
                a.text("Go to article");
    
                // Appending elements
                card.append(cardH);
                card.append(cardA);
                card.append(a);
    
                $(".Articles").append(card);
            }
            
    
            
        })
    }
    
    
    // Click Event for search button
    $("#search").on("click", function(){
    
        search();
    })
    
    // Click Event for clear results button
    $("#clear").on("click",function(){
        $(".Articles").empty();
    
    })
}) 