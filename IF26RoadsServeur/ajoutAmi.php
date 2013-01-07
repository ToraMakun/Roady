<?php
	header("Content-Type: text/plain");
	$dsn='mysql:dbname=roads;host=localhost';
    $user='RoadsServer';
    $mdp='Poule#669';
    $pdo=new PDO($dsn, $user, $mdp);
    $codeExec=null;
	
	//Vérification connexion
	$sql=$pdo->prepare('select login, token from utilisateur where login= ?');
    $sql->bindValue(1, $_POST['login'], PDO::PARAM_STR);
    $sql->execute();
	
	//Test si un user a été trouvé
    if($sql->rowCount()==1)
    {
		$resultat=$sql->fetch();
		//On vérifie qu'il est bien connecté
		if($resultat['token']==$_POST["token"])
		{
			//On récupère l'id de l'ami que l'on souhaite ajouter
			$sql=$pdo->prepare('select id from utilisateur where login= ?');
			$sql->bindValue(1, $_POST['loginAmi'], PDO::PARAM_STR);
			$sql->execute();
			
			//S'il existe
			if($sql->rowCount()==1)
			{
				$resultat=$sql->fetch();
				$idLoginAmi=$resultat['id'];
				
				//On récupère l'id de l'utilisateur
				$sql=$pdo->prepare('select id from utilisateur where login= ?');
				$sql->bindValue(1, $_POST['login'], PDO::PARAM_STR);
				$sql->execute();
				$resultat=$sql->fetch();
				$idLoginUtilisateur=$resultat['id'];
				
				//On insère la demande
				$sql=$pdo->prepare('insert into demandeami(id_user_emetteur, id_user_dest) values(?,?)');
				$sql->bindValue(1, $idLoginUtilisateur, PDO::PARAM_STR);
				$sql->bindValue(2, $idLoginAmi, PDO::PARAM_STR);
				$sql->execute();
				
				//On prévient le client que l'opération s'est bien déroulée
				echo '{"codeExec"=0}';
			}
			else
			{
				//On prévient le client que l'utilisateur n'existe pas
				echo '{"codeExec"=1}';
			}
		}
	}
?>