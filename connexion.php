//Authentification aupr�s de la base de donn�es
<?php
	$login; //login re�u de la part du client
	$pass; // mdp re�u du client
	$db = new PDO('mysql:host=localhost;dbname=roads', 'root', '');
	$req = $db->prepare('SELECT mdp FROM User WHERE login=?');
	$req->execute(array($login));
	$data = $reponse->fetch();
	
	if (md5(pass)==data['mdp'])
	{
		//Connexion r�ussie et donc on peut afficher la suite de l'appli
	}
	else
	{
		//Echec de la connexion
	}
?>