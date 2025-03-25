using UrlShare.Models;
using UrlShare.Responses;

namespace UrlShare.Mappers;

public static class ResponseMapper
{
    public static T MapTo<T>(this Tunnel source)
        where T : TunnelResponse, new() => new T
    {
        Id = source.Id,
        LocalUrl = source.LocalUrl,
        PublicUrl = source.PublicUrl
    };

    public static List<T> MapToList<T>(this IEnumerable<Tunnel> source)
        where T : TunnelResponse, new() => source
        .Select(s => new T
        {
            Id = s.Id,
            LocalUrl = s.LocalUrl,
            PublicUrl = s.PublicUrl
        })
        .ToList();
}