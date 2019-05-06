using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    public class previewReceta
    {
        public int Id_receta { get; set; }
        public string Descripcion { get; set; }
        public string Idioma { get; set; }
        public string Nombre { get; set; }
        public string imagen { get; set; }
        public string Categoria { get; set; }
        public int puntuacion { get; set; }
        public string fechaPublicacion { get; set; }
        public string tiempoPreparacion { get; set; }
        public int porciones { get; set; }


    }
}
