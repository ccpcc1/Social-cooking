var instanciar = true;
var identificador = 0;
var div1;
var div2;
var br1;
var br2;
var br3;
var inputNombre;
var inputCantidad;
var dialog;
var imagenes = [];
var id;
var indices = ""; 
var recetaEditada = new Object();

window.onload = function () {
    //Cargando...
    dialog = bootbox.dialog({
        message: '<p class="text-center mb-0"><i class="fas fa-sync fa-spin px-3"></i>Cargando receta para editar</p>',
        closeButton: false
    });
    var parametros = obtenerURL();
    id = parametros['id'];
    var correo = parametros['user'];
    cargarUsuario(correo);
    cargarRecetaId(id);
    document.getElementById("files").addEventListener("change", guardarImagenes);
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

function cargarRecetaId(idReceta) {


    $.getJSON('/api/receta?id=' + idReceta, function (data) {

       

        $('#nombreReceta').val(data.Nombre);
        $('#listaIdiomas').val(data.Idioma);
        $('#listaCategorias').val(data.Categoria);
        $('#porciones').val(data.porciones);
        $('#hrs').val(data.tiempoPreparacion);
        $('#descripcionReceta').val(data.Descripcion);
        $('#pasosReceta').val(data.PasoApaso);

        //Tiempo de preparacion
        var array = data.tiempoPreparacion.split(" ");
        $('#mnts').val(array[0]);
        $('#hrs').val(array[3]);

        //Pintar los ingredientes
        for (var i = 0; i < data.ingrediente.length; i++) {
            agregarCampos(data.ingrediente[i].ingrediente, data.ingrediente[i].cantidad, data.ingrediente[i].unidades);
        }
        indices = document.getElementById('nombre').childNodes.length;
        //Pintar las imagenes
        for (var j = 0; j < data.imagenes.length; j++) {
            $('#imagenesContainer').append("\
          <div class= 'col-md-4'>\
            <div class='thumbnail'>\
                <img src='"+ data.imagenes[j]+ "' alt='Lights' style='width:100%'>\
                   <div class='caption py-2'>\
                        <button type='button' class='btn btn-danger' id='btnCandelar' onclick=''>Eliminar</button>\
                   </div>\
            </div>\
          </div>\
        ");
        }

 
        dialog.modal('hide');

    });

}

function editarReceta() {
   
    var ingredientes = [];
    var img = [];
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

    if (ingrediente != null) {
        for (i = indices+1; i < ingrediente.childNodes.length; i += 2) {
            ingredientes[j] = { ingrediente: "", cantidad: "", unidades: "" };
            ingredientes[j].ingrediente = ingrediente.childNodes[i].value;
            ingredientes[j].cantidad = cantidadIngrediente.childNodes[i].value;
            ingredientes[j].unidades = unidades.childNodes[i].value;
            j++;
        }
    }


    recetaEditada =
        {
            'Id_receta': id,
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
    ActualizarReceta();
}

function ActualizarReceta()
{
    recetaEditada = JSON.stringify(recetaEditada);
    $.ajax({
        url: "/api/receta",
        type: 'PUT',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        data:recetaEditada,
        success: function (recetaEditada) {
            $("#modalReceta").modal();
            
        },
        error: function (request, message, error) {

            alert("Receta no agregada, intente de nuevo");
        }
    });

}

function agregarCamposNuevos() {

    if (instanciar === true) {
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
    inputNombre.setAttribute("max", "256");


    inputNombre.setAttribute("id", "campoNombre" + identificador);
    document.getElementById("nombre").appendChild(inputNombre);

    //Input cantidad
    inputCantidad = document.createElement("INPUT");
    inputCantidad.setAttribute("type", "number");
    inputCantidad.setAttribute("placeholder", "Cantidad");
    inputCantidad.setAttribute("class", "form-control");
    inputCantidad.setAttribute("required", "required");
    inputCantidad.setAttribute("min", "1");
    inputCantidad.setAttribute("id", "campoCantidad" + identificador);
    document.getElementById("cantidad").appendChild(inputCantidad);

    //Input unidad
    var optionUnidades = document.createElement("select");
    optionUnidades.setAttribute("class", "form-control");
    optionUnidades.setAttribute("required", "required");


    optionUnidades.setAttribute("id", "optionUnidades" + identificador);
    document.getElementById("unidades").appendChild(optionUnidades);

    var idoptUnidades = "optionUnidades" + identificador;
    var opts = document.getElementById(idoptUnidades);
    //Lenar los options
    addOptions(opts);
    //Se incrementa el numero de elementos creado
    identificador++;

}

function cargarUsuario(correo) {

    $.getJSON('/api/Usuario?correo=' + correo + "&confirmacion=" + true, function (data) {
        document.getElementById("nombreUsuario").innerHTML = capitalizarPrimeraLetra(data.Nombre);
        document.getElementById("imagenUsuario").src = data.img;
    });
}

function agregarCampos(nombre,cantidad,unidad) {

    if (instanciar === true) {

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
    inputNombre.setAttribute("max", "256");
    inputNombre.setAttribute("id", "campoNombre" + identificador);
    inputNombre.value = nombre;
    inputNombre.disabled = true;
    document.getElementById("nombre").appendChild(inputNombre);

    //Input cantidad
    inputCantidad = document.createElement("INPUT");
    inputCantidad.setAttribute("type", "number");
    inputCantidad.setAttribute("placeholder", "Cantidad");
    inputCantidad.setAttribute("class", "form-control");
    inputCantidad.setAttribute("required", "required");
    inputCantidad.setAttribute("min", "1");
    inputCantidad.setAttribute("id", "campoCantidad" + identificador);
    inputCantidad.value = cantidad;
    inputCantidad.disabled = true;
    document.getElementById("cantidad").appendChild(inputCantidad);

    //Input unidad
    var optionUnidades = document.createElement("select");
    optionUnidades.setAttribute("class", "form-control");
    optionUnidades.setAttribute("required", "required");
    optionUnidades.setAttribute("id", "optionUnidades" + identificador);
    optionUnidades.value = unidad;
    optionUnidades.disabled = true;
    document.getElementById("unidades").appendChild(optionUnidades);

    var idoptUnidades = "optionUnidades" + identificador;
    var opts = document.getElementById(idoptUnidades);
    //Lenar los options
    addOptions(opts);
    //Se incrementa el numero de elementos creado
    identificador++;

}

function addOptions(optionSelect) {


    var unds = ['Lts', 'Mls', 'Kgs', 'Grs', 'Cdtas', 'Cdas', 'Tazas', 'Pizcas', 'Unidad', 'Unidades', 'Una mitad', 'Al gusto'];

    for (let i = 0; i < unds.length; i++) {

        if (i == 0) {
            let opt = document.createElement("option");
            opt.appendChild(document.createTextNode("Unidades"));
            opt.innerHTML = ("Unidades");
            opt.setAttribute("selected", "");
            opt.setAttribute("disabled", "");
            optionSelect.appendChild(opt);
        }
        let opt = document.createElement("option");
        opt.appendChild(document.createTextNode(unds[i]));
        opt.innerHTML = (unds[i]);
        optionSelect.appendChild(opt);

    }

}