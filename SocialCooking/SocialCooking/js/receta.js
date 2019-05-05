var instanciar = true;
var identificador = 0;
var div1;
var div2;
var br1;
var br2;
var br3;
var inputNombre;
var inputCantidad;
var porciones, horas, minutos;
var contador;
var list;
var files;
var reader;
var imagenes = [];
var receta = new Object();
window.onload = load;

function load() {

    console.log("Documento recetas.js cargado");
    document.getElementById("files").addEventListener("change", guardarImagenes);

}


function guardarDatos() {

    //trabajo bajo el supuesto de que los campos estan llenos
    var ingredientes = [];
    var img=[];
    var nombreReceta = document.getElementById('nombreReceta');
    var ingrediente = document.getElementById('nombre');
    var cantidadIngrediente = document.getElementById('cantidad');
    var unidades = document.getElementById('unidades');
    var idiomas = document.getElementById('listaIdiomas');
    var descripcion = document.getElementById('descripcionReceta');
    var pasoApaso = document.getElementById('pasosReceta');
    var categoria = document.getElementById('listaCategorias');
    horas = document.getElementById('hrs');
    minutos = document.getElementById('mnts');
    porciones = document.getElementById('porciones');
    ingredientes[0] = { ingrediente: "", cantidad: "" };
    ingredientes[0].ingrediente = document.getElementById('nombre').value;
    ingredientes[0].cantidad = document.getElementById('cantidad').value;
    var j = 0;
    var i;

    if (ingrediente != null)
    {
        for (i = 1; i < ingrediente.childNodes.length; i += 2) {
            ingredientes[j] = { ingrediente: "", cantidad: "", unidades:""};
            ingredientes[j].ingrediente = ingrediente.childNodes[i].value;
            ingredientes[j].cantidad = cantidadIngrediente.childNodes[i].value;
            ingredientes[j].unidades = unidades.childNodes[i].value;
            j++;
        }
    }
 

    receta =
        {
        'Nombre': nombreReceta.value,
        'correo_usu': localStorage.getItem("CorreoUsuario").toString(),
        'ingrediente': ingredientes,
        'Idioma': idiomas.value,
        'Descripcion': descripcion.value,
        'PasoApaso': pasoApaso.value,
        'Categoria': categoria.value,
        'imagenes': imagenes,
        'tiempoPreparacion': horas.value + " hrs y " + minutos.value + " minutos",
        'porciones': porciones.value
        };

    GuardarReceta(receta);

}

function GuardarReceta(recetaToSave) {

    receta =  JSON.stringify(recetaToSave);

    $.ajax({
        url: "/api/receta",
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        data: receta,
        success: function (otherReceta) {
            $("#modalReceta").modal();
            limpiarCampoReceta();
        },
        error: function (request, message, error) {

            alert("Receta no agregada, intente de nuevo");
        }
    });
}

//Funcion para agregar campos de nombre, cantidad y unidades en la ventana modal.
function agregarCampos() {
 
  if(instanciar=== true)
  {
      div1 = document.createElement("DIV");
      div1.setAttribute("class", "form-group col-md-6");
      div1.setAttribute("id", "nombre");
      document.getElementById("Ingredientes").appendChild(div1);

      div2 = document.createElement("DIV");
      div2.setAttribute("class", "form-group col-md-3");
      div2.setAttribute("id", "cantidad");
      document.getElementById("Ingredientes").appendChild(div2);

      var unidades = document.createElement("div");
      unidades.setAttribute("class", "form-group col-md-3");
      unidades.setAttribute("id", "unidades");
      document.getElementById("Ingredientes").appendChild(unidades);
      instanciar = false;
    }

    //Agregar espacios entre cada campo.
    br1 = document.createElement("BR");
    document.getElementById("nombre").appendChild(br1);

    br2 = document.createElement("BR");
    document.getElementById("cantidad").appendChild(br2);

    br3 = document.createElement("BR");
    document.getElementById("unidades").appendChild(br3);



    //Agregar atributos a cada campo
    //Input nombre
    inputNombre = document.createElement("INPUT");
    inputNombre.setAttribute("type", "text");
    inputNombre.setAttribute("placeholder", "Nombre ingrediente");
    inputNombre.setAttribute("class", "form-control");
    inputNombre.setAttribute("required", "required");
    inputNombre.setAttribute("id", "campoNombre"+identificador);
    document.getElementById("nombre").appendChild(inputNombre);

    //Input cantidad
    inputCantidad = document.createElement("INPUT");
    inputCantidad.setAttribute("type", "number");
    inputCantidad.setAttribute("placeholder", "Cantidad");
    inputCantidad.setAttribute("class", "form-control");
    inputCantidad.setAttribute("required", "required");
    inputCantidad.setAttribute("id", "campoCantidad"+identificador);
    document.getElementById("cantidad").appendChild(inputCantidad);

    //Input unidad
    var optionUnidades = document.createElement("select");
    optionUnidades.setAttribute("class", "form-control");
    optionUnidades.setAttribute("required", "required");
    optionUnidades.setAttribute("id", "optionUnidades"+identificador);
    document.getElementById("unidades").appendChild(optionUnidades);

    var idoptUnidades = "optionUnidades" + identificador;
    var opts = document.getElementById(idoptUnidades);
    //Lenar los options
    addOptions(opts);
    //Se incrementa el numero de elementos creado
    identificador++;

}

