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

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select UserId, UserName, UserPassword, main_password from dbo.User_tab";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PasswordAppCon");
            SqlDataReader reader;
            using(SqlConnection connection=new SqlConnection(sqlDataSource))
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
        public JsonResult Post(User user)
        {
            string query = @"
                    insert into dbo.User_tab
                    (UserName, UserPassword, main_password) values 
                    ( @username, @password, @main_password )
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PasswordAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@username", System.Data.SqlDbType.NVarChar).Value = Encryption.Encrypt(user.UserName);
                    command.Parameters.AddWithValue("@password", System.Data.SqlDbType.NVarChar).Value = Encryption.Encrypt(user.UserPassword);
                    command.Parameters.AddWithValue("@main_password", System.Data.SqlDbType.NVarChar).Value = Encryption.Encrypt( user.main_password);
                    reader = command.ExecuteReader();
                    table.Load(reader); ;

                    reader.Close();
                    connection.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [Route("login")]
        [HttpPost]
        public JsonResult Login(User user)
        {
            string query = @"
                   select UserId from dbo.User_tab where UserName = @username and UserPassword =  @password";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PasswordAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@username", System.Data.SqlDbType.NVarChar).Value = Encryption.Encrypt(user.UserName);
                    command.Parameters.AddWithValue("@password", System.Data.SqlDbType.NVarChar).Value = Encryption.Encrypt(user.UserPassword);

                    reader = command.ExecuteReader();
                    if(!reader.HasRows)
                    {
                        return new JsonResult("Invalid username or password");
                    }
                    table.Load(reader); ;

                    reader.Close();
                    connection.Close();
                }
            }

            return new JsonResult("Login Successfully");
        }


        [HttpPut]
        public JsonResult Put(User user)
        {
            string query = @"
                    update dbo.User_tab set 
                    UserName = @username
                    ,UserPassword =  @password
                    ,main_password = @main_password
                    where UserId = @userId
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PasswordAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@username", System.Data.SqlDbType.NVarChar).Value = Encryption.Encrypt(user.UserName);
                    command.Parameters.AddWithValue("@password", System.Data.SqlDbType.NVarChar).Value = Encryption.Encrypt(user.UserPassword);
                    command.Parameters.AddWithValue("@main_password", System.Data.SqlDbType.NVarChar).Value = Encryption.Encrypt(user.main_password);
                    command.Parameters.AddWithValue("@userId", System.Data.SqlDbType.NVarChar).Value = user.UserId;
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
                    delete from dbo.User_tab
                    where UserId = @userId
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PasswordAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@userId", System.Data.SqlDbType.NVarChar).Value = id;
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
