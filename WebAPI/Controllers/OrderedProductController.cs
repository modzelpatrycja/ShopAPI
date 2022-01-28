using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

using System.Data;
using WebAPI.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Sklep.Core.Domain;
using System.Data.SqlClient;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderedProductController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public OrderedProductController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select OrderedProductId, OrderId, ProductId
                    from dbo.OrderedProduct
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
        public JsonResult Post(OrderedProduct pass)
        {
            string query = @"
                    insert into dbo.OrderedProduct 
                    (OrderId, ProductId)
                    values 
                    ( @OrderId, @ProductId)
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ShopAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@OrderId", System.Data.SqlDbType.NVarChar).Value = pass.OrderId;
                    command.Parameters.AddWithValue("@ProductId", System.Data.SqlDbType.NVarChar).Value = pass.ProductId;
                    reader = command.ExecuteReader();
                    table.Load(reader); ;

                    reader.Close();
                    connection.Close();
                }
            }
            return new JsonResult("Added");
        }


        [HttpPut]
        public JsonResult Put(OrderedProduct pass)
        {
            string query = @"
                    update dbo.OrderedProduct set 
                    OrderId = @OrderId
                    , ProductId = @ProductId
                    where Id = @OrderedProductId
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ShopAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@OrderId", System.Data.SqlDbType.NVarChar).Value = pass.OrderId;
                    command.Parameters.AddWithValue("@ProductId", System.Data.SqlDbType.NVarChar).Value = pass.ProductId;
                    command.Parameters.AddWithValue("@OrderedProductId", System.Data.SqlDbType.NVarChar).Value = pass.OrderedProductId;
                    reader = command.ExecuteReader();
                    table.Load(reader); ;

                    reader.Close();
                    connection.Close();
                }
            }
            return new JsonResult("Updated");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.OrderedProduct
                    where OrderedProductId = @OrderedProductId
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ShopAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@OrderedProductId", System.Data.SqlDbType.NVarChar).Value = id;
                    reader = command.ExecuteReader();
                    table.Load(reader); ;

                    reader.Close();
                    connection.Close();
                }
            }
            return new JsonResult("Deleted");
        }
    }
}

