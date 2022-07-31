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