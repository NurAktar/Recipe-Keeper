<?php
include "db_conn.php";
    if(isset($_POST['up_rate']) && isset($_POST['profile']) && isset($_POST['id'])){
        $profile = $_POST['profile'];
        $id = $_POST['id'];
        $sql = "SELECT up_rate from $profile WHERE up_rate='$id'";
        $res = mysqli_query($conn,$sql);
        if(mysqli_num_rows($res) == 0){
            $sql = "INSERT INTO $profile (up_rate) value('$id')";
            mysqli_query($conn,$sql);

            $sql = "UPDATE recipe_list SET up_rate = up_rate+1 WHERE id='$id'";
            mysqli_query($conn,$sql);
            echo "done";
        }
        else{
            $sql = "DELETE FROM $profile WHERE up_rate='$id'";
            mysqli_query($conn,$sql);

            $sql = "UPDATE recipe_list SET up_rate = up_rate-1 WHERE id='$id'";
            mysqli_query($conn,$sql);
            echo "not done";
        }
    }
?>