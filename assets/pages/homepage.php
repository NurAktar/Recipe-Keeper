<?php
include "db_conn.php";
if(isset($_POST['home'])){

    // popular post
    $sql = "SELECT * FROM recipe_list ORDER BY up_rate DESC LIMIT 9";
    $res = mysqli_query($conn,$sql);
    $img = rand(0,11); ?>

    
    <h1 style="width:100%;font-family:fantasy;padding-left:20px;">Popular post:</h1>
    <?php
    while($row = mysqli_fetch_assoc($res)){?>
        <div class="recipe-card">
            <span><?php echo $row['cooktime']." Min Cook"; ?></span>
            <img src="assets/img/<?php echo $img.".jpg"; ?>" alt="not loaded"/>
            <div>
                <h5 class="card-title"><?php echo $row['name']; ?></h5>
                <p class="card-text"><?php echo $row['detail']; ?></p>
                <a href="javascript:show_recipe(<?php echo $row['id']; ?>);" class="btn btn-primary">Cook</a>
            </div>
        </div><?php
        if($img >= 11){
            $img = 0;
        }
        else{
            $img++;
        }
    }

    //recent post
    $sql = "SELECT * FROM recipe_list ORDER BY id DESC LIMIT 9";
    $res = mysqli_query($conn,$sql); ?>

    <h1 style="width:100%;font-family:fantasy;padding:20px;padding-bottom:0;">Recent post:</h1>
    <?php
    while($row = mysqli_fetch_assoc($res)){?>
        <div class="recipe-card">
            <span><?php echo $row['cooktime']." Min Cook"; ?></span>
            <img src="assets/img/<?php echo $img.".jpg"; ?>" alt="not loaded"/>
            <div>
                <h5 class="card-title"><?php echo $row['name']; ?></h5>
                <p class="card-text"><?php echo $row['detail']; ?></p>
                <a href="javascript:show_recipe(<?php echo $row['id']; ?>);" class="btn btn-primary">Cook</a>
            </div>
        </div><?php
        if($img >= 11){
            $img = 0;
        }
        else{
            $img++;
        }
    }
}
?>