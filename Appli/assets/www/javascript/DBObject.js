var db=null;

function createDB(){
	db = window.openDatabase("baseRoads", "2.0", "Roads DB", 1000000);
	db.transaction(function(tx){
		/*tx.executeSql("drop table demandeAmi");
		tx.executeSql("drop table ami");
		tx.executeSql("drop table utilisateur");
		tx.executeSql("drop table groupe");*/
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
				"groupe integer not null default 0 constraint FKami_groupeANDgroupe_id references groupe(id) on delete set null," +
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
				"message varchar(20) not null default '')"
		);
		db.transaction(function(tx){
			tx.executeSql("insert or ignore into groupe(id, nom) values(?, ?)", [0, "Nouveaux amis"]);
		}, errorSql);
		//deleteAmis();
		//deleteDemandesAmis();
		insertGroupe("Groupe 1");
		insertGroupe("Groupe 2");
		insertAmi("Toule", "Poule", "Poule", "poule@poule.fr", "0405040504", 46.391094, -0.421225);
		insertAmi("Tiule", "Pyule", "Pyule", "pyule@pyule.fr", "0546548752", 46.582665, 0.334594);
		insertDemandeAmi("Plouah", true);
		insertDemandeAmi("Pliuah", false);
	}, errorSql);
}

//NON CONFORME A LA VERSION FINALE
function insertAmi(login, nom, prenom, mail, telephone, latitude, longitude){
	db.transaction(function(tx){
		tx.executeSql("insert or ignore into ami(login, nom, prenom, mail, telephone, latitude, longitude) values(?, ?, ?, ?, ?, ?, ?)", [login, nom, prenom, mail, telephone, latitude, longitude]);
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

function selectDemandesAmis(code){

	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM demandeAmi order by id desc', [], function(tx, results){
			code(results);
		}, errorSql);
	}, errorSql);
}

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

function deleteAmis(){
	db.transaction(function(tx){
		tx.executeSql('delete FROM ami');
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

function updateAmiParGroup(idGroupe, visibilite){

	db.transaction(function(tx){
		tx.executeSql("update ami set vue=? where groupe=?", [visibilite, idGroupe]);
	}, errorSql);
}

function updateDemandeAmi(id, status){

	db.transaction(function(tx){
		tx.executeSql("update demandeAmi set status=? where id=?", [status, id]);
	}, errorSql);
}

function errorSql(error){
	alert("Error processing SQL ("+error.code+"): "+error.message);
}