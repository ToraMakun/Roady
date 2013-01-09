<?php
	header("Content-Type: text/plain");
	$dsn='mysql:dbname=roads;host=localhost';
    $user='RoadsServer';
    $mdp='Poule#669';
    $pdo=new PDO($dsn, $user, $mdp);
    $codeExec=null;
	
	//Récupération des infos envoyés depuis le formulaire
	$login=htmlentities($_POST['login']);
	$mdp=htmlentities($_POST['mdp']);
	$prenom=htmlentities($_POST['prenom']);
	$nom=htmlentities($_POST['nom']);
	$mail=htmlentities($_POST['mail']);
	$telephone=htmlentities($_POST['telephone']);
	$codeExec=null;
	
	//On verifie que chaque champ est bien rempli
	if(empty($login) || empty($mdp) ||  empty($mail) || empty($prenom) || empty($nom) || empty($telephone) || preg_match('/^.*@.*\...$/', $mail)===0 ||  preg_match('/^0\d{9}$/', $telephone)===0)
	{
		$codeExec=1; //erreur formulaire
	}
	else
	{
		//Vérification si login existe
		$sql=$pdo->prepare('select login from utilisateur where login= ?');
		$sql->bindValue(1, $login, PDO::PARAM_STR);
		$sql->execute();
		
		//Test si un user a été trouvé
		if($sql->rowCount()==0)
		{
			//Hashage du mot de passe
			$salt=rand(0, 9).rand(0, 9).rand(0, 9).rand(0, 9);
			$mdpHash=substr(md5($mdp.$salt), 0, 5).$salt.substr(md5($mdp.$salt), 5);
			
			//Insertion dans la base
			$sql=$pdo->prepare('insert into utilisateur(login, mdp, nom, prenom, mail, telephone) values(?, ?, ?, ?, ?, ?)');
			$sql->bindValue(1, $login, PDO::PARAM_STR);
			$sql->bindValue(2, $mdpHash, PDO::PARAM_STR);
			$sql->bindValue(3, $prenom, PDO::PARAM_STR);
			$sql->bindValue(4, $nom, PDO::PARAM_STR);
			$sql->bindValue(5, $mail, PDO::PARAM_STR);
			$sql->bindValue(6, $telephone, PDO::PARAM_INT);
			$sql->execute();
			$codeExec=0;
		}
		else
		{
			$codeExec=2; //login déjà utilisé
		}
	}

	echo '{"codeExec":'.$codeExec.'}';
?>