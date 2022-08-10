<?php
include "db_conn.php";
if(isset($_POST['query'])){
    $q = $_POST['query'];
    $sql = "SELECT * FROM recipe_list WHERE name LIKE '$q%' UNION SELECT * FROM recipe_list WHERE( name LIKE '%$q%' OR detail LIKE '%$q%' ) LIMIT 12";
    $res = mysqli_query($conn,$sql);
    $img = rand(0,11);
    while($row = mysqli_fetch_assoc($res)){?>
        <div class="recipe-card">
            <span><?php echo $row['cooktime']." Min Cook"; ?></span>
            <!-- <img src="https://source.unsplash.com/random/1920x1080/?wallpaper,cook" alt="img not loaded"/> -->
            <img src="assets/img/<?php echo $img.".jpg"; ?>" alt="not loaded"/>
            <div>
                <h5 class="card-title"><?php echo $row['name']; ?></h5>
                <p class="card-text"><?php echo $row['detail']; ?></p>
                <a href="javascript:show_recipe(<?php echo $row['id']; ?>);" class="btn btn-primary">Cook</a>
                <div id="svg_div">
                    <a href="javascript:up_rate(<?php echo $row['id'];?>)" style="background:none;">
                        <svg class="svgs" width="21" height="21" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path id=<?php echo $row['id'];?> d="M12 4 3 15h6v5h6v-5h6z" class="icon_svg-stroke icon_svg-fill" stroke-width="1.5" stroke="#5e5e5e" fill="none" stroke-linejoin="round"></path>
                        </svg>
                    </a>
                    <b id=<?php echo "rate".$row['id']?> ><?php echo $row['up_rate']; ?></b>
                    <a href="javascript:" style="background:none;">
                        <svg class="svgs" width="21" height="21" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m12 20 9-11h-6V4H9v5H3z" class="icon_svg-stroke icon_svg-fill" stroke="#5e5e5e" fill="none" stroke-width="1.5" stroke-linejoin="round"></path>
                        </svg>
                    </a>
                    <a href="javascript:" style="background:none;">
                        <svg class="svgs" width="21" height="21" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
                            <path d="M11.993 7.572c.996-1.912 2.005-2.869 3.997-2.869 2.204 0 3.997 1.713 3.997 3.824 0 3.825-3.997 7.649-7.994 11.473C7.997 16.176 4 12.352 4 8.527c0-2.11 1.792-3.824 3.997-3.824 2.005 0 3 .956 3.996 2.869Z" class="icon_svg-stroke icon_svg-fill" fill="none" stroke-linejoin="round" stroke="#ff7c88" stroke-width="1.5"></path>
                        </svg>
                    </a>
                </div>
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