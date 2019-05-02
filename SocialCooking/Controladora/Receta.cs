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
        private BR.Receta recetaToSave;
        private Usuario usuarioController;
        private Categorias categoriasController;
        private ImagenesxReceta imagenesController;
        private Ingredientes ingredientesController;

        //Metodo constructor
        public Receta()
        {
            db = new BR.SocialCookingEntities();
            usuarioController = new Usuario();
            categoriasController = new Categorias();
            imagenesController = new ImagenesxReceta();
            ingredientesController = new Ingredientes();
            recetaToSave = new BR.Receta();

        }
        //Metodo para crear una receta que recibe una EN.Receta
        public bool CrearReceta(EN.Receta recetas)
        {
            bool resultado = false;

            try
            {
                
                //Controladores 
                Usuario usuarioController = new Usuario();
                Categorias categoriasController = new Categorias();
                ImagenesxReceta imagenesController = new ImagenesxReceta();
                Ingredientes ingredientesController = new Ingredientes();

                recetaToSave.Id_usuario = usuarioController.getIdUsuario(recetas.correo_usu);             
                recetaToSave.Descripcion = recetas.Descripcion;
                recetaToSave.PasoApaso = recetas.PasoApaso;
                recetaToSave.Idiomas = recetas.Idioma;
                recetaToSave.Nombre = recetas.Nombre;
                recetaToSave.puntuacion = 0;
                recetaToSave.nopuntuaciones = 0;
                recetaToSave.Id_categoria = categoriasController.getIdCategoria(recetas.Categoria);
                recetaToSave.fechaPublicacion = DateTime.Today;
                recetaToSave.tiempoPreparacion = recetas.tiempoPreparacion;
                recetaToSave.porciones = recetas.porciones;
                db.Recetas.Add(recetaToSave);
                db.SaveChanges();

                ////Se toma la ultima receta guardada
                //BR.Receta tempReceta= db.Recetas.ToList().Last();             
                //recetas.Id_receta = tempReceta.Id_receta;
                //imagenesController.ingresarImagenesReceta(recetas);
                //ingredientesController.ingresarIngrediente(recetas);
                
                resultado = true;

            }
            catch (Exception)
            {

                throw;
            }
            return resultado;
        }
        //Metodo para actualizar una receta 
        public bool ActualizarReceta(int id, EN.Receta recetas)
        {
            bool resultado = false;
            BR.Receta temp = new BR.Receta();
            try
            {

      
                Categorias categoriasController = new Categorias();
                ImagenesxReceta imagenesController = new ImagenesxReceta();
                Ingredientes ingredientesController = new Ingredientes();

                //Query de la receta a actualizar
                BR.Receta rec = db.Recetas.Where(x=>x.Id_categoria == id).FirstOrDefault();
                //Se actualizan los campos
                rec.Descripcion = recetas.Descripcion;
                rec.PasoApaso = recetas.PasoApaso;
                rec.Idiomas = recetas.Idioma;
                rec.Nombre = recetas.Nombre;
                rec.puntuacion = recetas.puntuacion;
                rec.nopuntuaciones = recetas.nopuntucaiones;
                rec.Id_categoria = categoriasController.getIdCategoria(recetas.Categoria);
                rec.fechaPublicacion = DateTime.Today;
                rec.tiempoPreparacion = recetas.tiempoPreparacion;
                rec.porciones = recetas.porciones;

                db.SaveChanges();

                ////Falta verificar como es la actualizacion de los ingredintes
                //BR.Receta tempReceta = db.Recetas.ToList().Last();
                //recetas.Id_receta = tempReceta.Id_receta;
                //imagenesController.ingresarImagenesReceta(recetas);
                //ingredientesController.ingresarIngrediente(recetas);

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
            if (query.GetType() != null)
            {
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
                receta.imagenes = img.getImagenes(query.Id_receta).ToArray();
                receta.ingrediente = ingredientes.getIngredientes(query.Id_receta).ToArray();
                return receta;
            }
            else {
                return null;
            }
            
            
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
