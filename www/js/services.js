angular.module('starter.services', [])

.factory('Capteurs', function($http, $rootScope) {
    if(!$rootScope.apiAddress) $rootScope.apiAddress = "127.0.0.1:8080";

    return {
        getFavoris: function(callback){
            $http.get("http://" + $rootScope.apiAddress + "/favoris").then(function(response){
                callback(response.data);
            })
        },
        getAll: function(callback){
            $http.get("http://" + $rootScope.apiAddress + "/").then(function(response){
                callback(response.data);
            })
        },
        remove: function(capteurId, callback) {
            $http.get("http://" + $rootScope.apiAddress + "/remove?capteurId="+capteurId);
            callback();
        },
        get: function(capteurId, callback) {
            $http.get("http://" + $rootScope.apiAddress + "/capteur?capteurId="+capteurId).then(function(response){
                callback(response.data);
            })
        }, 
        setName: function(capteurId, name, callback) {
            $http.get("http://" + $rootScope.apiAddress + "/setName?name="+name+"&capteurId="+capteurId);
        }, 
        setFavori: function(capteurId, favori, callback) {
            $http.get("http://" + $rootScope.apiAddress + "/setFavori?favori="+favori+"&capteurId="+capteurId);
        }, 
        updateCommande: function(capteurId, commande, callback) {
            $http.get("http://" + $rootScope.apiAddress + "/setCommande?commande="+commande+"&capteurId="+capteurId);
        }, 
        addCapteur: function(name, callback){
            $http.get("http://" + $rootScope.apiAddress + "/addCapteur?name="+name);
            callback();
        }
    };
});
