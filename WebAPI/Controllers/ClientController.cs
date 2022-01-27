using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Sklep.Core.Domain;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public ClientController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select ClientId, ClientName, ClientLastName, City
                    from dbo.Client
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ShopAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    reader = command.ExecuteReader();
                    table.Load(reader); ;

                    reader.Close();
                    connection.Close();
                }
            }
            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult Post(Client pass)
        {
            string query = @"
                    insert into dbo.Client 
                    (ClientName, ClientLastName, City)
                    values 
                    ( @ClientName, @ClientLastName, @City )
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ShopAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@ClientName", System.Data.SqlDbType.NVarChar).Value = pass.ClientName;
                    command.Parameters.AddWithValue("@ClientLastName", System.Data.SqlDbType.NVarChar).Value = pass.ClientLastName;
                    command.Parameters.AddWithValue("@City", System.Data.SqlDbType.NVarChar).Value = pass.City;
                    reader = command.ExecuteReader();
                    table.Load(reader); ;

                    reader.Close();
                    connection.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Client pass)
        {
            string query = @"
                    update dbo.Client set 
                    ClientName = @ClientName
                    , ClientLastName = @ClientLastName
                    ,City = @City
                    where ClientId = @ClientId
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ShopAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@ClientName", System.Data.SqlDbType.NVarChar).Value = pass.ClientName;
                    command.Parameters.AddWithValue("@ClientLastName", System.Data.SqlDbType.NVarChar).Value = pass.ClientLastName;
                    command.Parameters.AddWithValue("@City", System.Data.SqlDbType.NVarChar).Value =pass.City;
                    command.Parameters.AddWithValue("@ClientId", System.Data.SqlDbType.NVarChar).Value = pass.ClientId;
                    reader = command.ExecuteReader();
                    table.Load(reader); ;

                    reader.Close();
                    connection.Close();
                }
            }
            return new JsonResult("Updated Successfully");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.Client
                    where ClientId = @ClientId
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ShopAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@ClientId", System.Data.SqlDbType.NVarChar).Value = id;
                    reader = command.ExecuteReader();
                    table.Load(reader); ;

                    reader.Close();
                    connection.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }
    }
}

