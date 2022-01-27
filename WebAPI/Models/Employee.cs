using System;
using System.Collections.Generic;
using System.Text;

namespace Sklep.Core.Domain
{
    public class Employee
    {
        public int EmployeeId { get; set; }

        public string EmployeeName { get; set; }

        public string EmployeeLastName { get; set; }

        public int CompanyCarId { get; set; }
    }
}
