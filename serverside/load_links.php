<?php
	$myfile = fopen("links.txt", "r") or die("Unable to open file!");
	echo fread($myfile,filesize("links.txt"));
	fclose($myfile);
?>