//Funcion para eliminar campos de nombre y cantidad en la ventana modal. 
function eliminarCampos() {

  contador = document.getElementById("nombre").childElementCount;

  list = document.getElementById("nombre");
  list.removeChild(list.childNodes[contador-1]);

  list = document.getElementById("cantidad");
  list.removeChild(list.childNodes[contador-1]);

   list = document.getElementById("unidades");
   list.removeChild(list.childNodes[contador - 1]);

  identificador--;
 
}

//Funcion para agregar opciones al option Select
function addOptions(optionSelect) {


    var unds = ['Lts', 'Mls', 'Kgs', 'Grs', 'Cdtas', 'Cdas', 'Tazas', 'Pizcas', 'Unidad', 'Unidades', 'Una mitad','Al gusto'];

    for (let i = 0; i < unds.length; i++) {

        if (i==0) {
            let opt = document.createElement("option");
            opt.appendChild(document.createTextNode("Unidades"));
            opt.innerHTML = ("Unidades");
            opt.setAttribute("selected","");
            opt.setAttribute("disabled","");     
            optionSelect.appendChild(opt);
        }
            let opt = document.createElement("option");
            opt.appendChild(document.createTextNode(unds[i]));
            opt.innerHTML = (unds[i]);
            optionSelect.appendChild(opt);

            }

     }
    
//agregar Imágenes
function guardarImagenes(e) {

    var files = e.target.files;

    if (window.FormData !== undefined) {

        var img = new FormData();

        for (var x = 0; x < files.length; x++) {
            console.log(files[x]);
            img.append("file" + x, files[x]);  
        }

      
        $.ajax({
            type: "POST",
            url: '/api/FileUpload/',
            contentType: false,
            processData: false,
            data: img,
            success: function (result) {
                console.log("Se guardaron las imagenes");

                //Annadimos las imagenes al arreglo de imagenes
                for (var i = 0; i < result.length; i++) {

                    imagenes.push(result[i]);
                }
                
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    err = JSON.parse(xhr.responseText).Message;
                console.log(err);
                alert("No se pudieron guardar las imagenes");
            }
        });

    } else {

        alert("Este navegador no permite subir archivos");
    }
}

function limpiarBusqueda() {

    
    document.getElementById('ppal').innerHTML = "";
}
  
function buscarxNombre()
{
    var search = document.getElementById('buscarReceta').value;
    console.log(search);


    //(String nombre, bool validar)
    $.getJSON('/api/receta?nombre=' + search + "&validar=" + true, function (data) {
        var contador = 0;
        var i = 0;
        console.log("Se esta buscando por nombre");

        if (data.length == 0) {
            $("#modalBusqueda").modal();
            }

        $.each(data, function (recetaobtenidas,recActual) {
            {
               
                document.getElementById("ppal").innerHTML = "";

                    $("#ppal").append("\
                 <br>\
                 <div id='cardeck"+ i + "' class='card-deck'>\
                <div class= 'card  animated zoomIn'>\
                <img class='card-img-top' src='"+ recActual.imagen + "' alt='Card image cap'>\
                    <div class='card-body'>\
                        <h5 class='card-title'>"+ recActual.Nombre + "</h5>\
                        <p class='card-text'>"+ recActual.Descripcion + "</p>\
                        <h6>Categoria</h6>\
                        <p class='card-text'>"+ recActual.Categoria + "</p>\
                    </div>\
                    <div class='card-footer'>\
                        <small class='text-muted text-danger'><i class='fas fa-stopwatch'></i>"+ recActual.tiempoPreparacion + "</small>\
                        <br />\
                        <small class='text-muted'><strong><i class='fas fa-utensils-alt'></i>Porciones "+ recActual.porciones + "</strong></small>\
                        <br />\
                        <small class='text-muted'><i class='fas fa-globe-americas'></i>Idioma "+ recActual.Idioma + "</small>\
                        <br />\
                        <small class='text-muted'><i class='fas fa-calendar-alt'></i>Fecha "+ recActual.fechaPublicacion + "</small>\
                        <br />\
                        <small class='text-muted'><strong><i class='fas fa-star-half-alt'></i>Puntuaciones "+ recActual.puntuacion + "</strong></small>\
                        <button onclick='ampliarReceta("+ recActual.Id_receta + ")' type='button' class='btn btn-primary'>Ver mas</button>\
                        <br />\
                    </div>\
                    </div>\
                ");
                   


                contador++;
            }


            });

    });
}

