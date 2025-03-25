using UrlShare.Mappers;
using UrlShare.Requests;
using UrlShare.Responses;
using UrlShare.Services;
using Microsoft.AspNetCore.Mvc;

namespace UrlShare.Endpoints;

public static class CloudflaredEndpoint
{
    public static void MapCloudflareEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapGet("/cloudflared/{id:guid}", GetTunnel).RequireAuthorization();
        app.MapGet("/cloudflared/", GetTunnels).RequireAuthorization();
        app.MapPost("/cloudflared/", CreateTunnel).RequireAuthorization();
        app.MapDelete("/cloudflared/{id:guid}", CloseTunnel).RequireAuthorization();
    }
    
    private static async Task<IResult> GetTunnel(Guid id, CloudflaredService cloudflaredService)
    {
        var tunnel = await cloudflaredService.GetTunnel(id);

        return tunnel is not null
            ? Response<TunnelResponse>.Ok(tunnel.MapTo<TunnelResponse>())
            : Response<TunnelResponse>.NotFound("Tunnel not found");
    }

    private static async Task<IResult> GetTunnels(CloudflaredService cloudflaredService)
    {
        var tunnels = await cloudflaredService.GetAllTunnels();

        return Response<List<TunnelResponse>>.Ok(tunnels.MapToList<TunnelResponse>());
    }

    private static async Task<IResult> CreateTunnel([FromBody] CreateTunnelRequest request, CloudflaredService cloudflaredService)
    {
        if (!Uri.IsWellFormedUriString(request.Url, UriKind.Absolute))
            return Response<TunnelResponse>.BadRequest("Invalid URL");
        
        var tunnel = await cloudflaredService.CreateTunnel(request.Url);
        
        return Response<TunnelResponse>.Ok(tunnel.MapTo<TunnelResponse>());
    }

    private static async Task<IResult> CloseTunnel(Guid id, CloudflaredService cloudflaredService)
    {
        var tunnel = await cloudflaredService.GetTunnel(id);
        
        if (tunnel is null)
            return Response.NotFound("Tunnel not found");

        await cloudflaredService.CloseTunnel(tunnel.Id);

        return Response.Ok();
    }
}