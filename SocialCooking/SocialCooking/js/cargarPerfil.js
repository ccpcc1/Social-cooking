window.onload = load;

function load() {

    
    document.getElementById('compartirReceta').setAttribute('href', "compartirReceta.html?user=" + localStorage.getItem("CorreoUsuario"));
    document.getElementById('misRecetas').setAttribute('href', "misRecetas.html?user=" + localStorage.getItem("CorreoUsuario"));
    cargarUsuario();
    getAllRecetas();
   
}