using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Bson.Serialization;

namespace Entidades
{
    public class Recetas
    {
        protected static IMongoClient client = new MongoClient("mongodb://general:123456c@ds225205.mlab.com:25205/social_cooking");
        protected static IMongoDatabase database = client.GetDatabase("social_cooking");

        public string NombreReceta { get; set; }
        public Ingrediente[] Ingredientes { get; set; }
        public string Descripcion { set; get; }
        
        public string PasoAPaso { set; get; }

        public string[] Img { get; set; }

        public float Puntuacion { get; set; }

        public string[] Comentarios { get; set; }
        
        public string Idioma { set; get; }

        public string Categoria { set; get; }
        
        public void AgregarReceta(Usuario usuario)
        {
            var collection = database.GetCollection<BsonDocument>("Usuarios");


        }
    }
}
