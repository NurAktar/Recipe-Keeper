var dark = document.getElementsByClassName("darkmodebtn");
var light = document.getElementsByClassName("lightmodebtn");
var mode = document.getElementsByClassName("dark-mode");
var body = document.body;
var recipecard = document.getElementsByClassName("recipe-card");
function darkmode(){
    dark[0].style.display="none";
    light[0].style.display="block";
    mode[0].classList.toggle("bg-dark");
    mode[1].classList.toggle("bg-dark");
    body.classList.toggle("dark-bg");
    for (let i = 0; i < recipecard.length; i++) {
        recipecard[i].classList.toggle("recipe-div-dark");
    }
}
function lightmode(){
    dark[0].style.display="block";
    light[0].style.display="none";
    mode[0].classList.toggle("bg-dark");
    mode[1].classList.toggle("bg-dark");
    body.classList.toggle("dark-bg");
    for (let i = 0; i < recipecard.length; i++) {
        recipecard[i].classList.toggle("recipe-div-dark");
    }
}
//login hash check
function login_check(){
    var profile = false;
    let cookie = document.cookie.split(';');
    let uname;let pass;
    uname = cookie[1].split('=');
    uname = uname[1];
    pass = cookie[0].split('=');
    pass = pass[1];
    form_data = new FormData();
    form_data.append('uname',uname);
    form_data.append('pass',pass);
    let req = new XMLHttpRequest();
    req.open('POST','assets/pages/login_check.php');
    req.send(form_data);
    req.onreadystatechange = function(){
        if(req.status == 200 && req.readyState == 4){
            let response = req.responseText;
            if(response != "invalid"){
                //got profile
                profile = response;
                document.getElementById("userimg").src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg";
                //profile menu
                var pro_ul = "<li>";
                pro_ul += "<a class='dropdown-item' href='#'>New Post</a>";
                pro_ul += "</li>"
                pro_ul += "<li>";
                pro_ul += "<a class='dropdown-item' href='#'>Profile</a>";
                pro_ul += "</li>";
                pro_ul += "<li>";
                pro_ul += "<a class='dropdown-item' href='#'>Github</a>";
                pro_ul += "</li>";
                document.getElementById("profile_menu").innerHTML=pro_ul;
            }
            else{
                alert("something went wrong!.. try clearing cache.");
            }
        }
    }
}
//show recipe ../ open recipe id
function show_recipe(id){
    let query = id;
    recipe_up(id);
    var form_data = new FormData();
    form_data.append('query',query);
    var ajax_request = new XMLHttpRequest();
    ajax_request.open('POST','assets/pages/show_recipe.php');
    ajax_request.send(form_data);
    ajax_request.onreadystatechange = function(){
        if(ajax_request.readyState == 4 && ajax_request.status == 200){
            var response = ajax_request.responseText;
            document.getElementById('recipe_card_wraper').innerHTML = response;

        }
    }
}

//homepage content loading
function homepage_content(){
    // load recipe cards..
    let home = 'homepage';
    var form_data = new FormData();
    form_data.append('home',home);
    var ajax_request = new XMLHttpRequest();
    ajax_request.open('POST','assets/pages/homepage.php');
    ajax_request.send(form_data);
    ajax_request.onreadystatechange = function(){
        if(ajax_request.readyState == 4 && ajax_request.status == 200){
            var response = ajax_request.responseText;
            document.getElementById('recipe_card_wraper').innerHTML = response;
            document.getElementById('search_result').innerHTML = '';
        }
    }
}

//history managing..
function urlcheck(){
    const search = window.location.search;
    const url = new URLSearchParams(search);
    if(url.get('recipe') != null){
        // load recipe here..
        let query = url.get('recipe');
        var form_data = new FormData();
        form_data.append('query',query);
        var ajax_request = new XMLHttpRequest();
        ajax_request.open('POST','assets/pages/show_recipe.php');
        ajax_request.send(form_data);
        ajax_request.onreadystatechange = function(){
            if(ajax_request.readyState == 4 && ajax_request.status == 200){
                var response = ajax_request.responseText;
                document.getElementById('recipe_card_wraper').innerHTML = response;

            }
        }
    }
    else if(url.get('search') != null){
        // load recipe cards..
        let query = url.get('search');
        if(query.length > 0){
            var form_data = new FormData();
            form_data.append('query',query);
            var ajax_request = new XMLHttpRequest();
            ajax_request.open('POST','assets/pages/searched_query.php');
            ajax_request.send(form_data);
            ajax_request.onreadystatechange = function(){
                if(ajax_request.readyState == 4 && ajax_request.status == 200){
                    var response = ajax_request.responseText;
                    document.getElementById('recipe_card_wraper').innerHTML = response;
                    document.getElementById('search_result').innerHTML = '';
                }
            }
        }
        else{
            document.getElementById('recipe_card_wraper').innerHTML = 'Try something new today :)';
        }
    }
    else{
        homepage_content();
    }
}

//backward or forward browser track..
window.addEventListener('popstate', () => {
    urlcheck();
});

//recipe history insert
function recipe_up(n){
    history.pushState(null,'','?recipe='+n);
}
//search history insert
function search_up(n){
    history.pushState(null,'','?search='+n);
}

// onload
function loaded(){
    urlcheck();
    login_check();
}