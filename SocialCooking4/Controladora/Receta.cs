using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BR = Broker;
using EN = Entidades;

namespace Controladora
{
    
    public class Receta
    {
        private BR.SocialCookingEntities db;

        //Metodo constructor
        public Receta()
        {
            db = new BR.SocialCookingEntities();
        }
        //Metodo para crear una receta que recibe una EN.Receta
        public bool CrearReceta(EN.Receta recetas)
        {
            bool resultado = false;
            BR.Recetas temp = new BR.Recetas();
            try
            {
                BR.Recetas rec = new BR.Recetas();
                Usuario temp1 = new Usuario();
                Categorias cat = new Categorias();
                ImagenesxReceta imagenes = new ImagenesxReceta();
                rec.Id_usuario = temp1.getIdUsuario(recetas.correo_usu);
                rec.Id_categoria = cat.getIdCategoria(recetas.Categoria);// verificar el nombre
                rec.Descripcion = recetas.Descripcion;
                rec.PasoApaso = recetas.PasoApaso;
                rec.Idioma = recetas.Idioma;
                rec.Nombre = recetas.Nombre;
                rec.puntuacion = 0;
                rec.nopuntuaciones = 0;
                db.Recetas.Add(rec);
                db.SaveChanges();
                recetas.Id_receta = rec.Id_receta;
                imagenes.ingresarImagenesReceta(recetas);

                resultado = true;

            }
            catch (Exception)
            {

                throw;
            }
            return resultado;
        }

        //Metodo que devuelve todas las recetas de tipo EN.Receta
        public List<EN.Receta> getRecetas()
        {
            List<EN.Receta> recetas = new List<EN.Receta>();
            var query = db.Recetas.ToList();
            foreach (var item in query)
            {
                EN.Receta receta_buscada = new EN.Receta();
                Categorias categoriaController = new Categorias();
                Usuario usu = new Usuario();
                receta_buscada.correo_usu = usu.getNombreUsuario(item.Id_usuario);
                receta_buscada.Categoria = categoriaController.getNombreCategoria(item.Id_categoria);
                receta_buscada.Descripcion = item.Descripcion;
                receta_buscada.PasoApaso = item.PasoApaso;
                receta_buscada.Idioma = item.Idioma;
                receta_buscada.Nombre = item.Nombre;
                receta_buscada.puntuacion = item.puntuacion;
                receta_buscada.nopuntucaiones = item.nopuntuaciones;
                recetas.Add(receta_buscada);
            }

            return recetas;

        }

        //Metodo para obtener recetas por nombre
        public List<EN.Receta> getRecetaxNombre(string nombre_receta)
        {
            List<EN.Receta> recetas = new List<EN.Receta>();

            var query = db.Recetas.Where(x => x.Nombre.Contains(nombre_receta));
            foreach (var item in query)
            {
                EN.Receta receta_buscada = new EN.Receta();
                Categorias categoriaController = new Categorias();
                Usuario usu = new Usuario();
                receta_buscada.correo_usu = usu.getNombreUsuario(item.Id_usuario);
                receta_buscada.Categoria = categoriaController.getNombreCategoria(item.Id_categoria);
                receta_buscada.Descripcion = item.Descripcion;
                receta_buscada.PasoApaso = item.PasoApaso;
                receta_buscada.Idioma = item.Idioma;
                receta_buscada.Nombre = item.Nombre;
                receta_buscada.puntuacion = item.puntuacion;
                receta_buscada.nopuntucaiones = item.nopuntuaciones;
                recetas.Add(receta_buscada);
            }

            return recetas;
        }

        //Metodo para obtener receta por categorias
        public List<EN.Receta> getRecetaxCategoria(string categoria)
        {
            List<EN.Receta> recetas = new List<EN.Receta>();
            Categorias categorias = new Categorias();
            var query = db.Recetas.Where(x => x.Nombre.Contains(categoria));
            foreach (var item in query)
            {
                EN.Receta receta_buscada = new EN.Receta();
                Categorias categoriaController = new Categorias();
                Usuario usuarioController = new Usuario();
                receta_buscada.correo_usu = usuarioController.getNombreUsuario(item.Id_usuario);
                receta_buscada.Categoria = categoriaController.getNombreCategoria(item.Id_categoria);
                receta_buscada.Descripcion = item.Descripcion;
                receta_buscada.PasoApaso = item.PasoApaso;
                receta_buscada.Idioma = item.Idioma;
                receta_buscada.Nombre = item.Nombre;
                receta_buscada.puntuacion = item.puntuacion;
                receta_buscada.nopuntucaiones = item.nopuntuaciones;
                recetas.Add(receta_buscada);
            }

            return recetas;

        }

    }
}
