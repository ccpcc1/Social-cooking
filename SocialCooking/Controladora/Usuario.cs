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
                db.Usuarios.Add(objUsuario);
                db.SaveChanges();
                
        }
        public int getIdUsuario(string correo)
        {
            DA.Usuario usu = db.Usuarios.Where(x => x.Correo == correo).FirstOrDefault();
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
          
            return db.Usuarios.Where(x => x.Id_Usuario == id).FirstOrDefault().Nombre; 
        }

        public int RetornarTipoUsu(string correo)
        {
            
                DA.Usuario usu = new DA.Usuario();
                usu = db.Usuarios.Where(x => x.Correo == correo).FirstOrDefault();
                

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

        public List<DA.Usuario> getUsuarios() {

            return db.Usuarios.ToList<DA.Usuario>();

        }
    }
}
