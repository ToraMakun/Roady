<?php
    $dsn='mysql:dbname=roads;host=localhost';
    $user='RoadsServer';
    $mdp='Poule#669';
    $pdo=new PDO($dsn, $user, $mdp);
    $codeExec=null;
	$reponse="{ 'codeExec':0, 'amis':[";
	
	//Vérification connexion
	$sql=$pdo->prepare('select login, token from utilisateur where login= ?');
    $sql->bindValue(1, $_POST['login'], PDO::PARAM_STR);
    $sql->execute();
	
	//Test si un user a été trouvé
    if($sql->rowCount()==1)
    {
		$resultat=$sql->fetch();
		if($resultat['token']==$_POST("token"))
		{
			//On enregistre les coordonnées
			
			
			//On envoie les amis
			$sql=$pdo->prepare('select u2.login, u2.latitude, u2.longitude from utilisateur u1, utilisateur u2, ami a where u1.login=? and u1.id=a.id_user_emetteur and a.id_user_dest=u2.id and visibilite=true');
			$sql->bindValue(1, $_POST['login'], PDO::PARAM_STR);
			$sql->execute();
			$resultat = $sql->fetchAll();
			foreach ($resultat as $ligne) {
				$reponse.="{'login':'".$ligne['login']."', 'lat':'".$ligne['latitude']."', 'long':'".$ligne['longitude']."'}";
			}
			$sql=$pdo->prepare('select u2.login, u2.latitude, u2.longitude from utilisateur u1, utilisateur u2, ami a where u1.login=? and u1.id=a.id_user_dest and a.id_user_emetteur=u2.id and visibilite=true');
			$sql->bindValue(1, $_POST['login'], PDO::PARAM_STR);
			$sql->execute();
			$resultat = $sql->fetchAll();
			foreach ($resultat as $ligne) {
				$reponse.="{'login':'".$ligne['login']."', 'lat':'".$ligne['latitude']."', 'long':'".$ligne['longitude']."'}";
			}
			$reponse=substr($reponse, 0, -2);
			$reponse.=' ] }';
			
			echo $reponse;
		}
		else
		{
			//$codeExec=1; //PAs trouvé dans la base
			echo "{ 'codeExec':1 }";
		}
	}
	else
	{
		//$codeExec=1; //PAs trouvé dans la base
		echo "{ 'codeExec':1 }";
	}
?>