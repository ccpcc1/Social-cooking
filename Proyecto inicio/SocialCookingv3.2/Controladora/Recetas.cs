using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BR = Broker;
using EN = Entidades;

namespace Controladora
{
   public  class Recetas
    {
        private BR.SocialCookingEntidades db = new BR.SocialCookingEntidades();

        public bool Crear(EN.Recetas recetas)
        {
            bool resultado = false;

            try
            {
                //AutoMapper.Mapper.CreateMap<EN.Recetas, BR.Receta>();
                BR.Receta receta = AutoMapper.Mapper.Map<BR.Receta>(recetas);
                db.Recetas.Add(receta);
                db.SaveChanges();


                resultado = true;

            }
            catch (Exception)
            {

                throw;
            }
            return resultado;
        }

    }
}
