var db=null;

function createDB(){
	db = window.openDatabase("baseRoads", "1.0", "Roads DB", 1000000);
	db.transaction(function(tx){
		tx.executeSql("create table if not exists ami (" +
				"id integer not null autoincrement constraint PKami primary_key," +
				"login varchar(20) not null contraint Uami_login unique," +
				"token varchar(36) not null," +
				"nom varchar(20) not null," +
				"prenom varchar(20) not null," +
				"latitude double(15, 12) null default null," +
				"longitude double(15, 12) null default null," +
				"groupe integer null default null contraint FKami_groupeANDgroupe_id foreign key groupe.id on delete set null," +
				"vue boolean not null default true)"
		);
		tx.executeSql("create table if not exists demandeAmi (" +
				"id integer not null autoincrement constraint PKdemandeAmi primary_key," +
				"login varchar(20) not null constraint UdemandeAmi_login unique," +
				"status varchar(20) not null default 'En cours' constraint CHKdemandeAmi_status ('En cours', 'Accepté', 'Refusé')," +
				"isUserEmetteur boolean not null)"
		);
		tx.executeSql("create table if not exists utilisateur (" +
				"id integer not null autoincrement constraint PKutilisateur primary_key," +
				"login varchar(20) not null constraint Uutilisateur_login unique," +
				"message varchar(20) not null default '')"
		);
		tx.executeSql("create table if not exists groupe (" +
				"id integer not null autoincrement constraint PKgroupe primary_key," +
				"nom varchar(20) not null constraint Ugroupe_login unique," +
				"vue boolean not null default true)"
		);
	}, errorSql);
}

function insertGroupe(nom, vue){
	db.transaction(function(tx){
		tx.executeSql("insert into groupe values(?, ?)", [login, token]);
	}, errorSql);
}

function selectAuth(){

	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM auth', [], function(tx, results){
			if (results.rows.length != 0)
			{
				//$("form > textarea").append(results.rows.item(0).token);
				return results.rows.item(0).login;
			}
		}, errorSql);
	}, errorSql);
}

function delGroupe(id){
	db.transaction(function(tx){
		tx.executeSql('delete FROM message where id=?', [id]);
	}, errorSql);
}

function majGroupe(id, nom, vue){

	db.transaction(function(tx){
		db.transaction(function(tx){
			tx.executeSql("update groupe set nom=?, vue=? where id=?", [nom, vue, id]);
		}, errorSql);
	}, errorSql);
}

function errorSql(error){
	alert("Error processing SQL: "+error.code);
}