$(document).ready(function () {

    $('.page1').show();
    $('.page2').hide();
    $('.page3').hide();


    $('.web-list-books').click(function () {
        $('.page1').show();
        $('.page2').hide();
        $('.page3').hide();
    });

    $('.web-add-book').click(function () {
        $('.page1').hide();
        $('.page2').show();
        $('.page3').hide();
    });

    $('.web-get-by-id').click(function () {
        fetchIdsRequest();
        $('.page1').hide();
        $('.page2').hide();
        $('.page3').show();
    });


    $("#test-test table tbody tr td").click(function (e) {
        var clicked = $(e.target).closest("td");
        console.log(clicked);
    });


    var bookList = $("#book-list");
    var addBookForm = $("#add-book");
    var allIdsList = $("#all-id-list")

    refreshBookList();

    bookList.on("click", "button", deleteBook);
    addBookForm.on("submit", handleAddBook);


    // DELETE BUTTON ACTION

    function deleteBook() {
        var id = $(this).data("id");
        sendDeleteRequest(id);
        //    $(this).parent().remove();
    }

    function sendDeleteRequest(id) {
        sendGenericRequest("http://localhost:8282/books/" + id,
            "DELETE",
            undefined,
            refreshBookList);
    }


    // GET IDS:

    function fetchIdsRequest() {
        sendGenericRequest("http://localhost:8282/books/",
            "GET",
            undefined,
            function (books) {
                console.log("Działa! :)");
                var renderingPointIDs = $("#test-test");
                renderIdList(renderingPointIDs, books);
            });
    }


    // ADD BOOK BUTTON ACTION

    function handleAddBook(event) {
        var id = $("input#id").val();
        var isbn = $("input#isbn").val();
        var title = $("input#title").val();
        var author = $("input#author").val();
        var publisher = $("input#publisher").val();
        var type = $("input#type").val();
        var method = $("button#submit-btn").data("method");
        if (title.trim().length > 0 &&
            author.trim().length > 0) {
            var book = {
                "id": id,
                "isbn": isbn,
                "title": title,
                "author": author,
                "publisher": publisher,
                "type": type,
            };

            sendGenericRequest("http://localhost:8282/books/add",
                method,
                book,
                refreshBookList);
        }

        event.preventDefault();
        return false;
    }

    function refreshBookList() {
        sendGenericRequest("http://localhost:8282/books/",
            "GET",
            undefined,
            function (books) {
                console.log("Działa! :)");
                var renderingPoint = $("#book-list");
                renderBookList(renderingPoint, books);
                fetchIdsRequest();
            });
    }

    function renderBookList(renderingPoint, books) {
        renderingPoint.empty();

        var table = $("<table>");
        table.attr("class", "table table-bordered");

        var thead = $("<thead>");
        thead.attr("class", "thead-dark");

        var tr = $("<tr>")
        tr.append('<th scope="col" class="text-center">ID</th>');
        tr.append('<th scope="col" class="text-center">ISBN</th>');
        tr.append('<th scope="col" class="text-center">Title</th>');
        tr.append('<th scope="col" class="text-center">Author</th>');
        tr.append('<th scope="col" class="text-center">Publisher</th>');
        tr.append('<th scope="col" class="text-center">Category</th>');
        tr.append('<th class="text-center">Action</th>');

        thead.append(tr);
        table.append(thead);

        var tbody = $("<tbody>");
        for (var i = 0; i < books.length; i++) {
            var id = books[i].id;
            var isbn = books[i].isbn;
            var title = books[i].title;
            var author = books[i].author;
            var publisher = books[i].publisher;
            var type = books[i].type;
            var delBtn = '<button data-id=' + id + ' class="btn btn-danger" > Delete </button>';

            var row = $("<tr>").attr("class", "text-center")
            row.html("<td>" + id + "</td>" +
                "<td>" + isbn + "</td>" +
                "<td>" + title + "</td>" +
                "<td>" + author + "</td>" +
                "<td>" + publisher + "</td>" +
                "<td>" + type + "</td>" +
                "<td>" + delBtn + "</td>");

            tbody.append(row);
        }
        table.append(tbody);

        renderingPoint.append(table);
    }


    function renderIdList(renderingPointIDs, books) {
        renderingPointIDs.empty();

        var rows = 15;
        var idTable = $("<table>");
        idTable.attr("class", "table table-bordered");
        idTable.append("<thead></thead>");
        
        var idTbody = $("<tbody>");
        var idRow = "";
        for (var i = 0; i < books.length; i++) {
            if ((i + 1) % rows === 1) {
                idRow = $("<tr>");
                idRow.append("<td>" + books[i].id + "</td>");
            } else if ((i + 1) % rows === 0) {
                idRow.append("<td>" + books[i].id + "</td>");
                idTbody.append(idRow);
            } else {
                idRow.append("<td>" + books[i].id + "</td>");
                if ((i + 1) === books.length) {
                    idTbody.append(idRow);
                }
            }
        }

        idTable.append(idTbody);
        renderingPointIDs.append(idTable);

    }


    function sendGenericRequest(url, method, data, successHandler) {
        $.ajax({
            url: url,
            type: method,
            data: data === undefined ? "" : JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
        }).done(function (data) {
            if (successHandler !== undefined) {
                successHandler(data);
            }
        }).fail(function (xhr, status, errorThrown) {
            console.log("BŁĄD!", xhr, status, errorThrown);
        });
    }



    //  $.ajax({
    //    url:"http://date.jsontest.com",
    //  }).done(function(sentDate){
    //    console.log("Serwer wysłał odpowiedź. Poniżej wartość.");
    //    console.log(sentDate);
    //  }).fail(function(xhr, status, errorThrown){
    //    console.log(xhr, status, errorThrown);
    //  });
    //
    //  $.ajax({
    //    url:"https://swapi.co/api/people/4/",
    //  }).done(function(response){
    //    console.log("Serwer wysłał odpowiedź. Poniżej wartość.");
    //    console.log(response);
    //  }).fail(function(xhr, status, errorThrown){
    //    console.log(xhr, status, errorThrown);
    //  });

});
