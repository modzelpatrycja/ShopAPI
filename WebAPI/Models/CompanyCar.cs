using System;
using System.Collections.Generic;
using System.Text;

namespace Sklep.Core.Domain
{
    public class CompanyCar
    {
        public int CarId { get; set; }

        public string Brand { get; set; }

        public string Model { get; set; }

        public DateTime YearOfProduction { get; set; }

        public string PhotoFile { get; set; }

    }
}
