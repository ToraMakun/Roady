<?php
	session_start();
	
    $dsn='mysql:dbname=roads;host=localhost';
    $user='RoadsServer';
    $mdp='Poule#669';
    $pdo=new PDO($dsn, $user, $mdp);
    $codeExec=null;
	
	//Récupération de l'utilisateur
    $sql=$pdo->prepare('select mdp, nb_essai, date_ban, token from utilisateur where login= ?');
    $sql->bindValue(1, $_POST['login'], PDO::PARAM_STR);
    $sql->execute();
        
    //Test si un user a été trouvé
    if($sql->rowCount()==1)
    {
		$resultat=$sql->fetch();
		
		//Test si déjà connecté et vérifie si toujours en cours
		/*if(isset($_POST["token"]))
		{
			$finConnect=date_timestamp_get(date_add(new DateTime($resultat['date_connect']), new DateInterval('PT20M')));
			if($_POST["token"]!="NULL" && $_POST["token"]===$resultat["token"] && $finConnect>time())
			{
				$token=$_POST["token"];
				$codeExec=0;
			}
			else
			{
				$sql=$pdo->prepare('update utilisateur set token=NULL, date_connect=NULL where login= ?');
                $sql->bindValue(1, $_POST['login'], PDO::PARAM_STR);
                $sql->execute();
				$codeExec=3;
			}
		}
        else
		{*/
			$salt=substr($resultat['mdp'], 5, 4);
			$mdpInHash=substr(md5($_POST['mdp'].$salt), 0, 5).$salt.substr(md5($_POST['mdp'].$salt), 5);
			
			//Si date de ban, on vérifie si le bannissement est toujours en cours
			//Sinon, on remet à 0
			if($resultat['date_ban']!=null)
			{
				$finBan=date_timestamp_get(date_add(new DateTime($resultat['date_ban']), new DateInterval('PT20M')));
				$now=(time()+7200);

				if($finBan<$now)
				{
					$sql=$pdo->prepare('update utilisateur set nb_essai=0, date_ban=NULL where login= ?');
					$sql->bindValue(1, $_POST['login'], PDO::PARAM_STR);
					$sql->execute();
					$sql=$pdo->prepare('select mdp, nb_essai, date_ban from utilisateur where login= ?');
					$sql->bindValue(1, $_POST['login'], PDO::PARAM_STR);
					$resultat=$sql->execute()->fetch();
				}
			}
			
			//Si non banni
			if($resultat['nb_essai']<3)
			{
				//Si bon mdp, remise à 0 nb essai
				//Sinon nb essai+=1
				if($mdpInHash==$resultat['mdp'])
				{	
					$token=md5(uniqid(rand(), true).'-'.$_POST['login'].'-'.$_POST['token']);
					$sql=$pdo->prepare('update utilisateur set nb_essai=0, token= ? where login= ?');
					$sql->bindValue(1, $token, PDO::PARAM_STR);
					$sql->bindValue(2, $_POST['login'], PDO::PARAM_STR);
					$sql->execute();
					$codeExec=0;
				}
				else
				{
					if($resultat['nb_essai']==2)	//Si le nombre d'essai passe à 3, on ajoute le bannissement
					{
						$sql=$pdo->prepare('update utilisateur set nb_essai=nb_essai+1, date_ban=now() where login= ?');
						$sql->bindValue(1, $_POST['login'], PDO::PARAM_STR);
						$sql->execute();
					}
					else
					{
						$sql=$pdo->prepare('update utilisateur set nb_essai=nb_essai+1 where login= ?');
						$sql->bindValue(1, $_POST['login'], PDO::PARAM_STR);
						$sql->execute();
					}
					//Erreur de mdp
					$codeExec=1;
				}
			}
			else
			{
				//Compte banni
				$codeExec=2;
			}
		//}
	}
	else
	{
		//Erreur de compte
		$codeExec=1;
	}
	
	
	$reponse=null;
	switch ($codeExec)
	{
		case 0: $reponse='{ "code":0, "token":"'.$token.'" }';
				break;
		case 1: $reponse='{ "code":1 }';
				break;
		case 2: $reponse='{ "code":2 }';
				break;
		case 3: $reponse='{ "code":3 }'; 
				break;
	}
	echo $reponse;
?>