using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Entidades
{
   
    public class Usuario
    {

        public int Id_Usuario { get; set; }
        public string Nombre { get; set; }
        public string Correo { get; set; }
        public int IdTipoUsu { get; set; }

        public string img { get; set; }
    }
}