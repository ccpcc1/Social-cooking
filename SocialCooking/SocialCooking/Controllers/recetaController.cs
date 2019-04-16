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
        // devuelve la receta especifica
        public EN.Receta Get(int idReceta)
        {
            CT.Receta receta = new CT.Receta();

            return receta.getReceta(idReceta);
        }

        // obtener todas las recetas
        public List<EN.Receta> Get()
        {
            CT.Receta recetas = new CT.Receta();
            return recetas.getRecetas();
        }

        //buscar la receta por categoria
        public List<EN.Receta> Get(String categoria)
        {
            CT.Receta receta = new CT.Receta();

            return receta.getRecetaxCategoria(categoria);
        }

        //buscar  la recta por nombre
        public List<EN.Receta> Get(String nombre, bool validar)
        {
            CT.Receta receta = new CT.Receta();

            return receta.getRecetaxNombre(nombre);
        }



        // guarda en la bd la receta
        public void Post(EN.Receta receta)
        {
        
            CT.Receta nuevaReceta = new CT.Receta();
            
            nuevaReceta.CrearReceta(receta);
          
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int idreceta)
        {
            CT.Receta recetaEliminada = new CT.Receta();
            recetaEliminada.deleteReceta(idreceta);
        }
    }
}