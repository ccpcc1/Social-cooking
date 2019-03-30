
var instanciar = true;
var files;
function agregarCampos() {



    if (instanciar == true) {
        var div1 = document.createElement("DIV")
        div1.setAttribute("class", "form-group col-md-6");
        div1.setAttribute("id", "nombre");
        document.getElementById("Ingredientes").appendChild(div1);

        var div2 = document.createElement("DIV")
        div2.setAttribute("class", "form-group col-md-6");
        div2.setAttribute("id", "cantidad");
        document.getElementById("Ingredientes").appendChild(div2);
        instanciar = false;

        /*recordar que estos nodos se tienen que recorrer de 2 en 2 y el for empezaria desde 1*/
        //var ingrediente=document.getElementById('nombre');
        //ingrediente.childNodes[7].value;
        //var cantidad= document.getElementById('cantidad');
        //cantidad.childNodes[1].value;
        //var idiomas=document.getElementById('listaIdiomas');
        //idiomas.value
        //imagen.files[i]

    }

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
        var categoria = document.getElementById('Categoria');
        var j = 0;
        var Receta;
        for (var i = 0; i < ingrediente.childNodes.length; i + 2) {
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


function agregar() {
    var br1 = document.createElement("BR");
    var br2 = document.createElement("BR");
    var x = document.createElement("INPUT");
    var y = document.createElement("INPUT");
    if(instanciar== true)
     {
      // cuando se le da click por primera al boton "+", para agregar un ingrediente
      var div1 = document.createElement("DIV");
      var div2 = document.createElement("DIV");
      div1.setAttribute("class", "form-group col-md-6");
      div1.setAttribute("id", "nombre");
      document.getElementById("Ingredientes").appendChild(div1);

  
      div2.setAttribute("class", "form-group col-md-6");
      div2.setAttribute("id", "cantidad");
      document.getElementById("Ingredientes").appendChild(div2);
      instanciar= false;
    }
  

  
  document.getElementById("nombre").appendChild(br1);

  
  document.getElementById("cantidad").appendChild(br2);


 
  x.setAttribute("type", "text");
  x.setAttribute("class", "form-control");
  document.getElementById("nombre").appendChild(x);

  
  y.setAttribute("type", "text");
  y.setAttribute("class", "form-control");
  document.getElementById("cantidad").appendChild(y);
   
  

  
}

 
function eliminar() {

  var c = document.getElementById("nombre").childElementCount;
  var list = document.getElementById("nombre");
  list.removeChild(list.childNodes[c-1]);
  list = document.getElementById("cantidad");
  list.removeChild(list.childNodes[c-1]);
  list = document.getElementById("nombre");
  list.removeChild(list.childNodes[c-2]);
  list = document.getElementById("cantidad");
  list.removeChild(list.childNodes[c-2]);

 
}

function archivo(evt) {
  var files = evt.target.files; // FileList object
  var reader = new FileReader();  
    //Obtenemos la imagen del campo "file". 
  for (var i = 0, f; f = files[i]; i++) {         
       //Solo admitimos imágenes.
       if (!f.type.match('image.*')) {
            continue;
       }
   
       
       
       reader.onload = (function(theFile) {
           return function(e) {
           // Creamos la imagen miniatura.
                  document.getElementById("list").innerHTML = ['<img class="thumb" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');
           };

       })(f);

       reader.readAsDataURL(f);
   }
}
         
  document.getElementById('files').addEventListener('change', archivo, false);





