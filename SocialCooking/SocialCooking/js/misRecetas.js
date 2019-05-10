var parametro;
var correoUsuario;;
var RecetasConsultadas = [];

window.onload = load;

function load() {

    document.getElementById('misRecetas').setAttribute('href', "misRecetas.html?user=" + localStorage.getItem("CorreoUsuario"));
    document.getElementById('compartirReceta').setAttribute('href', "compartirReceta.html?user=" + localStorage.getItem("CorreoUsuario"));
    parametro = window.location.search.substr('?').split('=');
    correoUsuario = parametro[1];
    console.log('id usuario ' + correoUsuario);
    cargarUsuario();
}
function obtenerRecetasPorUsuario(correo) {

    $.getJSON('/api/misRecetas?correo=' + correo, function (data) {
        var RecetaReview = new Object();
        $.each(data, function (recetaobtenidas, recActual) {
            console.log(recActual);
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

        //Paginar las tres primeras recetas

        for (var i = 0; i < 3; i++) {

            $("#data-container").append("\
                 <div class= 'card  animated zoomIn'>\
                <img class='card-img-top' src='"+ RecetasConsultadas[i].imagen + "' alt='Card image cap'>\
                    <div class='card-body'>\
                        <h5 class='card-title'>"+ RecetasConsultadas[i].Nombre + "</h5>\
                        <p class='card-text'>"+ RecetasConsultadas[i].Descripcion + "</p>\
                        <h6>Categoria</h6>\
                        <p class='card-text'>"+ RecetasConsultadas[i].Categoria + "</p>\
                     <ul class='list-group'>\
                        <li class='list-group-item list-group-item-warning d-flex justify-content-between align-items-center'><i class='fas fa-stopwatch'></i>\
                            Tiempo de preparacion\
                            <span class='badge badge-primary badge-pill'>"+ RecetasConsultadas[i].tiempoPreparacion + "</span>\
                        </li>\
                        <li class='list-group-item list-group-item-warning d-flex justify-content-between align-items-center'><i class='fas fa-globe-americas'></i>\
                           Idioma\
                            <span class='badge badge-primary badge-pill'>"+ RecetasConsultadas[i].Idioma + "</span>\
                        </li>\
                     <li class='list-group-item list-group-item-warning d-flex justify-content-between align-items-center'><i class='fas fa-star-half-alt'></i>\
                           Puntuacion\
                            <span class='badge badge-primary badge-pill'>"+ RecetasConsultadas[i].puntuacion + "</span>\
                        </li>\
                     <li class='list-group-item list-group-item-warning d-flex justify-content-between align-items-center'><i class='fas fa-users'></i>\
                           No. porciones\
                            <span class='badge badge-primary badge-pill'>"+ RecetasConsultadas[i].porciones + "</span>\
                        </li>\
                     </ul>\
                    </div>\
                    <div class='card-footer'>\
                        <small class='text-muted'><i class='fas fa-calendar-alt'></i>Fecha "+ RecetasConsultadas[i].fechaPublicacion + "</small>\
                        <br />\
                    </div>\
                        <button onclick='ampliarReceta("+ RecetasConsultadas[i].Id_receta + ")' type='button' class='btn btn-primary'>Ver mas</button>\
                        <br />\
                    </div>\
                ");

        }


        var pages = Math.ceil((RecetasConsultadas.length / 3));

        //Paginacion
        $('#pagination-container').pagination({
            dataSource: RecetasConsultadas,
            pageSize: 3,
            pageNumber: pages,
            callback: function (data, pagination) {

                document.getElementById('data-container').innerHTML = "";

                for (var i = 0; i < 3; i++) {

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
                        <button onclick='ampliarReceta("+ data[i].Id_receta + ")' type='button' class='btn btn-primary'>Ver mas</button>\
                        <br />\
                    </div>\
                ");

                }


            }
        });
    });

}


