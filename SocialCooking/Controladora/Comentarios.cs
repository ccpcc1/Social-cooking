using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EN = Entidades;
using CT = Controladora;
using BR = Broker;

namespace Controladora
{
    public class Comentarios
    {
        private BR.SocialCookingEntities db;

        //Metodo constructor
        public Comentarios()
        {
            db = new BR.SocialCookingEntities();
        }

        //Funcion para obtener comentarios por receta
        public List<EN.Comentarios> obtenerComentarios(int idReceta) {

            CT.Usuario usuarioController = new CT.Usuario();

            //Lista que se retonarna de tipo Entidades
            List<EN.Comentarios> listComentarios = new List<EN.Comentarios>();

            //Lista donde esta la consulta con el 
            List<BR.Comentario> query = db.Recetas.Where(x => x.Id_receta == idReceta).FirstOrDefault().Comentarios.ToList();

            foreach (BR.Comentario item in query)
            {
                EN.Comentarios ComentarioReceta = new EN.Comentarios();

                ComentarioReceta.Id_comentario = item.Id_comentario;
                ComentarioReceta.Id_usuario = item.Id_usuario;
                ComentarioReceta.imgUsuario = usuarioController.imagenUsuario(item.Id_usuario);
                ComentarioReceta.Mensaje = item.Mensaje;
                listComentarios.Add(ComentarioReceta);

            }

            return listComentarios;



        }
    }
}
