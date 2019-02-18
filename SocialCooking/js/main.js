function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    alert("funciona");
    /*console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  */
    //conectarse a la base de datos y consultar si el correo ya se encuentra en el BD
    // if(profile.getEmail==User.correo)   

    //si es usuario normal, entrara a la pagina de usuario normal

    //si es moderador, entrara al perfil moderador


    //si no esta registrado se registrara automaticamente como usuario normal



}