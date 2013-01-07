<?php
	//Récupération des infos envoyés depuis le formulaire
	$login=$_POST['login'];
	$mdp=$_POST['mdp'];
	$prenom=$_POST['prenom'];
	$nom=$_POST['nom'];
	$mail=$_POST['mail'];
	
	
	//On verifie que chaque champ est bien rempli
	if(empty($login) || empty($mdp) ||  empty($mail) || empty($prenom) || empty($nom))
	{
		$response = "error";
	}
	else
	{
		require_once("connexion_base.php");
		
		//Ajout des informations de l'utilisateur à la base de données
		$req = $bdd->prepare('INSERT INTO User (login, mdp, prenom, nom, mail) VALUES (?, ?, ?, ?, ?)');
		$req->execute(array($login, md5($mdp), $prenom, $nom, $mail);

		$req->closeCursor();
		
		$response="success";
	}
	
	//Reponse envoyée au client
	echo json_encode($response);  
?>