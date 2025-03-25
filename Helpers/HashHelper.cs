using System.Security.Cryptography;
using System.Text;

namespace UrlShare.Helpers;

public static class HashHelper
{
    public static string GetSha256Hash(string data)
    {
        using var sha256 = SHA256.Create();
        
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(data));

        var builder = new StringBuilder();
        foreach (var b in bytes)
            builder.Append(b.ToString("x2"));

        return builder.ToString();
    }
}