using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EN = Entidades;



public class IniciarSesionController : ApiController
{
    
    // GET api/<controller>
    public string Get(string correo, string nombre)
    {
        string tipoUsuario;
        EN.IniciarSesion SignIn = new EN.IniciarSesion();
        EN.Usuario usu = new EN.Usuario();
        usu.Correo = correo;
        usu.Nombre = nombre;
        tipoUsuario=SignIn.ValidarUsuario(usu);
        return tipoUsuario;
    }

    // GET api/<controller>/5
    public string Get(int id)
    {
        return "value";
    }

    // POST api/<controller>
    public void Post([FromBody]string value)
    {
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
