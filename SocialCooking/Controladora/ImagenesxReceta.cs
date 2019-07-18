using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BR = Broker;
using EN = Entidades;

namespace Controladora
{
   public class ImagenesxReceta
    {
        private BR.SocialCookingEntities db;
        private BR.imagenesxReceta imgsToSave;

        //Metodo constructor
        public ImagenesxReceta()
        {
            db = new BR.SocialCookingEntities();
            imgsToSave = new BR.imagenesxReceta();
        }

        //Metodo para ingresar el array de imagenes a la receta
        public void ingresarImagenesReceta(string [] paths, int idReceta)
        {
            BR.imagenesxReceta imagenToSave = new BR.imagenesxReceta();

            imagenToSave.Id_receta = idReceta;

            foreach (string ruta in paths)
                {

                   imagenToSave.ImagePath = ruta;

                   //Se guarda la ruta de cada imagen
                   db.imagenesxReceta.Add(imagenToSave);
                   db.SaveChanges();
            

                }
            }

        //Metodo para obtener los strings con las direcciones de la imagenes
        public List<string> getImagenes(int id)
        {
            //Lista a retornar
            List<string> paths = new List<string>();
            //Consulta por LINQ
            var query = db.imagenesxReceta.Where(x => x.Id_receta == id);

            foreach (var imagen in query)
            {
                paths.Add(imagen.ImagePath);
            }
            return paths;

        }

    }
}
