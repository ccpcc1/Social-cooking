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
        private CT.Usuario usuariosController;

        //Metodo constructor
        public Comentarios()
        {
            db = new BR.SocialCookingEntities();
            usuariosController = new CT.Usuario(); 
        }

        //Funcion para crear comentarios
        public bool crearCometario(EN.Comentarios comentarioEntrante)
        {
            bool resultado = false;

            try
            {
                BR.Comentarios comentario = new BR.Comentarios();
                comentario.Id_usuario = comentarioEntrante.Id_usuario;
                comentario.Mensaje = comentarioEntrante.Mensaje;
                db.Comentarios.Add(comentario);
                db.SaveChanges();
                resultado = true;
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return resultado;


        }

        //Funcion para obtener comentarios por receta
        public List<EN.Comentarios> obtenerComentarios(int idReceta) {

            CT.Usuario usuarioController = new CT.Usuario();

            //Lista que se retonarna de tipo Entidades
            List<EN.Comentarios> listComentarios = new List<EN.Comentarios>();

            //Lista donde esta la consulta con el 
            List<BR.Comentarios> query = db.Recetas.Where(x => x.Id_receta == idReceta).FirstOrDefault().Comentarios.ToList();

            foreach (BR.Comentarios item in query)
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

        //Funcion para obtener comentarios por id de comentario
        public EN.Comentarios obtenerComentario(int idComentario) {

            var query = db.Comentarios.Where(x=> x.Id_comentario==idComentario).FirstOrDefault();
            EN.Comentarios comentarioReceta = new EN.Comentarios();
            comentarioReceta.Id_comentario = query.Id_comentario;
            comentarioReceta.Id_receta = query.Recetas.FirstOrDefault().Id_receta;
            comentarioReceta.Id_usuario = query.Id_usuario;
            comentarioReceta.imgUsuario = usuariosController.imagenUsuario(query.Id_usuario);
            comentarioReceta.Mensaje = query.Mensaje;

            return comentarioReceta;
        }


    }


}
