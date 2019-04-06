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

        //Metodo constructor
        public ImagenesxReceta()
        {
            db = new BR.SocialCookingEntities();
        }

        //Metodo para ingresar el array de imagenes a la receta
        public void ingresarImagenesReceta(EN.Receta receta)
        {
            BR.imagenesxReceta imgReceta = new BR.imagenesxReceta();
            imgReceta.Id_receta = receta.Id_receta;

            foreach (var otherReceta in receta.imagenes)
            {
                
                imgReceta.img = otherReceta;
                db.imagenesxReceta.Add(imgReceta);
                db.SaveChanges();
            

        }
            }

        //Metodo para obtener los strings con las direcciones de la imagenes
        public List<string> getImagenes(int id)
        {
            //Lista a retornar
            List<string> imagenes = new List<string>();
            //Consulta por LINQ
            var query = db.imagenesxReceta.Where(x => x.Id_receta == id);
            foreach (var imagen in query)
            {
                imagenes.Add(imagen.img);
            }
            return imagenes;

        }
    }
}
