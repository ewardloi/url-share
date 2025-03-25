using System.Net;
using UrlShare.Responses;
using Microsoft.AspNetCore.Diagnostics;

namespace UrlShare.Middlewares;

public static class ExceptionMiddleware
{
    public static void UseGlobalExceptionHandler(this IApplicationBuilder app)
    {
        app.UseExceptionHandler(errorApp =>
        {
            errorApp.Run(async context =>
            {
                var exception = context.Features.Get<IExceptionHandlerFeature>()?.Error;
                context.Response.ContentType = "application/json";
                
                await (exception switch
                {
                    BadHttpRequestException => BadRequest(context),
                    UnauthorizedAccessException => Unauthorized(context),
                    _ => InternalServerError(context)
                });
            });
        });
    }
    
    private static async Task BadRequest(HttpContext context)
    {
        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        await context.Response.WriteAsJsonAsync(new Response
        {
            Data = null,
            Message = "Bad Request.",
            StatusCode = HttpStatusCode.BadRequest
        });
    }
    
    private static async Task Unauthorized(HttpContext context)
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        await context.Response.WriteAsJsonAsync(new Response
        {
            Data = null,
            Message = "Unauthorized.",
            StatusCode = HttpStatusCode.Unauthorized
        });
    }
    
    private static async Task InternalServerError(HttpContext context)
    {
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        await context.Response.WriteAsJsonAsync(new Response
        {
            Data = null,
            Message = "An unexpected error occurred. Please try again later.",
            StatusCode = HttpStatusCode.InternalServerError
        });
    }
}
