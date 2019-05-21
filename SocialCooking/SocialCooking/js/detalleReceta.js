var dialog;
var id;

window.onload = function () {
    //Cargando...
    dialog = bootbox.dialog({
        message: '<p class="text-center mb-0"><i class="fas fa-sync fa-spin px-3"></i>Cargando receta</p>',
        closeButton: false
    });
    var parametros = obtenerURL();
    id = parametros['id'];
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

        document.getElementById('btnReportar').addEventListener('click', reportarReceta);
        document.getElementById('btnCompartirFacebook').addEventListener('click', compartirFacebook);
        document.getElementById('btnCompartirtwitter').addEventListener('click', compartirTwitter);

        
       
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

function reportarReceta() {

    $("#btnReportar").attr('disabled', 'disabled');

    $.ajax({
        url: "/api/reportar/"+id,
        type: 'PUT',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function () {
            
            bootbox.alert({
                message: "Se reporto la receta!",
                callback: function () {
                    console.log('Gracias por la contribucion!');
                }
            })
        },
        error: function (request, message, error) {

            bootbox.alert({
                message: "No se pudo reportar tu receta, intenta de nuevo!",
                size: 'small'
            });
        }
    });
}

function compartirFacebook() {
    window.open("http://www.facebook.com/sharer/sharer.php?u=http://socialcookingweb.azurewebsites.net/detalleReceta.html?id="+ id + "&p[images][0]=Logo.png");

}

function compartirTwitter() {
    window.open("http://twitter.com/share?url=http://socialcookingweb.azurewebsites.net/detalleReceta.html?id=" + id + "&p[images][0]=Logo.png");
}

function calificarReceta(valor) {
    $("#divRecetas").children().attr("disabled", "disabled"); 
    console.log(valor);
    $.ajax({
        url: "/api/Puntuar?id=" + id +"&valor="+valor,
        type: 'PUT',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function () {
           
            bootbox.alert({
                message: "Se califico la receta!",
                callback: function () {
                    console.log('Gracias por calificar esta deliciosa receta!');
                }
            })
        },
        error: function (request, message, error) {

            bootbox.alert("No se pudo calificar!");
        }
    });


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