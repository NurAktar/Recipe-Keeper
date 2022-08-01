function load_data(query){
    if(query.length > 0){
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
                        html += '<a href="#" onclick="get_text(this)" class="move list-group-item list-group-item-action px-3 border-0 " aria-current="true">'+response[count].data+'</a>';
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
}
function get_text(e){
    var s_text = e.textContent;
    document.getElementsByName("search_box")[0].value = s_text;
    document.getElementById("search_result").innerHTML = '';
    setTimeout(enter_focus,100);
}
function enter_focus(){
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
