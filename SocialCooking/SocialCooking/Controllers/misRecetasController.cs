using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EN = Entidades;
using CT = Controladora;

namespace SocialCooking.Controllers
{
    public class misRecetasController : ApiController
    {
        // GET: api/misRecetas
        public List<EN.previewReceta> Get(string correo)
        {
            CT.Receta recetaController = new CT.Receta();

            return recetaController.obtenerRecetasPorUsuario(correo);
        }
        // GET: api/misRecetas/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/misRecetas
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/misRecetas/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/misRecetas/5
        public void Delete(int id)
        {
        }
    }
}
