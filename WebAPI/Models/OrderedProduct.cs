using System;
using System.Collections.Generic;
using System.Text;

namespace Sklep.Core.Domain
{
    public class OrderedProduct
    {
        public int OrderedProductId { get; set; }

        public int OrderId { get; set; }

        public int ProductId { get; set; }
    }
}
