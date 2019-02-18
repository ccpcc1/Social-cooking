using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    class Usuario
    {
        [BsonElement("_id")] // este es campo que pone por defecto el mongoDB
        public string Correo { get; set; }
        public string Nombre { get; set; }
        
        public string TipoUsu { get; set; }
        public Recetas Receta { get; set; }

        //aqui se mapearia el documento usuario

    }
}


