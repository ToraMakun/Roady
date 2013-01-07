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
		if($resultat['token']==$_POST["token"])
		{
			$idUtilisateur;
			$idAmi;
			
			$sql=$pdo->prepare('select id from utilisateur where login= ?');
			$sql->bindValue(1, $_POST['login'], PDO::PARAM_STR);
			$sql->execute();
			$resultat=$sql->fetch();
			$idUtilisateur=$resultat['id'];
			
			$sql=$pdo->prepare('select id from utilisateur where login= ?');
			$sql->bindValue(1, $_POST['loginAmi'], PDO::PARAM_STR);
			$sql->execute();
			$resultat=$sql->fetch();
			$idAmi=$resultat['id'];
			
			$sql=$pdo->prepare('update demandeami set status=? where id_user_emetteur=? and id_user_dest=?');
			$sql->bindValue(1, $_POST['reponse'], PDO::PARAM_STR);
			$sql->bindValue(2, $idAmi, PDO::PARAM_INT);
			$sql->bindValue(3, $idUtilisateur, PDO::PARAM_INT);
			$sql->execute();

			if($_POST['reponse']=="Accept")
			{
				$sql=$pdo->prepare('select * from utilisateur where login= ?');
				$sql->bindValue(1, $_POST['loginAmi'], PDO::PARAM_STR);
				$sql->execute();
				$resultat=$sql->fetch();
			
				echo '{"codeExec":0, "login":"'.$resultat['login'].'", "nom":"'.$resultat['nom'].'", "prenom":"'.$resultat['prenom'].'", "mail":"'.$resultat['mail'].'", "telephone":"'.$resultat['telephone'].'"}';
			}
			else
			{
				echo '{"codeExec":0}';
			}
		}
	}
?>