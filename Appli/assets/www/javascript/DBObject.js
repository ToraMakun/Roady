var db=null;

function createDB(){
	db = window.openDatabase("baseRoads", "1.0", "Roads DB", 1000000);
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
				"latitude double(15, 12) null default null," +
				"longitude double(15, 12) null default null," +
				"groupe integer null default null constraint FKami_groupeANDgroupe_id references groupe(id) on delete set null," +
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
		delAmi();
		insertAmis("Toule", "Poule", "Poule", 46.391094, -0.421225);
		insertAmis("Tiule", "Pyule", "Pyule", 46.582665, 0.334594);
	}, errorSql);
}
/*
function insertGroupe(nom, vue){
	db.transaction(function(tx){
		tx.executeSql("insert into groupe values(?, ?)", [login, token]);
	}, errorSql);
}
*/
function insertAmis(login, nom, prenom, latitude, longitude){
	db.transaction(function(tx){
		tx.executeSql("insert or ignore into ami(login, nom, prenom, latitude, longitude) values(?, ?, ?, ?, ?)", [login, nom, prenom, latitude, longitude]);
	}, errorSql);
}

function insertdemandeAmi(login, isUserEmetteur){
	db.transaction(function(tx){
		tx.executeSql("insert or ignore into demandeAmi(login, isUserEmetteur) values(?, ?)", [login, isUserEmetteur]);
	}, errorSql);
}
/*
function selectGroupes(){

	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM groupe', [], function(tx, results){
			if (results.rows.length != 0)
			{
				//$("form > textarea").append(results.rows.item(0).token);
				return results.rows.item(0).login;
			}
		}, errorSql);
	}, errorSql);
}
*/
function selectAmis(code){

	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM ami', [], function(tx, results){
				code(results);
		}, errorSql);
	}, errorSql);
}

function amiExiste(unLogin){

	db.transaction(function(tx){
		tx.executeSql('SELECT login FROM ami where login=?', [unLogin], function(tx, results){
				if(results.row.length==0)
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
				if(results.row.length==0)
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

function delAmi(id){
	db.transaction(function(tx){
		tx.executeSql('delete FROM ami');
	}, errorSql);
}
/*
function majGroupe(id, nom, vue){

	db.transaction(function(tx){
		db.transaction(function(tx){
			tx.executeSql("update groupe set nom=?, vue=? where id=?", [nom, vue, id]);
		}, errorSql);
	}, errorSql);
}
*/
function errorSql(error){
	alert("Error processing SQL ("+error.code+"): "+error.message);
}