<?php
    $dsn='mysql:dbname=roads;host=localhost';
    $user='RoadsServer';
    $mdp='Poule#669';
    $pdo=new PDO($dsn, $user, $mdp);
    $codeExec=null;
	$nombre=0;
	$reponse='{ "nombre":0, "demandes":[';
	
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
			$sql=$pdo->prepare('select u1.login as loginEmet, u2.login as loginDest, status from utilisateur u1, utilisateur u2, demandeami da where u1.login=? AND u1.id=da.id_user_emetteur and u2.id=da.id_user_dest');
			$sql->bindValue(1, $_POST['login'], PDO::PARAM_STR);
			$sql->execute();
			$resultat = $sql->fetchAll();
			foreach ($resultat as $ligne) {
				$nombre+=1;
				$reponse.='{"loginEmet":"'.$ligne['loginEmet'].'", "loginDest":"'.$ligne['loginDest'].'", "status":"'.$ligne['status'].'"},';
			}
			$sql=$pdo->prepare('select u1.login as loginEmet, u2.login as loginDest, status from utilisateur u1, utilisateur u2, demandeami da where u2.login=? AND u2.id=da.id_user_dest and u1.id=da.id_user_emetteur');
			$sql->bindValue(1, $_POST['login'], PDO::PARAM_STR);
			$sql->execute();
			$resultat = $sql->fetchAll();
			foreach ($resultat as $ligne) {
				$nombre+=1;
				$reponse.='{"loginEmet":"'.$ligne['loginEmet'].'", "loginDest":"'.$ligne['loginDest'].'", "status":"'.$ligne['status'].'"},';
			}

			if($nombre!=0)
			{
				$reponse=str_replace("0", $nombre, $reponse);
				$reponse=substr($reponse, 0, -1);
				$reponse.=' ] }';
			}
			else
			{
				$reponse.=' ] }';
			}
			echo $reponse;
		}
	}
?>