function buscarXCategoria(categoria) {

    limpiarBusqueda();
    console.log("Se esta buscando por categoria");

    $.getJSON('/api/receta?categoria=' + categoria, function (data) {
        var contador = 0;
        var i = 0;
        $.each(data, function (recetaobtenidas, recActual) {
            {

                if (contador % 4 == 0) {
                    i = contador;
                    $("#ppal").append("\
                 <br>\
                 <div id='cardeck"+ i + "' class='card-deck'>\
                <div class= 'card  animated zoomIn'>\
                <img class='card-img-top' src='"+ recActual.imagen + "' alt='Card image cap'>\
                    <div class='card-body'>\
                        <h5 class='card-title'>"+ recActual.Nombre + "</h5>\
                        <p class='card-text'>"+ recActual.Descripcion + "</p>\
                        <h6>Categoria</h6>\
                        <p class='card-text'>"+ recActual.Categoria + "</p>\
                    </div>\
                    <div class='card-footer'>\
                        <small class='text-muted text-danger'><i class='fas fa-stopwatch'></i>"+ recActual.tiempoPreparacion + "</small>\
                        <br />\
                        <small class='text-muted'><strong><i class='fas fa-utensils-alt'></i>Porciones "+ recActual.porciones + "</strong></small>\
                        <br />\
                        <small class='text-muted'><i class='fas fa-globe-americas'></i>Idioma "+ recActual.Idioma + "</small>\
                        <br />\
                        <small class='text-muted'><i class='fas fa-calendar-alt'></i>Fecha "+ recActual.fechaPublicacion + "</small>\
                        <br />\
                        <small class='text-muted'><strong><i class='fas fa-star-half-alt'></i>Puntuaciones "+ recActual.puntuacion + "</strong></small>\
                        <button onclick='ampliarReceta("+ recActual.Id_receta + ")' type='button' class='btn btn-primary'>Ver mas</button>\
                        <br />\
                    </div>\
                    </div>\
                ");
                    contador++;

                } else {

                    $("#cardeck" + i + "").append("\
                 <div class= 'card  animated zoomIn'>\
                <img class='card-img-top' src='"+ recActual.imagen + "' alt='Card image cap'>\
                    <div class='card-body'>\
                        <h5 class='card-title'>"+ recActual.Nombre + "</h5>\
                        <p class='card-text'>"+ recActual.Descripcion + "</p>\
                        <h6>Categoria</h6>\
                        <p class='card-text'>"+ recActual.Categoria + "</p>\
                    </div>\
                    <div class='card-footer'>\
                        <small class='text-muted text-danger'><i class='fas fa-stopwatch'></i>"+ recActual.tiempoPreparacion + "</small>\
                        <br />\
                        <small class='text-muted'><strong><i class='fas fa-utensils-alt'></i>Porciones "+ recActual.porciones + "</strong></small>\
                        <br />\
                        <small class='text-muted'><i class='fas fa-globe-americas'></i>Idioma "+ recActual.Idioma + "</small>\
                        <br />\
                        <small class='text-muted'><i class='fas fa-calendar-alt'></i>Fecha "+ recActual.fechaPublicacion + "</small>\
                        <br />\
                        <small class='text-muted'><strong><i class='fas fa-star-half-alt'></i>Puntuaciones "+ recActual.puntuacion + "</strong></small>\
                        <button onclick='ampliarReceta("+ recActual.Id_receta + ")' type='button' class='btn btn-primary'>Ver mas</button>\
                        <br />\
                    </div>\
                ");
                }



                contador++;
            }


        });

    });
}

