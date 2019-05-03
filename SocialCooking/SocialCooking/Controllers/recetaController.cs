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
        public List<EN.Receta> Get(String categoria)
        {
            CT.Receta recetaController = new CT.Receta();

            return recetaController.getRecetaxCategoria(categoria);
        }

        //buscar  la recta por nombre
        public List<EN.Receta> Get(String nombre, bool validar)
        {
            CT.Receta recetaController = new CT.Receta();

            return recetaController.getRecetaxNombre(nombre);
        }



        // guarda en la bd la receta
        public void Post(EN.Receta recetaTosave)
        {
        
            CT.Receta recetaController = new CT.Receta();
            
            recetaController.CrearRecetaAsync(recetaTosave);
          
        }

        // PUT api/<controller>/5
        public void Put(int id, EN.Receta receta)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int idreceta)
        {
            CT.Receta recetaController = new CT.Receta();

            recetaController.deleteReceta(idreceta);
        }
    }
}