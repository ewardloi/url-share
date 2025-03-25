using UrlShare.Endpoints;
using UrlShare.Helpers;
using UrlShare.Middlewares;
using UrlShare.Services;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseKestrel(options =>
{
    options.ListenAnyIP(EnvHelper.GetNullableInt("PORT") ?? 10000);
});

builder.Services.AddJwtAuthentication();
builder.Services.AddSingleton<CloudflaredService>();
builder.Services.AddHttpClient();

var app = builder.Build();

app.UseGlobalExceptionHandler();
app.UseAuthentication();
app.UseAuthorization();

if (EnvHelper.GetBool("FRONTEND_ENABLED", true))
{
    app.UseFrontend();
}

app.MapTokenEndpoint();
app.MapCloudflareEndpoint();

app.Run();
