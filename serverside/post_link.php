<?php
$_POST = file_get_contents("php://input", true);
$request = json_decode($_POST);
$image_src =  $request->image_src;
$txt = $image_src;
$myfile = file_put_contents('links.txt', $txt.PHP_EOL , FILE_APPEND | LOCK_EX);
?>