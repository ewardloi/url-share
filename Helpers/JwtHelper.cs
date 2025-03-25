using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace UrlShare.Helpers;

public static class JwtHelper
{
    public static string GenerateKey()
    {
        var keyBytes = new byte[32];
        
        using var generator = RandomNumberGenerator.Create();
        generator.GetBytes(keyBytes);

        return Convert.ToBase64String(keyBytes);
    }
    
    public static string GenerateJwtToken(string userName)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, userName),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(EnvHelper.GetString("JWT_SECRET")));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        var expires = TimeSpan.FromSeconds(EnvHelper.GetInt("JWT_EXPIRES"));

        var token = new JwtSecurityToken(
            issuer: EnvHelper.GetString("JWT_ISSUER"),
            audience: EnvHelper.GetString("JWT_AUDIENCE"),
            claims: claims,
            expires: DateTime.UtcNow.Add(expires),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}