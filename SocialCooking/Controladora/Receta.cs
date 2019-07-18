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
        public BR.SocialCookingEntities db;
        public Usuario usuarioController;
        public Categorias categoriasController;
        public ImagenesxReceta imagenesController;
        public Ingredientes ingredientesController;
        BR.Recetas BrokerReceta;

        //Metodo constructor
        public Receta()
        {
            db = new BR.SocialCookingEntities();
            usuarioController = new Usuario();
            categoriasController = new Categorias();
            imagenesController = new ImagenesxReceta();
            ingredientesController = new Ingredientes();
            BrokerReceta = new BR.Recetas();


        }
        //Metodo para crear una receta que recibe una EN.Receta
        public bool CrearRecetaAsync(EN.Receta recetaTSave)
        {
            bool resultado = false;

            try
            {
                BrokerReceta.estaReportada = 0;
                BrokerReceta.Descripcion = recetaTSave.Descripcion;
                BrokerReceta.fechaPublicacion = DateTime.Today;
                BrokerReceta.Idiomas = recetaTSave.Idioma;
                BrokerReceta.Id_categoria = categoriasController.getIdCategoria(recetaTSave.Categoria);
                BrokerReceta.Id_usuario = usuarioController.getIdUsuario(recetaTSave.correo_usu);
                BrokerReceta.Nombre = recetaTSave.Nombre;
                BrokerReceta.nopuntuaciones = 0;
                BrokerReceta.puntuacion = 0;
                BrokerReceta.PasoApaso = recetaTSave.PasoApaso;
                BrokerReceta.porciones = recetaTSave.porciones;
                BrokerReceta.tiempoPreparacion = recetaTSave.tiempoPreparacion;
                db.Recetas.Add(BrokerReceta);
                db.SaveChanges();


                //Guardar el path de las imagenes
                //BR.Recetas tempReceta = db.Recetas.OrderByDescending(x=>x.Id_receta).FirstOrDefault();
                recetaTSave.Id_receta = BrokerReceta.Id_receta;
                imagenesController.ingresarImagenesReceta(recetaTSave.imagenes, BrokerReceta.Id_receta);
                //Guardar los ingredientes
                ingredientesController.ingresarIngrediente(recetaTSave);
                resultado = true;


            }
            catch (Exception ex) {

                throw ex;
            }

            return resultado;
        }
        //Metodo para actualizar una receta 
        public bool ActualizarReceta(int id, EN.Receta otherReceta)
        {
            bool resultado = false;



            try
            {


                Categorias categoriasController = new Categorias();
                ImagenesxReceta imagenesController = new ImagenesxReceta();
                Ingredientes ingredientesController = new Ingredientes();

                //Query de la receta a actualizar
                BR.Recetas rec = db.Recetas.Where(x => x.Id_receta == id).FirstOrDefault();
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

                //Falta verificar como es la actualizacion de los ingredientes

                if (otherReceta.imagenes.Length > 0)
                {
                    imagenesController.ingresarImagenesReceta(otherReceta.imagenes, otherReceta.Id_receta);
                }
                if (otherReceta.ingrediente.Length > 0)
                {
                    ingredientesController.ingresarIngrediente(otherReceta);
                }


                resultado = true;

            }
            catch (Exception)
            {

                throw;
            }
            return resultado;
        }
        //Obtener las recetas de un usuario especifco
        public List<EN.previewReceta> obtenerRecetasPorUsuario(string correo) {

            int id = usuarioController.getIdUsuario(correo);

            var query = db.Recetas.Where(x => x.Id_usuario == id).ToList().OrderBy(x => x.fechaPublicacion);

            List<EN.previewReceta> listToReturn = new List<EN.previewReceta>();

            foreach (var receta in query)
            {
                EN.previewReceta pr = new EN.previewReceta();
                pr.Categoria = categoriasController.getNombreCategoria(receta.Id_categoria);
                pr.Descripcion = receta.Descripcion;
                pr.fechaPublicacion = receta.fechaPublicacion.ToString();
                pr.Idioma = receta.Idiomas;
                pr.Id_receta = receta.Id_receta;
                if (receta.imagenesxReceta.ToList().Count == 0)
                {
                    pr.imagen = "images/imagen-no-disponible.jpg";
                }
                else
                {
                    pr.imagen = receta.imagenesxReceta.ToList().First().ImagePath;
                }

                pr.Nombre = receta.Nombre;
                pr.porciones = Convert.ToInt32(receta.porciones);
                pr.puntuacion = receta.puntuacion;
                pr.tiempoPreparacion = receta.tiempoPreparacion;
                listToReturn.Add(pr);
            }
            return listToReturn;
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
        //Funcion para traer un preview de receta
        public List<EN.previewReceta> recetasPreview() {

            var query = db.Recetas.ToList().OrderByDescending(x => x.fechaPublicacion);

            List<EN.previewReceta> listToReturn = new List<EN.previewReceta>();

            foreach (var receta in query)
            {
                EN.previewReceta pr = new EN.previewReceta();
                pr.Categoria = categoriasController.getNombreCategoria(receta.Id_categoria);
                pr.Descripcion = receta.Descripcion;
                pr.fechaPublicacion = receta.fechaPublicacion.ToString();
                pr.Idioma = receta.Idiomas;
                pr.Id_receta = receta.Id_receta;
                if (receta.imagenesxReceta.ToList().Count == 0)
                {
                    pr.imagen = "images/imagen-no-disponible.jpg";
                }
                else {
                    pr.imagen = receta.imagenesxReceta.ToList().First().ImagePath;
                }

                pr.Nombre = receta.Nombre;
                pr.porciones = Convert.ToInt32(receta.porciones);
                pr.puntuacion = receta.puntuacion;
                pr.tiempoPreparacion = receta.tiempoPreparacion;
                listToReturn.Add(pr);
            }
            return listToReturn;
        }
        // metodo que devuelve una receta en especifico
        public EN.Receta getReceta(int idReceta)
        {
            EN.Receta recetaADevolver = new EN.Receta();

            var query = db.Recetas.Where(x => x.Id_receta == idReceta).FirstOrDefault();

            if (query.GetType() != null)
            {
                recetaADevolver.Id_receta = query.Id_receta;
                recetaADevolver.Idioma = query.Idiomas;
                recetaADevolver.PasoApaso = query.PasoApaso;
                recetaADevolver.Descripcion = query.Descripcion;
                recetaADevolver.Nombre = query.Nombre;
                recetaADevolver.puntuacion = query.puntuacion;
                recetaADevolver.Categoria = query.Id_categoria.ToString();
                recetaADevolver.correo_usu = usuarioController.getNombreUsuario(query.Id_usuario);
                recetaADevolver.Categoria = categoriasController.getNombreCategoria(query.Id_categoria);
                recetaADevolver.nopuntucaiones = query.nopuntuaciones;
                recetaADevolver.imagenes = imagenesController.getImagenes(query.Id_receta).ToArray();
                recetaADevolver.ingrediente = ingredientesController.getIngredientes(query.Id_receta).ToArray();
                recetaADevolver.tiempoPreparacion = query.tiempoPreparacion;
                recetaADevolver.porciones = Convert.ToInt32(query.porciones);
                var fechaCorta = query.fechaPublicacion.ToString();
                recetaADevolver.fechaPublicacion = fechaCorta;
                return recetaADevolver;
            }
            else {
                return null;
            }


        }
        //Metodo para obtener recetas por nombre
        public List<EN.previewReceta> getRecetaxNombre(string nombre_receta)
        {

            List<EN.previewReceta> retorno = new List<EN.previewReceta>();


            var query = db.Recetas.Where(x => x.Nombre.Contains(nombre_receta));

            foreach (var item in query)
            {
                EN.previewReceta nuevaReceta = new EN.previewReceta();
                nuevaReceta.Id_receta = item.Id_receta;
                nuevaReceta.Categoria = item.Categorias.Nombre;
                nuevaReceta.Descripcion = item.Descripcion;
                nuevaReceta.fechaPublicacion = item.fechaPublicacion.ToString();
                nuevaReceta.Idioma = item.Idiomas;
                if (item.imagenesxReceta.ToList().Count == 0)
                {
                    nuevaReceta.imagen = "images/imagen-no-disponible.jpg";
                }
                else
                {
                    nuevaReceta.imagen = item.imagenesxReceta.ToList().First().ImagePath;
                }
                nuevaReceta.Nombre = item.Nombre;
                nuevaReceta.porciones = Convert.ToInt32(item.porciones);
                nuevaReceta.puntuacion = item.puntuacion;
                nuevaReceta.tiempoPreparacion = item.tiempoPreparacion;
                retorno.Add(nuevaReceta);
            }

            return retorno;
        }
        //Metodo para obtener receta por categorias
        public List<EN.previewReceta> getRecetaxCategoria(string categoria)
        {
            List<EN.previewReceta> retorno = new List<EN.previewReceta>();

            int idCategoria = categoriasController.getIdCategoria(categoria);

            var query = db.Recetas.Where(x => x.Id_categoria == idCategoria);

            foreach (var item in query)
            {
                EN.previewReceta nuevaReceta = new EN.previewReceta();
                nuevaReceta.Id_receta = item.Id_receta;
                nuevaReceta.Categoria = item.Categorias.Nombre;
                nuevaReceta.Descripcion = item.Descripcion;
                nuevaReceta.fechaPublicacion = item.fechaPublicacion.ToString();
                nuevaReceta.Idioma = item.Idiomas;
                if (item.imagenesxReceta.ToList().Count == 0)
                {
                    nuevaReceta.imagen = "images/imagen-no-disponible.jpg";
                }
                else
                {
                    nuevaReceta.imagen = item.imagenesxReceta.ToList().First().ImagePath;
                }
                nuevaReceta.Nombre = item.Nombre;
                nuevaReceta.porciones = Convert.ToInt32(item.porciones);
                nuevaReceta.puntuacion = item.puntuacion;
                nuevaReceta.tiempoPreparacion = item.tiempoPreparacion;
                retorno.Add(nuevaReceta);
            }

            return retorno;

        }

        public int deleteReceta(int IdReceta)
        {
            ///Receta a elminar
            BR.Recetas query = db.Recetas.Where(x => x.Id_receta == IdReceta).FirstOrDefault();
            List<BR.imagenesxReceta> imagenes = db.imagenesxReceta.Where(x => x.Id_receta == IdReceta).ToList();
            List<BR.recetasxIngredientes> ingredientesxReceta = db.recetasxIngredientes.Where(x => x.Id_receta == IdReceta).ToList();

            if (query != null)
            {
                //Eliminar ingredientes
                foreach (BR.recetasxIngredientes item in ingredientesxReceta)
                {
                    BR.Ingredientes ingrediente = db.Ingredientes.Where(x => x.Id_ingrediente == item.Id_ingredientes).FirstOrDefault();
                    db.Ingredientes.Remove(ingrediente);
                    db.recetasxIngredientes.Remove(item);
                    db.SaveChanges();
                }
                //Eliminar imagenes
                foreach (BR.imagenesxReceta item in imagenes)
                {
                    db.imagenesxReceta.Remove(item);
                    db.SaveChanges();
                }

                //Eliminar comentarios

                //Eliminar receta
                db.Recetas.Remove(query);
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
            BR.Recetas recetaPuntuada = db.Recetas.Where(x => x.Id_receta == idReceta).FirstOrDefault();
            recetaPuntuada.nopuntuaciones += 1;
            var puntucacionActual = recetaPuntuada.puntuacion + puntaje;
            if (recetaPuntuada.nopuntuaciones == 1)
            {

                recetaPuntuada.puntuacion = puntucacionActual / recetaPuntuada.nopuntuaciones;
            }
            else
            {
                recetaPuntuada.puntuacion = puntucacionActual / 2;
            }
           
        

        db.SaveChanges();
        }

        public void reportarReceta(int idReceta) {

            BR.Recetas reportarReceta = db.Recetas.Where(x=>x.Id_receta == idReceta).FirstOrDefault();

            reportarReceta.estaReportada += 1;

            db.SaveChanges();
        }

        public List<EN.previewReceta> recetasReportadas()
        {

            var query = db.Recetas.Where(x=>x.estaReportada>0).ToList().OrderByDescending(x => x.fechaPublicacion);

            List<EN.previewReceta> listToReturn = new List<EN.previewReceta>();

            foreach (var receta in query)
            {
                EN.previewReceta pr = new EN.previewReceta();
                pr.Categoria = categoriasController.getNombreCategoria(receta.Id_categoria);
                pr.Descripcion = receta.Descripcion;
                pr.fechaPublicacion = receta.fechaPublicacion.ToString();
                pr.Idioma = receta.Idiomas;
                pr.Id_receta = receta.Id_receta;
                if (receta.imagenesxReceta.ToList().Count == 0)
                {
                    pr.imagen = "images/imagen-no-disponible.jpg";
                }
                else
                {
                    pr.imagen = receta.imagenesxReceta.ToList().First().ImagePath;
                }

                pr.Nombre = receta.Nombre;
                pr.porciones = Convert.ToInt32(receta.porciones);
                pr.puntuacion = receta.puntuacion;
                pr.tiempoPreparacion = receta.tiempoPreparacion;
                listToReturn.Add(pr);
            }
            return listToReturn;
        }

    }
}
