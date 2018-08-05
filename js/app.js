$(document).ready(function () {

    var bookList = $("#book-list");
    var addBookForm = $("#add-book");

    refreshBookList();

    bookList.on("click", "button", deleteBook);
    addBookForm.on("submit", handleAddBook);

    function deleteBook() {
        var id = $(this).data("id");
        sendDeleteRequest(id);
        //        $(this).parent().remove();
    }

    function handleAddBook(event) {

        var title = $("input#title").val();
        var author = $("input#author").val();

        if (title.trim().length > 0 && author.trim().length > 0) {

            var book = {
                title: title,
                author: author,
            };

            sendPostRequest(book);
        }

        event.preventDefault();
        return false;

    }

    function sendDeleteRequest(id) {

        $.ajax({
            url: "http://localhost:8282/books/" + id,
            type: "DELETE",

        }).done(function (books) {
            refreshBookList();
            //            renderBookList(renderingPoint, books);
        }).fail(function (xhr, status, errorThrown) {
            console.log("BŁĄD:", xhr, status, errorThrown);
        })

    }

    function sendPostRequest(book) {

        $.ajax({
            url: "http://localhost:8282/books/",
            type: "POST",
            data: JSON.stringify(book),
            dataType: "json",
            contentType: "application/json; charset=utf-8",

        }).done(function () {
            refreshBookList();
            //            renderBookList(renderingPoint, books);
        }).fail(function (xhr, status, errorThrown) {
            console.log("BŁĄD:", xhr, status, errorThrown);
        })

    }

    function refreshBookList() {

        $.ajax({
            url: "http://localhost:8282/books/",
        }).done(function (books) {
            console.log("Działa!")
            console.log(books);
            var renderingPoint = $("#book-list");
            renderBookList(renderingPoint, books);
        }).fail(function (xhr, status, errorThrown) {
            console.log("BŁĄD:", xhr, status, errorThrown);
        })

        function renderBookList(renderingPoint, books) {
            renderingPoint.empty();
            var ul = $("<ul>");
            renderingPoint.append(ul);

            for (var i = 0; i < books.length; i++) {
                var id = books[i].id;
                var title = books[i].title;
                var author = books[i].author;

                var li = $("<li>");
                var delBtn = "<button data-id='" + id + "'>Delete</button>";



                li.html(title + "; " + author + " " + delBtn);
                ul.append(li);
            }

        }




    }

    //    $.ajax({
    //        url: "http://date.jsontest.com/",
    //    }).done(function(sentDate){
    //        console.log("Server wysłał odpowiedź. Poniżej zawartość: ")
    //        console.log(sentDate);
    //    }).fail(function(xhr, status, errorThrown){
    //        console.log(xhr, status, errorThrown);
    //    });
    //    
    //    $.ajax({
    //        url: "https://swapi.co/api/people/4/",
    //    }).done(function(sentDate){
    //        console.log("Zwrot z servera: ")
    //        console.log(sentDate);
    //    }).fail(function(xhr, status, errorThrown){
    //        console.log(xhr, status, errorThrown);
    //    });

    //    var data = "";
    //    console.log(data);

});
