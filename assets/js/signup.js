function reset(){
  var email = document.querySelector("#email").value;
  firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    // Password reset email sent!
    document.getElementById('msgid').innerText="Password reset email sent!.";
    document.getElementById('msgid').style.opacity='1';
    document.getElementById('msgid').style.color='green';
    setTimeout(function () {
      document.getElementById('msgid').style.opacity='0';
      document.getElementById('msgid').style.color='red';
    }, 5000);
  })
  .catch((error) => {
    // var errorCode = error.code;
    // var errorMessage = error.message;
    document.getElementById('msgid').innerText="Invalid UserID.";
    document.getElementById('msgid').style.opacity='1';
    setTimeout(function () {
      document.getElementById('msgid').style.opacity='0';
    }, 5000);
  });
}


//switching reset and signup
function reset_page(){
  document.getElementById('username').style.display="none";
  document.getElementById('password').style.display="none";
  document.getElementById('cpassword').style.display="none";
  document.getElementById('forgot').style.display="none";
  document.getElementById('signup').style.display="none";
  document.getElementById('signup_page').style.display="block";
  document.getElementById('reset').style.display="block";
  document.getElementById('email').placeholder = "Enter your Email to reset";
  document.getElementById('header').innerText = "Reset pass";
}
function signup_page(){
  document.getElementById('username').style.display="block";
  document.getElementById('password').style.display="block";
  document.getElementById('cpassword').style.display="block";
  document.getElementById('forgot').style.display="block";
  document.getElementById('signup').style.display="block";
  document.getElementById('signup_page').style.display="none";
  document.getElementById('reset').style.display="none";
  document.getElementById('email').placeholder = "Email (optional/reset pass)";
  document.getElementById('header').innerText = "Onestep Signup";
}

//onpress signup btn
function signup(){
  var error = false;
  var uname = document.getElementById('username').value;
  var pass = document.getElementById('password').value;
  var cpass = document.getElementById('cpassword').value;
  var email = document.getElementById('email').value;
  if(uname.length < 5){
    error = true;
    document.getElementById("msgid").innerText='Username must be greater than 5 letters';
    document.getElementById("msgid").style.opacity=1;
  }
  else if(pass.length <5){
    error = true;
    document.getElementById("msgid").innerText='password must be greater than 5 letters';
    document.getElementById("msgid").style.opacity=1;
  }
  else if(pass != cpass){
    error = true;
    document.getElementById("msgid").innerText='password not matched';
    document.getElementById("msgid").style.opacity=1;
  }
  else{
    error=false;
    document.getElementById("msgid").innerText=' ';
  }
  if(!error){
    //ajax code
    var form_data = new FormData();
    form_data.append('signup','signup');
    form_data.append('uname',uname);
    form_data.append('pass',pass);
    form_data.append('email',email);
    var req = new XMLHttpRequest();
    req.open('POST','validate_user.php');
    req.send(form_data);
    req.onreadystatechange = function(){
      if(req.readyState == 4 && req.status == 200){
        var response = req.responseText;
        if(response == 'valid'){
          //code for valid
          document.cookie = "uname="+uname+";max-age=60*60*5;path=/;secure;"; //change before upload to server.
          document.cookie = "pass="+pass+";max-age=60*60*5;path=/;secure;"; //change before upload to server.
          window.location.assign('/'); //change before upload to server.
        }
        else{
          //code for invalid
          document.getElementById('msgid').innerText='username not available';
          document.getElementById('msgid').style.opacity=1;
        }
      }
    }
  }
}