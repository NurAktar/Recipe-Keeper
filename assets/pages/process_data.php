<?php
    include "db_conn.php";
    if(isset($_POST['query'])){
        $q = $_POST['query'];
        $sql = "SELECT data FROM list WHERE data LIKE '$q%' UNION SELECT data FROM list WHERE data LIKE '%$q%' LIMIT 5";
        $res = mysqli_query($conn,$sql);
        $rows = mysqli_fetch_all($res, MYSQLI_ASSOC);
        echo json_encode($rows);
    }
?>