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
    public class UsuarioController : ApiController
    {

        CT.Usuario usuarioController = new CT.Usuario();
        // GET api/<controller>
        public int Get(string correo)
        {

            return usuarioController.RetornarTipoUsu(correo);

        }
        public List<Broker.Usuario> Get()
        {

            return usuarioController.getUsuarios();

        }
        // GET api/<controller>/5
        public EN.Usuario Get(string correo, bool confirmacion)
        {
           
            return usuarioController.retornarUser(correo);
        }

        // POST api/<controller>
        public void Post(EN.Usuario usuario)
        {
            usuarioController.crearUsuario(usuario);
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