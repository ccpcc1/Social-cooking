using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
   public class Comentarios
    {
        public int Id_receta { get; set; }
        public int Id_comentario { get; set; }
        public int Id_usuario { get; set; }
        public string Mensaje { get; set; }
        public string imgUsuario { get; set; }
    }
}
