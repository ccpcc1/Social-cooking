using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    class Recetas
    {
        public string NombreReceta { get; set; }
        public Ingrediente[] Ingredientes { get; set; }
        public string Descripcion { set; get; }
        
        public string PasoAPaso { set; get; }

        public string[] Img { get; set; }

        public float Puntuacion { get; set; }

        public string[] Comentarios { get; set; }
        
        public string Idioma { set; get; }

        public string Categoria { set; get; }
        

    }
}
