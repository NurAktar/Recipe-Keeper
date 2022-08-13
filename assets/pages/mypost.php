<?php
if(isset($_POST['name']) && isset($_POST['ingredient']) && isset($_POST['cooktime']) && isset($_POST['detail']) && isset($_POST['overview'])){
    include "db_conn.php";
    $name = $_POST['name'];
    $cooktime = $_POST['cooktime'];
    $overview = $_POST['overview'];
    $ingredient = $_POST['ingredient'];
    $detail = $_POST['detail'];
    $user = $_POST['user'];
    $profile = $_POST['profile'];
    $sql = "INSERT INTO recipe_list (name,ingredient,cooktime,detail,author,overview) VALUES('$name','$ingredient','$cooktime','$detail','$user','$overview')";
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