angular.module('starter.controllers', [])


//Controleur utilisé dans la page favoris
.controller('FavorisCtrl', function($scope, Capteurs) {

    //Exécuté à l'arrivée sur la vue
    $scope.$on('$ionicView.enter', function(e) {
        updateData();
    });

    //Fonction appelée au scroll
    $scope.doRefresh = function(){
        updateData();
        $scope.$broadcast('scroll.refreshComplete');
    };

    //Recharger toutes les valeurs
    function updateData(){
        Capteurs.getFavoris(function(favorisRecus){
            $scope.favoris = favorisRecus;
        });
    };
})

//Controleur pour la liste complète de capteurs
.controller('CapteursListCtrl', function($scope, Capteurs, $ionicPopup) {

    $scope.$on('$ionicView.enter', function(e) {
        updateData();
    });

    $scope.doRefresh = function(){
        updateData();
        $scope.$broadcast('scroll.refreshComplete');
    };

    //Fonction appelée au clic sur le bouton dans la barre de navigation 
    $scope.ajouterCapteur = function(){
        Capteurs.addCapteur('Nouveau Capteur', function(){
            updateData();
        });
    }

    //Fonction appelée au slide vers la gauche
    $scope.remove = function(capteur) {
        Capteurs.remove(capteur, function(){
            updateData();
        });
    };

    function updateData(){
        Capteurs.getAll(function(capteursRecus){
            $scope.capteurs = capteursRecus;
        });
    }
})

//Controleur utilisé pour afficher le détail d'un capteur
.controller('CapteurDetailCtrl', function($scope, $stateParams, Capteurs) {

    $scope.$on('$ionicView.enter', function(e) {
        updateData();
    });

    //Augmente la commande température
    $scope.incrementCommande = function(){
        $scope.capteur.commande += 0.5;
        Capteurs.updateCommande($scope.capteur.id, $scope.capteur.commande);
    }

    //Diminue la commande température
    $scope.decrementCommande = function(){
        $scope.capteur.commande -= 0.5;
        Capteurs.updateCommande($scope.capteur.id, $scope.capteur.commande);
    }

    //Supprime le capteur
    $scope.removeCapteur = function(){
        Capteurs.remove($scope.capteur.id);
    }

    //Changer le statut favori ou non
    $scope.setFavori = function(){
        Capteurs.setFavori($scope.capteur.id, $scope.capteur.favori);
    }

    //Changer de nom
    $scope.setName = function(){
        Capteurs.setName($scope.capteur.id, $scope.capteur.name);
    }

    function updateData(){
        Capteurs.get($stateParams.capteurId, function(result){
            $scope.capteur = result;
        });
    }
})

//Controleur utilisé pour les paramètres
.controller('AccountCtrl', function($rootScope, $scope) {
    $rootScope.apiAddress = '127.0.0.1:8080';

    $scope.updateAPI = function(){
        $rootScope.apiAddress = this.apiAddress;
    }
});
