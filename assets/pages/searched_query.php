<?php
include "db_conn.php";
if(isset($_POST['query'])){
    $q = $_POST['query'];
    $sql = "SELECT * FROM recipe_list WHERE name LIKE '$q%' UNION SELECT * FROM recipe_list WHERE( name LIKE '%$q%' OR detail LIKE '%$q%' ) LIMIT 12";
    $res = mysqli_query($conn,$sql);
    $img = 0;
    while($row = mysqli_fetch_assoc($res)){?>
        <div class="recipe-card">
            <span><?php echo $row['cooktime']." Min Cook"; ?></span>
            <!-- <img src="https://source.unsplash.com/random/1920x1080/?wallpaper,cook" alt="img not loaded"/> -->
            <img src="assets/img/<?php echo $img.".jpg"; ?>" alt="not loaded"/>
            <div>
                <h5 class="card-title"><?php echo $row['name']; ?></h5>
                <p class="card-text"><?php echo $row['detail']; ?></p>
                <a href="#!" class="btn btn-primary">Cook</a>
            </div>
        </div><?php
        $img++;
    }
}
?>