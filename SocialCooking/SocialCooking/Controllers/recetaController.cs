using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CT = Controladora;
using EN = Entidades;
namespace SocialCooking.Controllers
{
    public class recetaController : ApiController
    {

        // obtener todas las recetas
        public List<EN.previewReceta> Get()
        {
            CT.Receta recetasController = new CT.Receta();
            return recetasController.recetasPreview();
        }

        // devuelve la receta especifica
        public EN.Receta Get(int id)
        {
            CT.Receta recetaController = new CT.Receta();

            return recetaController.getReceta(id);


        }

        //buscar la receta por categoria
        public List<EN.previewReceta> Get(String categoria)
        {
            CT.Receta recetaController = new CT.Receta();

            return recetaController.getRecetaxCategoria(categoria);
        }

        //buscar  la recta por nombre
        public List<EN.previewReceta> Get(String nombre, bool validar)
        {
            CT.Receta recetaController = new CT.Receta();

            return recetaController.getRecetaxNombre(nombre);
        }

        // guarda en la bd la receta
        public bool Post(EN.Receta recetaTosave)
        {
        
            CT.Receta recetaController = new CT.Receta();

            recetaController.CrearRecetaAsync(recetaTosave);

            return true;
        }

        // PUT api/<controller>/5
        public void Put(EN.Receta recetaEditada)
        {
            CT.Receta recetasController = new CT.Receta();
            recetasController.ActualizarReceta(recetaEditada.Id_receta, recetaEditada);

        }

       

        // DELETE api/<controller>/5
        [HttpDelete]
        public void Delete(int id)
        {
            CT.Receta recetaController = new CT.Receta();

            recetaController.deleteReceta(id);
        }
    }
}