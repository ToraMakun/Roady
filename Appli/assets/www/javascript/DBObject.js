var db=null;

// Fonction pour cr�er la BD
function createDB(){
	db = window.openDatabase("baseRoads", "2.0", "Roads DB", 1000000);
	db.transaction(function(tx){
		tx.executeSql("create table if not exists groupe (" +
				"id integer not null constraint PKgroupe primary key autoincrement," +
				"nom varchar(20) not null constraint Ugroupe_login unique," +
				"vue boolean not null default true)"
		);
		tx.executeSql("create table if not exists ami (" +
				"id integer constraint PKami primary key autoincrement," +
				"login varchar(20) not null constraint Uami_login unique," +
				"nom varchar(20) not null," +
				"prenom varchar(20) not null," +
				"mail varchar(40) not null," +
				"telephone varchar(10) not null," +
				"latitude double(15, 12) null default null," +
				"longitude double(15, 12) null default null," +
				"groupe integer not null default 0 constraint FKami_groupeANDgroupe_id references groupe(id) on delete set default," +
				"vue boolean not null default true)"
		);
		tx.executeSql("create table if not exists demandeAmi (" +
				"id integer not null constraint PKdemandeAmi primary key autoincrement," +
				"login varchar(20) not null constraint UdemandeAmi_login unique," +
				"status varchar(20) not null default 'En cours'," +
				"isUserEmetteur boolean not null)"
		);
		tx.executeSql("create table if not exists utilisateur (" +
				"id integer not null constraint PKutilisateur primary key autoincrement," +
				"login varchar(20) not null constraint Uutilisateur_login unique," +
				"token varchar(32) not null)"
		);
		db.transaction(function(tx){
			tx.executeSql("insert or ignore into groupe(id, nom) values(?, ?)", [0, "Nouveaux amis"]);
		}, errorSql);
		insertGroupe("Groupe 1");
		insertGroupe("Groupe 2");
	}, errorSql);
}

function insertAmi(login, nom, prenom, mail, telephone){
	db.transaction(function(tx){
		tx.executeSql("insert or ignore into ami(login, nom, prenom, mail, telephone) values(?, ?, ?, ?, ?)", [login, nom, prenom, mail, telephone]);
	}, errorSql);
}

function insertUtilisateur(login, token){
	db.transaction(function(tx){
		tx.executeSql("insert or ignore into utilisateur(login, token) values(?, ?)", [login, token]);
	}, errorSql);
}

function insertDemandeAmi(login, isUserEmetteur){
	db.transaction(function(tx){
		tx.executeSql("insert or ignore into demandeAmi(login, isUserEmetteur) values(?, ?)", [login, isUserEmetteur]);
	}, errorSql);
}

function insertGroupe(nom){
	db.transaction(function(tx){
		tx.executeSql("insert or ignore into groupe(nom) values(?)", [nom]);
	}, errorSql);
}

/////////////////////////////////////////////////////////////

function selectUtilisateur(code){

	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM utilisateur', [], function(tx, results){
				code(results);
		}, errorSql);
	}, errorSql);
}

function selectGroupes(code){

	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM groupe order by nom', [], function(tx, results){
				code(results);
		}, errorSql);
	}, errorSql);
}

function selectAmis(code){

	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM ami order by prenom', [], function(tx, results){
				code(results);
		}, errorSql);
	}, errorSql);
}

function selectAmiParId(id, code){

	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM ami where id=? order by prenom', [id], function(tx, results){
				code(results);
		}, errorSql);
	}, errorSql);
}

function selectAmisRecherche(recherche, code){

	db.transaction(function(tx){
		tx.executeSql("SELECT * FROM ami where prenom like '%"+recherche+"%' or nom like '%"+recherche+"%'", [], function(tx, results){
				code(results);
		}, errorSql);
	}, errorSql);
}

function selectDemandesAmis(code){

	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM demandeAmi order by id desc', [], function(tx, results){
			code(results);
		}, errorSql);
	}, errorSql);
}

