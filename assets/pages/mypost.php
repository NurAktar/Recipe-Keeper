<?php
if(isset($_POST['name']) && isset($_POST['ingredient']) && isset($_POST['cooktime']) && isset($_POST['detail'])){
    include "db_conn.php";
    $name = $_POST['name'];
    $ingredient = $_POST['ingredient'];
    $cooktime = $_POST['cooktime'];
    $detail = $_POST['detail'];
    $user = $_POST['user'];
    $profile = $_POST['profile'];
    $sql = "INSERT INTO recipe_list (name,ingredient,cooktime,detail,author) VALUES('$name','$ingredient','$cooktime','$detail','$user')";
    mysqli_query($conn,$sql);

    $sql = "SELECT id FROM recipe_list WHERE author='$user' ORDER BY id DESC";
    $res = mysqli_query($conn,$sql);
    $row = mysqli_fetch_assoc($res);
    $id = $row['id'];
    $sql = "INSERT INTO $profile(posts) VALUE($id)";
    mysqli_query($conn,$sql);

    echo "done";
}
?>