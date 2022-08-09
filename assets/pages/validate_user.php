<?php
  include "db_conn.php";
  //code for login
  if(isset($_POST['login']) && isset($_POST['uname']) && isset($_POST['pass'])){
    $uname = $_POST['uname'];$pass = $_POST['pass'];
    $sql = "SELECT user,pass,profile FROM userspace WHERE user='$uname' AND pass='$pass'";
    $res = mysqli_query($conn,$sql);
    $row = mysqli_fetch_assoc($res);
    if($row != null){
      echo "login";
    }
    else{
      echo "invalid user or pass";
    }
  }
  //code for signup
  if(isset($_POST['signup']) && isset($_POST['uname']) && isset($_POST['pass']) && isset($_POST['email'])){
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
      $profile = substr(md5(time()),0,10);
      $sql = "CREATE TABLE $profile(id int NOT NULL,posts varchar(30),rate_id int)";
      mysqli_query($conn,$sql);
      $sql = "INSERT INTO userspace(user,pass,email,profile) VALUES('$uname','$pass','$email','$profile')";
      $res = mysqli_query($conn,$sql);
    }
  }
  //reset codes..
  if(isset($_POST['reset']) && isset($_POST['email'])){
    //code for reset..
  }
?>