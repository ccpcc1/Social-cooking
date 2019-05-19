window.onload = function () {
    var parametros = obtenerURL();
    var id = parametros['id'];
    var correo = parametros['user'];
    cargarUsuario(correo);
    cargarRecetaId(id);
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

function cargarRecetaId(idReceta) {

    

    $.getJSON('/api/receta?id=' + idReceta, function (data) {

        $('#nombreReceta').val(data.Nombre);
        $('#listaIdiomas').val(data.Idioma);
        $('#listaCategorias').val(data.Categoria);
        $('#porciones').val(data.porciones);
        $('#hrs').val(data.tiempoPreparacion);
        $('#descripcionReceta').val(data.Descripcion);
        $('#pasosReceta').val(data.PasoApaso);

        //Tiempo de preparacion
        var array = data.tiempoPreparacion.split(" ");
        $('#mnts').val(array[0]);
        $('#hrs').val(array[3]);

        //Pintar los ingredientes
        for (var i = 0; i < data.ingrediente.length; i++) {
            agregarCampos();
        }
        //Pintar las imagenes
        for (var j = 0; j < data.imagenes.length; j++) {
            $('#imagenesContainer').append("\
          <div class= 'col-md-4'>\
            <div class='thumbnail'>\
                <img src='"+ data.imagenes[j]+ "' alt='Lights' style='width:100%'>\
                   <div class='caption py-2'>\
                        <button type='button' class='btn btn-danger' id='btnCandelar' onclick=''>Eliminar</button>\
                   </div>\
            </div>\
          </div>\
        ");
        }

 


    });

}
function cargarUsuario(correo) {


    $.getJSON('/api/Usuario?correo=' + correo + "&confirmacion=" + true, function (data) {
        document.getElementById("nombreUsuario").innerHTML = capitalizarPrimeraLetra(data.Nombre);
        document.getElementById("imagenUsuario").src = data.img;
    });


}