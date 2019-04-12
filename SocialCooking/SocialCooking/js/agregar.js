var instanciar = true;
var identificador = 0;
var div1;
var div2;
var br1;
var br2;
var inputNombre;
var inputCantidad;
var contador;
var list;
var files;
var reader;
var tempimagen;
var imagenes = [];
var receta = new Object();
var usuario = new Object();
usuario =
    {

        'Nombre': "",
        'Correo': "",
        'img': "",
        'IdTipoUsu': "",
        'Id_Usuario': ""
    };
var prueba =
    {
        'Nombre': "",
        'correo_usu': "",
        'ingrediente': "",
        'Idioma': "",
        'Descripcion': "",
        'PasoApaso': "",
        'Categoria': "",
        'imagenes': ""
    };
window.onload = cargarUsuario();


function cargarUsuario() {
    

    var parametro = window.location.search.substr('?').split('=');
    var correo = parametro[1];
    $.getJSON('/api/Usuario?correo=' + correo + "&confirmacion=" + true, function (data) {
        console.log("es lo que recoge=" + data)
        usuario = data;
        document.getElementById("nombreUsuario").innerHTML = "<img src=" + usuario.img + " id='images' >" + usuario.Nombre;
        //document.getElementById("images").src =; usuario.img;


    });

}

function guardarDatos() {

    //trabajo bajo el supuesto de que los campos estan llenos
    var ingredientes = [];
    var nombreReceta = document.getElementById('nombreReceta');
    var ingrediente = document.getElementById('nombre');
    var cantidadIngrediente = document.getElementById('cantidad');
    var idiomas = document.getElementById('listaIdiomas');
    var imagen = document.getElementById('files');
    var descripcion = document.getElementById('descripcionReceta');
    var pasoApaso = document.getElementById('pasosReceta');
    var categoria = document.getElementById('listaCategorias');
    ingredientes[0] = { ingrediente: "", cantidad: "" };
    ingredientes[0].ingrediente = document.getElementById('nombreIngrediente').value;
    ingredientes[0].cantidad = document.getElementById('cantidadIngrediente').value;
    var j = 1;
    var i;

    for (i = 1; i < ingrediente.childNodes.length; i += 2) {
        ingredientes[j] = { ingrediente: "", cantidad: "" };
        ingredientes[j].ingrediente = ingrediente.childNodes[i].value;
        ingredientes[j].cantidad = cantidadIngrediente.childNodes[i].value;
        j++;
    }
    for (var k = 0; k < imagen.files.length; k++) {
        ConvertirBase64(imagen.files[k]);
    }


    receta =
        {
            'Nombre': nombreReceta.value,
            'correo_usu': "sebascz97@gmail.com",
            'ingrediente': ingredientes,
            'Idioma': idiomas.value,
            'Descripcion': descripcion.value,
            'PasoApaso': pasoApaso.value,
            'Categoria': categoria.value,
            'imagenes': imagenes
        };
    GuardarReceta(receta);

}

