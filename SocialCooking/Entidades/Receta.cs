using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Entidades
{
   
    public class Receta
    {
        public int Id_receta { get; set; }
        public string Descripcion { get; set; }
        public string PasoApaso { get; set; }
        public string Idioma { get; set; }
        public string Nombre { get; set; }
        public string[] imagenes { get; set; }
        public Ingrediente[] ingrediente { get; set; }
        public string correo_usu { get; set; }
        public string Categoria { get; set; }
        public int puntuacion { get; set; }
        public int nopuntucaiones { get; set; }
        public string fechaPublicacion { get; set; }
        public string tiempoPreparacion { get; set; }
        public int porciones { get; set; }
    }
}
