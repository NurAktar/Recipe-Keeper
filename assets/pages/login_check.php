<?php
include "db_conn.php";
    if(isset($_POST['uname']) && isset($_POST['pass'])){
        $uname = $_POST['uname'];
        $pass_hash = $_POST['pass'];
        $sql = "SELECT user,pass,profile FROM userspace WHERE user='$uname';";
        $res = mysqli_query($conn,$sql);
        $row = mysqli_fetch_assoc($res);

        if(mysqli_num_rows($res) == 1){
            if($pass_hash == md5($row['pass'])){
                echo $row['profile'];
            }
            else{
                echo "invalid";
            }
        }
        else{
            echo "invalid";
        }
    }
?>