﻿window.onload = console.log("hola");

function onSignIn(googleUser) {

    console.log("hasta");
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    //var id_token = googleUser.getAuthResponse().id_token;
    //console.log("ID Token: " + id_token);
    verificarTipoUsu(profile.getEmail);
}

function verificarTipoUsu(correo) {
    var tipousu
    $.getJSON('/api/User?correo=' + correo, function (data) {
        console.log("es lo que recoge=" + data)
        tipousu = data;
        enviarAPerfil(tipousu);
       
    });
   
        
        
   
}

function enviarAPerfil(tipousuario) {
    console.log("ese recibio=" + tipousuario);
    
    if (tipousuario == 4) {
        window.location = "moderador.html";
    }
    if (tipousuario == 5) {
        window.location = "index2.html";
    }
    
}

