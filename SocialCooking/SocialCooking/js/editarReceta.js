window.onload = function () {
    cargarRecetaId();
};

function cargarRecetaId() {

    var parametro = window.location.search.substr('?').split('=');
    var idReceta = parametro[1];

    //$.getJSON('/api/receta?id=' + idReceta, function (data) {
    //    console.log(data);


    //    $('#nombreReceta').text(data.Nombre);
    //    $('#categoria').text(data.Categoria);
    //    $('#descripcion').text(data.Descripcion);
    //    $('#hrs').after(data.tiempoPreparacion);
    //    $('#idioma').after(data.Idioma);
    //    $('#porciones').text(data.porciones);
    //    $('#ncalificaciones').after(data.nopuntucaiones);
    //    $('#fecha').text(data.fechaPublicacion);
    //    $('#usuario').text(data.correo_usu);
    //    $('#idreceta').text(data.idReceta);


    //});


}