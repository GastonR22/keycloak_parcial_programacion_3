const session = require('express-session');
const keycloak = require('keycloak-connect');

let _keycloak;

var keycloakConfig = {
    clientId: 'nodejs-microservice',
    bearerOnly: true,
    serverUrl: 'http://localhost:8080/auth',
    realm:'Demo-Realm',
    credentials: {
        secret: '0f0481ea-fafe-4c9e-b074-cf4af75708c6'
    }

};

function initKeycloak(){
    if(_keycloak){
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    }
    else {
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        _keycloak = new keycloak({ store: memoryStore}, keycloakConfig);
        return _keycloak;
    }   
}

function getKeycloak(){
    if(!_keycloak){
        console.error('Keyclaok has not been intialized. Please called initi first.');
    }
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};