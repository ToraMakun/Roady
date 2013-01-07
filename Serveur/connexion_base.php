<?php
	try
	{
		$bdd = new PDO('mysql:host=localhost;dbname=roads', 'root', '');
	}
	catch(Exception $e)
	{
			die('Erreur : impossible de se connecter à la base');
	}
?>