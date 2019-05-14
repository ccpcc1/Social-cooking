var parametro;
var correoUsuario;;
var RecetasConsultadas = [];

window.onload = load;

function load() {

    document.getElementById('misRecetas').setAttribute('href', "misRecetas.html?user=" + localStorage.getItem("CorreoUsuario"));
    document.getElementById('compartirReceta').setAttribute('href', "compartirReceta.html?user=" + localStorage.getItem("CorreoUsuario"));
    parametro = window.location.search.substr('?').split('=');
    correoUsuario = parametro[1];
    cargarUsuario();
    obtenerRecetasPorUsuario(correoUsuario);
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
                           <div class= 'card  animated zoomIn'>\
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
                                  <button onclick='ampliarReceta("+ data[i].Id_receta + ")' type='button' class='btn btn-warning'>Editar</button>\
                                  <button onclick='eliminarReceta("+ data[i].Id_receta + ")' type='button' class='btn btn-danger''>Eliminar</button>\
                                  <br />\
                              </div>\
                          ");
                    }


                } else {

                    for (var i = 0; i < 3; i++) {

                        $("#data-container").append("\
                           <div class= 'card card text-white bg-dark mb-3  animated zoomIn'>\
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
                                   <button onclick='ampliarReceta("+ data[i].Id_receta + ")' type='button' class='btn btn-warning'><i class='far fa-edit'></i></button>\
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

