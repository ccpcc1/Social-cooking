using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
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
           

        }
        //Metodo para crear una receta que recibe una EN.Receta
        public bool CrearReceta(EN.Receta recetaTSave)
        {
            bool resultado = false;
            BR.Recetas temp = new BR.Recetas();
            try
            {

                BR.Recetas rec = new BR.Recetas();
                Usuario temp1 = new Usuario();
                Categorias cat = new Categorias();
                ImagenesxReceta imagenes = new ImagenesxReceta();
                Ingredientes ingredientes = new Ingredientes();
                rec.Id_usuario = 1244;
                rec.Descripcion = recetaTSave.Descripcion;
                rec.PasoApaso = recetaTSave.PasoApaso;
                rec.Idiomas = recetaTSave.Idioma;
                rec.Nombre = recetaTSave.Nombre;
                rec.puntuacion = 0;
                rec.nopuntuaciones = 0;
                rec.Id_categoria = cat.getIdCategoria(recetaTSave.Categoria);
                rec.fechaPublicacion = DateTime.Today;
                rec.tiempoPreparacion = recetaTSave.tiempoPreparacion;
                rec.porciones = recetaTSave.porciones;
                db.Recetas.Add(rec);
                db.SaveChanges();
                BR.Recetas tempReceta = db.Recetas.ToList().Last();
                recetaTSave.Id_receta = tempReceta.Id_receta;
                imagenes.ingresarImagenesReceta(recetaTSave.imagenes,tempReceta.Id_receta);
                ingredientes.ingresarIngrediente(recetaTSave);

                resultado = true;

            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
               
            }
            return resultado;
        }
        //Metodo para actualizar una receta 
        public bool ActualizarReceta(int id, EN.Receta otherReceta)
        {
            bool resultado = false;
            BR.Recetas temp = new BR.Recetas();
            try
            {

      
                Categorias categoriasController = new Categorias();
                ImagenesxReceta imagenesController = new ImagenesxReceta();
                Ingredientes ingredientesController = new Ingredientes();

                //Query de la receta a actualizar
                BR.Recetas rec = db.Recetas.Where(x=>x.Id_categoria == id).FirstOrDefault();
                //Se actualizan los campos
                rec.Descripcion = otherReceta.Descripcion;
                rec.PasoApaso = otherReceta.PasoApaso;
                rec.Idiomas = otherReceta.Idioma;
                rec.Nombre = otherReceta.Nombre;
                rec.puntuacion = otherReceta.puntuacion;
                rec.nopuntuaciones = otherReceta.nopuntucaiones;
                rec.Id_categoria = categoriasController.getIdCategoria(otherReceta.Categoria);
                rec.fechaPublicacion = DateTime.Today;
                rec.tiempoPreparacion = otherReceta.tiempoPreparacion;
                rec.porciones = otherReceta.porciones;

                db.SaveChanges();

                ////Falta verificar como es la actualizacion de los ingredintes
                //BR.Receta tempReceta = db.Recetas.ToList().Last();
                //otherReceta.Id_receta = tempReceta.Id_receta;
                //imagenesController.ingresarImagenesReceta(otherReceta);
                //ingredientesController.ingresarIngrediente(otherReceta);

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
                receta.Categoria = query.Id_categoria.ToString();
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
                db.Recetas.Remove((BR.Recetas)query);
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
            BR.Recetas recetaPuntuada = new BR.Recetas();
            var query = db.Recetas.Where(x => x.Id_receta == idReceta);
            recetaPuntuada = (BR.Recetas)query;
            recetaPuntuada.puntuacion = puntaje;
            recetaPuntuada.nopuntuaciones += 1;
            db.SaveChanges();
        }


    }
}
