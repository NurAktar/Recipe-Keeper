//geting list into search input
function get_text(e){
    var s_text = e.textContent;
    document.getElementById("searchq").value = s_text;
    document.getElementById("search_result").innerHTML = '';
    document.getElementById("searchq").focus();
}

// move focus aerokeys
var keycount = -1;
document.getElementsByClassName("searchbar")[0].addEventListener("keydown",(e)=>{
    var el_len = document.querySelectorAll(".move").length-1;
    if(e.key == "ArrowDown"){
        keycount++;
        if(keycount > el_len){
            keycount = 0;
        }
        document.getElementsByClassName("move")[keycount].focus();
        e.preventDefault();
    }
    else if(e.key == "ArrowUp"){
        keycount--;
        if(keycount < 0){
            keycount = el_len;
        }
        document.getElementsByClassName("move")[keycount].focus();
        e.preventDefault();
    }
    else{
        keycount = -1;
    }
});

// After searched // after pressed enter
function searched(){
    var query = document.getElementById("searchq").value;
    search_up(query);
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

//Event triger for search..
document.getElementById("searchq").addEventListener("keyup",(e)=>{
    var query = document.getElementById("searchq").value;
    if (e.key === "Enter") {
        e.preventDefault();
        searched();
    }
    else if(query.length > 0){
        var form_data = new FormData();
        form_data.append('query',query);
        var ajax_request = new XMLHttpRequest();
        ajax_request.open('POST','assets/pages/process_data.php');
        ajax_request.send(form_data);
        ajax_request.onreadystatechange = function(){
            if(ajax_request.readyState == 4 && ajax_request.status == 200){
                var response = JSON.parse(ajax_request.responseText);
                var html = '<div class="list-group">';
                if(response.length > 0){
                    for(var count = 0;count < response.length; count++){
                        html += '<a onclick="get_text(this)" href="javascript:" class="move list-group-item list-group-item-action px-3 border-0 " aria-current="true">'+response[count].name+'</a>';
                    }
                }
                else{
                    html += '<a class="list-group-item list-group-item-action disabled">No Recipe Found!</a>';
                }
                html += '</div>';
                document.getElementById('search_result').innerHTML = html;
            }
        }
    }
    else{
        document.getElementById('search_result').innerHTML = '';
    }
});