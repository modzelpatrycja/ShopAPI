using System;
using System.Text;

namespace WebAPI
{
    public class Encryption
    {
        public static string Key = "123qweasdzxc";

        public static string Encrypt(string password)
        {
            password += Key;
            var passBytes = Encoding.UTF8.GetBytes(password);
            return Convert.ToBase64String(passBytes);

        }

        public static string Decrypt(string password)
        {
            var passBytes = Convert.FromBase64String(password);
            var result = Encoding.UTF8.GetString(passBytes);
            result = result.Substring(0, result.Length - Key.Length);
            return result;
        }
    }
}
