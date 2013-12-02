<?php
    require_once("feedparser.php"); //echo FeedParser("http://www.vivre-a-niort.com/fr/news.xml",10);
	require_once("flux.php");
	$essai=FeedParser($flux1,10);

	$fic=fopen("./cache_local/cache.txt", "w");
	fwrite($fic,$essai);
	fclose($fic);
?>	