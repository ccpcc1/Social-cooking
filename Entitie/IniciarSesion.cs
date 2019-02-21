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
    public class IniciarSesion
    {
        protected static IMongoClient client = new MongoClient("mongodb://general:123456c@ds225205.mlab.com:25205/social_cooking");
        protected static IMongoDatabase database = client.GetDatabase("social_cooking");

       
        public string ValidarUsuario(Usuario usuario)
        {
            var collection = database.GetCollection<BsonDocument>("Usuarios");
            var filter = Builders<BsonDocument>.Filter.Eq("Correo", usuario.Correo);
            var result = collection.Find(filter).FirstOrDefault();
            Usuario usu = new Usuario();
            if (result!=null)
            {
                //primero hay que convertir el result a un objeto usuario
                // despues mirar si el usuario es moderador, y mostrar la ventana del moderador
                // si no mostrar la ventana de usu normal.
                usu = BsonSerializer.Deserialize<Usuario>(result);

                return usu.TipoUsu;
            }
            else
            {

                string tipoUsu=CrearUsuario(usuario);
                //se agregaria a la base de datos

                return tipoUsu;
                // retornaria normal, y la app lo interpretaria para ingresar al perfil correspondiente

            }
            

            
        }
        public string CrearUsuario(Usuario usu)
        {
            var collection = database.GetCollection<BsonDocument>("Usuarios");
            usu.TipoUsu = "normal";
            BsonDocument documento = usu.ToBsonDocument();
            collection.InsertOne(documento);
            return usu.TipoUsu;
        }
    }
}
