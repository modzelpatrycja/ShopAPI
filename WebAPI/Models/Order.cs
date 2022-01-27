using System;
using System.Collections.Generic;
using System.Text;

namespace Sklep.Core.Domain
{
    public class Order
    {
        public int Id { get; set; }
        public List<Product> products { get; set; }

        public int ClientsId { get; set; }
    }
}
