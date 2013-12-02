<?php
	// inclusion de la classe magpierss
	require_once("magpierss/rss_fetch.inc.php");
	function FeedParser($url_feed, $nb_items_affiches=10){
 
		// lecture du fichier distant (flux XML)
		$rss = fetch_rss($url_feed);
 
		// si le parcours du fichier se passe bien, on lit les élements (items)
		if (is_array($rss->items)) {
 
			// on ne garde que les $nb_items_affiches premiers éléments (items), nombre défini dans l'en-tête de la fonction
			$items = array_slice($rss->items, 0, $nb_items_affiches);
 
			// on fait une boucle sur les informations : pour chaque item, récupérer $titre... et afficher
			foreach($items as $item) {
 
				// on mémorise les informations de chaque item dans des variables
				$titre = $item["title"];
				$lien = $item["link"];
				$description = $item["description"];
				$titre_general = $channel["title"];
				
 
 
				// la date utilisée pour les flux RSS est au format timestamp, il faut donc formater la date
				// conversion au format jj/mm/aa. pour plus d'informations, vous conférer au tutorial sur les timestamp
				$date = date("d/m/y",strtotime($item["pubdate"]));
 
				// puis la date et la description
				$html .= "$date   ";
				// on affiche le titre de chaque item
				$html .= "<a href=\"".$lien."\" title=\"".$titre."\" target=\"_blank\">".$titre."</a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
				$html .= "$titre_general   ";
			} // fin de la boucle
 
			// on retourne la variable $html au programme (elle contient le code HTML pour l'affichage du flux)
			
			return $html;
			
		} // fin du traitement du fichier
	} // fin de la fonction FeedParser()
	
?>