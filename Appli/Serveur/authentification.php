<?php
	//R�cup�ration des infos envoy�s depuis le formulaire
	$login=$_POST['login'];
	$mdp=$_POST['mdp'];
	
	if(empty($login) || empty($mdp))
	{
		$response = "error";
	}
	else
	{
		require_once("connexion_base.php");

		$req = $bdd->prepare('SELECT mdp FROM user WHERE login = ?');
		$req->execute(array($login));

		$data = $req->fetch();

		$req->closeCursor();
		
		//Verification du mot de passe
		if(md5($mdp)==$data['mdp'])
		{
			$response="success";
		}
	}
	
	//Reponse envoy�e au client
	echo json_encode($response);  
?>