var dialog;
window.onload = function () {
    //Cargando...
    dialog = bootbox.dialog({
        message: '<p class="text-center mb-0"><i class="fas fa-sync fa-spin px-3"></i>Cargando receta</p>',
        closeButton: false
    });
    var parametros = obtenerURL();
    var id = parametros['id'];
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
        document.getElementById("contenedorReceta").style.display = "";
        dialog.modal('hide');
    });



    

}