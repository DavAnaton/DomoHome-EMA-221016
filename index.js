var express = require('express'),
app = express(),
_PORT_ = process.env.PORT || 8080,
capteurs = [];

//Capteurs initiaux
capteurs.push({id:0, name: "Salon", commande: 20, temp: 18, favori: true});
capteurs.push({id:1, name: "Chambre1", commande: 30, temp: 21, favori: true});
capteurs.push({id:2, name: "Chambre2", commande: 30, temp: 21, favori: false});
capteurs.push({id:3, name: "Chambre3", commande: 30, temp: 21, favori: false});
var id = 4;

// Ajout de headers pour autoriser l'accès à l'API par une application externe
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
	next();
});


// Méthode GET sur la racine du site; renvoie tous les capteurs
app.get('/', function(req, res){
	// Recalcule les températures (voir la fonction définie en bas de page)
	updateTemperatures();
	// Envoie de l'objet contenant tous les capteurs
	res.end(JSON.stringify(capteurs));
});


// Méthode GET sur /capteur; renvoie le capteur dont l'id est passé en variable dans l'adresse
app.get('/capteur', function(req, res){

	updateTemperatures();

	var statusCode = 404; // Code de retour pour savoir si le capteur a été trouvé

	var retour = null;

	for(var i = 0; i< capteurs.length; i++){
		// On compare chaque id avec celui contenu dans la query de la requète (http://localhost:8080?capteurId=1)
		// On utilise alors req.query.capteurId
		if(req.query.capteurId == capteurs[i].id){
			retour = capteurs[i];
			statusCode = 200;
		}
	}

	res.writeHead(statusCode);
	res.end(JSON.stringify(retour));
});


// Renvoie les favoris
app.get('/favoris', function(req, res){
	var favoris = [];
	updateTemperatures();

	for(var i = 0; i< capteurs.length; i++){
		if(capteurs[i].favori){
			favoris.push(capteurs[i]);
		}
	}
	res.end(JSON.stringify(favoris));
});


// Change la commande de température
app.get('/setCommande', function(req, res){
	var statusCode = 404;
	for(var i = 0; i< capteurs.length; i++){
		if(req.query.capteurId == capteurs[i].id){
			capteurs[i].commande = parseInt(req.query.commande);
			statusCode = 200;
		}
	}
	res.writeHead(statusCode);
	res.end();
});


// Change le nom
app.get('/setName', function(req, res){
	var statusCode = 404;
	for(var i = 0; i< capteurs.length; i++){
		if(req.query.capteurId == capteurs[i].id){
			capteurs[i].name = req.query.name;
			statusCode = 200;
		}
	}
	res.writeHead(statusCode);
	res.end();
});


// Marque en tant que favori
app.get('/setFavori', function(req, res){
	var statusCode = 404;
	for(var i = 0; i< capteurs.length; i++){
		if(req.query.capteurId == capteurs[i].id){
			capteurs[i].favori = (req.query.favori=="true");
			statusCode = 200;
		}
	}
	res.writeHead(statusCode);
	res.end();
});


// Supprime le capteur
app.get('/remove', function(req, res){
	var statusCode = 404;
	for(var i = 0; i< capteurs.length; i++){
		if(req.query.capteurId == capteurs[i].id){
			capteurs.splice(i, 1);
			statusCode = 200;
		}
	}
	res.writeHead(statusCode);
	res.end();
});


// Ajoute un capteur dont le nom est passé en paramètre
app.get('/addCapteur', function(req, res){
	capteurs.push({id: id, name: req.query.name, commande: 20, temp: 18, favori: false});
	id++;
})


_PORT_ = _PORT_ || 8080; // Définition en haut ou 8080 si non défini

// Fait tourner l'application sur le port défini ci-dessus
app.listen(_PORT_);

// Affiche l'ip locale et le port dans l'invite de commande qui fait tourner le serveur
console.log("\n\nRunning on : ");
var interfaces = require('os').networkInterfaces();
for(var interface in interfaces){
	for(var i = 0; i<interfaces[interface].length; i++){
		if(interfaces[interface][i].family.toLowerCase() == "ipv4"){
			console.log("__________\n" + interface + ":\n" + interfaces[interface][i].address + ":" + _PORT_)
		}
	}
}
console.log("\n\n");
// Fin d'affichage

// Met à jour toutes les températures
var updateTemperatures = function(){
	for(var i = 0; i< capteurs.length; i++){
		capteurs[i].temp = Math.round((capteurs[i].temp + (capteurs[i].commande - capteurs[i].temp) / 2)*10)/10;
		if(capteurs[i].commande==capteurs[i].temp-0.1) {capteurs[i].temp = capteurs[i].commande}; //Fix for descending temperatures
	}
}