function GuardarReceta(receta) {
    receta = JSON.stringify(receta);
    $.ajax({
        url: "/api/receta",
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        data: receta,
        success: function (receta) {
            productAddSuccess(receta.Nombre);
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}
function ConvertirBase64(file) {
    var lectorImg = new FileReader();
    lectorImg.readAsDataURL(file);
    lectorImg.onload = function () {
        console.log(lectorImg.result);
        imagenes.push(lectorImg.result);


    };
    lectorImg.onerror = function (error) {
        console.log('Hubo un error: ', error);

    };
}

//Funcion para agregar campos de nombre y cantidad en la ventana modal.
function agregarCampos() {
  
  

  if(instanciar=== true)
  {
      div1 = document.createElement("DIV");
      div1.setAttribute("class", "form-group col-md-6");
      div1.setAttribute("id", "nombre");
      document.getElementById("Ingredientes").appendChild(div1);

      div2 = document.createElement("DIV");
      div2.setAttribute("class", "form-group col-md-6");
      div2.setAttribute("id", "cantidad");
      document.getElementById("Ingredientes").appendChild(div2);
      instanciar= false;

}
  
//Agregar espacios entre cada campo.
  br1 = document.createElement("BR");
  document.getElementById("nombre").appendChild(br1);

  br2 = document.createElement("BR");
  document.getElementById("cantidad").appendChild(br2);

//Agregar atributos a cada campo.
  inputNombre = document.createElement("INPUT");
  inputNombre.setAttribute("type", "text");
  inputNombre.setAttribute("class", "form-control");
  inputNombre.setAttribute("required", "required");
  inputNombre.setAttribute("id", "campoNombre"+identificador);
  document.getElementById("nombre").appendChild(inputNombre);

  inputCantidad = document.createElement("INPUT");
    inputCantidad.setAttribute("type", "number");
  inputCantidad.setAttribute("class", "form-control");
  inputCantidad.setAttribute("required", "required");
  inputCantidad.setAttribute("id", "campoCantidad"+identificador);
  document.getElementById("cantidad").appendChild(inputCantidad);
  identificador++;
   
  
}

//Funcion para eliminar campos de nombre y cantidad en la ventana modal. 
function eliminarCampos() {

  contador = document.getElementById("nombre").childElementCount;

  list = document.getElementById("nombre");
  list.removeChild(list.childNodes[contador-1]);

  list = document.getElementById("cantidad");
  list.removeChild(list.childNodes[contador-1]);

  list = document.getElementById("nombre");
  list.removeChild(list.childNodes[contador-2]);

  list = document.getElementById("cantidad");
  list.removeChild(list.childNodes[contador-2]);

  identificador--;

 
}

//agregar Imágenes

function archivo(evt) {
  files = evt.target.files; // FileList object
  
    //Obtenemos la imagen del campo "file". 
    for (var i = 0, f; f = files[i]; i++) {  
        document.getElementById("list").innerHTML = "";
       //Solo admitimos imágenes.
       if (!f.type.match('image.*')) {
            continue;
       }
   
       reader = new FileReader();
       
       reader.onload = (function(theFile) {
           return function(e) {
           // Creamos la imagen.
                  document.getElementById("list").innerHTML += ['<img class="thumb" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');
           };

       })(f);

       reader.readAsDataURL(f);
   }
}
         
  document.getElementById('files').addEventListener('change', archivo, false);

    

function buscarxNombre()
{
    $("#recetasxNombre").innerHTML = "";
    var search = document.getElementById('buscarReceta').value;
    //(String nombre, bool validar)
    $.getJSON('/api/receta?nombre=' + search + "&validar=" + true, function (data) {
        var ContendorRecetas = document.getElementById("recetasXNombre");
        $.each(data, function (recetaobtenidas, recActual) {
            {
                
                $("#recetasxNombre").append("\
                    <div class='col - md - 3 col - sm - 6 wow fadeInUp card ' > \
                        <div class='team - thumb'> \
                            <img src='images / chef1.jpg' class='img - responsive' alt='Team'> \
                                <div class='team - des'> \
                                    <h3>"+recActual.Nombre+"</h3> \
                                    <h4>"+ recActual.Categoria+"</h4> \
                                    <ul class='social - icon'> \
                                        <li><a href='#' class='fa fa - facebook'></a></li> \
                                        <li><button type='button' class='btn btn - primary' id='btnComentar' onclick=" + recActual.Id_receta +">Ver Mas</button></li> \
                                    </ul> \
                               </div> \
                        </div> \
                </div> ");
                console.log("1" + recActual.Id_receta);
                console.log("2" + recActual.Categoria);
                console.log("3" + recActual.Descripcion);
                console.log("4" + recActual.Idioma);
                console.log("5" + recActual.Nombre);
                console.log("6" + recActual.correo_usu);
                console.log("7" + recActual.imagenes);
            }


        });

    });
}

function buscarXCategoria(categoria) {
    $.getJSON('/api/receta?categoria=' + categoria, function (data) {
        var ContendorRecetas = document.getElementById("recetasXNombre");
        $.each(data, function (recetaobtenidas, recActual) {
            {

                $("#recetasxNombre").append("\
                    <div class='col - md - 3 col - sm - 6 wow fadeInUp card ' > \
                        <div class='team - thumb'> \
                            <img src='images / chef1.jpg' class='img - responsive' alt='Team'> \
                                <div class='team - des'> \
                                    <h3>"+ recActual.Nombre + "</h3> \
                                    <h4>"+ recActual.Categoria + "</h4> \
                                    <ul class='social - icon'> \
                                        <li><a href='#' class='fa fa - facebook'></a></li> \
                                        <li><button type='button' class='btn btn - primary' id='btnComentar' onclick=" + recActual.Id_receta + ">Ver Mas</button></li> \
                                    </ul> \
                               </div> \
                        </div> \
                </div> ");
                console.log("1" + recActual.Id_receta);
                console.log("2" + recActual.Categoria);
                console.log("3" + recActual.Descripcion);
                console.log("4" + recActual.Idioma);
                console.log("5" + recActual.Nombre);
                console.log("6" + recActual.correo_usu);
                console.log("7" + recActual.imagenes);
            }


        });

    });
}
function signOut() {
    GoogleAuth.signOut();

}
