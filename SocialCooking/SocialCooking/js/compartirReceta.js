window.onload = function () {
    var parametros = obtenerURL();
    var id = parametros['id'];
    var correo = parametros['user'];
    cargarUsuario(correo);
};

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

function cargarUsuario(correo) {

    $.getJSON('/api/Usuario?correo=' + correo + "&confirmacion=" + true, function (data) {
        document.getElementById("nombreUsuario").innerHTML = data.Nombre;
        document.getElementById("imagenUsuario").src = data.img;
        //Links
        document.getElementById('feedRecetas').setAttribute('href', "feedUsuario.html?user=" + data.Correo);
        document.getElementById('compartirReceta').setAttribute('href', "compartirReceta.html?user=" + data.Correo);
        document.getElementById('misRecetas').setAttribute('href', "misRecetas.html?user=" + data.Correo);
    });
}