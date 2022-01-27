/*using System;
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

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public PasswordController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select PasswordId, PasswordName, UserId,ServiceName
                    from dbo.Password
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PasswordAppCon");
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
        public JsonResult Post(Password pass)
        {
            string query = @"
                    insert into dbo.Password 
                    (PasswordName, UserId, ServiceName)
                    values 
                    ( @passwordName, @userId, @serviceName )
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PasswordAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@passwordName", System.Data.SqlDbType.NVarChar).Value = Encryption.Encrypt(pass.PasswordName);
                    command.Parameters.AddWithValue("@userId", System.Data.SqlDbType.NVarChar).Value = pass.UserId;
                    command.Parameters.AddWithValue("@serviceName", System.Data.SqlDbType.NVarChar).Value = Encryption.Encrypt(pass.ServiceName);
                    reader = command.ExecuteReader();
                    table.Load(reader); ;

                    reader.Close();
                    connection.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Password pass)
        {
            string query = @"
                    update dbo.Password set 
                    PasswordName = @passwordName
                    , UserId = @userId
                    ,ServiceName = @passwordId
                    where PasswordId = @passwordId
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PasswordAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@passwordName", System.Data.SqlDbType.NVarChar).Value = Encryption.Encrypt(pass.PasswordName);
                    command.Parameters.AddWithValue("@userId", System.Data.SqlDbType.NVarChar).Value = pass.UserId;
                    command.Parameters.AddWithValue("@serviceName", System.Data.SqlDbType.NVarChar).Value = Encryption.Encrypt(pass.ServiceName);
                    command.Parameters.AddWithValue("@passwordId", System.Data.SqlDbType.NVarChar).Value = pass.PasswordId;
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
                    delete from dbo.Password
                    where PasswordId = @passwordId
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PasswordAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@passwordId", System.Data.SqlDbType.NVarChar).Value = id;
                    reader = command.ExecuteReader();
                    table.Load(reader); ;

                    reader.Close();
                    connection.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }
    }
}*/
