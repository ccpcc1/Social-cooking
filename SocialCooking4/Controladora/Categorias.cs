using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BR = Broker;
using EN = Entidades;
using CT = Controladora;


namespace Controladora
{
   
    public class Categorias
    {
        private BR.SocialCookingEntities db = new BR.SocialCookingEntities();

        public int getIdCategoria(string categoria)
        {

            BR.Categorias categoriaBuscada = db.Categorias.Where(x => x.Nombre == categoria).FirstOrDefault();

            return categoriaBuscada.Id_categoria;
        }

        public string getNombreCategoria(int id)
        {
           
            return db.Categorias.Where(x => x.Id_categoria == id).FirstOrDefault().Nombre;
        }
    }
}
