using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace SocialCooking.Controllers
{
    public class FileUploadController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
           
            return new string[] { "value1", "value2" };
            
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>

        public string[] Post()
        {

            // Get the uploaded image from the Files collection
            HttpFileCollection files = HttpContext.Current.Request.Files;
            int fileLenght = files.Count;
            string[] path = new string[fileLenght];

            for (int i = 0; i < fileLenght; i++)
            {
                HttpPostedFile file = files[i];
                string rootPaht = "~/Upload/" +file.FileName;
                path[i] = rootPaht.Substring(2);
                file.SaveAs(HttpContext.Current.Server.MapPath(rootPaht));
            }
            
            return path;

        }
        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}