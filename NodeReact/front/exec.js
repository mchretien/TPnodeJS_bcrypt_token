$("#register").submit(function(e)  {
    e.preventDefault();
    createUser();
});

function createUser()   {
    if(document.getElementById("adduserpwd").value == document.getElementById("adduserpwd2").value)  {
        var user = document.getElementById("addusername").value;
        var pass = document.getElementById("adduserpwd").value;
        var role = document.getElementById("addrole").value;

        $.ajax({
            url : 'http://127.0.0.1:3000/users/register', // La ressource ciblée
            type : 'POST', // Le type de la requête HTTP.

            data : {
                email: user,
                password: pass,
                role: role,
            },

            success: function(data){
                console.log("success");
                window.location.href = "login.html";
            },
            error: function(e) {
                console.log(e);
            }
        });
    } else {
        alert("Please make sure to confirm your password.");
    }
}

$("#connect").submit(function(e)   {
    e.preventDefault();
    console.log(document.getElementById("username").value);
    login();
});

function login()    {
    var user = document.getElementById("username").value;
    var pass = document.getElementById("userpwd").value;
    $.ajax({
        url : 'http://127.0.0.1:3000/users/login', // La ressource ciblée
        type : 'POST', // Le type de la requête HTTP.

        data : {
            email: user,
            password: pass,
        },

        success: function(data){
            console.log("success");
            var tableau1 = Object.values(data);
            var tableau2 = Object.values(tableau1);
            var final = Object.values(tableau2[0]);
            localStorage.setItem('email', final[0]);
            localStorage.setItem('role', final[1]);
            window.location.href = "userpage.html";
        },
        error: function(e) {
            console.log(e);
        }
    });
}

$("#welcome").ready(function()  {
    if(localStorage.getItem("email") != null)   {
        $("#interdit").hide();
        $("#corps").show();
        $("#welcome").html("Welcome "+ localStorage.getItem("email") + ", your role is: " + localStorage.getItem("role"));
        if(localStorage.getItem("role") == "admin")    {
            $("#newpost").show();
        }
        $("#newpost").submit(function(e)    {
            e.preventDefault();
            createPost();
        })
        $("#logout").click(function() {
            localStorage.clear();
            window.location.href = "login.html";
        });
        var settings = {
            "url": "http://127.0.0.1:3000/posts",
            "method": "GET"
        };
        $.ajax(settings).done(function (response) {
            var tableau1 = Object.values(response);
            var tableau2 = Object.values(tableau1);
            $.each(tableau2, function(index, value)    {
                var final = Object.values(tableau2[index]);
                document.getElementById("postslist").innerHTML += "<h3>Title: " + final[1] + "<br>Content: " + final[2] + "</h3>";
            });
        });
    }
});

function createPost()   {
    var title = document.getElementById("title").value;
    var content = document.getElementById("content").value;
    $.ajax({
        url : 'http://127.0.0.1:3000/posts', // La ressource ciblée
        type : 'POST', // Le type de la requête HTTP.

        data : {
            title: title,
            content: content,
        },

        success: function(data){
            console.log("success");
        },
        error: function(e) {
            console.log(e);
        }
    });
}