using System;
using System.Runtime.Serialization;

namespace Controladora
{
    [Serializable]
    internal class ControlllersException : Exception
    {
        private string v;
        private object e;

        public ControlllersException()
        {
        }

        public ControlllersException(string message) : base(message)
        {
        }

        public ControlllersException(string v, object e)
        {
            this.v = v;
            this.e = e;
        }

        public ControlllersException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected ControlllersException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}