function getAllRecetas() {
    var contador = 0;
    var i = 0;
    var pb = 0;
    var progressBar = document.getElementById("progresBar");
    $("#modalCargando").modal({ backdrop: true });
    $.getJSON('/api/receta' , function (data) {
        $.each(data, function (recetaobtenidas, recActual) {
            pb++;
            if (pb<=100) {
                progressBar.style.width = pb*10 + "%";
            }

            console.log(pb);

            if (contador % 4 == 0) {
                i = contador;
                $("#ppal").append("\
                 <br>\
                 <div id='cardeck"+ i +"' class='card-deck'>\
                <div class= 'card  animated zoomIn'>\
                <img class='card-img-top' src='"+ recActual.imagen +"' alt='Card image cap'>\
                    <div class='card-body'>\
                        <h5 class='card-title'>"+ recActual.Nombre + "</h5>\
                        <p class='card-text'>"+ recActual.Descripcion +"</p>\
                        <h6>Categoria</h6>\
                        <p class='card-text'>"+ recActual.Categoria + "</p>\
                    <ul class='list-group'>\
                        <li class='list-group-item list-group-item-warning d-flex justify-content-between align-items-center'><i class='fas fa-stopwatch'></i>\
                            Tiempo de preparacion\
                            <span class='badge badge-primary badge-pill'>"+ recActual.tiempoPreparacion +"</span>\
                        </li>\
                        <li class='list-group-item list-group-item-warning d-flex justify-content-between align-items-center'><i class='fas fa-globe-americas'></i>\
                           Idioma\
                            <span class='badge badge-primary badge-pill'>"+ recActual.Idioma +"</span>\
                        </li>\
                     <li class='list-group-item list-group-item-warning d-flex justify-content-between align-items-center'><i class='fas fa-star-half-alt'></i>\
                           Puntuacion\
                            <span class='badge badge-primary badge-pill'>"+ recActual.puntuacion + "</span>\
                        </li>\
                     <li class='list-group-item list-group-item-warning d-flex justify-content-between align-items-center'><i class='fas fa-users'></i>\
                           No. porciones\
                            <span class='badge badge-primary badge-pill'>"+ recActual.porciones + "</span>\
                        </li>\
                     </ul>\
                    </div>\
                    <div class='card-footer'>\
                        <small class='text-muted'><i class='fas fa-calendar-alt'></i>Fecha "+ recActual.fechaPublicacion +"</small>\
                        <br />\
                    </div>\
                        <button onclick='ampliarReceta("+ recActual.Id_receta +")' type='button' class='btn btn-primary'>Ver mas</button>\
                        <br />\
                    </div>\
                ");
                contador++;

            } else {

                $("#cardeck"+i+"").append("\
                 <div class= 'card  animated zoomIn'>\
                <img class='card-img-top' src='"+ recActual.imagen+"' alt='Card image cap'>\
                    <div class='card-body'>\
                        <h5 class='card-title'>"+ recActual.Nombre + "</h5>\
                        <p class='card-text'>"+ recActual.Descripcion + "</p>\
                        <h6>Categoria</h6>\
                        <p class='card-text'>"+ recActual.Categoria + "</p>\
                     <ul class='list-group'>\
                        <li class='list-group-item list-group-item-warning d-flex justify-content-between align-items-center'><i class='fas fa-stopwatch'></i>\
                            Tiempo de preparacion\
                            <span class='badge badge-primary badge-pill'>"+ recActual.tiempoPreparacion + "</span>\
                        </li>\
                        <li class='list-group-item list-group-item-warning d-flex justify-content-between align-items-center'><i class='fas fa-globe-americas'></i>\
                           Idioma\
                            <span class='badge badge-primary badge-pill'>"+ recActual.Idioma + "</span>\
                        </li>\
                     <li class='list-group-item list-group-item-warning d-flex justify-content-between align-items-center'><i class='fas fa-star-half-alt'></i>\
                           Puntuacion\
                            <span class='badge badge-primary badge-pill'>"+ recActual.puntuacion + "</span>\
                        </li>\
                     <li class='list-group-item list-group-item-warning d-flex justify-content-between align-items-center'><i class='fas fa-users'></i>\
                           No. porciones\
                            <span class='badge badge-primary badge-pill'>"+ recActual.porciones + "</span>\
                        </li>\
                     </ul>\
                    </div>\
                    <div class='card-footer'>\
                        <small class='text-muted'><i class='fas fa-calendar-alt'></i>Fecha "+ recActual.fechaPublicacion + "</small>\
                        <br />\
                    </div>\
                        <button onclick='ampliarReceta("+ recActual.Id_receta +")' type='button' class='btn btn-primary'>Ver mas</button>\
                        <br />\
                    </div>\
                ");
            }

            

            contador++;
            
                
        });
        
        $("#modalCargando").modal("hide");
    });
   
}

function ampliarReceta(idReceta) {

    console.log(idReceta);
    window.location = "detalleReceta.html?id=" + idReceta;
}


function limpiarCampoReceta() {

    document.getElementById('nombreReceta').innerHTML = "";
     document.getElementById('nombre').innerHTML = "";
    document.getElementById('cantidad').innerHTML = "";
    document.getElementById('unidades').innerHTML = "";
    document.getElementById('listaIdiomas').innerHTML = "";
     document.getElementById('descripcionReceta').innerHTML = "";
     document.getElementById('pasosReceta').innerHTML = "";
     document.getElementById('listaCategorias');
     document.getElementById('hrs');
     document.getElementById('mnts');
    document.getElementById('porciones');

}
