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
    public class CompanyCarController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public CompanyCarController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select CarId, Brand, Model, CarId, PhotoFile
                    from dbo.Employee
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
        public JsonResult Post(CompanyCar pass)
        {
            string query = @"
                    insert into dbo.Employee 
                    (Brand, Model, CarId, PhotoFile)
                    values 
                    ( @Brand, @Model, @CarId, @PhotoFile )
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ShopAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Brand", System.Data.SqlDbType.NVarChar).Value = pass.Brand;
                    command.Parameters.AddWithValue("@Model", System.Data.SqlDbType.NVarChar).Value = pass.Model;
                    command.Parameters.AddWithValue("@CarId", System.Data.SqlDbType.NVarChar).Value = pass.CarId;
                    command.Parameters.AddWithValue("@PhotoFile", System.Data.SqlDbType.NVarChar).Value = pass.PhotoFile;
                    reader = command.ExecuteReader();
                    table.Load(reader); ;

                    reader.Close();
                    connection.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(CompanyCar pass)
        {
            string query = @"
                    update dbo.Employee set 
                    Brand = @Brand
                    , Model = @Model
                    where CarId = @CarId
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ShopAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Brand", System.Data.SqlDbType.NVarChar).Value = pass.Brand;
                    command.Parameters.AddWithValue("@Model", System.Data.SqlDbType.NVarChar).Value = pass.Model;
                    command.Parameters.AddWithValue("@CarId", System.Data.SqlDbType.NVarChar).Value = pass.CarId;
                    command.Parameters.AddWithValue("@PhotoFile", System.Data.SqlDbType.NVarChar).Value = pass.PhotoFile;

                    reader = command.ExecuteReader();
                    table.Load(reader); ;

                    reader.Close();
                    connection.Close();
                }
            }
            return new JsonResult("Updated Successfully");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/PhotoFiles/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            
            
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.Employee
                    where CarId = @CarId
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ShopAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@CarId", System.Data.SqlDbType.NVarChar).Value = id;
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

