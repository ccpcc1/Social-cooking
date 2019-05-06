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
    public class ComentariosController : ApiController
    {
        CT.Comentarios comentariosController = new CT.Comentarios();
        // GET: api/Comentarios
        public List<EN.Comentarios> Get(int idReceta, bool opcion)
        {
            return comentariosController.obtenerComentarios(idReceta);
        }

        // GET: api/Comentarios/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Comentarios
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Comentarios/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Comentarios/5
        public void Delete(int id)
        {
        }
    }
}
