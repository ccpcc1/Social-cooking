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
        public void ingresarIngrediente()
        {

        }
    }
}
