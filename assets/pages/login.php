<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Signup</title>
  <!-- all style here -->
  <style media="screen">
    @import url('https://fonts.googleapis.com/css2?family=Ubuntu&family=Poppins:wght@400&display=swap');
    *{
      font-family:Ubuntu;
      padding:0;
      margin:0;
      box-sizing:border-box;
    }
    .wrapper{
      background-image: url('../img/bgsmall.jpg');
      background-size: cover;
      background-position: 47% 50%;
      width:100vw;
      height:100vh;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
    }
    .wrapper h3{
      color:#173c4f;
      width:100%;
      text-align:center;
      transform:translate(-60px,-20px);
    }
    #login_form{
      display:flex;
      flex-direction:column;
      font-size:13px;
      text-align: right;
    }
    #login_form input{
      background:transparent;
      padding:7px;
      width:245px;
      margin:9px 0;
      outline: none;
      border: none;
      color:#0a4a55;
      border-bottom: 1px solid #9ff9f4;
      font-family:Ubuntu;
      font-size: 13px;
      font-weight: ;
    }
    #login_form input:focus{
      color:#0068e2;
      border-bottom: 1px solid #0068e2;
    }
    #login_form button{
      padding: 9px;
      margin: 15px 0;
      width: 245px;
      font-size: 15px;
      border: none;
      border-radius: 6px;
      color: white;
      background-color: #0068e2;
      transition: 0.2s;
      cursor: pointer;
    }
    #login_form button:hover{
      background-color:#0075ff;
    }
    #forgot{
      font-family: Poppins;
      color:#0068e2;
      cursor:pointer;
    }
    #forgot:hover{
      color:red;
    }
    #login_page{
      display:none;
      cursor:pointer;
    }
    #login_page:hover{
      color:green;
    }
    #reset{
      display:none;
    }
    #login_form #reset:hover{
        background-color:#e82020;
    }
    .footer{
      cursor: pointer;
      font-family: Poppins;
      font-size: 14px;
      position: absolute;
      width: 117px;
      height: 20px;
      margin: 0 auto;
      margin-right: 23px;
      text-align: center;
      color: #fff;
      bottom: 0;
      right: 0;
      left: 0;
      border-top-left-radius: 9px;
      border-top-right-radius: 9px;
      background: #636363;
    }
    .footer:hover{
      background: #3d3d3d;
    }
  </style>
  <!-- all style over -->
</head>
<body>
  <div class="wrapper">
    <h3>Welcome Back</h3>
    <div id="login_form">
      <!-- <label for="username">User</label> -->
      <input id="email" placeholder="Email ID" type="email">
      <!-- <label id="pass_label" for="password">Password</label> -->
      <input id="password" placeholder="Password" type="password">
      <div><span id="forgot" onclick="reset_page()">Reset Password?</span></div>
      <div><span id="login_page" onclick="login_page()">Back to LogIn.</span></div>
      <button id="login" onclick="login()" >Login</button>
      <button id="reset" onclick="reset()" >Reset</button>
      <label id="msgid" style="text-align:center;opacity:0;color:red;transition:0.3s;">Message to be shown.</label>
    </div>
  </div>
  <div onClick="location.href='https://forms.gle/UbNjCgc13LGm3toAA'" class="footer">
    Dev contact
  </div>
  <!-- importing login js -->
  <script src="../js/login.js" charset="utf-8"></script>
</body>
</html>