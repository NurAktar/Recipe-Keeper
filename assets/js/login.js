function login(){
    // code for login
    var uname = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    if(uname.length > 4 && pass.length >4){
        //check
        var form_data = new FormData();
        form_data.append('login','login');
        form_data.append('uname',uname);
        form_data.append('pass',pass);
        var req = new XMLHttpRequest();
        req.open('POST','validate_user.php');
        req.send(form_data);
        req.onreadystatechange = function(){
            if(req.readyState == 4 && req.status == 200){
                var response = req.responseText;
                if(response == "login"){
                    let pass_hash = md5(pass);
                    document.cookie = "uname="+uname+";max-age=259200;path=/;secure;"; //change before upload
                    document.cookie = "pass="+pass_hash+";max-age=259200;path=/;secure;"; //change before upload
                    window.location.assign("/"); //change before upload
                }
                else{
                    msgid = document.getElementById("msgid");
                    msgid.innerText = "Invalid Username or Password";
                    msgid.style.opacity=1;
                }
            }
        }
    }
    else{
        var msgid = document.getElementById("msgid");
        msgid.innerText = "too short username or password";
        msgid.style.opacity=1;
    }
}

//triger inputs enter 
let passinput = document.getElementById("password");
document.getElementById("username").addEventListener("keydown",(e)=>{
    if(e.key == 'Enter'){
        passinput.focus();
    }
});
passinput.addEventListener("keydown",(e)=>{
    if(e.key == 'Enter'){
        login();
    }
});