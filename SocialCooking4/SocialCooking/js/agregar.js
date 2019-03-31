var instanciar= true;
var identificador=0;
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


function guardarDatos() {

        //trabajo bajo el supuesto de que los campos estan llenos
        var ingredientes = [];
        var imagenes = [];
        var nombreReceta = document.getElementById('nombreReceta');
        var ingrediente = document.getElementById('nombre');
        var cantidadIngrediente = document.getElementById('cantidad');
        var idiomas = document.getElementById('listaIdiomas').value;
        var imagen = document.getElementById('files');
        var descripcion = document.getElementById('descripcionReceta');
        var pasoApaso = document.getElementById('pasosReceta');
        //var categoria = document.getElementById('Categoria');
        var j = 0;
        var i;
        var Receta;
        for (i = 0; i < ingrediente.childNodes.length; i + 2) {
            ingredientes[j].nombre = ingrediente.childNodes[i].value;
            ingredientes[j].cantidad = cantidadIngrediente.childNodes[i].value;
            j++;
        }
        receta =
            {
                "nombreReceta": nombreReceta.value,
                "ingredientes": ingredientes,
                "idiomas": idiomas.value,
                "descripcion": descripcion.value,
                "pasoApaso": pasoApaso.value,
                "categoria": categoria.value,
                "imagenes": imagenes.value
            }

}
    
function ConvertirBase64(file) {
        var lectorImg = new FileReader();
        lectorImg.readAsDataURL(file);
        lectorImg.onload = function () {
            console.log(lectorImg.result);
            return lectorImg.result.value;

        };
        lectorImg.onerror = function (error) {
            console.log('Hubo un error: ', error);
            return error;
        };
}


//Funcion para agregar campos de nombre y cantidad en la ventana modal.
function agregarCampos() {
  
  

  if(instanciar== true)
  {
  div1 = document.createElement("DIV")
  div1.setAttribute("class", "form-group col-md-6");
  div1.setAttribute("id", "nombre");
  document.getElementById("Ingredientes").appendChild(div1);

  div2 = document.createElement("DIV")
  div2.setAttribute("class", "form-group col-md-6");
  div2.setAttribute("id", "cantidad");
  document.getElementById("Ingredientes").appendChild(div2);
  instanciar= false;

}
  
//Agregar espacios entre cada campo.
  br1 = document.createElement("BR")
  document.getElementById("nombre").appendChild(br1);

  br2 = document.createElement("BR")
  document.getElementById("cantidad").appendChild(br2);

//Agregar atributos a cada campo.
  inputNombre = document.createElement("INPUT");
  inputNombre.setAttribute("type", "text");
  inputNombre.setAttribute("class", "form-control");
  inputNombre.setAttribute("id", "campoNombre"+identificador);
  document.getElementById("nombre").appendChild(inputNombre);

  inputCantidad = document.createElement("INPUT");
  inputCantidad.setAttribute("type", "text");
  inputCantidad.setAttribute("class", "form-control");
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

    
 







