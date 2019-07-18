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
    public class reportarController : ApiController
    {
        // GET: api/reportar
        public List<EN.previewReceta> Get()
        {
            CT.Receta recetasController = new CT.Receta();
            return recetasController.recetasReportadas();
        }

        // GET: api/reportar/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/reportar
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/reportar/5
        public void Put(int id)
        {
            CT.Receta recetasController = new CT.Receta();
            recetasController.reportarReceta(id);

        }

        // DELETE: api/reportar/5
        public void Delete(int id)
        {
        }
    }
}
