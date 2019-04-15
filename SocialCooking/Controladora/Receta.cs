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
            BR.Receta temp = new BR.Receta();
            try
            {
                
                BR.Receta rec = new BR.Receta();
                Usuario temp1 = new Usuario();
                Categorias cat = new Categorias();
                ImagenesxReceta imagenes = new ImagenesxReceta();
                Ingredientes ingredientes = new Ingredientes();
                rec.Id_usuario = temp1.getIdUsuario(recetas.correo_usu);             
                rec.Descripcion = recetas.Descripcion;
                rec.PasoApaso = recetas.PasoApaso;
                rec.Idiomas = recetas.Idioma;
                rec.Nombre = recetas.Nombre;
                rec.puntuacion = 0;
                rec.nopuntuaciones = 0;
                rec.Id_categoria = cat.getIdCategoria(recetas.Categoria);
                db.Recetas.Add(rec);
                db.SaveChanges();//hasta aqui va bien
                BR.Receta tempReceta= db.Recetas.ToList().Last();             
                recetas.Id_receta = tempReceta.Id_receta;
                imagenes.ingresarImagenesReceta(recetas);
                ingredientes.ingresarIngrediente(recetas);
                
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
                ImagenesxReceta img = new ImagenesxReceta();
                Ingredientes ingredientes = new Ingredientes();
                Usuario usu = new Usuario();
                receta_buscada.Id_receta = item.Id_receta;
                receta_buscada.correo_usu = usu.getNombreUsuario(item.Id_usuario);
                receta_buscada.Categoria = categoriaController.getNombreCategoria(item.Id_categoria);
                receta_buscada.Descripcion = item.Descripcion;
                receta_buscada.PasoApaso = item.PasoApaso;
                receta_buscada.Idioma = item.Idiomas;
                receta_buscada.Nombre = item.Nombre;
                receta_buscada.puntuacion = item.puntuacion;
                receta_buscada.nopuntucaiones = item.nopuntuaciones;
                receta_buscada.imagenes = img.getImagenes(item.Id_receta).ToArray();
                receta_buscada.ingrediente = ingredientes.getIngredientes(item.Id_receta).ToArray();
                recetas.Add(receta_buscada);
            }

            return recetas;

        }

        // metodo que devuelve una receta en especifico
        public EN.Receta getReceta(int idReceta)
        {
            EN.Receta receta = new EN.Receta();
            Usuario usuario = new Usuario();
            Categorias categoria = new Categorias();
            ImagenesxReceta img = new ImagenesxReceta();
            Ingredientes ingredientes = new Ingredientes();
            var query = db.Recetas.Where(x => x.Id_receta==idReceta).FirstOrDefault();
            receta.Id_receta = query.Id_receta;
            receta.Idioma = query.Idiomas;
            receta.PasoApaso = query.PasoApaso;
            receta.Descripcion = query.Descripcion;
            receta.Nombre = query.Nombre;
            receta.puntuacion = query.puntuacion;
            receta.Categoria = query.Categoria.Nombre;
            receta.correo_usu = usuario.getNombreUsuario(query.Id_usuario);
            receta.Categoria = categoria.getNombreCategoria(query.Id_categoria);
            receta.nopuntucaiones = query.nopuntuaciones;
            receta.imagenes =img.getImagenes(query.Id_receta).ToArray();
            receta.ingrediente = ingredientes.getIngredientes(query.Id_receta).ToArray();


            return receta;
        }

        //Metodo para obtener recetas por nombre
        public List<EN.Receta> getRecetaxNombre(string nombre_receta)
        {
            List<EN.Receta> recetas = new List<EN.Receta>();
            ImagenesxReceta img = new ImagenesxReceta();
            Ingredientes ingredientes = new Ingredientes();
            var query = db.Recetas.Where(x => x.Nombre.Contains(nombre_receta));
            foreach (var item in query)
            {
                EN.Receta receta_buscada = new EN.Receta();
                Categorias categoriaController = new Categorias();
                Usuario usu = new Usuario();
                receta_buscada.Id_receta = item.Id_receta;
                receta_buscada.correo_usu = usu.getNombreUsuario(item.Id_usuario);
                receta_buscada.Categoria = categoriaController.getNombreCategoria(item.Id_categoria);
                receta_buscada.Descripcion = item.Descripcion;
                receta_buscada.PasoApaso = item.PasoApaso;
                receta_buscada.Idioma = item.Idiomas;
                receta_buscada.Nombre = item.Nombre;
                receta_buscada.puntuacion = item.puntuacion;
                receta_buscada.nopuntucaiones = item.nopuntuaciones;
                receta_buscada.imagenes = img.getImagenes(item.Id_receta).ToArray();
                receta_buscada.ingrediente = ingredientes.getIngredientes(item.Id_receta).ToArray();
                recetas.Add(receta_buscada);
            }

            return recetas;
        }

        //Metodo para obtener receta por categorias
        public List<EN.Receta> getRecetaxCategoria(string categoria)
        {
            List<EN.Receta> recetas = new List<EN.Receta>();
            Categorias categorias = new Categorias();
            ImagenesxReceta img = new ImagenesxReceta();
            Ingredientes ingredientes = new Ingredientes();
            int prueba = categorias.getIdCategoria(categoria);
            var query = db.Recetas.Where(x => x.Id_categoria== prueba);
            foreach (var item in query)
            {
                EN.Receta receta_buscada = new EN.Receta();
                Categorias categoriaController = new Categorias();
                Usuario usuarioController = new Usuario();
                receta_buscada.Id_receta = item.Id_receta;
                receta_buscada.correo_usu = usuarioController.getNombreUsuario(item.Id_usuario);
                receta_buscada.Categoria = categoriaController.getNombreCategoria(item.Id_categoria);
                receta_buscada.Descripcion = item.Descripcion;
                receta_buscada.PasoApaso = item.PasoApaso;
                receta_buscada.Idioma = item.Idiomas;
                receta_buscada.Nombre = item.Nombre;
                receta_buscada.puntuacion = item.puntuacion;
                receta_buscada.nopuntucaiones = item.nopuntuaciones;
                receta_buscada.imagenes = img.getImagenes(item.Id_receta).ToArray();
                receta_buscada.ingrediente = ingredientes.getIngredientes(item.Id_receta).ToArray();
                recetas.Add(receta_buscada);
            }

            return recetas;

        }
        public int deleteReceta(int IdReceta)
        {

            var query = db.Recetas.Where(x => x.Id_receta == IdReceta);
            if (query != null)
            {
                db.Recetas.Remove((BR.Receta)query);
                db.SaveChanges();
                return 1;
            }
            else
            {
                return 0;
            }
        }

        public void calificarReceta(int idReceta, int puntaje)
        {
            BR.Receta recetaPuntuada = new BR.Receta();
            var query = db.Recetas.Where(x => x.Id_receta == idReceta);
            recetaPuntuada = (BR.Receta)query;
            recetaPuntuada.puntuacion = puntaje;
            recetaPuntuada.nopuntuaciones += 1;
            db.SaveChanges();
        }


    }
}
