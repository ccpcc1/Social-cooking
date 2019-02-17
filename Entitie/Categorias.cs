using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entitie
{
    class Categorias
    {

        [BsonElement("_id")]

        public string Nombre { set; get; }
        public string Descripcion { get; set; }
    }
}
