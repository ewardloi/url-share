using System.Net;

namespace UrlShare.Responses;

public class Response : Response<object>
{
    public static IResult Ok() => Results.Ok(new Response<object> { Data = null });
}

public class Response<T>
{
    public T? Data { get; set; }

    public string Message { get; set; } = "Success";
    
    public HttpStatusCode StatusCode { get; set; } = HttpStatusCode.OK;
    
    public static IResult Ok(T? data) => Results.Ok(new Response<T> { Data = data });
    
    public static IResult NotFound(string message) => Results.NotFound(new Response<T> { Message = message, StatusCode = HttpStatusCode.NotFound });
    
    public static IResult BadRequest(string message) => Results.BadRequest(new Response<T> { Message = message, StatusCode = HttpStatusCode.BadRequest });
}