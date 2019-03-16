using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    [Serializable]
    public class Receta
    {
        int Id_receta { get; set; }
        string Descripcion { get; set; }
        string PasoApaso { get; set; }
        string Idioma { get; set; }
        string Nombre { get; set; }
        string[] imagenes { get; set; }
        string correo_usu { get; set; }
        string Categoria { get; set; }
        int puntuacion { get; set; }
        int nopuntucaiones { get; set; }
    }
}
