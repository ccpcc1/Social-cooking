using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BR = Broker;
using EN = Entidades;

namespace Controladora
{
   public class Ingredientes
    {
        private BR.SocialCookingEntities db;

        //Metodo constructor
        public Ingredientes()
        {
            db = new BR.SocialCookingEntities();
        }
        public void ingresarIngrediente(EN.Receta receta)
        {
            
            for(int i=0;i<receta.ingrediente.Length;i++)
            {
                BR.Ingredientes ingrediente = new BR.Ingredientes();
                BR.recetasxIngredientes recetaXIngrediente = new BR.recetasxIngredientes();
                // primero se añade el ingrediente
                ingrediente.nombre = receta.ingrediente[i].ingrediente;
                db.Ingredientes.Add(ingrediente);
                db.SaveChanges();

                // se agrega a la tabla el recexingredientes el id del ultimo ingrediente que se agrego y el id de la receta
                recetaXIngrediente.Id_ingredientes = db.Ingredientes.ToList().Last().Id_ingrediente;
                recetaXIngrediente.Id_receta = receta.Id_receta;
                recetaXIngrediente.cantidad = receta.ingrediente[i].cantidad;
                db.recetasxIngredientes.Add(recetaXIngrediente);
                db.SaveChanges();
                               
            }
            

        }
        public List<EN.Ingrediente> getIngredientes(int idReceta)
        {
            EN.Ingrediente ingrediente = new EN.Ingrediente();
            List < EN.Ingrediente > ingredientes = new List<EN.Ingrediente>();
            var query = db.recetasxIngredientes.Where(x => x.Id_receta == idReceta);
            foreach (var item in query)
            {
                
                ingrediente.ingrediente = item.Ingredientes.nombre;
                ingrediente.cantidad = item.cantidad;             
                ingredientes.Add(ingrediente);
            }
            return ingredientes;

        }
    }
}
