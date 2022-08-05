<?php
include "db_conn.php";
if(isset($_POST['query'])){
    $q = $_POST['query'];
    $sql = "SELECT * FROM recipe_list WHERE id='$q'";
    $res = mysqli_query($conn,$sql);
    $row = mysqli_fetch_assoc($res)?>

    <div class="recipe_view">
        <div class="banner_name">
            <h1><?php echo $row['name']; ?></h1>
            <h6>Posted by: <?php echo $row['author']; ?></h6>
            <h6>Cooking time <?php echo $row['cooktime']; ?></h6>
        </div>
        <div class="process">
            <h3>Ingradients:</h3>
            <span>carrots,cabbage,onion,potato,oil,butter,chili</span>
        </div>
        <div class="process">
            <h3>Recipe:</h3>
            <span><?php echo $row['detail']; ?></span>
        </div>
    </div>

    <?php
}
?>