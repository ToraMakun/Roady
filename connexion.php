//Authentification auprès de la base de données
<?php
	$login; //login reçu de la part du client
	$pass; // mdp reçu du client
	$db = new PDO('mysql:host=localhost;dbname=roads', 'root', '');
	$req = $db->prepare('SELECT mdp FROM User WHERE login=?');
	$req->execute(array($login));
	$data = $reponse->fetch();
	
	if (md5(pass)==data['mdp'])
	{
		//Connexion réussie et donc on peut afficher la suite de l'appli
	}
	else
	{
		//Echec de la connexion
	}
?>