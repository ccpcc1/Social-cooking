var RecetasConsultadas = [];
var numPaginas = 0;
var numRecetas = 0;
var contador;
window.onload = load;
function load() {
    var parametros = obtenerURL();
    var correo = parametros['user'];
    cargarUsuario(correo);
    obtenerRecetasModerador();
 
}

function obtenerRecetasModerador() {

    //Cargando...
    var dialog = bootbox.dialog({
        message: '<p class="text-center mb-0"><i class="fas fa-sync fa-spin px-3"></i>Espera mientras cargamos la recetas...</p>',
        closeButton: false
    });

    $.getJSON('/api/reportar', function (data) {
        var RecetaReview = new Object();

        $.each(data, function (recetaobtenidas, recActual) {

            RecetaReview =
                {
                    'Id_receta': recActual.Id_receta,
                    'Descripcion': recActual.Descripcion,
                    'Idioma': recActual.Idioma,
                    'Nombre': recActual.Nombre,
                    'imagen': recActual.imagen,
                    'Categoria': recActual.Categoria,
                    'puntuacion': recActual.puntuacion,
                    'fechaPublicacion': recActual.fechaPublicacion,
                    'tiempoPreparacion': recActual.tiempoPreparacion,
                    'porciones': recActual.porciones
                }
            RecetasConsultadas.push(RecetaReview);

        });

        var pages = Math.ceil((numRecetas / 3));

        //Paginacion
        $('#pagination-container').pagination({
            dataSource: RecetasConsultadas,
            pageSize: 3,
            pageNumber: 1,
            callback: function (data, pagination) {

                document.getElementById('data-container').innerHTML = "";   
                
                for (var i = 0; i < 3; i++) {

                    $("#data-container").append("\
                           <div class= 'card  animated slideInRight'>\
                          <img class='card-img-top' src='"+ data[i].imagen + "' alt='Card image cap'>\
                              <div class='card-body'>\
                                  <h5 class='card-title'>"+ data[i].Nombre + "</h5>\
                                  <p class='card-text'>"+ data[i].Descripcion + "</p>\
                                  <h6>Categoria</h6>\
                                  <p class='card-text'>"+ data[i].Categoria + "</p>\
                               <ul class='list-group'>\
                                  <li class='list-group-item list-group-item-warning d-flex justify-content-between align-items-center'><i class='fas fa-stopwatch'></i>\
                                      Tiempo de preparacion\
                                      <span class='badge badge-primary badge-pill'>"+ data[i].tiempoPreparacion + "</span>\
                                  </li>\
                                  <li class='list-group-item list-group-item-warning d-flex justify-content-between align-items-center'><i class='fas fa-globe-americas'></i>\
                                     Idioma\
                                      <span class='badge badge-primary badge-pill'>"+ data[i].Idioma + "</span>\
                                  </li>\
                               <li class='list-group-item list-group-item-warning d-flex justify-content-between align-items-center'><i class='fas fa-star-half-alt'></i>\
                                     Puntuacion\
                                      <span class='badge badge-primary badge-pill'>"+ data[i].puntuacion + "</span>\
                                  </li>\
                               <li class='list-group-item list-group-item-warning d-flex justify-content-between align-items-center'><i class='fas fa-users'></i>\
                                     No. porciones\
                                      <span class='badge badge-primary badge-pill'>"+ data[i].porciones + "</span>\
                                  </li>\
                               </ul>\
                              </div>\
                              <div class='card-footer'>\
                                  <small class='text-muted'><i class='fas fa-calendar-alt'></i>Fecha "+ data[i].fechaPublicacion + "</small>\
                                  <br />\
                              </div>\
                                  <button onclick='ampliarReceta("+ data[i].Id_receta + ")' type='button' class='btn btn-primary'>Ver mas</button>\
                                  <br />\
                              </div>\
                          ");
                }

             }
        });

        dialog.modal('hide');
    });

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

function cargarUsuario(correo) {

    $.getJSON('/api/Usuario?correo=' + correo + "&confirmacion=" + true, function (data) {
        document.getElementById("nombreUsuario").innerHTML = capitalizarPrimeraLetra(data.Nombre);
        document.getElementById("imagenUsuario").src = data.img;
    });
}