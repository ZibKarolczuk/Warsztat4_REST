$(document).ready(function () {
    
    $.ajax({
        url: "http://date.jsontest.com/",
    }).done(function(sentDate){
        console.log("Server wysłał odpowiedź. Poniżej zawartość: ")
        console.log(sentDate);
    }).fail(function(xhr, status, errorThrown){
        console.log(xhr, status, errorThrown);
    });
    
    $.ajax({
        url: "https://swapi.co/api/people/4/",
    }).done(function(sentDate){
        console.log("Zwrot z servera: ")
        console.log(sentDate);
    }).fail(function(xhr, status, errorThrown){
        console.log(xhr, status, errorThrown);
    });
    
//    var data = "";
//    console.log(data);
    
});