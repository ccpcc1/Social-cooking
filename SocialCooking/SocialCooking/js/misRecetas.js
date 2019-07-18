var parametro;
var correoUsuario;;
var RecetasConsultadas = [];

window.onload = load;

function load() {

    var parametros = obtenerURL();
    id = parametros['id'];
    var correo = parametros['user'];
    cargarUsuario(correo);
    obtenerRecetasPorUsuario(correo);
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

function obtenerRecetasPorUsuario(correo) {

    //Cargando...
    var dialog = bootbox.dialog({
        message: '<p class="text-center mb-0"><i class="fas fa-sync fa-spin px-3"></i>Espera mientras cargamos tus recetas...</p>',
        closeButton: false
    });

    $.getJSON('/api/misRecetas?correo=' + correo, function (data) {
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

  
        var pages = Math.ceil((RecetasConsultadas.length / 3));

        //Paginacion
        $('#pagination-container').pagination({
            dataSource: RecetasConsultadas,
            pageSize: 3,
            pageNumber: 1,
            callback: function (data, pagination) {

                document.getElementById('data-container').innerHTML = "";

                var capacidad = pages * 3;
                var UltimosRegistros = (capacidad - RecetasConsultadas.length);
                console.log(pagination);
                console.log(data);
                console.log('Cantidad de paginas ' + pages);
                console.log('Pagina actual ' + pagination.pageNumber);


                if (pagination.pageNumber == pages) {


                    for (var i = 0; i < UltimosRegistros-1; i++) {

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
                                  <button onclick='ampliarReceta("+ data[i].Id_receta + ")' type='button' class='btn btn-primary''>Ver mas</button>\
                                  <button onclick='editarReceta("+ data[i].Id_receta + ")' type='button' class='btn btn-warning'>Editar</button>\
                                  <button onclick='eliminarReceta("+ data[i].Id_receta + ")' type='button' class='btn btn-danger''>Eliminar</button>\
                                  <br />\
                              </div>\
                          ");
                    }


                } else {

                    for (var i = 0; i < 3; i++) {

                        $("#data-container").append("\
                           <div class= 'card card text-white bg-dark mb-3  animated  slideInRight'>\
                          <img class='card-img-top' src='"+ data[i].imagen + "' alt='Card image cap'>\
                              <div class='card-body'>\
                                  <h5 class='card-title'>"+ data[i].Nombre + "</h5>\
                                  <p class='card-text'>"+ data[i].Descripcion + "</p>\
                                  <h6>Categoria</h6>\
                                  <p class='card-text'>"+ data[i].Categoria + "</p>\
                               <ul class='list-group text-light'>\
                                  <li class='list-group-item list-group-item-dark d-flex justify-content-between align-items-center'><i class='fas fa-stopwatch'></i>\
                                      Tiempo de preparacion\
                                      <span class='badge badge-primary badge-pill'>"+ data[i].tiempoPreparacion + "</span>\
                                  </li>\
                                  <li class='list-group-item list-group-item-dark d-flex justify-content-between align-items-center'><i class='fas fa-globe-americas'></i>\
                                     Idioma\
                                      <span class='badge badge-primary badge-pill'>"+ data[i].Idioma + "</span>\
                                  </li>\
                               <li class='list-group-item list-group-item-dark d-flex justify-content-between align-items-center'><i class='fas fa-star-half-alt'></i>\
                                     Puntuacion\
                                      <span class='badge badge-primary badge-pill'>"+ data[i].puntuacion + "</span>\
                                  </li>\
                               <li class='list-group-item list-group-item-dark d-flex justify-content-between align-items-center'><i class='fas fa-users'></i>\
                                     No. porciones\
                                      <span class='badge badge-primary badge-pill'>"+ data[i].porciones + "</span>\
                                  </li>\
                               </ul>\
                              </div>\
                              <div class='card-footer'>\
                                  <small class='text-light'><i class='fas fa-calendar-alt'></i>Fecha "+ data[i].fechaPublicacion + "</small>\
                                  <br />\
                               </div>\
                               <div class='btn-group py-2 px-3'>\
                                   <button onclick='ampliarReceta("+ data[i].Id_receta + ")' type='button' class='btn btn-primary'><i class='fas fa-info-circle'></i></button>\
                                   <button onclick='editarReceta("+ data[i].Id_receta + ")' type='button' class='btn btn-warning'><i class='far fa-edit'></i></button>\
                                   <button onclick='eliminarReceta("+ data[i].Id_receta + ")' type='button' class='btn btn-danger'> <i class='far fa-trash-alt'></i></button >\
                               </div>\
                                  <br/>\
                              </div>\
                          ");
                    }
                }
             

            }
        });
        dialog.modal('hide');
    });

}

function eliminarReceta(idReceta) {

    //Usando bootbox para confirmar la eliminacion

    bootbox.confirm({
        message: "¿Esta seguro de eliminar la receta?",
        buttons: {
            confirm: {
                label: 'Si, estoy seguro',
                className: 'btn-success'
            },
            cancel: {
                label: 'No, no lo estoy',
                className: 'btn-danger'
            }
        },
        callback: function (result) {

            //Si presionamos si se elimina la receta
            if (result === true) {

                var dialog;

                $.ajax({
                    url: '/api/receta/' + idReceta,
                    type: 'DELETE',
                    success: function (data) {

                        obtenerRecetasPorUsuario(correoUsuario);
                       
                    },
                    error: function (request, message, error) {
                        handleException(request, message, error);
                    }
                });

              
            }
        }
    });

   

}

function ampliarReceta(idReceta) {

    var correo = localStorage.getItem("CorreoUsuario");
    window.location = "detalleReceta.html?user=" + correo+"&id="+ idReceta;
}

function editarReceta(idReceta) {

    var correo = localStorage.getItem("CorreoUsuario");
    window.location = "editarReceta.html?user=" + correo + "&id=" + idReceta;
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

