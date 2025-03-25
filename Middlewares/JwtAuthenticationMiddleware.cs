using System.Text;
using UrlShare.Helpers;
using Microsoft.IdentityModel.Tokens;

namespace UrlShare.Middlewares;

public static class JwtAuthenticationMiddleware
{
    public static void AddJwtAuthentication(this IServiceCollection services)
    {
        if (EnvHelper.GetNullableString("JWT_SECRET") is null)
            EnvHelper.Set("JWT_SECRET", JwtHelper.GenerateKey());

        if (EnvHelper.GetNullableString("JWT_ISSUER") is null)
            EnvHelper.Set("JWT_ISSUER", nameof(UrlShare));

        if (EnvHelper.GetNullableString("JWT_AUDIENCE") is null)
            EnvHelper.Set("JWT_AUDIENCE", nameof(UrlShare));

        if (EnvHelper.GetNullableInt("JWT_EXPIRES") is null)
            EnvHelper.Set("JWT_EXPIRES", "3600");

        services.AddAuthentication("Bearer")
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = EnvHelper.GetString("JWT_ISSUER"),
                    ValidAudience = EnvHelper.GetString("JWT_AUDIENCE"),
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(EnvHelper.GetString("JWT_SECRET")))
                };
            });
        
        services.AddAuthorization();
    }
}