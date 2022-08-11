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
//up_rate
function up_rate(id){
    if(profile != false){
        form_data = new FormData();
        form_data.append('up_rate','up_rate');
        form_data.append('profile',profile);
        form_data.append('id',id);
        let req = new XMLHttpRequest();
        req.open('POST','assets/pages/rating_system.php');
        req.send(form_data);
        req.onreadystatechange = function(){
            if(req.status == 200 && req.readyState == 4){
                let response = req.responseText;
                if(response == 'done'){
                    document.getElementById(id).style.stroke="#0077ff";
                    let c_rate = parseInt(document.getElementById('rate'+id).innerText);
                    c_rate +=1;
                    document.getElementById('rate'+id).innerText=c_rate;
                }
                else{
                    document.getElementById(id).style.stroke="#5e5e5e";
                    let c_rate = parseInt(document.getElementById('rate'+id).innerText);
                    c_rate -=1;
                    document.getElementById('rate'+id).innerText=c_rate;
                }
            }
        }
    }
    else{
        alert("please login first!");
    }
}

//signout
function signout(){
    document.cookie = "uname=; max-age=-1; path=/;"; //change before upload
    document.cookie = "pass=; max-age=-1; path=/;"; //change before upload
    window.location.assign('/'); //change before upload
}

//login hash check
var profile = false;
function login_check(){
    if(!document.cookie.indexOf('uname=') == 0){
    }
    else{
        let cookie = document.cookie.split(';');
        let uname;let pass;

        cookie.forEach((row)=>{
            if(row.includes('uname=')){
                uname = row.split('=')[1];
            }
            else if(row.includes('pass=')){
                pass = row.split('=')[1];
            }
        });

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
                    pro_ul += "<a class='dropdown-item' href='javascript:new_post()'>New Post</a>";
                    pro_ul += "</li>"
                    pro_ul += "<li>";
                    pro_ul += "<a class='dropdown-item' href='#'>Profile</a>";
                    pro_ul += "</li>";
                    pro_ul += "<li>";
                    pro_ul += "<a class='dropdown-item' href='https://github.com/NurAktar/Recipe-Keeper'>Github</a>";
                    pro_ul += "</li>";
                    pro_ul += "<li>";
                    pro_ul += "<a class='dropdown-item' href='javascript:signout()'>Signout</a>";
                    pro_ul += "</li>";
                    document.getElementById("profile_menu").innerHTML=pro_ul;
                }
                else{
                    alert("something went wrong!.. try clearing cache.");
                }
            }
        }
    }
}

//new post
function new_post(){
    history.pushState(null,'','?newpost');
    let html = "<div class='post_div'>";
    html +="<h3>Upload your Recipe</h3>";
    html +="<h5>Recipe Title</h5>";
    html +="<input id='r_name' type='text' placeholder='Biriyani' maxlength='20'/>";
    html +="<h5>Cooking Time</h5>";
    html +="<input id='r_cooktime' type='text' pattern= '[0-9]' placeholder='Minutes' maxlength='2'/>";
    html +="<h5>Ingredients</h5>";
    html +="<textarea id='ingredient' rows='4' cols='50' placeholder='Onions, Carrots, Tomato, Potato,..' maxlength='200'></textarea>";
    html +="<h4>Recipe Step-by-step</h4>";
    html +="<textarea id='recipe_detail' rows='4' cols='50' placeholder='1) First boil 2cups of water.\n2) cut all vegitables. ' maxlength='200'></textarea>";
    html +="<br><button class='btn btn-primary' onclick='mypost()'>Upload</button>";
    html +="</div>";
    document.getElementById('recipe_card_wraper').innerHTML = html;
}
function mypost(){
    let cookie = document.cookie.split(';');
        let uname;
        uname = cookie[0].split('=');
        uname = uname[1];
    let r_name = document.getElementById("r_name").value;
    let r_cooktime = document.getElementById("r_cooktime").value;
    let ingredient = document.getElementById("ingredient").value;
    let recipe_detail = document.getElementById("recipe_detail").value;

    let form_data = new FormData();
    form_data.append('name',r_name);
    form_data.append('cooktime',r_cooktime);
    form_data.append('ingredient',ingredient);
    form_data.append('detail',recipe_detail);
    form_data.append('user',uname);
    form_data.append('profile',profile);
    let req = new XMLHttpRequest();
    req.open('POST','assets/pages/mypost.php');
    req.send(form_data);
    req.onreadystatechange = function(){
        if(req.status == 200 && req.readyState == 4){
            if(req.responseText == 'done'){
                let html ="<h1>Recipe Uploaded!</h1>";
                document.getElementById('recipe_card_wraper').innerHTML = html;
            }
            else{
                alert("something wrong! [err=30mxdh]\nplease inform owner.");
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
    else if(url.get('newpost') != null){
        new_post();
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
    login_check();
    urlcheck();
}