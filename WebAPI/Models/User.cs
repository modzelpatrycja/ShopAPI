using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class User
    {
        public int UserId { get; set; }

        public string UserName { get; set; }

        public string UserPassword { get; set; }

        public string main_password { get; set; }

    }
}
