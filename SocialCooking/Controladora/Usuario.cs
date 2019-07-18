using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DA = Broker;
using EN = Entidades;

namespace Controladora
{
    public class Usuario
    {
        private DA.SocialCookingEntities db = new DA.SocialCookingEntities();

        public void crearUsuario(EN.Usuario usuario)
        {
            DA.Usuario objUsuario = new DA.Usuario();
            objUsuario.Correo = usuario.Correo;
            objUsuario.img = usuario.img;
            objUsuario.Nombre = usuario.Nombre;
            objUsuario.IdTipoUsu = 5;
            db.Usuario.Add(objUsuario);
            db.SaveChanges();

        }
        public int getIdUsuario(string correo)
        {
            DA.Usuario usu = db.Usuario.Where(x => x.Correo == correo).FirstOrDefault();

            if (usu != null)
            {
                return usu.Id_Usuario;
            }
            else
            {
                return 0;
            }
        }
        public string getNombreUsuario(int id)
        {

            return db.Usuario.Where(x => x.Id_Usuario == id).FirstOrDefault().Nombre;
        }

        public int RetornarTipoUsu(string correo)
        {

            DA.Usuario usu = new DA.Usuario();
            usu = db.Usuario.Where(x => x.Correo == correo).FirstOrDefault();


            if (usu == null)
            {
                //int tipoUsuario;
                //EN.Usuario user = new EN.Usuario();
                //user.Correo = correo;
                //user.Nombre = "una prueba";
                //user.img = "//";
                //user.IdTipoUsu = 5;
                //tipoUsuario =crearUsuario(user);
                //return tipoUsuario;
                return 0;
            }

            return usu.IdTipoUsu;




        }

        public List<DA.Usuario> getUsuarios()
        {

            return db.Usuario.ToList<DA.Usuario>();

        }

        public EN.Usuario retornarUser(string correo)
        {
            
            DA.Usuario usu = new DA.Usuario();
            EN.Usuario user = new EN.Usuario();
            usu = db.Usuario.Where(x => x.Correo.Contains(correo)).FirstOrDefault();
            user.Correo = usu.Correo;
            user.Nombre = usu.Nombre;
            user.IdTipoUsu = usu.IdTipoUsu;
            user.img = usu.img;
            user.Id_Usuario = usu.Id_Usuario;
            return user;
        }

        public string imagenUsuario(int idUsusario) {

            return db.Usuario.Where(x => x.Id_Usuario == idUsusario).FirstOrDefault().img;
        }

    }
}