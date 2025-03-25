using UrlShare.Helpers;
using UrlShare.Requests;
using UrlShare.Responses;
using Microsoft.AspNetCore.Mvc;

namespace UrlShare.Endpoints;

public static class TokenEndpoint
{
    public static void MapTokenEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapPost("/token", CreateToken);
        app.MapPost("/token/renew", RenewToken).RequireAuthorization();
    }

    private static IResult CreateToken([FromBody] CreateTokenRequest request)
    {
        var userName = EnvHelper.GetString("USERNAME");
        var passwordHash = EnvHelper.GetString("PASSWORD_SHA256_HASH");
        
        if (request.UserName != userName || HashHelper.GetSha256Hash(request.Password) != passwordHash)
            return Response.NotFound("Username or password is incorrect");

        return Response<TokenResponse>.Ok(new TokenResponse(JwtHelper.GenerateJwtToken(userName)));
    }

    private static IResult RenewToken()
    {
        var userName = EnvHelper.GetString("USERNAME");
        return Response<TokenResponse>.Ok(new TokenResponse(JwtHelper.GenerateJwtToken(userName)));
    }
}