
window.onload = function () {
    console.log("Cargado detalleReceta.js");
    cargarRecetaId();
    $('#table_id').DataTable();
};

function cargarRecetaId() {

    var parametro = window.location.search.substr('?').split('=');
    var idReceta = parametro[1];

    $.getJSON('/api/receta?id=' + idReceta, function (data) {
        console.log(data);

        if (data.imagenes[0] == undefined) {
            document.getElementById('imagen').setAttribute("src", "images/imagen-no-disponible.jpg");
        } else {
            document.getElementById('imagen').setAttribute("src", data.imagenes[0]);
        }

        $('.card-title').text(data.Nombre);
        $('#categoria').text(data.Categoria);
        $('#descripcion').text(data.Descripcion);
        $('#tiempo').after(data.tiempoPreparacion);
        $('#idioma').after(data.Idioma);
        $('#nporciones').after(data.porciones);
        $('#ncalificaciones').after(data.nopuntucaiones);
        $('#fecha').text(data.fechaPublicacion);
        $('#usuario').text(data.correo_usu);
        $('#idreceta').text(data.idReceta);

        //Lista de ingrentes
        $('#listaPasos').append("\
            <li class='list-group-item'>"+ data.PasoApaso+"</li>\
            ");

        //Pintar las imagenes
        for (var i = 0; i <data.imagenes.length; i++) {
            
                $("#contenedorImagenes").append("\
                   <div class='col-md-4'>\
                    <div class= 'thumbnail'>\
                        <a>\
                            <img src='"+ data.imagenes[i] + "' alt='" + data.imagenes[i]+"' style='width:100%'>\
                        </a>\
                     </div>\
                   </div>\
                    ");
        }

        var numeroIngredientes = data.ingrediente.length;

        for (var j = 0; j < numeroIngredientes; j++) {

            console.log(data.ingrediente[j].ingrediente);
            console.log(data.ingrediente[j].cantidad);
            console.log(data.ingrediente[j].unidades);

                $('#ingredientes').append("\
                   <div class='col-12'>\
                            <ul class='list-group' id='setIngredientes"+ j +"'>\
                                <li class='list-group-item d-flex justify-content-between align-items-center'>\
                                    "+ data.ingrediente[j].ingrediente+"\
                                    <span class='badge badge-primary badge-pill'>"+ data.ingrediente[j].cantidad +"</span>\
                                    <span class='badge badge-primary badge-pill px-2'>"+ data.ingrediente[j].unidades +"</span>\
                                </li>\
                            </ul>\
                </div>");

        }
    });


}