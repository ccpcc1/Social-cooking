var usuario = new Object();

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

    verificarTipoUsu(profile.getEmail());
}

//Funcion para verificar que tipo de usuario es 
function verificarTipoUsu(correo) {
    var tipousu
    $.getJSON('/api/Usuario?correo=' + correo, function (data) {
        console.log("es lo que recoge=" + data)
        tipousu = data;
        enviarAPerfil(tipousu);

    });

}

function enviarAPerfil(tipousuario) {
    console.log("ese recibio =" + tipousuario);

    switch (tipousuario) {
        case 0:
            $.ajax({
                url: "/api/Usuario",
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify(usuario),
                success: function (usuario) {
                    window.location = "index2.html?user=" + usuario.Correo;

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
            window.location = "index2.html?user=" + usuario.Correo;
            break;
        default:
            console.log('Lo lamentamos, no se puede ingresar a la plataforma');
    }


}