function selectDemandeAmiParId(id, code){

	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM demandeAmi where id=?', [id], function(tx, results){
			code(results);
		}, errorSql);
	}, errorSql);
}

///////////////////////////////////////////////////////////////////

function amiExiste(unLogin){

	db.transaction(function(tx){
		tx.executeSql('SELECT login FROM ami where login=?', [unLogin], function(tx, results){
				if(results.rows.length==0)
				{
					return false;
				}
				else
				{
					return true;
				}
		}, errorSql);
	}, errorSql);
}

function demandeAmiExiste(unLogin){

	db.transaction(function(tx){
		tx.executeSql('SELECT login FROM demandeAmi where login=?', [unLogin], function(tx, results){
				if(results.rows.length==0)
				{
					return false;
				}
				else
				{
					return true;
				}
		}, errorSql);
	}, errorSql);
}

function groupeExiste(unNom){

	db.transaction(function(tx){
		tx.executeSql('SELECT nom FROM groupe where nom=?', [unNom], function(tx, results){
				if(results.rows.length==0)
				{
					return false;
				}
				else
				{
					return true;
				}
		}, errorSql);
	}, errorSql);
}

///////////////////////////////////////////////////////////////////

function deleteAmis(){
	db.transaction(function(tx){
		tx.executeSql('delete FROM ami');
	}, errorSql);
}

function deleteUtilisateur(){
	db.transaction(function(tx){
		tx.executeSql('delete FROM utilisateur');
	}, errorSql);
}

function deleteAmisParId(id){
	db.transaction(function(tx){
		tx.executeSql('delete FROM ami where id=?', [id]);
	}, errorSql);
}

function deleteDemandesAmis(){
	db.transaction(function(tx){
		tx.executeSql('delete FROM demandeAmi');
	}, errorSql);
}

function deleteGroupe(id){
	db.transaction(function(tx){
		tx.executeSql('delete FROM groupe where id=?', [id]);
	}, errorSql);
}

///////////////////////////////////////////////////////////////////

function updateGroupeVisibilite(id, visibilite){

	db.transaction(function(tx){
		tx.executeSql("update groupe set vue=? where id=?", [visibilite, id]);
	}, errorSql);
}

function updateGroupeNom(id, nom){

	db.transaction(function(tx){
		tx.executeSql("update groupe set nom=? where id=?", [nom, id]);
	}, errorSql);
}

function updateAmi(id, visibilite){

	db.transaction(function(tx){
		tx.executeSql("update ami set vue=? where id=?", [visibilite, id]);
	}, errorSql);
}

function updateAmiPosition(login, lat, long){

	db.transaction(function(tx){
		tx.executeSql("update ami set latitude=?, longitude=? where login=?", [lat, long, login]);
	}, errorSql);
}
function updateAmiParGroup(idGroupe, visibilite){

	db.transaction(function(tx){
		tx.executeSql("update ami set vue=? where groupe=?", [visibilite, idGroupe]);
	}, errorSql);
}

function updateAmiGroupe(idAmi, idGroupe){

	db.transaction(function(tx){
		tx.executeSql("update ami set groupe=? where id=?", [idGroupe, idAmi]);
	}, errorSql);
}

function updateAmiSupprGroupe(idGroupe){

	db.transaction(function(tx){
		tx.executeSql("update ami set groupe=0 where groupe=?", [idGroupe]);
	}, errorSql);
}

function updateDemandeAmi(id, status){

	db.transaction(function(tx){
		tx.executeSql("update demandeAmi set status=? where id=?", [status, id]);
	}, errorSql);
}

function updateDemandeAmiLogin(login, status){

	db.transaction(function(tx){
		tx.executeSql("update demandeAmi set status=? where login=?", [status, login]);
	}, errorSql);
}

///////////////////////////////////////////////////////////////////

function errorSql(error){
	alert("Error("+error.code+"): "+error.message);
}