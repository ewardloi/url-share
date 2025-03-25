namespace UrlShare.Middlewares;

public static class FrontendMiddleware
{
    public static void UseFrontend(this WebApplication app)
    {
        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(
                Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/dist")
            )
        });

        app.MapGet("/", () => Results.Redirect("/index.html"));
    }
}