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
        private BR.SocialCookingEntities1 db = new BR.SocialCookingEntities1();

        public int getIdCategoria(string categoria)
        {

            BR.Categoria categoriaBuscada = db.Categorias.Where(x => x.Descripcion == categoria).FirstOrDefault();

            return categoriaBuscada.Id_categoria;
        }
    }
}
