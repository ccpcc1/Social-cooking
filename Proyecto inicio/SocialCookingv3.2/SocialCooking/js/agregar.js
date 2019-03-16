

var instanciar= true;



function agregar() {
  
  

  if(instanciar== true)
  {
  var div1 = document.createElement("DIV")
  div1.setAttribute("class", "form-group col-md-6");
  div1.setAttribute("id", "nombre");
  document.getElementById("Ingredientes").appendChild(div1);

  var div2 = document.createElement("DIV")
  div2.setAttribute("class", "form-group col-md-6");
  div2.setAttribute("id", "cantidad");
  document.getElementById("Ingredientes").appendChild(div2);
  instanciar= false;
  }
  

  var br1 = document.createElement("BR")
  document.getElementById("nombre").appendChild(br1);

  var br2 = document.createElement("BR")
  document.getElementById("cantidad").appendChild(br2);


  var x = document.createElement("INPUT");
  x.setAttribute("type", "text");
  x.setAttribute("class", "form-control");
  document.getElementById("nombre").appendChild(x);

  var y = document.createElement("INPUT");
  y.setAttribute("type", "text");
  y.setAttribute("class", "form-control");
  document.getElementById("cantidad").appendChild(y);
   
  

  
}

 
function eliminar() {

  var c = document.getElementById("nombre").childElementCount;

  var list = document.getElementById("nombre");
  list.removeChild(list.childNodes[c-1]);

  var list = document.getElementById("cantidad");
  list.removeChild(list.childNodes[c-1]);

  var list = document.getElementById("nombre");
  list.removeChild(list.childNodes[c-2]);

  var list = document.getElementById("cantidad");
  list.removeChild(list.childNodes[c-2]);

 
}

function archivo(evt) {
  var files = evt.target.files; // FileList object
   
    //Obtenemos la imagen del campo "file". 
  for (var i = 0, f; f = files[i]; i++) {         
       //Solo admitimos imágenes.
       if (!f.type.match('image.*')) {
            continue;
       }
   
       var reader = new FileReader();
       
       reader.onload = (function(theFile) {
           return function(e) {
           // Creamos la imagen.
                  document.getElementById("list").innerHTML = ['<img class="thumb" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');
           };

       })(f);

       reader.readAsDataURL(f);
   }
}
         
  document.getElementById('files').addEventListener('change', archivo, false);





