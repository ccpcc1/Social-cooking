using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CT = Controladora;
using EN = Entidades;


namespace SocialCooking.Controllers
{
    public class PuntuarController : ApiController
    {
        // GET: api/Puntuar
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Puntuar/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Puntuar
        public void Post(int id,int valor)
        {
            CT.Receta recetaPuntuada = new CT.Receta();
            recetaPuntuada.calificarReceta(id, valor);

        }

        // PUT: api/Puntuar/5
        public void Put(int id, int valor)
        {
            CT.Receta recetaPuntuada = new CT.Receta();
            recetaPuntuada.calificarReceta(id, valor);
        }

        // DELETE: api/Puntuar/5
        public void Delete(int id)
        {
        }
    }
}
