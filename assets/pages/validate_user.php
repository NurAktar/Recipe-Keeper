<?php
  include "db_conn.php";
  if(isset($_POST['signup']) && isset($_POST['uname']) && isset($_POST['pass']) && isset($_POST['email'])){
    //code for signup
    $uname = $_POST['uname'];
    $pass = $_POST['pass'];
    $email = $_POST['email'];
    $sql = "SELECT user FROM userspace WHERE user='$uname'";
    $res = mysqli_query($conn,$sql);
    $row = mysqli_fetch_assoc($res);
    if($row != null){
      echo "invalid";
    }
    else{
      echo "valid";
      $sql = "INSERT INTO userspace(user,pass,email) VALUES('$uname','$pass','$email')";
      $res = mysqli_query($conn,$sql);
    }
  }

  if(isset($_POST['reset']) && isset($_POST['email'])){
    //code for reset..
  }
?>