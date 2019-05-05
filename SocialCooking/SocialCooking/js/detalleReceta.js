
window.onload = function () {
    console.log("Cargado detalleReceta.js");
    cargarRecetaId();
};

function cargarRecetaId() {

    var parametro = window.location.search.substr('?').split('=');
    var idReceta = parametro[1];
    
    //console.log(idReceta);
    //{ Id_receta: 3, Descripcion: "aa", PasoApaso: "aaa", Idioma: "Español", Nombre: "bbbbb", … }
    //Categoria: "Vegetariana"
    //Descripcion: "aa"
    //Id_receta: 3
    //Idioma: "Español"
    //Nombre: "bbbbb"
    //PasoApaso: "aaa"
    //correo_usu: "José Manuel Echeverri Palacio                     "
    //fechaPublicacion: "0001-01-01T00:00:00"
    //imagenes: []
    //ingrediente: []
    //nopuntucaiones: 0
    //porciones: 0
    //puntuacion: 0
    //tiempoPreparacion: null
    //__proto__: Object

    $.getJSON('/api/receta?id=' + idReceta, function (data) {

        console.log(data);
        document.getElementById('imagen').setAttribute("src", data.imagenes[0]);
       
    });


}