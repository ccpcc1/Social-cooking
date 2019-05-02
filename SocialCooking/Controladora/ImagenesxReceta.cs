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

            imgsToSave.Id_receta = idReceta;

            foreach (var rutas in paths)
            {

                imgsToSave.ImagePath = rutas;
                db.imagenesxRecetas.Add(imgsToSave);
                db.SaveChanges();
            

        }
            }

        //Metodo para obtener los strings con las direcciones de la imagenes
        public List<string> getImagenes(int id)
        {
            //Lista a retornar
            List<string> paths = new List<string>();
            //Consulta por LINQ
            var query = db.imagenesxRecetas.Where(x => x.Id_receta == id);

            foreach (var imagen in query)
            {
                paths.Add(imagen.ImagePath);
            }
            return paths;

        }

        public EN.Receta convertirImg(EN.Receta imgReceta)
        {
            string ruta = "../SocialCooking/images/";
            for (int i = 0; i < imgReceta.imgs.Length; i++)
            {
                imgReceta.imgs[i].CopyTo(ruta);
                imgReceta.imagenes[i] = imgReceta.imgs[i].Name;
            }
            return imgReceta;
        }
    }
}
