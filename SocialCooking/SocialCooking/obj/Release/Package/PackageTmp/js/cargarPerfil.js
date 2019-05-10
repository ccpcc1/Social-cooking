window.onload = load;

function load() {

    
    document.getElementById('compartirReceta').setAttribute('href', "compartirReceta.html?user=" + localStorage.getItem("CorreoUsuario"));
    cargarUsuario();
    getAllRecetas();
   
}