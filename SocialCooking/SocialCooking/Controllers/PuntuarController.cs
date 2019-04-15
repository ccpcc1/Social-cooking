using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

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
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Puntuar/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Puntuar/5
        public void Delete(int id)
        {
        }
    }
}
