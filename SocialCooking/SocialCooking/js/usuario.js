window.onload = load;
var usuario = new Object();
var datosUsuario;
usuario =
    {
        'Nombre': "",
        'Correo': "",
        'img': "",
        'IdTipoUsu': "",
        'Id_Usuario': ""
    };
function load() {
    console.log("Se ha cargado la pagina " + window.location);
}
function capitalizarPrimeraLetra(string) {

    return string.charAt(0).toUpperCase() + string.slice(1);
}
function cargarUsuario() {
        
    var parametros = obtenerURL();
    var id = parametros['id'];
    var correo = parametros['user'];
    $.getJSON('/api/Usuario?correo=' + correo + "&confirmacion=" + true, function (data) {
        document.getElementById("nombreUsuario").innerHTML = capitalizarPrimeraLetra(data.Nombre);
        document.getElementById("imagenUsuario").src = data.img;
    });
    

}
function onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
    usuario =
        {
            'Nombre': profile.getName(),
            'Correo': profile.getEmail(),
            'img': profile.getImageUrl()
        }
 
    localStorage.setItem("CorreoUsuario", profile.getEmail());
    localStorage.setItem("imgUsuario", profile.getImageUrl());
    verificarTipoUsu(profile.getEmail());
}
function signOut() {
    //GoogleAuth.signOut();
    window.location = "index.html";
}
function verificarTipoUsu(correo) {

    var tipousu

    $.getJSON('/api/Usuario?correo=' + correo, function (data) {
        console.log("es lo que recoge en verificar tipo usuario =" + data.correo)
        tipousu = data;
        enviarAPerfil(tipousu);

    });

}
function enviarAPerfil(tipousuario) {

    switch (tipousuario) {

        case 0:
            $.ajax({
                url: "/api/Usuario",
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify(usuario),
                success: function (usuario) {
                    window.location = "feedUsuario.html?user=" + usuario.Correo;
                   
                },
                error: function (request, message, error) {
                    handleException(request, message, error);
                }
            });
            break;
        case 4:
            window.location = "moderador.html?user=" + usuario.Correo;
            break;
        case 5:
            window.location = "feedUsuario.html?user=" + usuario.Correo;
            break;
        default:
            console.log('Lo lamentamos, no se puede ingresar a la plataforma');
    }


}
function obtenerURL() {
    // capturamos la url
    var loc = document.location.href;
    // si existe el interrogante
    if (loc.indexOf('?') > 0) {
        // cogemos la parte de la url que hay despues del interrogante
        var getString = loc.split('?')[1];
        // obtenemos un array con cada clave=valor
        var GET = getString.split('&');
        var get = {};
        // recorremos todo el array de valores
        for (var i = 0, l = GET.length; i < l; i++) {
            var tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
        }
        return get;
    }

}

