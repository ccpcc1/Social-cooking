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
        public bool crearUsuario(EN.Usuario usuario)
        {
            bool resultado = false;

            try
            {
                //AutoMapper.Mapper.CreateMap<EN.Usuario, DA.Usuario>();
                DA.Usuario objUsuario = AutoMapper.Mapper.Map< DA.Usuario>(usuario);
                db.Usuario.Add(objUsuario);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                ((IDisposable)ex).Dispose();

                throw ex;
            }
            return resultado;
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
            try
            {
                DA.Usuario usu = db.Usuario.Where(x => x.Correo == correo).FirstOrDefault();
                Console.WriteLine(usu.Nombre);

                if (usu==null)
                {
                    EN.Usuario user = new EN.Usuario();
                    user.Correo = correo;
                    user.Nombre = "una prueba";
                    user.img = "//";
                    user.IdTipoUsu = 5;
                    crearUsuario(user);
                    return usu.IdTipoUsu;
                }

                return usu.IdTipoUsu;

            }
            catch (Exception ex)
            {

                Console.WriteLine("el error es"+ex);
                throw;
                
            }
            
        }

        public List<DA.Usuario> getUsuarios() {

            return db.Usuario.ToList<DA.Usuario>();

        }
    }
}
