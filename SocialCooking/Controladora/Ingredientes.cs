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

                //Se agrega a la tabla el recexingredientes el id del ultimo ingrediente que se agrego y el id de la receta
                recetaXIngrediente.Id_ingredientes = ingrediente.Id_ingrediente;
                recetaXIngrediente.Id_receta = receta.Id_receta;
                recetaXIngrediente.cantidad = receta.ingrediente[i].cantidad;
                recetaXIngrediente.unidad = receta.ingrediente[i].unidades;
                db.recetasxIngredientes.Add(recetaXIngrediente);
                db.SaveChanges();

            }
            

        }
        public List<EN.Ingrediente> getIngredientes(int idReceta)
        {
            List <EN.Ingrediente> listaIngredientes = new List<EN.Ingrediente>();

            var query = db.recetasxIngredientes.Where(x => x.Id_receta == idReceta);

            foreach (var item in query)
            {
                EN.Ingrediente ingrediente = new EN.Ingrediente();
                ingrediente.ingrediente = item.Ingredientes.nombre;
                ingrediente.cantidad = item.cantidad;
                ingrediente.unidades = item.unidad;
                listaIngredientes.Add(ingrediente);
            }
            return listaIngredientes;

        }
    }
}
